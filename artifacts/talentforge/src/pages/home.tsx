import { usePageTitle } from "@/hooks/use-page-title";
import { useConsultation } from "@/context/consultation-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Building, Users, Zap, Award, Search, HandshakeIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Candidates Hired", value: "500+" },
  { label: "Clients Served", value: "50+" },
  { label: "Client Satisfaction", value: "95%" },
];

const services = [
  { title: "Recruitment Services", icon: <Search className="w-6 h-6" />, desc: "End-to-end talent acquisition tailored to your specific industry needs." },
  { title: "Executive Hiring", icon: <Award className="w-6 h-6" />, desc: "Sourcing top-tier leadership that drives strategic growth and vision." },
];


export default function Home() {
  usePageTitle();
  const { openModal } = useConsultation();
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C10_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
              Your <span className="text-accent">Growth Partner</span> for Startup & SME Hiring
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Helping startups and small businesses build agile, high-performing teams through modern HR solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8" onClick={openModal} data-testid="button-hero-book-consultation">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8" asChild>
                <Link href="/services">Hire Talent</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground border-y border-border/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="text-5xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Strategic HR Solutions</h2>
            <p className="text-muted-foreground">Comprehensive services designed to scale your workforce efficiently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <Link href="/services" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Specialized Expertise. Targeted Results.</h2>
              <p className="text-lg text-muted-foreground">
                We don't try to be everything to everyone. By focusing exclusively on EdTech and Design, we've built deep networks of passive candidates that generalist agencies can't access.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <strong className="block text-foreground mb-1">EdTech & E-Learning</strong>
                    <span className="text-muted-foreground">From academic counselors to C-suite executives who understand the digital education landscape.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <strong className="block text-foreground mb-1">Interior Design & Architecture</strong>
                    <span className="text-muted-foreground">Connecting visionary designers, 3D visualizers, and project managers with top studios.</span>
                  </div>
                </li>
              </ul>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/industries">Explore Our Industries</Link>
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/5] rounded-2xl bg-muted overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team collaborating" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl bg-muted overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80" alt="Design presentation" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
