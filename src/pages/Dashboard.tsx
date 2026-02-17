import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, LayoutGrid, List, GitBranch, Star, GitFork, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RepoCard, { type Repo } from "@/components/RepoCard";
import { useNavigate } from "react-router-dom";

// Demo repos for showcase
const demoRepos: Repo[] = [
  { id: 1, name: "next-ecommerce", full_name: "user/next-ecommerce", description: "A modern e-commerce platform built with Next.js, Stripe, and Tailwind CSS", language: "TypeScript", stargazers_count: 234, forks_count: 45, open_issues_count: 8, private: false, updated_at: new Date(Date.now() - 86400000).toISOString(), html_url: "" },
  { id: 2, name: "python-ml-toolkit", full_name: "user/python-ml-toolkit", description: "Machine learning toolkit with pre-built models for NLP and computer vision", language: "Python", stargazers_count: 891, forks_count: 123, open_issues_count: 15, private: false, updated_at: new Date(Date.now() - 172800000).toISOString(), html_url: "" },
  { id: 3, name: "go-microservices", full_name: "user/go-microservices", description: "Production-ready microservices template with gRPC and Docker", language: "Go", stargazers_count: 456, forks_count: 67, open_issues_count: 3, private: true, updated_at: new Date(Date.now() - 259200000).toISOString(), html_url: "" },
  { id: 4, name: "react-component-lib", full_name: "user/react-component-lib", description: "Beautiful React component library with Storybook documentation", language: "TypeScript", stargazers_count: 1200, forks_count: 189, open_issues_count: 22, private: false, updated_at: new Date(Date.now() - 345600000).toISOString(), html_url: "" },
  { id: 5, name: "rust-web-server", full_name: "user/rust-web-server", description: "High-performance web server built with Actix-web and Tokio", language: "Rust", stargazers_count: 567, forks_count: 34, open_issues_count: 5, private: false, updated_at: new Date(Date.now() - 432000000).toISOString(), html_url: "" },
  { id: 6, name: "flutter-social-app", full_name: "user/flutter-social-app", description: "Cross-platform social media app with real-time messaging", language: "Kotlin", stargazers_count: 178, forks_count: 23, open_issues_count: 11, private: true, updated_at: new Date(Date.now() - 518400000).toISOString(), html_url: "" },
  { id: 7, name: "vue-dashboard", full_name: "user/vue-dashboard", description: "Admin dashboard template with charts, tables, and authentication", language: "JavaScript", stargazers_count: 345, forks_count: 78, open_issues_count: 6, private: false, updated_at: new Date(Date.now() - 604800000).toISOString(), html_url: "" },
  { id: 8, name: "swift-ios-kit", full_name: "user/swift-ios-kit", description: "iOS development toolkit with reusable Swift components", language: "Swift", stargazers_count: 89, forks_count: 12, open_issues_count: 2, private: false, updated_at: new Date(Date.now() - 691200000).toISOString(), html_url: "" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const languages = useMemo(() => {
    const langs = new Set(demoRepos.map((r) => r.language).filter(Boolean));
    return Array.from(langs) as string[];
  }, []);

  const filtered = useMemo(() => {
    return demoRepos.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description || "").toLowerCase().includes(search.toLowerCase());
      const matchLang = !langFilter || r.language === langFilter;
      return matchSearch && matchLang;
    });
  }, [search, langFilter]);

  const totalStars = demoRepos.reduce((a, r) => a + r.stargazers_count, 0);
  const totalForks = demoRepos.reduce((a, r) => a + r.forks_count, 0);

  const handleGenerate = (repo: Repo) => {
    navigate(`/generate?repo=${encodeURIComponent(repo.name)}&full_name=${encodeURIComponent(repo.full_name)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: GitBranch, value: demoRepos.length, label: "Repositories" },
            { icon: Star, value: totalStars.toLocaleString(), label: "Total Stars" },
            { icon: GitFork, value: totalForks, label: "Total Forks" },
            { icon: Loader2, value: "0", label: "READMEs Generated" },
          ].map((s) => (
            <div key={s.label} className="clay p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-hero flex items-center justify-center flex-shrink-0">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="clay p-4 mb-8 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 clay-inset border-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={langFilter === null ? "default" : "ghost"}
              size="sm"
              onClick={() => setLangFilter(null)}
            >
              <Filter className="h-3.5 w-3.5 mr-1" />
              All
            </Button>
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={langFilter === lang ? "default" : "ghost"}
                size="sm"
                onClick={() => setLangFilter(langFilter === lang ? null : lang)}
              >
                {lang}
              </Button>
            ))}
          </div>
          <div className="flex gap-1 clay-sm p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Repo grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              : "flex flex-col gap-4"
          }
        >
          {filtered.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} onGenerate={handleGenerate} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="clay p-12 text-center">
            <p className="text-muted-foreground font-body">No repositories match your search.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
