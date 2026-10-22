import { useEffect, useState } from "react";
import { useSubmitAcademyEnquiry, type AcademyEnquiryInput } from "@workspace/api-client-react";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Compass,
  FileCheck2,
  GraduationCap,
  Loader2,
  Mail,
  MonitorPlay,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WandSparkles,
} from "lucide-react";

type EnquiryType = AcademyEnquiryInput["enquiryType"];
type CourseInterest = NonNullable<AcademyEnquiryInput["courseInterest"]>;

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType;
  courseInterest: CourseInterest | "";
  company: string;
  teamSize: string;
  trainingNeeds: string;
  linkedinProfile: string;
  expertise: string;
  teachingExperience: string;
  privacyConsent: boolean;
  website: string;
}

const initialForm: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  enquiryType: "individual",
  courseInterest: "ai-hr",
  company: "",
  teamSize: "",
  trainingNeeds: "",
  linkedinProfile: "",
  expertise: "",
  teachingExperience: "",
  privacyConsent: false,
  website: "",
};

const courseOptions: { value: CourseInterest; label: string }[] = [
  { value: "ai-hr", label: "AI in HR & Talent Acquisition" },
  { value: "project-management", label: "AI for Project Management" },
  { value: "business-automation", label: "AI Automation for Business" },
];

const enquiryOptions: { value: EnquiryType; title: string; description: string; icon: typeof GraduationCap }[] = [
  { value: "individual", title: "Individual learner", description: "Build practical skills for your next step.", icon: GraduationCap },
  { value: "corporate", title: "Corporate training", description: "Bring applied AI learning to your team.", icon: UsersRound },
  { value: "trainer", title: "Trainer application", description: "Share your expertise with our learners.", icon: MonitorPlay },
];

const benefits = [
  { icon: WandSparkles, title: "Learn by doing", text: "Work through realistic tasks and guided exercises—not just slides and theory." },
  { icon: UsersRound, title: "Instructor-led throughout", text: "Ask questions, compare approaches, and learn alongside a focused cohort." },
  { icon: Compass, title: "Grounded in real work", text: "Connect AI capabilities to the decisions, workflows, and responsibilities you already own." },
  { icon: FileCheck2, title: "Leave with a next step", text: "Take away clear methods and practical ideas you can continue applying after class." },
];

