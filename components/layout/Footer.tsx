import Link from "next/link";
import { Globe, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-bold text-lg text-foreground">
              <Globe className="h-6 w-6 text-primary" />
              <span>Tourist Planner</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plan Smarter. Travel Better. Get personalized itineraries instantly.
            </p>
          </div>

          <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/plan" className="hover:text-primary transition-colors">Plan a Trip</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Tourist Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
