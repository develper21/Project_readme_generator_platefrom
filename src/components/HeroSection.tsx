import { motion } from "framer-motion";
import { FileText, Sparkles, Github, ArrowRight, Code2, Zap, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Code2,
    title: "Deep Code Analysis",
    desc: "Scans up to 50 files, detects 15+ languages and frameworks intelligently.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    desc: "Google Gemini creates professional READMEs with badges, examples, and structure.",
  },
  {
    icon: Shield,
    title: "Secure GitHub Auth",
    desc: "Minimal permission OAuth with encrypted token storage.",
  },
  {
    icon: Download,
    title: "Export & Share",
    desc: "Download .md files, copy to clipboard, or preview with live rendering.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
    {/* Floating orbs */}
    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 animate-float blur-2xl" />
    <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-accent/20 animate-float blur-3xl" style={{ animationDelay: "1s" }} />
    <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-primary/15 animate-float blur-xl" style={{ animationDelay: "2s" }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center max-w-3xl mx-auto relative z-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="inline-flex items-center gap-2 clay-sm px-4 py-2 mb-8"
      >
        <Sparkles className="h-4 w-4 text-accent-foreground" />
        <span className="text-sm font-semibold text-muted-foreground">AI-Powered Documentation</span>
      </motion.div>

      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
        Generate
        <br />
        <span className="text-gradient">Beautiful READMEs</span>
        <br />
        in Seconds
      </h1>

      <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-body">
        Connect your GitHub, let our AI analyze your code, and get a professional
        README with badges, installation guides, and more.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/dashboard">
          <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
            <Github className="h-5 w-5" />
            Get Started Free
          </Button>
        </Link>
        <Link to="/generate">
          <Button variant="clay" size="xl" className="gap-2 w-full sm:w-auto">
            Try Demo
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </motion.div>

    {/* Features grid */}
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-24 w-full"
    >
      {features.map((f) => (
        <motion.div
          key={f.title}
          variants={item}
          className="clay p-6 flex flex-col gap-3 hover:shadow-[var(--clay-shadow-lg)] transition-shadow duration-300 group cursor-default"
        >
          <div className="h-12 w-12 rounded-xl bg-hero flex items-center justify-center group-hover:scale-110 transition-transform">
            <f.icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* Stats */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-8 mt-20"
    >
      {[
        { value: "15+", label: "Languages" },
        { value: "50", label: "Files Analyzed" },
        { value: "∞", label: "READMEs Generated" },
        { value: "< 30s", label: "Generation Time" },
      ].map((s) => (
        <div key={s.label} className="clay-sm px-8 py-5 text-center">
          <div className="font-display text-3xl font-black text-gradient">{s.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </motion.div>
  </section>
);

export default HeroSection;
