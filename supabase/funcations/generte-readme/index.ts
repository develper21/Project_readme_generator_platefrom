import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectName, description, techStack, repoFullName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert README.md generator. Generate a comprehensive, professional README.md file in Markdown format. Include:

1. Project title with a relevant emoji
2. Technology badges from shields.io (e.g. ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB))
3. A concise but comprehensive project description
4. A "Features" section with bullet points and emojis
5. A "Tech Stack" section if technologies are provided
6. "Prerequisites" and "Installation" sections with code blocks
7. "Usage" section with examples
8. "Project Structure" showing directory tree
9. "Contributing" guidelines
10. "License" section (MIT)
11. A footer with a nice separator

Use proper Markdown formatting with headers, code blocks, badges, and emojis throughout.
Make it look professional and polished. DO NOT wrap the output in markdown code fences.`;

    const userPrompt = `Generate a README.md for:
- Project Name: ${projectName}
- Description: ${description || "Not provided"}
- Tech Stack: ${techStack || "Not specified"}
- Repository: ${repoFullName || "Not linked"}

Generate a complete, professional README.md now.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI error:", response.status, text);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const readme = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ readme }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
