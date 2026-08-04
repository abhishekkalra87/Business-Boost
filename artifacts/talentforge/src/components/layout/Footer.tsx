import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1221] text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white mb-6">
              <div className="w-8 h-8 rounded bg-[#C9A84C] flex items-center justify-center text-[#0B1221] font-bold text-xl leading-none">
                NZ
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg tracking-tight">NexZenta</span>
                <span className="text-xs text-[#C9A84C] font-medium tracking-widest uppercase">Trusted Talent Partner</span>
              </div>
            </Link>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                AI-Powered Recruitment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                Human Expertise
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                Quality Hiring
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                Faster Results
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-[#C9A84C] transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-[#C9A84C] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#C9A84C] transition-colors">Services</Link></li>
              <li><Link href="/industries" className="hover:text-[#C9A84C] transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A84C] transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <span className="text-sm">+91 93198 23122</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <a href="mailto:talent@nexzenta.com" className="text-sm hover:text-[#C9A84C] transition-colors">talent@nexzenta.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
                <span className="text-sm">Gurgaon, India</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} NexZenta. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
