import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Loader2, Eye, Copy, Download, Check, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreviewModal from "@/components/PreviewModal";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const fallbackTemplate = (name: string, desc: string) => `# 📦 ${name}

${desc || "A project built with modern technologies."}

## ✨ Features

- Feature 1
- Feature 2
- Feature 3

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
git clone https://github.com/user/${name}.git
cd ${name}
npm install
npm run dev
\`\`\`

## 📁 Project Structure

\`\`\`
${name}/
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── public/
├── package.json
└── README.md
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️
`;

const Generate = () => {
  const [params] = useSearchParams();
  const repoName = params.get("repo") || "";
  const fullName = params.get("full_name") || "";
  const { user } = useAuth();

  const [name, setName] = useState(repoName);
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a project name", { position: "bottom-center" });
      return;
    }

    setLoading(true);
    setMarkdown("");

    try {
      const resp = await supabase.functions.invoke("generate-readme", {
        body: { projectName: name, description, techStack, repoFullName: fullName },
      });

      if (resp.error) throw resp.error;
      const data = resp.data;

      if (data?.readme) {
        setMarkdown(data.readme);
        toast.success("README generated successfully! 🎉", { position: "bottom-center" });

        // Save to DB if logged in
        if (user) {
          const techs = techStack ? techStack.split(",").map((t) => t.trim()).filter(Boolean) : [];
          await supabase.from("generated_readmes").insert({
            user_id: user.id,
            repo_name: name,
            repo_full_name: fullName || null,
            content: data.readme,
            technologies: techs,
          });
          // Track contribution
          await supabase.from("contributions").upsert(
            { user_id: user.id, activity_date: new Date().toISOString().split("T")[0], count: 1, activity_type: "readme_generated" },
            { onConflict: "user_id,activity_date,activity_type" }
          );
        }
      } else {
        setMarkdown(fallbackTemplate(name, description));
        toast.info("Generated with template (AI unavailable)", { position: "bottom-center" });
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setMarkdown(fallbackTemplate(name, description));
      toast.error("Using fallback template", { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success("Copied to clipboard!", { position: "bottom-center" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("README downloaded!", { position: "bottom-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl font-black text-foreground mb-2">
            Generate <span className="text-gradient">README</span>
          </h1>
          <p className="text-muted-foreground">Fill in your project details and let AI do the rest</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="clay p-8 mb-8">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Project Name *</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="my-awesome-project" className="clay-inset border-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of your project..." className="clay-inset border-none min-h-[80px]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Tech Stack</label>
              <Input value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, TypeScript, Node.js, PostgreSQL..." className="clay-inset border-none" />
            </div>
            <Button variant="hero" size="xl" className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
              {loading ? <><Loader2 className="h-5 w-5 animate-spin" />Generating...</> : <><Sparkles className="h-5 w-5" />Generate README</>}
            </Button>
          </div>
        </motion.div>

        {markdown && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="clay p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="font-display font-bold text-foreground">Generated README</h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={loading}><RefreshCw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4" /></Button>
                <Button variant="clay" size="sm" onClick={handleCopy} className="gap-1">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="hero" size="sm" onClick={handleDownload} className="gap-1"><Download className="h-4 w-4" />Download</Button>
              </div>
            </div>
            <pre className="clay-inset p-4 rounded-xl text-sm font-mono text-foreground whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto">{markdown}</pre>
          </motion.div>
        )}
      </div>
      <Footer />
      <PreviewModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} markdown={markdown} repoName={name} />
    </div>
  );
};

export default Generate;
