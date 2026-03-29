"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "Plan a Trip" },
  { href: "/about", label: "About" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
        >
          <Globe className="h-6 w-6 text-primary" />
          <span>Tourist Planner</span>
        </Link>

        {/* Links & Actions */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    pathname === href
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
