import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-[#0B1221] text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white mb-6">
              <div className="w-8 h-8 rounded bg-[#C9A84C] flex items-center justify-center text-[#0B1221] font-bold text-xl leading-none">
                NZ
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg tracking-tight">NexZenta</span>
                <span className="text-xs text-[#C9A84C] font-medium tracking-widest uppercase">Specialized Talent Partner</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-driven HR consulting and recruitment solutions helping businesses hire smarter and grow faster.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-[#C9A84C] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#C9A84C] transition-colors">Our Services</Link></li>
              <li><Link href="/industries" className="hover:text-[#C9A84C] transition-colors">Industries</Link></li>
              <li><Link href="/careers" className="hover:text-[#C9A84C] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A84C] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <span className="text-sm">Ardee City, Sector 52, Gurugram, Haryana 122003, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span className="text-sm">+91 99685 63781</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span className="text-sm">talent@nexzenta.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for the latest HR insights.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#C9A84C]"
              />
              <Button className="w-full bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} NexZenta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
