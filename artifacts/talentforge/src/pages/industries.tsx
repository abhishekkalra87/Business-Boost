import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, PenTool, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Industries() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      {/* Header */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Industries We Serve
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Deep domain expertise in sectors that demand specialized talent and rapid execution.
          </motion.p>
        </div>
      </section>

      {/* EdTech Section */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm">
                <BookOpen className="w-4 h-4" /> EdTech & E-Learning
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Powering the Future of Education</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The EdTech sector moves at breakneck speed. We understand the high-pressure environment of academic sales, the rigorous standards for curriculum designers, and the technical demands of learning platforms.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Academic Counselors",
                  "Inside Sales Executives",
                  "Subject Matter Experts",
                  "Curriculum Designers",
                  "Operations Managers",
                  "Center Heads"
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    {role}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button asChild>
                  <Link href="/contact">Hire EdTech Talent</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-muted aspect-video shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" 
                alt="EdTech professional" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interior & Architecture Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-muted aspect-video shadow-xl lg:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                alt="Architecture studio" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm">
                <PenTool className="w-4 h-4" /> Interior Design & Architecture
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Sourcing Creative Visionaries</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Evaluating creative talent requires a different lens. We assess portfolios, technical software proficiency, and spatial awareness to connect top studios with designers who can execute their vision.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Senior Architects",
                  "Interior Designers",
                  "3D Visualizers",
                  "AutoCAD Drafters",
                  "Project Managers",
                  "Site Supervisors"
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    {role}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button asChild>
                  <Link href="/contact">Hire Design Talent</Link>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
