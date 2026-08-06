import { useRef, useEffect, useState, useCallback } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Brain,
  Users,
  Zap,
  Target,
  CheckCircle2,
  Bot,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  Building2,
  Rocket,
  Globe,
  GraduationCap,
  Landmark,
  Heart,
  ShoppingBag,
  Factory,
  Cpu,
  BarChart3,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return controls.stop;
  }, [isInView, value, duration, motionValue]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── Hero AI Dashboard Illustration ─────────────────────────────────────────
function AIDashboardIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative bg-[#0d1f3c] rounded-2xl border border-[#C9A84C]/20 shadow-2xl p-5 overflow-hidden">
        {/* glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

        {/* top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider">
            NexZenta AI · Live
          </span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Active
          </span>
        </div>

        {/* match score */}
        <div className="bg-[#0B1221] rounded-xl p-4 mb-4 border border-[#C9A84C]/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              AI Match Score
            </span>
            <span className="text-[#C9A84C] font-bold text-sm">94%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C9A84C] to-yellow-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "94%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* candidate cards */}
        <div className="space-y-2 mb-4">
          {[
            { name: "Arjun M.", role: "Senior SDE", match: "97%", status: "Screening" },
            { name: "Priya R.", role: "Product Lead", match: "91%", status: "Shortlisted" },
            { name: "Rahul K.", role: "DevOps Eng.", match: "88%", status: "Interview" },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center gap-3 bg-[#0B1221] rounded-lg px-3 py-2.5 border border-slate-800"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-yellow-600 flex items-center justify-center text-[10px] font-bold text-[#0B1221] shrink-0">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold leading-tight">{c.name}</p>
                <p className="text-slate-400 text-[10px]">{c.role}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[#C9A84C] text-[11px] font-bold">{c.match}</p>
                <p className="text-slate-500 text-[9px]">{c.status}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Roles Filled", value: "48" },
            { label: "Avg Days", value: "3" },
            { label: "Satisfaction", value: "95%" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#0B1221] rounded-lg p-2 border border-slate-800 text-center"
            >
              <p className="text-[#C9A84C] font-bold text-sm">{s.value}</p>
              <p className="text-slate-500 text-[9px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -bottom-4 -left-4 bg-white dark:bg-[#0d1f3c] border border-[#C9A84C]/30 rounded-xl px-3 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#C9A84C]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground">72 Hours</p>
            <p className="text-[9px] text-muted-foreground">Avg Shortlisting</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute -top-4 -right-4 bg-white dark:bg-[#0d1f3c] border border-[#C9A84C]/30 rounded-xl px-3 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-foreground">AI Verified</p>
            <p className="text-[9px] text-muted-foreground">1000+ Profiles</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Testimonial Carousel ────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Rohan Mehta",
    title: "CTO, FinTech Startup",
    quote:
      "NexZenta filled three senior engineering roles in under two weeks. The candidate quality was exceptional — every shortlist was relevant and ready to interview.",
    rating: 5,
  },
  {
    name: "Sunita Kapoor",
    title: "HR Head, EdTech Unicorn",
    quote:
      "Their AI-driven matching saved us weeks of manual screening. We hired a VP of Engineering through NexZenta and couldn't be happier with the outcome.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    title: "Founder, SaaS Company",
    quote:
      "From requirement to offer in 18 days. NexZenta understands startups — fast, precise, and genuinely invested in finding the right cultural fit.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    title: "Talent Acquisition, AI Firm",
    quote:
      "We partnered with NexZenta for leadership hiring and they delivered beyond expectations. Their network in the AI/ML space is unmatched.",
    rating: 5,
  },
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#0d1f3c] rounded-2xl p-8 border border-border shadow-lg"
        >
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
            ))}
          </div>
          <p className="text-foreground text-lg leading-relaxed mb-6 italic">
            "{testimonials[current].quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-yellow-600 flex items-center justify-center font-bold text-[#0B1221]">
              {testimonials[current].name[0]}
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].title}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#C9A84C] w-6" : "bg-border"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Home() {
  usePageTitle();

  return (
    <div className="flex flex-col min-h-screen pt-20 overflow-x-hidden">
      {/* ── 1. HERO ── */}
      <section className="relative bg-background overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C0d_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C0d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-6"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5">
                <Bot className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">AI-Powered Recruitment</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
              >
                Build High-Performing Teams with{" "}
                <span className="text-[#C9A84C]">AI-Powered</span> Recruitment
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                NexZenta combines AI-driven candidate intelligence with expert recruiters to help startups and growing businesses hire faster, smarter, and with confidence.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="h-13 px-8 text-base bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold"
                  asChild
                >
                  <Link href="/contact">Hire Talent <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-base border-[#C9A84C]/40 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                  asChild
                >
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> No placement fee</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> 72-hr shortlist</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> 95% satisfaction</span>
              </motion.div>
            </motion.div>

            {/* Right — AI Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <AIDashboardIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="py-10 bg-[#0B1221] border-y border-slate-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest font-semibold mb-8">
            Trusted Hiring Partner For
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Startups", "SMEs", "SaaS", "AI Companies", "Technology", "EdTech"].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-full px-5 py-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                <span className="text-slate-200 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY CHOOSE NEXZENTA ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose NexZenta</h2>
            <p className="text-muted-foreground text-lg">The smart way to hire — faster, better, and more reliably than traditional agencies.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI-Powered Talent Matching",
                desc: "Our AI scans thousands of profiles to surface only the candidates who truly fit your role, culture, and skills bar.",
              },
              {
                icon: <UserCheck className="w-6 h-6" />,
                title: "Human Expert Screening",
                desc: "Every shortlisted candidate is assessed by seasoned recruiters for cultural alignment and real-world readiness.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Faster Hiring",
                desc: "We deliver a shortlist within 72 hours — so you spend less time searching and more time building.",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Quality Over Quantity",
                desc: "We send 3–5 exceptional candidates instead of 50 average ones. Every profile is worth your time.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-card p-7 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-[#C9A84C]/40 transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] group-hover:text-[#0B1221] transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. RESULTS ── */}
      <section className="py-24 bg-[#0B1221]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Results That Speak</h2>
            <p className="text-slate-400 text-lg">Numbers that reflect our commitment to excellence.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 1000, suffix: "+", label: "Pre-Screened Professionals", icon: <Users className="w-5 h-5" /> },
              { value: 72, suffix: " Hrs", label: "Average Shortlisting", icon: <Clock className="w-5 h-5" /> },
              { value: 95, suffix: "%", label: "Client Satisfaction", icon: <Award className="w-5 h-5" /> },
              { value: 12, suffix: "+", label: "Years Recruitment Expertise", icon: <Shield className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] mx-auto">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#C9A84C]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. AI + HUMAN HIRING ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AI + Human Hiring</h2>
            <p className="text-muted-foreground text-lg">The best of both worlds — machine precision meets human judgment.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* AI */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#0B1221] rounded-2xl p-8 border border-[#C9A84C]/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Handles</h3>
              </div>
              <ul className="space-y-3">
                {["Resume Parsing", "JD Matching", "Candidate Ranking", "Skill Extraction"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Human */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-secondary rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Human Experts Handle</h3>
              </div>
              <ul className="space-y-3">
                {["Candidate Screening", "Cultural Fit", "Interview Coordination", "Reference Checks"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. HIRING PROCESS ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Hiring Process</h2>
            <p className="text-muted-foreground text-lg">A proven 5-step process from briefing to placement.</p>
          </motion.div>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative flex items-start justify-between gap-4">
              {/* connecting line */}
              <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#C9A84C]/30 via-[#C9A84C] to-[#C9A84C]/30" />
              {[
                { step: "01", label: "Requirement", desc: "We understand your role, team, and culture in a 30-min briefing." },
                { step: "02", label: "AI Matching", desc: "Our AI engine scans and ranks thousands of profiles instantly." },
                { step: "03", label: "Recruiter Evaluation", desc: "Human experts validate fit, skills, and motivations." },
                { step: "04", label: "Interview", desc: "Curated candidates are presented and interviews coordinated." },
                { step: "05", label: "Successful Hiring", desc: "Offer management, onboarding support, and placement guarantee." },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex-1 flex flex-col items-center text-center relative"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C9A84C] text-[#0B1221] font-bold text-sm flex items-center justify-center mb-4 shadow-lg z-10">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{step.label}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-[130px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-0">
            {[
              { step: "01", label: "Requirement", desc: "We understand your role, team, and culture in a 30-min briefing." },
              { step: "02", label: "AI Matching", desc: "Our AI engine scans and ranks thousands of profiles instantly." },
              { step: "03", label: "Recruiter Evaluation", desc: "Human experts validate fit, skills, and motivations." },
              { step: "04", label: "Interview", desc: "Curated candidates are presented and interviews coordinated." },
              { step: "05", label: "Successful Hiring", desc: "Offer management, onboarding support, and placement guarantee." },
            ].map((step, i, arr) => (
              <motion.div
                key={step.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C] text-[#0B1221] font-bold text-sm flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 h-8 bg-[#C9A84C]/30 my-1" />}
                </div>
                <div className="pb-6">
                  <h4 className="font-semibold text-foreground mb-1">{step.label}</h4>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RECRUITMENT SOLUTIONS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Recruitment Solutions</h2>
            <p className="text-muted-foreground text-lg">Tailored hiring services for every stage of your growth.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Users className="w-6 h-6" />, title: "Permanent Hiring", desc: "End-to-end recruitment for full-time roles across all seniority levels." },
              { icon: <Award className="w-6 h-6" />, title: "Leadership Hiring", desc: "Executive and C-suite search for transformative leadership." },
              { icon: <Clock className="w-6 h-6" />, title: "Contract Hiring", desc: "Flexible talent for short-term projects, scale-ups, and surge capacity." },
              { icon: <BarChart3 className="w-6 h-6" />, title: "RPO", desc: "Recruitment Process Outsourcing — we manage your entire hiring function." },
              { icon: <Brain className="w-6 h-6" />, title: "AI Talent Intelligence", desc: "Data-driven insights on talent pools, competitor hiring, and market rates." },
              { icon: <Shield className="w-6 h-6" />, title: "HR Consulting", desc: "Strategic HR advisory to build scalable hiring systems and processes." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card rounded-2xl p-7 border border-border hover:border-[#C9A84C]/40 hover:shadow-md transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] group-hover:text-[#0B1221] transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. INDUSTRIES ── */}
      <section className="py-24 bg-[#0B1221]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-slate-400 text-lg">Deep domain expertise across high-growth sectors.</p>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Cpu className="w-6 h-6" />, label: "Technology" },
              { icon: <Globe className="w-6 h-6" />, label: "SaaS" },
              { icon: <GraduationCap className="w-6 h-6" />, label: "EdTech" },
              { icon: <Landmark className="w-6 h-6" />, label: "FinTech" },
              { icon: <Heart className="w-6 h-6" />, label: "HealthTech" },
              { icon: <ShoppingBag className="w-6 h-6" />, label: "Retail" },
              { icon: <Factory className="w-6 h-6" />, label: "Manufacturing" },
              { icon: <Brain className="w-6 h-6" />, label: "AI / ML" },
              { icon: <Rocket className="w-6 h-6" />, label: "Startups" },
            ].map((ind, i) => (
              <motion.div
                key={ind.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center gap-3 bg-slate-800/60 border border-slate-700 hover:border-[#C9A84C]/50 rounded-xl p-4 text-center transition-colors group cursor-default"
              >
                <div className="text-slate-400 group-hover:text-[#C9A84C] transition-colors">{ind.icon}</div>
                <span className="text-slate-300 text-xs font-medium leading-tight">{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. SUCCESS STORIES ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-muted-foreground text-lg">Real results for real companies.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                tag: "SaaS Startup · Engineering",
                headline: "20+ engineering roles filled in 30 days",
                stats: [
                  { label: "Faster Hiring", value: "45%" },
                  { label: "Roles Filled", value: "20+" },
                  { label: "Satisfaction", value: "100%" },
                ],
                quote: "NexZenta understood exactly what we needed and delivered within our aggressive timeline.",
              },
              {
                tag: "EdTech Unicorn · Leadership",
                headline: "VP of Engineering hired in 14 days",
                stats: [
                  { label: "Candidate Quality", value: "+60%" },
                  { label: "Time to Offer", value: "14 days" },
                  { label: "Retention (1yr)", value: "100%" },
                ],
                quote: "The quality of candidates NexZenta brought was exceptional — every one was interview-ready.",
              },
            ].map((story, i) => (
              <motion.div
                key={story.tag}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-2xl border border-border p-8 hover:border-[#C9A84C]/40 hover:shadow-md transition-all"
              >
                <span className="inline-block text-xs font-semibold text-[#C9A84C] uppercase tracking-wider bg-[#C9A84C]/10 px-3 py-1 rounded-full mb-5">
                  {story.tag}
                </span>
                <h3 className="text-xl font-bold text-card-foreground mb-6">{story.headline}</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {story.stats.map((s) => (
                    <div key={s.label} className="text-center bg-secondary rounded-xl p-3">
                      <p className="text-[#C9A84C] font-bold text-lg">{s.value}</p>
                      <p className="text-muted-foreground text-[11px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic border-l-2 border-[#C9A84C] pl-4">
                  "{story.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">Trusted by founders, HR leaders, and fast-growing teams.</p>
          </motion.div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── 11. FINAL CTA ── */}
      <section className="py-24 bg-[#0B1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#C9A84C08,transparent)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to Build Your{" "}
              <span className="text-[#C9A84C]">Dream Team?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg">
              Partner with NexZenta and hire faster, smarter, and with complete confidence.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-10 text-base bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold"
                asChild
              >
                <Link href="/contact">Schedule a Consultation <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-base border-slate-600 text-slate-200 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                asChild
              >
                <Link href="/contact">Start Hiring Today</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
