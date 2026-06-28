import { useConsultation } from "@/context/consultation-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookConsultationModal() {
  const { isOpen, closeModal } = useConsultation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", service: "", date: "", message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.service) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    closeModal();
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", company: "", email: "", phone: "", service: "", date: "", message: "" });
    }, 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Request Received!</h3>
              <p className="text-muted-foreground max-w-sm">
                Thank you for reaching out. Our team will contact you within 24 hours to confirm your consultation slot.
              </p>
              <Button className="mt-4" onClick={handleClose}>Close</Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold">Book a Consultation</DialogTitle>
                <DialogDescription>
                  Tell us about your hiring needs and we'll schedule a free strategy call.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                    <Input id="name" name="name" placeholder="Neha Kalra" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company Name <span className="text-destructive">*</span></Label>
                    <Input id="company" name="company" placeholder="Acme EdTech Pvt. Ltd." value={form.company} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Work Email <span className="text-destructive">*</span></Label>
                    <Input id="email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Service of Interest <span className="text-destructive">*</span></Label>
                  <Select required onValueChange={(val) => setForm((prev) => ({ ...prev, service: val }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recruitment">Recruitment Services</SelectItem>
                      <SelectItem value="executive">Executive Hiring</SelectItem>
                      <SelectItem value="bulk">Bulk Hiring</SelectItem>
                      <SelectItem value="payroll">Payroll Coordination</SelectItem>
                      <SelectItem value="screening">Candidate Screening</SelectItem>
                      <SelectItem value="ai-sourcing">AI-based Talent Sourcing</SelectItem>
                      <SelectItem value="startup">Startup Hiring Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Preferred Date <span className="text-destructive">*</span></Label>
                  <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Brief on Hiring Needs</Label>
                  <Textarea id="message" name="message" placeholder="We are looking to hire 10 academic counselors for our EdTech startup..." rows={3} value={form.message} onChange={handleChange} />
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again or email us at talent@nexzenta.com</p>
                )}
                <Button type="submit" className="w-full h-12 text-base" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</>
                  ) : (
                    "Request Consultation"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
