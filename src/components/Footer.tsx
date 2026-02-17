import { FileText, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-12 px-4">
    <div className="max-w-6xl mx-auto clay p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-hero flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">
            ReadMe<span className="text-gradient">AI</span>
          </span>
        </Link>

        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Made with <Heart className="h-3.5 w-3.5 text-destructive" /> using AI
        </p>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
