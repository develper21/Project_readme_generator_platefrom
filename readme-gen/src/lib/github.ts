import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size: number;
  download_url: string | null;
  content?: string;
}

export interface RepoContent {
  path: string;
  content: string;
  language: string;
}

/**
 * Fetch user's GitHub repositories
 */
export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    throw new Error("No GitHub access token found");
  }

  const response = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch repository tree (all files)
 */
export async function fetchRepoTree(owner: string, repo: string, accessToken: string): Promise<any> {
  const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!repoResponse.ok) {
    throw new Error(`Failed to fetch repo: ${repoResponse.statusText}`);
  }

  const repoData = await repoResponse.json();
  const defaultBranch = repoData.default_branch || "main";

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tree: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch file content from GitHub
 */
export async function fetchFileContent(
  owner: string,
  repo: string,
  path: string,
  accessToken: string
): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3.raw",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Read all important files from repository
 */
export async function readRepositoryFiles(
  owner: string,
  repo: string,
  accessToken: string
): Promise<RepoContent[]> {
  const tree = await fetchRepoTree(owner, repo, accessToken);
  const files: RepoContent[] = [];

  // File extensions to read
  const codeExtensions = [
    ".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".cpp", ".c", ".go", 
    ".rs", ".rb", ".php", ".swift", ".kt", ".dart", ".vue", ".svelte",
    ".html", ".css", ".scss", ".json", ".yaml", ".yml", ".md", ".txt",
    ".sh", ".sql", ".graphql", ".prisma"
  ];

  // Important files to always include
  const importantFiles = [
    "package.json", "requirements.txt", "Cargo.toml", "go.mod", "pom.xml",
    "build.gradle", "composer.json", "Gemfile", "setup.py", "pyproject.toml",
    "README.md", "LICENSE", ".gitignore", "Dockerfile", "docker-compose.yml",
    "tsconfig.json", "next.config.js", "vite.config.js", "webpack.config.js"
  ];

  // Filter files to read (max 50 files to avoid rate limits)
  const filesToRead = tree.tree
    .filter((item: any) => {
      if (item.type !== "blob") return false;
      
      // Skip large files (> 100KB)
      if (item.size > 100000) return false;
      
      // Skip node_modules, dist, build, etc.
      if (item.path.includes("node_modules/") || 
          item.path.includes("dist/") || 
          item.path.includes("build/") ||
          item.path.includes(".next/") ||
          item.path.includes("vendor/") ||
          item.path.includes("__pycache__/")) {
        return false;
      }

      const fileName = item.path.split("/").pop() || "";
      const ext = "." + fileName.split(".").pop();

      return importantFiles.includes(fileName) || codeExtensions.includes(ext);
    })
    .slice(0, 50); // Limit to 50 files

  // Fetch file contents in parallel (batches of 5)
  const batchSize = 5;
  for (let i = 0; i < filesToRead.length; i += batchSize) {
    const batch = filesToRead.slice(i, i + batchSize);
    const promises = batch.map(async (file: any) => {
      try {
        const content = await fetchFileContent(owner, repo, file.path, accessToken);
        const ext = file.path.split(".").pop() || "";
        
        files.push({
          path: file.path,
          content: content,
          language: ext,
        });
      } catch (error) {
        console.error(`Failed to fetch ${file.path}:`, error);
      }
    });

    await Promise.all(promises);
  }

  return files;
}

/**
 * Detect project technologies from files
 */
export function detectTechnologies(files: RepoContent[]): string[] {
  const technologies = new Set<string>();

  files.forEach((file) => {
    const fileName = file.path.split("/").pop() || "";
    
    // Package managers and configs
    if (fileName === "package.json") {
      technologies.add("Node.js");
      try {
        const pkg = JSON.parse(file.content);
        if (pkg.dependencies?.react) technologies.add("React");
        if (pkg.dependencies?.next) technologies.add("Next.js");
        if (pkg.dependencies?.vue) technologies.add("Vue.js");
        if (pkg.dependencies?.express) technologies.add("Express");
        if (pkg.dependencies?.typescript) technologies.add("TypeScript");
      } catch (e) {}
    }
    
    if (fileName === "requirements.txt" || fileName === "setup.py") {
      technologies.add("Python");
    }
    
    if (fileName === "Cargo.toml") technologies.add("Rust");
    if (fileName === "go.mod") technologies.add("Go");
    if (fileName === "pom.xml" || fileName === "build.gradle") technologies.add("Java");
    if (fileName === "Gemfile") technologies.add("Ruby");
    if (fileName === "composer.json") technologies.add("PHP");
    
    // File extensions
    if (file.language === "tsx" || file.language === "jsx") technologies.add("React");
    if (file.language === "ts") technologies.add("TypeScript");
    if (file.language === "py") technologies.add("Python");
    if (file.language === "java") technologies.add("Java");
    if (file.language === "go") technologies.add("Go");
    if (file.language === "rs") technologies.add("Rust");
    if (file.language === "rb") technologies.add("Ruby");
    if (file.language === "php") technologies.add("PHP");
    if (file.language === "swift") technologies.add("Swift");
    if (file.language === "kt") technologies.add("Kotlin");
    if (file.language === "dart") technologies.add("Dart/Flutter");
    
    // Frameworks
    if (fileName === "next.config.js" || fileName === "next.config.ts") technologies.add("Next.js");
    if (fileName === "nuxt.config.js") technologies.add("Nuxt.js");
    if (fileName === "angular.json") technologies.add("Angular");
    if (fileName === "svelte.config.js") technologies.add("Svelte");
    
    // Databases
    if (fileName === "prisma.schema" || file.path.includes("prisma/")) technologies.add("Prisma");
    if (file.content.includes("mongoose")) technologies.add("MongoDB");
    if (file.content.includes("sequelize")) technologies.add("SQL");
    
    // DevOps
    if (fileName === "Dockerfile") technologies.add("Docker");
    if (fileName === "docker-compose.yml") technologies.add("Docker Compose");
    if (file.path.includes(".github/workflows/")) technologies.add("GitHub Actions");
  });

  return Array.from(technologies);
}
