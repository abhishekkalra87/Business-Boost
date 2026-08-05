import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const NEXZENTA_KB: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "start", "greet"],
    reply: "Hello! 👋 I'm TalentBot, NexZenta's virtual assistant. I can help you learn about our recruitment & talent solutions, services, or how to get in touch. What would you like to know?",
  },
  {
    keywords: ["nexzenta", "company", "about", "who are you", "what is nexzenta", "tell me about"],
    reply: "NexZenta is a specialized talent partner headquartered in Gurugram, India. We combine AI-driven sourcing with deep industry expertise to place the right people in specialized roles across EdTech, HealthTech, BFSI, and more. Founded by Neha Kalra, we focus on quality over volume.",
  },
  {
    keywords: ["service", "offer", "provide", "what do you do", "help with"],
    reply: "NexZenta offers:\n• 🎯 Executive Search — C-suite, VP, and Director-level placements\n• 🚀 Mid-Level Recruitment — Managers, team leads, specialists\n• 🤖 AI-Powered Sourcing — Data-driven candidate matching\n• 📋 Contract Staffing — Flexible workforce solutions\n• 🔍 Talent Mapping — Competitor intelligence & market insights\n\nWhich service interests you most?",
  },
  {
    keywords: ["industry", "sector", "edtech", "healthtech", "bfsi", "fintech", "saas", "tech"],
    reply: "NexZenta specializes in:\n• 📚 EdTech & E-Learning\n• 🏥 HealthTech & Healthcare\n• 💰 BFSI (Banking, Financial Services & Insurance)\n• 💻 SaaS & Enterprise Tech\n• 🏗️ Real Estate & PropTech\n\nWe understand the nuance of hiring in each sector — not just matching CVs, but finding the right cultural and strategic fit.",
  },
  {
    keywords: ["hire", "hiring", "recruit", "talent", "candidate", "find staff", "staff"],
    reply: "Great! NexZenta can help you hire specialized talent. Our process:\n1. Deep dive into your role & culture\n2. AI-powered candidate sourcing\n3. Rigorous screening & shortlisting\n4. Interview coordination & offer support\n\nTo get started, reach out at 📧 Talent@NexZenta.com or use the Contact page. Our team typically responds within 24 hours.",
  },
  {
    keywords: ["job", "career", "work", "opportunity", "opening", "vacancy", "position", "apply"],
    reply: "Looking for your next career move? NexZenta works with leading companies across EdTech, HealthTech, BFSI, and more. Share your profile with us at 📧 Talent@NexZenta.com and our team will match you with relevant opportunities. Include your resume and areas of interest!",
  },
  {
    keywords: ["contact", "reach", "touch", "email", "phone", "call", "whatsapp"],
    reply: "You can reach NexZenta through:\n📧 Email: Talent@NexZenta.com\n📞 Phone: +91 99685 63781\n💬 WhatsApp: +91 99685 63781\n📍 Office: Ardee City, Sector 52, Gurugram, Haryana 122003\n\nOr fill out the Contact form on this website — we respond within 24 hours!",
  },
  {
    keywords: ["founder", "ceo", "neha", "kalra", "leadership", "team"],
    reply: "NexZenta was founded by Neha Kalra, who brings over a decade of talent acquisition experience from leading EdTech companies. Her philosophy: specialized industries deserve specialized hiring — not generic recruitment. She built NexZenta to bridge that gap using AI and deep domain knowledge.",
  },
  {
    keywords: ["ai", "technology", "artificial intelligence", "how", "process", "method"],
    reply: "NexZenta combines human expertise with AI-powered tools to:\n• Source candidates from multiple platforms simultaneously\n• Score candidates on role fit, cultural alignment & growth potential\n• Reduce time-to-hire by up to 60%\n• Deliver a curated shortlist — not a pile of resumes\n\nThis means better matches, faster results, and lower recruitment costs for our clients.",
  },
  {
    keywords: ["price", "cost", "fee", "charge", "rate", "pricing", "how much"],
    reply: "NexZenta's pricing is tailored to each engagement — factors include role seniority, urgency, and scope. We work on both retainer and success-fee models. For a custom quote, reach out at 📧 Talent@NexZenta.com or call +91 99685 63781. We'll design a solution that fits your budget.",
  },
  {
    keywords: ["time", "how long", "duration", "fast", "quick", "turnaround", "days"],
    reply: "Our typical timelines:\n• Executive Search: 4–8 weeks\n• Mid-Level Roles: 2–4 weeks\n• Contract Staffing: 1–2 weeks\n\nWith AI-assisted sourcing, we often beat these targets. Urgency? Let us know and we'll prioritize accordingly.",
  },
  {
    keywords: ["location", "office", "address", "gurugram", "india", "where"],
    reply: "📍 NexZenta is based at:\nArdee City, Sector 52\nGurugram, Haryana 122003, India\n\nWe work with clients across India and place candidates globally for remote and hybrid roles.",
  },
  {
    keywords: ["thank", "thanks", "great", "awesome", "helpful", "good"],
    reply: "You're welcome! 😊 Is there anything else I can help you with about NexZenta's services or recruitment solutions?",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "quit", "exit"],
    reply: "Thank you for chatting with TalentBot! 👋 If you need anything, we're always here. Feel free to reach out at Talent@NexZenta.com. Have a great day!",
  },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const entry of NEXZENTA_KB) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.reply;
    }
  }
  return "That's a great question! For detailed information, I'd recommend reaching out directly to our team at 📧 Talent@NexZenta.com or call +91 99685 63781. You can also ask me about our services, industries, hiring process, or how to contact us!";
}

let idCounter = 2;

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", text: "Hi! 👋 I'm TalentBot — NexZenta's virtual assistant. Ask me anything about our talent solutions, services, or how to get in touch!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: idCounter++, role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: idCounter++, role: "bot", text: reply }]);
    }, 700 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 left-0 w-80 bg-background border border-border rounded-xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: 420 }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <div>
                  <p className="font-semibold text-sm leading-none">TalentBot</p>
                  <p className="text-xs text-primary-foreground/70 mt-0.5">NexZenta Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-muted/20">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line shadow-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border border-border text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-xl rounded-bl-none px-4 py-3 flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-background border-t border-border flex gap-2 shrink-0">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about NexZenta…"
                className="flex-1 text-sm"
              />
              <Button size="icon" className="shrink-0" onClick={sendMessage} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg p-0 flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground"
        aria-label="Toggle TalentBot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>
    </div>
  );
}