export default function AiAcademy() {
  usePageTitle("AI Academy");
  const [form, setForm] = useState<FormValues>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const submitEnquiry = useSubmitAcademyEnquiry();

  useEffect(() => {
    const description = "Build practical AI capability with NexZenta AI Academy. Explore instructor-led courses for individuals, corporate teams, and prospective trainers.";
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousContent = existing?.content;
    const meta = existing ?? document.createElement("meta");
    meta.name = "description";
    meta.content = description;
    if (!existing) document.head.appendChild(meta);
    return () => {
      if (previousContent !== undefined) meta.content = previousContent;
      else meta.remove();
    };
  }, []);

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: AcademyEnquiryInput = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      enquiryType: form.enquiryType,
      privacyConsent: form.privacyConsent,
      ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
      ...(form.website.trim() ? { website: form.website.trim() } : {}),
      ...(form.enquiryType === "individual" && form.courseInterest
        ? { courseInterest: form.courseInterest }
        : {}),
      ...(form.enquiryType === "corporate"
        ? {
            ...(form.courseInterest ? { courseInterest: form.courseInterest } : {}),
            ...(form.company.trim() ? { company: form.company.trim() } : {}),
            ...(form.teamSize ? { teamSize: form.teamSize } : {}),
            ...(form.trainingNeeds.trim() ? { trainingNeeds: form.trainingNeeds.trim() } : {}),
          }
        : {}),
      ...(form.enquiryType === "trainer"
        ? {
            ...(form.linkedinProfile.trim() ? { linkedinProfile: form.linkedinProfile.trim() } : {}),
            ...(form.expertise.trim() ? { expertise: form.expertise.trim() } : {}),
            ...(form.teachingExperience.trim() ? { teachingExperience: form.teachingExperience.trim() } : {}),
          }
        : {}),
    };

    submitEnquiry.mutate(
      { data: payload },
      {
        onSuccess: () => {
          setForm(initialForm);
          setSubmitted(true);
        },
      },
    );
  };

  return (
    <div className="min-h-[100dvh] bg-[#f7f5f0] text-[#191916]">
      <section className="relative isolate overflow-hidden bg-[#171714] text-[#f8f6f0]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -right-40 -top-44 h-[33rem] w-[33rem] rounded-full border border-[#c8a95d]/25" />
          <div className="absolute -right-20 -top-24 h-[25rem] w-[25rem] rounded-full border border-[#c8a95d]/20" />
          <div className="absolute right-10 top-8 h-[17rem] w-[17rem] rounded-full border border-[#c8a95d]/15" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#11110f] to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[#d9bd75]">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> NexZenta AI Academy
              </p>
              <h1 className="max-w-[20ch] text-4xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-6xl lg:text-[4.35rem]">
                Practical AI Skills. Real-World Application.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                Practical, instructor-led learning for people and teams ready to move from AI curiosity to confident application.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#courses"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#d1b263] px-6 text-sm font-semibold text-[#191916] transition-colors hover:bg-[#e1c67d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d88f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171714]"
                  data-testid="link-explore-courses"
                >
                  Explore Courses <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#enquire"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-6 text-sm font-medium text-white transition-colors hover:border-white/45 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d88f]"
                  data-testid="link-enquire-now"
                >
                  Enquire Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/65">
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#d1b263]" aria-hidden="true" /> Live, instructor-led sessions</span>
                <span className="inline-flex items-center gap-2"><Network className="h-4 w-4 text-[#d1b263]" aria-hidden="true" /> Skills built around real work</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative aspect-[1.08] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#24231e] p-6 sm:p-8">
                <div className="absolute inset-0 opacity-70" aria-hidden="true">
                  <div className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#d1b263]/10 blur-3xl" />
                  <div className="absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-[#b89447]/10 blur-3xl" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-[.18em] text-white/50">Featured programme</span>
                      <h2 className="mt-3 max-w-[15ch] text-2xl font-semibold leading-tight tracking-[-.03em] sm:text-3xl">AI in HR &amp; Talent Acquisition</h2>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d1b263]/35 text-[#d1b263]">
                      <WandSparkles className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <div className="mb-5 flex items-center gap-2 text-sm text-[#e4cc8e]">
                      <span className="h-px w-8 bg-[#d1b263]" /> Three live sessions · Two hours each
                    </div>
                    <div className="space-y-3 border-t border-white/15 pt-5">
                      {["Explore practical AI use across the talent lifecycle", "Improve prompts for clearer, more useful outputs", "Apply responsible judgement to HR workflows"].map((item) => (
                        <p key={item} className="flex items-start gap-3 text-sm leading-6 text-white/75">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#d1b263]" aria-hidden="true" /> {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 right-5 rounded-lg border border-[#e7dfcc] bg-[#f7f5f0] px-4 py-3 text-xs font-medium text-[#49453a] shadow-xl sm:-right-5">
                Built for application, not abstraction
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12" aria-labelledby="courses-heading">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.19em] text-[#9b7a32]">The learning pathway</p>
            <h2 id="courses-heading" className="mt-3 max-w-xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Start with a real challenge.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#68665f]">Focused learning for the moments where thoughtful AI use can make a meaningful difference.</p>
        </div>

        <article className="overflow-hidden rounded-2xl border border-[#e3ded2] bg-[#fffefa] shadow-[0_12px_40px_rgba(32,29,20,.06)]">
          <div className="grid lg:grid-cols-[.85fr_1.15fr]">
            <div className="bg-[#eae3d3] p-7 sm:p-10 lg:p-12">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#1c1b17] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-[#e5ca80]">Featured course</span>
                <span className="text-xs font-medium text-[#5f5847]">01 / 03</span>
              </div>
              <h3 className="mt-9 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-[2.5rem]">AI in HR &amp; Talent Acquisition</h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#605d55]">A practical introduction to using AI thoughtfully across recruiting and people workflows.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-[#cfc5ad] px-3 py-2 text-xs font-medium text-[#38362f]"><Clock3 className="h-4 w-4" aria-hidden="true" /> 3 live sessions</span>
                <span className="inline-flex items-center gap-2 rounded-md border border-[#cfc5ad] px-3 py-2 text-xs font-medium text-[#38362f]">2 hours each</span>
              </div>
              <a href="#enquire" onClick={() => setField("courseInterest", "ai-hr")} className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1b1a17] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#38352d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a98942] focus-visible:ring-offset-2" data-testid="link-enquire-featured">
                Enquire about this course <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[.13em] text-[#76633a]">What you’ll be able to do</h4>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    "Identify useful AI opportunities across talent acquisition and HR.",
                    "Write and refine prompts for clearer, more relevant outputs.",
                    "Use AI to support role research, job content, and candidate communication.",
                    "Recognise risks, review outputs, and keep human judgement in the loop.",
                  ].map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-6 text-[#4d4b44]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#a48745]" aria-hidden="true" /> {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-[#e8e4db] pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[.13em] text-[#76633a]">Curriculum highlights</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "AI foundations", "Capabilities, limits, and responsible use."],
                    ["02", "Talent workflows", "Practical use cases and guided exercises."],
                    ["03", "Apply with care", "Review, refine, and bring it to your work."],
                  ].map(([number, title, detail]) => (
                    <div key={number} className="rounded-lg bg-[#f6f4ef] p-4">
                      <span className="text-[11px] font-semibold tracking-[.14em] text-[#9b7a32]">{number}</span>
                      <p className="mt-2 text-sm font-semibold">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#706e67]">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            { number: "02", title: "AI for Project Management", course: "project-management" as const, text: "Explore where AI can support planning, coordination, and project communication." },
            { number: "03", title: "AI Automation for Business", course: "business-automation" as const, text: "Discover practical ways to identify and improve repeatable business workflows." },
          ].map((course) => (
            <article key={course.number} className="flex flex-col justify-between gap-7 rounded-xl border border-[#e3ded2] bg-[#fbfaf7] p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="flex gap-4">
                <span className="pt-1 text-xs font-semibold tracking-widest text-[#a48745]">{course.number}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-.02em]">{course.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[#68665f]">{course.text}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end">
                <span className="rounded-full border border-[#d6c28f] bg-[#f3eedf] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-[#705a24]">Coming soon</span>
                <button type="button" onClick={() => { setField("courseInterest", course.course); document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-1 text-xs font-semibold text-[#49453a] hover:text-[#92732e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a98942]" data-testid={`button-enquire-${course.course}`}>
                  Register your interest <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-we-teach" className="border-y border-[#e7e1d5] bg-[#eeece5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-12">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[.19em] text-[#9b7a32]">The NexZenta approach</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">Useful learning. Thoughtful application.</h2>
            <p className="mt-5 text-sm leading-7 text-[#66635b]">AI is most valuable when people know where it helps, where it does not, and how to apply it responsibly. Our sessions are designed around that judgement.</p>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#191916] text-[#d8bd75]"><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6c6961]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-10">
            <p className="text-xs font-semibold uppercase tracking-[.19em] text-[#9b7a32]">Take the next step</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">Tell us what you’d like to learn.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#68665f]">Share a few details and the right NexZenta team member will follow up about your enquiry.</p>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#e0dacd] bg-[#fbfaf7] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#92732e]" aria-hidden="true" />
              <p className="text-xs leading-5 text-[#66635b]">We’ll use your details only to respond to this enquiry. Read our <a className="font-semibold text-[#63501f] underline underline-offset-2 hover:text-[#94762f]" href="/privacy-policy" data-testid="link-privacy-intro">Privacy Policy</a>.</p>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-[#67645d]"><Mail className="h-4 w-4 text-[#a48745]" aria-hidden="true" /> Prefer email? <a className="font-medium text-[#322f26] underline underline-offset-2" href="/contact" data-testid="link-contact-page">Contact our team</a>.</p>
          </div>

          <div className="rounded-2xl border border-[#e3ded2] bg-[#fffefa] p-5 shadow-[0_14px_48px_rgba(32,29,20,.06)] sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center px-4 text-center" role="status" data-testid="status-enquiry-success">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f0ead8] text-[#806521]"><CheckCircle2 className="h-7 w-7" aria-hidden="true" /></span>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em]">Enquiry received</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#6b6860]">Thank you for your interest in NexZenta AI Academy. Our team will be in touch.</p>
                <Button type="button" variant="outline" className="mt-7 border-[#d5cebd]" onClick={() => setSubmitted(false)} data-testid="button-send-another-enquiry">Send another enquiry</Button>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h3 className="text-xl font-semibold tracking-[-.025em]">Your enquiry</h3>
                  <p className="mt-1 text-sm text-[#77746c]">Fields marked with <span className="text-[#8b6821]">*</span> are required.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium">I’m interested in <span className="text-[#8b6821]">*</span></legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {enquiryOptions.map(({ value, title, description, icon: Icon }) => (
                        <label key={value} className={`relative flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors focus-within:ring-2 focus-within:ring-[#aa8e4a] ${form.enquiryType === value ? "border-[#b69a53] bg-[#f5f0e2]" : "border-[#e5e0d5] hover:border-[#c7b787]"}`}>
                          <input className="sr-only" type="radio" name="enquiryType" value={value} checked={form.enquiryType === value} onChange={() => setField("enquiryType", value)} data-testid={`input-enquiry-${value}`} />
                          <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${form.enquiryType === value ? "text-[#92732e]" : "text-[#858178]"}`} aria-hidden="true" />
                          <span>
                            <span className="block text-xs font-semibold leading-5">{title}</span>
                            <span className="mt-0.5 block text-[11px] leading-4 text-[#77746c]">{description}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="academy-name">Full name <span className="text-[#8b6821]">*</span></Label>
                      <Input id="academy-name" autoComplete="name" maxLength={120} required value={form.fullName} onChange={(event) => setField("fullName", event.target.value)} placeholder="Your full name" data-testid="input-full-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academy-email">Work or personal email <span className="text-[#8b6821]">*</span></Label>
                      <Input id="academy-email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={(event) => setField("email", event.target.value)} placeholder="you@example.com" data-testid="input-email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academy-phone">Phone number <span className="font-normal text-[#77746c]">(optional)</span></Label>
                    <Input id="academy-phone" type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={(event) => setField("phone", event.target.value)} placeholder="Include country code if applicable" data-testid="input-phone" />
                  </div>

                  {(form.enquiryType === "individual" || form.enquiryType === "corporate") && (
                    <div className="space-y-2">
                      <Label htmlFor="academy-course">Course of interest <span className="font-normal text-[#77746c]">(optional)</span></Label>
                      <select id="academy-course" value={form.courseInterest} onChange={(event) => setField("courseInterest", event.target.value as CourseInterest | "")} className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aa8e4a] focus-visible:ring-offset-2" data-testid="select-course-interest">
                        <option value="">I’m exploring the academy</option>
                        {courseOptions.map((course) => <option key={course.value} value={course.value}>{course.label}{course.value !== "ai-hr" ? " — Coming soon" : ""}</option>)}
                      </select>
                    </div>
                  )}

                  {form.enquiryType === "corporate" && (
                    <div className="space-y-5 border-t border-[#e8e4db] pt-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="academy-company">Company <span className="font-normal text-[#77746c]">(optional)</span></Label>
                          <Input id="academy-company" autoComplete="organization" maxLength={160} value={form.company} onChange={(event) => setField("company", event.target.value)} placeholder="Organisation name" data-testid="input-company" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="academy-team-size">Team size <span className="font-normal text-[#77746c]">(optional)</span></Label>
                          <Input id="academy-team-size" maxLength={80} value={form.teamSize} onChange={(event) => setField("teamSize", event.target.value)} placeholder="Approximate number of learners" data-testid="input-team-size" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="academy-training-needs">What would you like your team to be able to do? <span className="font-normal text-[#77746c]">(optional)</span></Label>
                        <Textarea id="academy-training-needs" maxLength={3000} rows={4} value={form.trainingNeeds} onChange={(event) => setField("trainingNeeds", event.target.value)} placeholder="Share the context, goals, or learning needs you have in mind." data-testid="textarea-training-needs" />
                      </div>
                    </div>
                  )}

                  {form.enquiryType === "trainer" && (
                    <div className="space-y-5 border-t border-[#e8e4db] pt-5">
                      <p className="text-sm leading-6 text-[#6c6961]">Tell us about your background and the perspective you could bring to practical AI learning.</p>
                      <div className="space-y-2">
                        <Label htmlFor="academy-linkedin">LinkedIn profile <span className="text-[#8b6821]">*</span></Label>
                        <Input id="academy-linkedin" type="url" maxLength={500} required value={form.linkedinProfile} onChange={(event) => setField("linkedinProfile", event.target.value)} placeholder="https://www.linkedin.com/in/…" data-testid="input-linkedin-profile" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="academy-expertise">Areas of expertise <span className="font-normal text-[#77746c]">(optional)</span></Label>
                        <Input id="academy-expertise" maxLength={300} value={form.expertise} onChange={(event) => setField("expertise", event.target.value)} placeholder="For example, HR, automation, or applied AI" data-testid="input-expertise" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="academy-teaching-experience">Teaching or facilitation experience <span className="font-normal text-[#77746c]">(optional)</span></Label>
                        <Textarea id="academy-teaching-experience" maxLength={2000} rows={4} value={form.teachingExperience} onChange={(event) => setField("teachingExperience", event.target.value)} placeholder="Briefly describe your experience helping others learn." data-testid="textarea-teaching-experience" />
                      </div>
                    </div>
                  )}

                  <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <Label htmlFor="academy-website">Website</Label>
                    <Input id="academy-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setField("website", event.target.value)} data-testid="input-website-honeypot" />
                  </div>

                  <div className="rounded-lg border border-[#e8e4db] bg-[#f8f7f3] p-4">
                    <div className="flex items-start gap-3">
                      <input id="academy-privacy" type="checkbox" required checked={form.privacyConsent} onChange={(event) => setField("privacyConsent", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#8c702f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aa8e4a] focus-visible:ring-offset-2" data-testid="input-privacy-consent" />
                      <Label htmlFor="academy-privacy" className="cursor-pointer text-xs font-normal leading-5 text-[#625f58]">
                        I agree that NexZenta may use the information I’ve provided to respond to this enquiry, in accordance with its <a href="/privacy-policy" className="font-semibold text-[#5c4a20] underline underline-offset-2 hover:text-[#92732e]" data-testid="link-privacy-consent">Privacy Policy</a>. <span className="text-[#8b6821]">*</span>
                      </Label>
                    </div>
                  </div>

                  {submitEnquiry.isError && (
                    <p className="rounded-md border border-[#e8c9c2] bg-[#fbf1ef] px-4 py-3 text-sm leading-5 text-[#873c2e]" role="alert" data-testid="status-enquiry-error">
                      We couldn’t send your enquiry just now. Please try again, or <a href="/contact" className="font-semibold underline underline-offset-2">contact our team</a>.
                    </p>
                  )}

                  <Button type="submit" className="h-12 w-full rounded-md bg-[#1b1a17] text-sm font-semibold text-white transition-colors hover:bg-[#37342d] focus-visible:ring-[#aa8e4a]" disabled={submitEnquiry.isPending} data-testid="button-submit-enquiry">
                    {submitEnquiry.isPending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending enquiry…</> : <>Send enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
                  </Button>
                  <p className="text-center text-[11px] leading-5 text-[#817e76]">No obligation. Just a conversation about the right next step.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
