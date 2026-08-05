import { useEffect, useRef } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Settings,
  Users,
  Building2,
  Cookie,
  Globe,
  Share2,
  Lock,
  Clock,
  UserCheck,
  ExternalLink,
  Baby,
  RefreshCw,
  Mail,
  ChevronRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "information-we-collect", label: "Information We Collect", icon: Database },
  { id: "how-we-use", label: "How We Use Your Information", icon: Settings },
  { id: "recruitment", label: "Recruitment Services", icon: Users },
  { id: "employer", label: "Employer Information", icon: Building2 },
  { id: "cookies", label: "Cookies", icon: Cookie },
  { id: "third-party", label: "Third-Party Services", icon: Globe },
  { id: "information-sharing", label: "Information Sharing", icon: Share2 },
  { id: "data-security", label: "Data Security", icon: Lock },
  { id: "data-retention", label: "Data Retention", icon: Clock },
  { id: "your-rights", label: "Your Rights", icon: UserCheck },
  { id: "external-links", label: "External Links", icon: ExternalLink },
  { id: "childrens-privacy", label: "Children's Privacy", icon: Baby },
  { id: "changes", label: "Changes to this Policy", icon: RefreshCw },
  { id: "contact", label: "Contact Us", icon: Mail },
];

function SectionCard({
  id,
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-sm md:text-base">
        {children}
      </div>
    </motion.div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  usePageTitle("Privacy Policy | NexZenta");

  const tocRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll for TOC links
  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Highlight active TOC item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = tocRef.current?.querySelector(`[href="#${entry.target.id}"]`);
          if (link) {
            link.classList.toggle("text-primary", entry.isIntersecting);
            link.classList.toggle("font-medium", entry.isIntersecting);
            link.classList.toggle("text-muted-foreground", !entry.isIntersecting);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b border-border py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Privacy Policy</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                <span className="font-medium text-foreground">Effective Date:</span> 04 August 2026
                &nbsp;·&nbsp;
                <span className="font-medium text-foreground">Last Updated:</span> 04 August 2026
              </p>
            </div>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl text-sm md:text-base">
            At NexZenta, we value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose and safeguard
            your information whenever you visit our website, contact us or use any of our services.
            By using our website, you agree to the practices described in this Privacy Policy.
          </p>

          <div className="mt-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex gap-10 items-start">
          {/* Table of Contents — desktop sticky sidebar */}
          <aside
            ref={tocRef}
            className="hidden lg:block w-60 shrink-0 sticky top-24 self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Contents
            </p>
            <nav className="space-y-0.5">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleTocClick(e, id)}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded-lg hover:bg-primary/5 truncate"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Sections */}
          <div className="flex-1 min-w-0 space-y-5">
            <SectionCard id="information-we-collect" icon={Database} title="Information We Collect" delay={0}>
              <p>Depending on how you interact with NexZenta, we may collect:</p>
              <BulletList
                items={[
                  "Full Name",
                  "Email Address",
                  "Phone Number",
                  "Company Name",
                  "Job Title",
                  "Resume or CV",
                  "Hiring Requirements",
                  "Employment Information",
                  "Business Enquiries",
                  "Partnership Requests",
                  "Messages submitted through our contact forms",
                  "Any information voluntarily provided by you",
                ]}
              />
              <p className="mt-3">We may also automatically collect:</p>
              <BulletList
                items={[
                  "IP Address",
                  "Browser Information",
                  "Device Information",
                  "Cookies",
                  "Website Usage Analytics",
                  "Pages Visited",
                  "Referral Sources",
                ]}
              />
            </SectionCard>

            <SectionCard id="how-we-use" icon={Settings} title="How We Use Your Information" delay={0.05}>
              <p>We use your information to:</p>
              <BulletList
                items={[
                  "Respond to enquiries",
                  "Provide recruitment services",
                  "Connect employers with suitable candidates",
                  "Process job applications",
                  "Contact prospective clients",
                  "Discuss partnership opportunities",
                  "Improve our website and services",
                  "Send service-related communications",
                  "Provide customer support",
                  "Maintain security",
                  "Comply with applicable laws",
                ]}
              />
            </SectionCard>

            <SectionCard id="recruitment" icon={Users} title="Recruitment Services" delay={0.05}>
              <p>
                Candidates may voluntarily submit resumes, employment history, skills and other
                professional information.
              </p>
              <p>
                This information is used solely for recruitment purposes, evaluating job opportunities
                and matching candidates with suitable employers.
              </p>
            </SectionCard>

            <SectionCard id="employer" icon={Building2} title="Employer Information" delay={0.05}>
              <p>
                Organisations contacting NexZenta may provide hiring requirements and business
                information.
              </p>
              <p>
                This information is used only to provide recruitment and talent acquisition services.
              </p>
            </SectionCard>

            <SectionCard id="cookies" icon={Cookie} title="Cookies" delay={0.05}>
              <p>
                Our website may use cookies and similar technologies to improve user experience,
                analyse website traffic and enhance website performance.
              </p>
              <p>Users may disable cookies through their browser settings.</p>
            </SectionCard>

            <SectionCard id="third-party" icon={Globe} title="Third-Party Services" delay={0.05}>
              <p>We may use trusted third-party providers including:</p>
              <BulletList
                items={[
                  "Google Analytics",
                  "Meta Platforms",
                  "LinkedIn",
                  "Microsoft",
                  "Cloud Hosting Providers",
                  "CRM Platforms",
                  "Email Service Providers",
                ]}
              />
              <p className="mt-2">These providers have their own privacy policies.</p>
            </SectionCard>

            <SectionCard id="information-sharing" icon={Share2} title="Information Sharing" delay={0.05}>
              <p>NexZenta does not sell, rent or trade personal information.</p>
              <p className="mt-1">Information may be shared only:</p>
              <BulletList
                items={[
                  "With your consent",
                  "To provide requested services",
                  "With trusted service providers",
                  "When legally required",
                ]}
              />
            </SectionCard>

            <SectionCard id="data-security" icon={Lock} title="Data Security" delay={0.05}>
              <p>
                We implement reasonable technical and organisational safeguards to protect personal
                information against unauthorised access, alteration, disclosure or destruction.
              </p>
              <p>
                While we strive to protect your information, no online transmission can be guaranteed
                to be completely secure.
              </p>
            </SectionCard>

            <SectionCard id="data-retention" icon={Clock} title="Data Retention" delay={0.05}>
              <p>
                We retain personal information only for as long as necessary to provide services,
                fulfil legal obligations and maintain business records.
              </p>
            </SectionCard>

            <SectionCard id="your-rights" icon={UserCheck} title="Your Rights" delay={0.05}>
              <p>Subject to applicable laws, you may request to:</p>
              <BulletList
                items={[
                  "Access your personal information",
                  "Correct inaccurate information",
                  "Delete your information",
                  "Withdraw consent",
                  "Update your information",
                ]}
              />
              <p className="mt-2">To exercise these rights please contact us.</p>
            </SectionCard>

            <SectionCard id="external-links" icon={ExternalLink} title="External Links" delay={0.05}>
              <p>Our website may contain links to third-party websites.</p>
              <p>
                We are not responsible for the privacy practices of external websites.
              </p>
            </SectionCard>

            <SectionCard id="childrens-privacy" icon={Baby} title="Children's Privacy" delay={0.05}>
              <p>Our services are not intended for individuals under the age of 18.</p>
              <p>We do not knowingly collect personal information from children.</p>
            </SectionCard>

            <SectionCard id="changes" icon={RefreshCw} title="Changes to this Privacy Policy" delay={0.05}>
              <p>We may update this Privacy Policy from time to time.</p>
              <p>
                Changes will become effective immediately upon publication on this page.
              </p>
            </SectionCard>

            <SectionCard id="contact" icon={Mail} title="Contact Us" delay={0.05}>
              <p>
                For any privacy-related questions, please contact us using the details below.
              </p>
              <div className="mt-4 bg-primary/5 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-foreground">NexZenta</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href="mailto:talent@nexzenta.com"
                    className="text-primary hover:underline"
                  >
                    talent@nexzenta.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href="https://nexzenta.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    nexzenta.com
                  </a>
                </p>
              </div>
            </SectionCard>

            {/* Back to top / home */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Link href="/">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="gap-2 w-full sm:w-auto text-muted-foreground hover:text-foreground"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                ↑ Back to top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
