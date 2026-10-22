import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "AI Academy", href: "/ai-academy" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || location === "/ai-academy"
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-[#C9A84C] flex items-center justify-center text-[#0B1221] font-bold text-xl leading-none shadow-sm group-hover:shadow-[#C9A84C]/30 group-hover:scale-105 transition-all">
            NZ
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg tracking-tight text-foreground">NexZenta</span>
            <span className="text-[9px] text-[#C9A84C] font-semibold tracking-[0.15em] uppercase">
              AI-Powered Trusted Talent Partner
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground relative group ${
                location === link.href
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
              {location === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A84C] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button
            className="bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold shadow-sm hover:shadow-md hover:shadow-[#C9A84C]/20 transition-all"
            asChild
          >
            <Link href="/contact" data-testid="button-nav-book-consultation">
              Book Consultation
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <button
            className="text-foreground p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-lg py-5 px-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-medium py-3 px-2 border-b border-border/40 last:border-0 transition-colors ${
                location === link.href
                  ? "text-[#C9A84C] font-semibold"
                  : "text-foreground hover:text-[#C9A84C]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button
            className="w-full mt-4 bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold"
            asChild
          >
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} data-testid="button-mobile-book-consultation">
              Book Consultation
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
