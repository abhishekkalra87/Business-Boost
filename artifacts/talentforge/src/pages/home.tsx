import { useEffect, useState, useRef } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, BrainCircuit, Users, Zap, Target, 
  Search, FileSearch, Building2, UserPlus, 
  CheckCircle2, Star, Monitor, Cloud, GraduationCap, 
  Coins, HeartPulse, ShoppingCart, Factory, Cpu, Rocket, 
  Quote, Award, Sparkles, BarChart, Settings, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CountUp = ({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const stats: { label: string; value: number; suffix?: string; prefix?: string }[] = [
  { label: "Pre-Screened Professionals", value: 1000, suffix: "+" },
  { label: "Average Shortlisting Time", value: 72, suffix: " Hours" },
  { label: "Client Satisfaction", value: 95, suffix: "%" },
  { label: "Years of Recruitment Expertise", value: 12, suffix: "+" }
];

const whyChoose = [
  {
    title: "AI-Powered Talent Matching",
    desc: "Advanced AI scans, analyses and matches the best candidates from our talent pool.",
    icon: BrainCircuit
  },
  {
    title: "Human Expert Screening",
    desc: "Every profile is evaluated by experienced recruiters for skills and cultural fit.",
    icon: Users
  },
  {
    title: "Faster Hiring",
    desc: "Receive high-quality shortlisted candidates in days, not weeks.",
    icon: Zap
  },
  {
    title: "Quality Over Quantity",
    desc: "We focus on the right match, not just the maximum resumes.",
    icon: Target
  }
];

const steps = [
  { title: "Understand Your Requirement", icon: Target },
  { title: "AI Candidate Matching", icon: BrainCircuit },
  { title: "Recruiter Evaluation", icon: UserPlus },
  { title: "Interview Coordination", icon: Search },
  { title: "Successful Hiring", icon: CheckCircle2 }
];

const solutions = [
  { title: "Permanent Hiring", icon: Briefcase, desc: "End-to-end permanent recruitment for all levels and functions." },
  { title: "Leadership Hiring", icon: Award, desc: "Executive search for CXO, leadership and niche positions." },
  { title: "Contract Hiring", icon: FileSearch, desc: "Skilled contract talent for short-term and project-based needs." },
  { title: "RPO Services", icon: Building2, desc: "Dedicated recruitment teams that act as an extension of your organisation." },
  { title: "AI Talent Intelligence", icon: BarChart, desc: "Market mapping, salary benchmarking and hiring insights to help you make better decisions." },
  { title: "HR Consulting", icon: Settings, desc: "Strategic HR advisory to build, scale and optimise your people function." }
];

const industries = [
  { name: "Technology", icon: Monitor },
  { name: "SaaS", icon: Cloud },
  { name: "EdTech", icon: GraduationCap },
  { name: "FinTech", icon: Coins },
  { name: "HealthTech", icon: HeartPulse },
  { name: "Retail", icon: ShoppingCart },
  { name: "Manufacturing", icon: Factory },
  { name: "AI/ML", icon: Cpu },
  { name: "Startups", icon: Rocket }
];

const testimonials = [
  {
    quote: "NexZenta understood our requirements perfectly and delivered high-quality candidates in a very short time.",
    author: "Founder",
    company: "EdTech Startup"
  },
  {
    quote: "Professional, responsive and reliable. They truly act as an extension of our HR team.",
    author: "HR Manager",
    company: "SaaS Company"
  }
];

export default function Home() {
  usePageTitle("AI-Powered Recruitment | NexZenta");

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* 1. Hero Section */}
      <section className="relative bg-[#0B1221] overflow-hidden pt-16 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/40 via-[#0B1221] to-[#0B1221] pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-center lg:text-left space-y-8 mx-auto lg:mx-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Build High-Performing Teams with <span className="text-accent block mt-2">AI-Powered Recruitment</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                NexZenta combines AI-driven candidate intelligence with expert recruiters to help startups and growing businesses hire faster, smarter, and with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button size="lg" variant="outline" className="h-14 px-8 text-white border-slate-600 bg-transparent hover:bg-white hover:text-[#0B1221] w-full sm:w-auto font-medium" asChild>
                  <Link href="/contact">Hire Talent</Link>
                </Button>
                <Button size="lg" className="h-14 px-8 bg-accent text-[#0B1221] hover:bg-accent/90 w-full sm:w-auto font-bold" asChild>
                  <Link href="/contact">Book Free Consultation <ArrowRight className="w-5 h-5 ml-2" /></Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg mx-auto lg:mr-0 lg:ml-auto"
            >
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-lg flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-accent" />
                    AI Match Score
                  </h3>
                  <div className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full font-bold uppercase tracking-wider">
                    Processing Top 5%
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Candidate 1 */}
                  <div className="bg-slate-800/90 rounded-xl p-4 flex items-center gap-4 border border-slate-600/50 shadow-lg relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl"></div>
                    <div className="h-12 w-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <span className="text-indigo-300 font-bold text-sm">RS</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-medium text-sm truncate">Rohan Sharma</h4>
                        <span className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-0.5 rounded">96%</span>
                      </div>
                      <p className="text-slate-400 text-xs mb-2">Full Stack Developer</p>
                      <div className="flex gap-2">
                         <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] rounded border border-slate-600/50">React</span>
                         <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] rounded border border-slate-600/50">Node.js</span>
                         <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] rounded border border-slate-600/50">AWS</span>
                      </div>
                    </div>
                  </div>

                  {/* Candidate 2 */}
                  <div className="bg-slate-800/60 rounded-xl p-4 flex items-center gap-4 border border-slate-700/50">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <span className="text-emerald-300 font-bold text-sm">NV</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white/90 font-medium text-sm truncate">Neha Verma</h4>
                        <span className="text-green-400/90 font-bold text-sm bg-green-400/10 px-2 py-0.5 rounded">92%</span>
                      </div>
                      <p className="text-slate-400 text-xs mb-2">UX/UI Designer</p>
                      <div className="flex gap-2">
                         <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] rounded border border-slate-600/50">Figma</span>
                         <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-[10px] rounded border border-slate-600/50">Prototyping</span>
                      </div>
                    </div>
                  </div>

                  {/* Candidate 3 */}
                  <div className="bg-slate-800/40 rounded-xl p-4 flex items-center gap-4 border border-slate-700/50 opacity-80">
                    <div className="h-12 w-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <span className="text-amber-300 font-bold text-sm">AM</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white/70 font-medium text-sm truncate">Arjun Mehta</h4>
                        <span className="text-green-400/70 font-bold text-sm bg-green-400/5 px-2 py-0.5 rounded">88%</span>
                      </div>
                      <p className="text-slate-500 text-xs mb-2">DevOps Engineer</p>
                      <div className="flex gap-2">
                         <span className="px-2 py-0.5 bg-slate-700/30 text-slate-400 text-[10px] rounded border border-slate-600/30">Docker</span>
                         <span className="px-2 py-0.5 bg-slate-700/30 text-slate-400 text-[10px] rounded border border-slate-600/30">CI/CD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating detail element */}
              <div className="absolute -right-6 top-16 bg-white rounded-xl p-4 shadow-xl border border-slate-100 hidden md:flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-[#0B1221]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Skills Match</p>
                  <p className="text-sm font-bold text-slate-900">Highly Relevant</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 pt-8 border-t border-slate-800/50"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-8">
              <p className="text-sm text-slate-400 font-medium whitespace-nowrap">Trusted Hiring Partner for</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['Startups', 'SMEs', 'EdTech', 'SaaS', 'AI Companies', 'Technology Teams'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/30 text-slate-300 text-xs font-medium tracking-wide whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Why Choose NexZenta */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Growing Companies Choose NexZenta</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {whyChoose.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className="p-8 rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
               >
                  <div className="w-14 h-14 bg-slate-50 text-[#0B1221] rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                     <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. Stats Counter Bar */}
      <section className="py-16 bg-[#0B1221] border-t border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-3"
              >
                <div className="text-4xl lg:text-5xl font-bold text-accent tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI + Human Hiring Split Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              AI Finds Talent. <span className="text-accent">Humans Find the Right Talent.</span>
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
            {/* AI Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-[#0B1221] p-10 md:p-14 lg:p-20 text-white relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <BrainCircuit className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold tracking-wide uppercase mb-10 border border-white/5">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-white">Powered by AI</span>
                </div>
                <ul className="space-y-6">
                  {[
                    "Resume Parsing & Analysis",
                    "Job Description Matching",
                    "Automated Candidate Ranking",
                    "Deep Skill Extraction",
                    "Real-time Market Insights"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                         <CheckCircle2 className="w-5 h-5 text-accent" />
                       </div>
                       <span className="text-lg font-medium text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Humans Right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 md:p-14 lg:p-20 relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Users className="w-64 h-64 text-[#0B1221]" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-bold tracking-wide uppercase mb-10 border border-slate-200">
                  <Users className="w-4 h-4 text-[#0B1221]" />
                  <span className="text-slate-800">Perfected by Humans</span>
                </div>
                <ul className="space-y-6">
                  {[
                    "In-depth Behavioural Screening",
                    "Cultural Fit Evaluation",
                    "Seamless Interview Coordination",
                    "Thorough Reference Checks",
                    "End-to-end Quality Assurance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                         <CheckCircle2 className="w-5 h-5 text-[#0B1221]" />
                       </div>
                       <span className="text-lg font-medium text-slate-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Center Brand Mark */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-32 h-32 rounded-full bg-[#0B1221] border-[10px] border-white shadow-2xl z-20">
              <span className="text-white font-bold text-2xl tracking-tight">Nex<span className="text-accent">Z</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How We Hire */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How We Hire</h2>
          </motion.div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-100 border-t-2 border-dashed border-slate-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-6 relative group-hover:border-accent transition-colors duration-300">
                     <step.icon className="w-10 h-10 text-slate-400 group-hover:text-accent transition-colors duration-300" />
                     <div className="absolute top-0 right-0 w-7 h-7 bg-[#0B1221] rounded-full text-white text-xs font-bold flex items-center justify-center shadow-md border-2 border-white group-hover:bg-accent transition-colors">
                       {i + 1}
                     </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-[15px] max-w-[150px] leading-snug">{step.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recruitment Solutions */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Recruitment Solutions</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {solutions.map((solution, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-slate-50 text-[#0B1221] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B1221] group-hover:text-white transition-colors duration-300">
                   <solution.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{solution.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries We Serve */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Industries We Serve</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg hover:border-accent/30 transition-all duration-300 group cursor-default"
              >
                <ind.icon className="w-10 h-10 text-slate-400 group-hover:text-accent mb-4 transition-colors duration-300" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-[#0B1221] transition-colors">{ind.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Results That Speak */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Results That Speak</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-bl-[120px] -z-10 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500"></div>
              <span className="px-4 py-1.5 bg-[#0B1221] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-8 inline-block shadow-sm">Startup</span>
              <div className="space-y-8">
                 <div>
                   <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">Role Needed</p>
                   <p className="font-bold text-slate-900 text-2xl">Backend Developer</p>
                 </div>
                 <div>
                   <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">The Challenge</p>
                   <p className="font-medium text-slate-700 text-lg">45 days to fill</p>
                 </div>
                 <div className="pt-8 border-t border-slate-100">
                   <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3">The Result</p>
                   <p className="font-bold text-[#0B1221] text-3xl">Position Closed in <span className="text-accent underline decoration-2 underline-offset-4">11 Days</span></p>
                 </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-bl-[120px] -z-10 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500"></div>
              <span className="px-4 py-1.5 bg-[#0B1221] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-8 inline-block shadow-sm">SME</span>
              <div className="space-y-8">
                 <div>
                   <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">Role Needed</p>
                   <p className="font-bold text-slate-900 text-2xl">Admissions Head</p>
                 </div>
                 <div>
                   <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">The Challenge</p>
                   <p className="font-medium text-slate-700 text-lg">Highly niche role</p>
                 </div>
                 <div className="pt-8 border-t border-slate-100">
                   <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3">The Result</p>
                   <p className="font-bold text-[#0B1221] text-3xl">Position Closed in <span className="text-accent underline decoration-2 underline-offset-4">6 Days</span></p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What Our Clients Say</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-slate-50 p-8 lg:p-12 rounded-3xl border border-slate-200 relative overflow-hidden"
              >
                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-slate-200/50 rotate-180 z-0 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex gap-1.5 text-accent mb-8">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg lg:text-xl text-slate-800 font-medium leading-relaxed mb-10">"{test.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0B1221] flex items-center justify-center text-white font-bold text-xl shadow-md">
                       {test.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{test.author}</h4>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{test.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-24 bg-[#0B1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C08_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Ready to Build Your Team?</h2>
              <p className="text-xl text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
                Let's discuss your hiring goals and deliver qualified candidates — fast.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 bg-accent text-[#0B1221] hover:bg-accent/90 w-full sm:w-auto font-bold text-base shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-shadow" asChild>
                <Link href="/contact">Schedule a Consultation <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-white border-slate-600 bg-transparent hover:bg-white hover:text-[#0B1221] w-full sm:w-auto font-bold text-base" asChild>
                <Link href="/contact">Start Hiring Today</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
