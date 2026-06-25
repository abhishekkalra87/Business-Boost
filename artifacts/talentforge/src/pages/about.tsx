import { usePageTitle } from "@/hooks/use-page-title";
import { motion } from "framer-motion";
import { Target, Lightbulb, Compass, Award } from "lucide-react";

export default function About() {
  usePageTitle("About Us");
  const team = [
    { name: "Neha Kalra", title: "CEO & Managing Partner", bg: "bg-blue-100" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24">
      {/* Page Header */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About NexZenta
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            We don't just fill vacancies. We partner with visionaries to build teams that define the future.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-secondary/50 border border-border"
            >
              <Target className="w-10 h-10 text-accent mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between exceptional talent and industry-leading companies in the EdTech and Design sectors by leveraging AI technology combined with deep human insight.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-secondary/50 border border-border"
            >
              <Lightbulb className="w-10 h-10 text-accent mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted strategic HR partner in India, known for transforming organizational capabilities and setting the gold standard in specialized recruitment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">The Founder's Story</h2>
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                "After spending over a decade heading talent acquisition at leading EdTech decacorns, I noticed a persistent gap. Generic recruitment agencies didn't understand the nuance of academic sales, while in-house teams struggled with the sheer volume of specialized hiring needed during hyper-growth."
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                "I founded NexZenta with a singular premise: specialized industries require specialized hiring. By bringing together AI-driven sourcing and veteran HR intuition, we've created a framework that guarantees not just a candidate, but the right partner for your growth."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  NK
                </div>
                <div>
                  <div className="font-bold text-foreground">Neha Kalra</div>
                  <div className="text-sm text-muted-foreground">Founder & CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
