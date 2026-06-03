import { usePageTitle } from "@/hooks/use-page-title";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  usePageTitle("Contact Us");
  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Let's Talk Strategy</h1>
          <p className="text-lg text-muted-foreground">
            Whether you're looking to hire top talent or seeking strategic HR consulting, our experts are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border p-8 rounded-2xl shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Company Ltd" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiry">Nature of Inquiry</Label>
                <select 
                  id="inquiry" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="" disabled selected>Select an option</option>
                  <option value="hiring">Looking to Hire</option>
                  <option value="consulting">HR Consulting Services</option>
                  <option value="job">Looking for a Job</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} required />
              </div>
              <Button type="submit" className="w-full h-12 text-base">
                Send Message <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Corporate Office</h3>
                    <p className="text-primary-foreground/80 leading-relaxed">
                      Ardee City, Sector 52<br />
                      Gurugram, Haryana 122003<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-primary-foreground/80">+91 99685 63781</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-primary-foreground/80">talent@nexorahrsolutions.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border-accent text-accent hover:bg-accent hover:text-primary"
                  asChild
                >
                  <a href="https://wa.me/919968563781?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Nexora%20HR%20Solutions." target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-secondary/50">
                <MapPin className="w-10 h-10 mb-2 opacity-50" />
                <span className="font-medium">Map View: Gurugram, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
