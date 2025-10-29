import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readRepositoryFiles, detectTechnologies } from "@/lib/github";
import { generateReadmeWithAI } from "@/lib/ai-generator";

/**
 * POST /api/generate - Generate README for a repository
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = (session as any).accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { error: "No GitHub access token found" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { owner, repo, repoData } = body;

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "Owner and repo are required" },
        { status: 400 }
      );
    }

    // Step 1: Read all repository files
    console.log(`Reading repository: ${owner}/${repo}`);
    const files = await readRepositoryFiles(owner, repo, accessToken);

    // Step 2: Detect technologies
    const technologies = detectTechnologies(files);

    // Step 3: Generate README using AI
    console.log(`Generating README with AI for ${repo}`);
    const readme = await generateReadmeWithAI({
      repoName: repo,
      repoDescription: repoData?.description || null,
      technologies,
      files,
      language: repoData?.language || null,
      stars: repoData?.stars || 0,
      forks: repoData?.forks || 0,
    });

    return NextResponse.json({
      success: true,
      readme,
      metadata: {
        filesAnalyzed: files.length,
        technologies,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Error generating README:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate README" },
      { status: 500 }
    );
  }
}
