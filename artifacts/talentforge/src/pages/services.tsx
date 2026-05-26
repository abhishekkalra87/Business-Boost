import { usePageTitle } from "@/hooks/use-page-title";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Briefcase, Building2, UserPlus, Receipt, Search, Cpu, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
  usePageTitle("Services");
  const services = [
    {
      title: "Recruitment Services",
      icon: <Users className="w-8 h-8" />,
      desc: "End-to-end talent acquisition. We manage the entire lifecycle from job profiling to final offer negotiation.",
      benefits: ["SLA-backed delivery times", "Pre-screened candidate shortlists", "Replacement guarantee"]
    },
    {
      title: "Executive Hiring",
      icon: <Briefcase className="w-8 h-8" />,
      desc: "Confidential, targeted search for C-suite and senior leadership roles that require extreme precision.",
      benefits: ["Discreet market mapping", "Competitor analysis", "Cultural fitment assessment"]
    },
    {
      title: "Bulk Hiring",
      icon: <Building2 className="w-8 h-8" />,
      desc: "Scale your sales or operations teams rapidly without compromising on the quality of hires.",
      benefits: ["Campus recruitment drives", "Assessment centers", "Rapid onboarding coordination"]
    },
    {
      title: "HR Outsourcing",
      icon: <UserPlus className="w-8 h-8" />,
      desc: "Let us act as your extended HR department, handling employee lifecycle management and compliance.",
      benefits: ["Policy formulation", "Performance management", "Statutory compliance"]
    },
    {
      title: "Payroll Coordination",
      icon: <Receipt className="w-8 h-8" />,
      desc: "Streamlined payroll processing ensuring accurate, timely, and compliant disbursements.",
      benefits: ["Tax calculations", "Leave & attendance sync", "Query resolution"]
    },
    {
      title: "Candidate Screening",
      icon: <Search className="w-8 h-8" />,
      desc: "Rigorous background checks and technical assessments to ensure you only interview the best.",
      benefits: ["Technical testing", "Behavioral assessment", "Reference checking"]
    },
    {
      title: "AI-Based Sourcing",
      icon: <Cpu className="w-8 h-8" />,
      desc: "Proprietary AI algorithms to mine passive candidate data across the web for niche roles.",
      benefits: ["Deep market penetration", "Faster sourcing", "Data-driven matching"]
    },
    {
      title: "Startup Hiring Support",
      icon: <Rocket className="w-8 h-8" />,
      desc: "Flexible, cost-effective hiring models designed specifically for seed and Series A startups.",
      benefits: ["Equity negotiation support", "Employer branding", "Founding team assembly"]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Comprehensive talent solutions designed to align your workforce with your strategic business objectives.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col h-full hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="text-accent mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-grow">{service.desc}</p>
              
              <ul className="space-y-2 mb-8">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="text-sm text-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full mt-auto" asChild>
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
