import { RepoContent } from "./github";

export interface ReadmeGenerationOptions {
  repoName: string;
  repoDescription: string | null;
  technologies: string[];
  files: RepoContent[];
  language: string | null;
  stars: number;
  forks: number;
}

/**
 * Generate README using Google Gemini AI
 */
export async function generateReadmeWithAI(options: ReadmeGenerationOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const prompt = buildPrompt(options);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8000,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No content generated from AI");
    }

    return generatedText;
  } catch (error) {
    console.error("AI generation error:", error);
    // Fallback to template-based generation
    return generateReadmeTemplate(options);
  }
}

/**
 * Build comprehensive prompt for AI
 */
function buildPrompt(options: ReadmeGenerationOptions): string {
  const { repoName, repoDescription, technologies, files, language } = options;

  // Prepare file summaries
  const fileSummaries = files
    .slice(0, 20) // Limit to avoid token limits
    .map((f) => {
      const preview = f.content.slice(0, 500); // First 500 chars
      return `File: ${f.path}\nLanguage: ${f.language}\nContent Preview:\n${preview}\n---`;
    })
    .join("\n\n");

  return `You are an expert technical writer. Generate a comprehensive, professional README.md file for a GitHub repository.

**Repository Information:**
- Name: ${repoName}
- Description: ${repoDescription || "No description provided"}
- Primary Language: ${language || "Not specified"}
- Technologies: ${technologies.join(", ")}

**Project Files Analysis:**
${fileSummaries}

**Requirements:**
1. Create a complete, professional README with the following sections:
   - Project title with relevant emoji
   - Badges (build status, license, version, language, etc.)
   - Brief description
   - Key features (bullet points)
   - Tech stack with icons
   - Prerequisites
   - Installation instructions (step-by-step)
   - Usage examples with code snippets
   - API documentation (if applicable)
   - Configuration guide
   - Project structure
   - Contributing guidelines
   - License information
   - Contact/Support information

2. Use proper Markdown formatting:
   - Use headers (##, ###)
   - Code blocks with syntax highlighting
   - Tables where appropriate
   - Badges from shields.io
   - Emojis for visual appeal

3. Include relevant badges:
   - Language badges
   - Framework badges
   - Build status
   - License
   - Version

4. Add technology icons using:
   - shields.io badges
   - Simple Icons (https://simpleicons.org/)
   - Dev icons

5. Make it visually appealing and easy to navigate

6. Include actual code examples based on the project files

7. Be specific and detailed, not generic

8. Format all badges as: ![Badge Name](badge-url)

Generate ONLY the README content in Markdown format. Do not include any explanations or meta-commentary.`;
}

/**
 * Fallback template-based README generator
 */
function generateReadmeTemplate(options: ReadmeGenerationOptions): string {
  const { repoName, repoDescription, technologies, files, language, stars, forks } = options;

  // Detect package.json for scripts
  const packageJson = files.find((f) => f.path === "package.json");
  let scripts = "";
  if (packageJson) {
    try {
      const pkg = JSON.parse(packageJson.content);
      if (pkg.scripts) {
        scripts = Object.entries(pkg.scripts)
          .map(([key, value]) => `- \`npm run ${key}\` - ${value}`)
          .join("\n");
      }
    } catch (e) {}
  }

  // Generate tech badges
  const techBadges = technologies
    .map((tech) => {
      const techLower = tech.toLowerCase().replace(/\s+/g, "-");
      return `![${tech}](https://img.shields.io/badge/${tech}-informational?style=flat&logo=${techLower}&logoColor=white&color=2bbc8a)`;
    })
    .join("\n");

  // Detect main files
  const hasDockerfile = files.some((f) => f.path === "Dockerfile");
  const hasTests = files.some((f) => f.path.includes("test") || f.path.includes("spec"));

  return `# ${repoName}

${techBadges}

![Stars](https://img.shields.io/github/stars/user/${repoName}?style=social)
![Forks](https://img.shields.io/github/forks/user/${repoName}?style=social)
![License](https://img.shields.io/github/license/user/${repoName})

## 📋 Description

${repoDescription || "A modern application built with cutting-edge technologies."}

## ✨ Features

- 🚀 Fast and efficient performance
- 💎 Clean and modern UI/UX
- 🔒 Secure and reliable
- 📱 Responsive design
- ⚡ Real-time updates
- 🛠️ Easy to customize

## 🛠️ Tech Stack

${technologies.map((tech) => `- **${tech}**`).join("\n")}

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
${hasDockerfile ? "- Docker (optional)" : ""}

## 🚀 Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/${repoName}.git
cd ${repoName}
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up environment variables**

Create a \`.env\` file in the root directory:

\`\`\`env
# Add your environment variables here
DATABASE_URL=your_database_url
API_KEY=your_api_key
\`\`\`

4. **Run the application**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at \`http://localhost:3000\`

${hasDockerfile ? `
## 🐳 Docker Support

Run with Docker:

\`\`\`bash
docker build -t ${repoName} .
docker run -p 3000:3000 ${repoName}
\`\`\`
` : ""}

## 📖 Usage

\`\`\`javascript
// Example usage
import { Component } from './${repoName}';

const app = new Component();
app.start();
\`\`\`

## 📁 Project Structure

\`\`\`
${repoName}/
├── src/                 # Source files
├── public/              # Static files
├── tests/               # Test files
├── package.json         # Dependencies
└── README.md           # Documentation
\`\`\`

${scripts ? `
## 📜 Available Scripts

${scripts}
` : ""}

${hasTests ? `
## 🧪 Testing

Run tests:

\`\`\`bash
npm test
\`\`\`
` : ""}

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by amazing open-source projects
- Built with ❤️ using ${technologies.join(", ")}

## 📞 Support

For support, email your.email@example.com or open an issue.

---

⭐ Star this repository if you find it helpful!
`;
}
