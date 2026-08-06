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
  Sparkles,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
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
      {display}
      {suffix}
    </span>
  );
}

// ─── Enhanced AI Dashboard Illustration ─────────────────────────────────────
function AIDashboardIllustration() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-[#C9A84C]/10 rounded-3xl blur-3xl scale-110 pointer-events-none" />

      {/* Main dashboard */}
      <div className="relative bg-gradient-to-br from-[#0d1f3c] to-[#0a1628] rounded-2xl border border-[#C9A84C]/25 shadow-2xl p-5 overflow-hidden">
        {/* inner glow accents */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A84C]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Window chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider">
            NexZenta AI · Talent Platform
          </span>
          <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* AI Match Score */}
        <div className="bg-[#0B1221]/80 backdrop-blur rounded-xl p-4 mb-3 border border-[#C9A84C]/15">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#C9A84C]/15 flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-[#C9A84C]" />
              </div>
              <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">AI Match Score</span>
            </div>
            <span className="text-[#C9A84C] font-bold text-sm">94%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C9A84C] via-yellow-400 to-[#C9A84C] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "94%" }}
              transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
            />
          </div>
          {/* Skill tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["React", "TypeScript", "Node.js", "AWS", "Leadership"].map((tag) => (
              <span key={tag} className="text-[9px] bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] px-2 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Candidate cards */}
        <div className="space-y-2 mb-3">
          {[
            { initials: "AM", name: "Arjun M.", role: "Senior SDE", match: "97%", status: "Screening", color: "from-[#C9A84C] to-yellow-600" },
            { initials: "PR", name: "Priya R.", role: "Product Lead", match: "91%", status: "Shortlisted", color: "from-blue-500 to-blue-700" },
            { initials: "RK", name: "Rahul K.", role: "DevOps Eng.", match: "88%", status: "Interview", color: "from-green-500 to-green-700" },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="flex items-center gap-3 bg-[#0B1221]/70 backdrop-blur rounded-lg px-3 py-2.5 border border-slate-700/50 hover:border-[#C9A84C]/30 transition-colors"
            >
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold">{c.name}</p>
                <p className="text-slate-400 text-[10px]">{c.role}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[#C9A84C] text-[11px] font-bold">{c.match}</p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  c.status === "Shortlisted" ? "bg-green-500/15 text-green-400" :
                  c.status === "Interview" ? "bg-blue-500/15 text-blue-400" :
                  "bg-slate-500/20 text-slate-400"
                }`}>{c.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analytics row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Roles Filled", value: "48", icon: <CheckCircle2 className="w-3 h-3" /> },
            { label: "Avg Days", value: "3", icon: <Clock className="w-3 h-3" /> },
            { label: "Satisfaction", value: "95%", icon: <TrendingUp className="w-3 h-3" /> },
          ].map((s) => (
            <div key={s.label} className="bg-[#0B1221]/70 rounded-lg p-2.5 border border-slate-700/50 text-center">
              <div className="flex items-center justify-center gap-1 text-[#C9A84C] mb-1">
                {s.icon}
                <span className="font-bold text-sm">{s.value}</span>
              </div>
              <p className="text-slate-500 text-[9px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge — 72 Hours */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        className="absolute -bottom-5 -left-6 bg-white/90 dark:bg-[#0d1f3c]/90 backdrop-blur-md border border-[#C9A84C]/30 rounded-2xl px-3.5 py-2.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-foreground leading-tight">72 Hours</p>
            <p className="text-[9px] text-muted-foreground">Avg Shortlisting</p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge — AI Verified */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
        className="absolute -top-5 -right-6 bg-white/90 dark:bg-[#0d1f3c]/90 backdrop-blur-md border border-[#C9A84C]/30 rounded-2xl px-3.5 py-2.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-foreground leading-tight">AI Verified</p>
            <p className="text-[9px] text-muted-foreground">1000+ Profiles</p>
          </div>
        </div>
      </motion.div>

      {/* Connection line (decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 50 50 Q 200 150 400 80"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    role: "HR Director",
    company: "SaaS Company",
    quote: "NexZenta's AI-matching reduced our screening time by 60%. Every shortlist they sent was directly relevant — no noise, just quality candidates ready to interview.",
    rating: 5,
  },
  {
    role: "Founder",
    company: "AI Startup",
    quote: "We filled three senior engineering roles in under two weeks. The combination of AI screening and expert recruiter judgment is exactly what a fast-moving startup needs.",
    rating: 5,
  },
  {
    role: "Talent Acquisition Lead",
    company: "FinTech Company",
    quote: "Their understanding of the FinTech talent market is unmatched. NexZenta delivered candidates with the right technical background and regulatory knowledge.",
    rating: 5,
  },
  {
    role: "Operations Head",
    company: "EdTech Company",
    quote: "From requirement briefing to offer accepted in 18 days. NexZenta brought speed and precision to our hiring process without sacrificing candidate quality.",
    rating: 5,
  },
  {
    role: "Engineering Manager",
    company: "Technology Company",
    quote: "We partnered with NexZenta for leadership hiring and they exceeded expectations. Their network and vetting process is genuinely best-in-class.",
    rating: 5,
  },
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45 }}
          className="relative bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-lg"
        >
          {/* glassmorphism inner highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          <div className="flex gap-1 mb-5">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
            ))}
          </div>
          <p className="text-foreground text-lg leading-relaxed mb-7 italic relative z-10">
            "{testimonials[current].quote}"
          </p>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-yellow-600 flex items-center justify-center font-bold text-[#0B1221] text-sm">
              {testimonials[current].role[0]}
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonials[current].role}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].company}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all hover:bg-[#C9A84C]/5"
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
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#C9A84C] w-8" : "bg-border w-2 hover:bg-[#C9A84C]/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all hover:bg-[#C9A84C]/5"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Fade-up variant ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  usePageTitle();

  return (
    <div className="flex flex-col min-h-screen pt-20 overflow-x-hidden">

      {/* ── 1. HERO ───────────────────────────────────── */}
      <section className="relative bg-background overflow-hidden py-28 md:py-36">
        {/* Reduced-opacity grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C08_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        {/* Radial gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,#C9A84C0a,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse,#C9A84C06,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.11 } } }}
              className="space-y-7"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-full px-4 py-1.5 text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered Trusted Talent Partner
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.1]"
              >
                Build High-Performing Teams with{" "}
                <span className="text-[#C9A84C]">AI-Powered Recruitment</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                NexZenta combines AI-driven candidate intelligence with expert recruiters to help startups and growing businesses hire faster, smarter, and with confidence.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 text-[15px] bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
                  asChild
                >
                  <Link href="/contact">
                    Hire Talent <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-[15px] border-border hover:border-[#C9A84C]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
                  asChild
                >
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                {[
                  { icon: <Bot className="w-3.5 h-3.5" />, label: "AI-Powered Matching" },
                  { icon: <Users className="w-3.5 h-3.5" />, label: "Expert Recruiters" },
                  { icon: <Zap className="w-3.5 h-3.5" />, label: "72-Hour Shortlisting" },
                  { icon: <Target className="w-3.5 h-3.5" />, label: "1000+ Pre-Screened Professionals" },
                ].map((badge) => (
                  <motion.span
                    key={badge.label}
                    whileHover={{ scale: 1.04, y: -1 }}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground bg-secondary border border-border hover:border-[#C9A84C]/40 hover:text-[#C9A84C] px-3 py-1.5 rounded-full transition-all cursor-default"
                  >
                    <span className="text-[#C9A84C]">{badge.icon}</span>
                    {badge.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — AI Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center py-8"
            >
              <AIDashboardIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ─────────────────────────────── */}
      <section className="py-12 bg-[#0B1221] border-y border-slate-800/80">
        <div className="container mx-auto px-4">
          <p className="text-center text-[11px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-8">
            Trusted Hiring Partner For
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { icon: <Rocket className="w-4 h-4" />, label: "Startups" },
              { icon: <Building2 className="w-4 h-4" />, label: "SMEs" },
              { icon: <Globe className="w-4 h-4" />, label: "SaaS" },
              { icon: <Brain className="w-4 h-4" />, label: "AI Companies" },
              { icon: <Cpu className="w-4 h-4" />, label: "Technology" },
              { icon: <GraduationCap className="w-4 h-4" />, label: "EdTech" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-slate-800/50 border border-slate-700/60 hover:border-[#C9A84C]/30 rounded-full px-5 py-2.5 transition-colors cursor-default"
              >
                <span className="text-[#C9A84C]">{icon}</span>
                <span className="text-slate-200 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY CHOOSE NEXZENTA ───────────────────── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">Why NexZenta</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">Why Choose NexZenta</h2>
            <p className="text-muted-foreground text-lg">The smart way to hire — faster, better, and more reliably than traditional agencies.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { icon: <Brain className="w-6 h-6" />, title: "AI-Powered Talent Matching", desc: "Our AI scans thousands of profiles to surface only candidates who truly fit your role, culture, and skill requirements." },
              { icon: <UserCheck className="w-6 h-6" />, title: "Human Expert Screening", desc: "Every shortlisted candidate is assessed by seasoned recruiters for cultural alignment and real-world readiness." },
              { icon: <Zap className="w-6 h-6" />, title: "Faster Hiring", desc: "We deliver a qualified shortlist within 72 hours — so you spend less time searching and more time building your team." },
              { icon: <Target className="w-6 h-6" />, title: "Quality Over Quantity", desc: "We send 3–5 exceptional candidates instead of 50 average ones. Every profile is worth your time and attention." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group bg-card p-8 rounded-2xl border border-border hover:border-[#C9A84C]/40 hover:shadow-lg hover:shadow-[#C9A84C]/5 transition-all cursor-default"
              >
                <div className="w-13 h-13 w-12 h-12 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] group-hover:text-[#0B1221] transition-all duration-300 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-[17px] font-bold text-card-foreground mb-3 leading-tight">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. RESULTS ───────────────────────────────── */}
      <section className="py-28 bg-[#0B1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#C9A84C06,transparent)] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">Our Track Record</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-14">Results That Speak</h2>
            <p className="text-slate-400 text-lg">Numbers that reflect our commitment to excellence in every hire.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-16">
            {[
              { value: 1000, suffix: "+", label: "Pre-Screened Professionals", icon: <Users className="w-5 h-5" /> },
              { value: 72, suffix: " Hrs", label: "Average Shortlisting", icon: <Clock className="w-5 h-5" /> },
              { value: 95, suffix: "%", label: "Client Satisfaction", icon: <Award className="w-5 h-5" /> },
              { value: 12, suffix: "+", label: "Years Recruitment Expertise", icon: <Shield className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] mx-auto">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#C9A84C] tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 text-sm font-medium leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. AI + HUMAN ────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">The Advantage</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-14 leading-tight">AI + Human Recruitment</h2>
            <p className="text-muted-foreground text-lg">Machine precision meets human judgment — the best of both worlds.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 items-stretch">
            {/* AI column */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#0B1221] rounded-2xl p-8 border border-[#C9A84C]/20"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Handles</h3>
              </div>
              <ul className="space-y-4">
                {["Resume Parsing", "JD Matching", "Candidate Ranking", "Skill Extraction"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Central illustration */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="flex flex-col items-center justify-center bg-secondary rounded-2xl border border-border p-8"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#C9A84C]/10">
                  <Brain className="w-10 h-10 text-[#C9A84C]" />
                </div>
                {/* Connecting dots */}
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-sm font-semibold text-foreground mb-1">Combined Intelligence</p>
              <p className="text-center text-xs text-muted-foreground">AI + Human working in sync</p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
              <p className="mt-4 text-center text-xs text-[#C9A84C] font-medium uppercase tracking-wider">3× Better Results</p>
            </motion.div>

            {/* Human column */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="bg-secondary rounded-2xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Human Experts Handle</h3>
              </div>
              <ul className="space-y-4">
                {["Candidate Screening", "Culture Fit", "Interview Coordination", "Reference Checks"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. HIRING PROCESS ────────────────────────── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-14 leading-tight">Our Hiring Process</h2>
            <p className="text-muted-foreground text-lg">A proven 5-step framework from briefing to successful placement.</p>
          </motion.div>

          {/* Desktop horizontal */}
          <div className="hidden md:block mt-16">
            <div className="relative flex items-start justify-between gap-2">
              <div className="absolute top-6 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
              {[
                { n: "01", label: "Requirement", desc: "30-min briefing to understand your role, team culture, and ideal candidate profile." },
                { n: "02", label: "AI Matching", desc: "AI engine scans and ranks thousands of profiles against your exact criteria." },
                { n: "03", label: "Recruiter Evaluation", desc: "Human experts validate fit, communication skills, and motivations." },
                { n: "04", label: "Interview", desc: "Curated candidates presented, interview scheduling fully coordinated." },
                { n: "05", label: "Successful Hiring", desc: "Offer management, onboarding support, and placement guarantee included." },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  custom={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex-1 flex flex-col items-center text-center relative px-2"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C9A84C] text-[#0B1221] font-bold text-sm flex items-center justify-center mb-4 shadow-lg shadow-[#C9A84C]/30 z-10 relative">
                    {step.n}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm">{step.label}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden space-y-0 mt-10">
            {[
              { n: "01", label: "Requirement", desc: "30-min briefing on your role, culture, and ideal profile." },
              { n: "02", label: "AI Matching", desc: "AI scans and ranks thousands of profiles instantly." },
              { n: "03", label: "Recruiter Evaluation", desc: "Human experts validate fit, skills, and motivations." },
              { n: "04", label: "Interview", desc: "Candidates presented, interviews coordinated." },
              { n: "05", label: "Successful Hiring", desc: "Offer management, onboarding, and guarantee." },
            ].map((step, i, arr) => (
              <motion.div
                key={step.n}
                custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C] text-[#0B1221] font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                    {step.n}
                  </div>
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-[#C9A84C]/25 my-2" />}
                </div>
                <div className="pb-7">
                  <h4 className="font-semibold text-foreground mb-1">{step.label}</h4>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RECRUITMENT SOLUTIONS ─────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-14 leading-tight">Recruitment Solutions</h2>
            <p className="text-muted-foreground text-lg">Tailored hiring services for every stage of your company's growth.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[
              { icon: <Users className="w-6 h-6" />, title: "Permanent Hiring", desc: "End-to-end recruitment for full-time roles across all seniority levels and functions." },
              { icon: <Award className="w-6 h-6" />, title: "Leadership Hiring", desc: "Executive and C-suite search for transformative leadership that drives vision and growth." },
              { icon: <Clock className="w-6 h-6" />, title: "Contract Hiring", desc: "Flexible talent for short-term projects, scale-ups, and surge capacity requirements." },
              { icon: <BarChart3 className="w-6 h-6" />, title: "RPO", desc: "Recruitment Process Outsourcing — we manage your entire hiring function end to end." },
              { icon: <Brain className="w-6 h-6" />, title: "AI Talent Intelligence", desc: "Data-driven insights on talent pools, competitor hiring, and prevailing market rates." },
              { icon: <Shield className="w-6 h-6" />, title: "HR Consulting", desc: "Strategic HR advisory to build scalable, repeatable hiring systems and processes." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-[#C9A84C]/40 hover:shadow-lg hover:shadow-[#C9A84C]/5 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] group-hover:text-[#0B1221] transition-all duration-300">
                  {s.icon}
                </div>
                <h3 className="text-[17px] font-bold text-card-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. INDUSTRIES ────────────────────────────── */}
      <section className="py-28 bg-[#0B1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,#C9A84C05,transparent)] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">Our Reach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-14 leading-tight">Industries We Serve</h2>
            <p className="text-slate-400 text-lg">Deep domain expertise across high-growth sectors.</p>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-3xl mx-auto mt-16">
            {[
              { icon: <Cpu className="w-5 h-5" />, label: "Technology" },
              { icon: <Globe className="w-5 h-5" />, label: "SaaS" },
              { icon: <GraduationCap className="w-5 h-5" />, label: "EdTech" },
              { icon: <Landmark className="w-5 h-5" />, label: "FinTech" },
              { icon: <Heart className="w-5 h-5" />, label: "HealthTech" },
              { icon: <ShoppingBag className="w-5 h-5" />, label: "Retail" },
              { icon: <Factory className="w-5 h-5" />, label: "Manufacturing" },
              { icon: <Brain className="w-5 h-5" />, label: "AI / ML" },
              { icon: <Rocket className="w-5 h-5" />, label: "Startups" },
            ].map((ind, i) => (
              <motion.div
                key={ind.label}
                custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-3 bg-slate-800/50 border border-slate-700/60 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5 rounded-xl p-4 text-center transition-all group cursor-default"
              >
                <span className="text-slate-400 group-hover:text-[#C9A84C] transition-colors">{ind.icon}</span>
                <span className="text-slate-300 text-[11px] font-medium leading-tight">{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. SUCCESS STORIES ───────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">Proven Outcomes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-14 leading-tight">Success Stories</h2>
            <p className="text-muted-foreground text-lg">Real, measurable results for real companies.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            {[
              {
                tag: "SaaS Startup · Engineering",
                headline: "20+ engineering roles filled in 30 days",
                stats: [
                  { label: "Reduction in Hiring Time", value: "45%" },
                  { label: "Roles Filled", value: "20+" },
                  { label: "Client Satisfaction", value: "100%" },
                ],
                quote: "NexZenta understood exactly what we needed and delivered within our aggressive timeline — every candidate was genuinely ready to contribute.",
              },
              {
                tag: "EdTech Unicorn · Leadership",
                headline: "VP Engineering hired in 14 days",
                stats: [
                  { label: "Better Candidate Quality", value: "60%" },
                  { label: "Time to Offer", value: "14 Days" },
                  { label: "1-Year Retention", value: "100%" },
                ],
                quote: "The quality NexZenta brought was exceptional — every candidate was interview-ready with exactly the leadership profile we were looking for.",
              },
            ].map((story, i) => (
              <motion.div
                key={story.tag}
                custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-2xl border border-border hover:border-[#C9A84C]/40 hover:shadow-lg hover:shadow-[#C9A84C]/5 p-8 transition-all"
              >
                <span className="inline-block text-[11px] font-bold text-[#C9A84C] uppercase tracking-wider bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-3 py-1 rounded-full mb-6">
                  {story.tag}
                </span>
                <h3 className="text-xl font-bold text-card-foreground mb-6 leading-tight">{story.headline}</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {story.stats.map((s) => (
                    <div key={s.label} className="text-center bg-secondary rounded-xl p-3 border border-border">
                      <p className="text-[#C9A84C] font-bold text-lg leading-tight">{s.value}</p>
                      <p className="text-muted-foreground text-[10px] mt-1 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic border-l-2 border-[#C9A84C] pl-4 leading-relaxed">
                  "{story.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS ─────────────────────────── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-18"
          >
            <p className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold mb-3">Client Voices</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-14 leading-tight">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">Trusted by founders, HR leaders, and fast-growing teams across industries.</p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16"
          >
            <TestimonialsCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────── */}
      <section className="py-28 bg-[#0B1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,#C9A84C08,transparent)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <motion.p variants={fadeUp} className="text-[11px] text-[#C9A84C] uppercase tracking-[0.2em] font-semibold">
              Get Started Today
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to Build Your{" "}
              <span className="text-[#C9A84C]">Dream Team?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg">
              Let's help you hire smarter, faster and with confidence.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                className="h-14 px-10 text-base bg-[#C9A84C] hover:bg-[#b0923d] text-[#0B1221] font-semibold shadow-xl shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
                asChild
              >
                <Link href="/contact">
                  Schedule a Consultation <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-base border-slate-700 text-slate-200 hover:border-[#C9A84C]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
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
