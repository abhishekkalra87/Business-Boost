import { useConsultation } from "@/context/consultation-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookConsultationModal() {
  const { isOpen, closeModal } = useConsultation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    closeModal();
    setTimeout(() => setSubmitted(false), 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
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
              <Button className="mt-4" onClick={handleClose}>
                Close
              </Button>
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
                    <Input
                      id="name"
                      name="name"
                      placeholder="Neha Kalra"
                      value={form.name}
                      onChange={handleChange}
                      required
                      data-testid="input-consultation-name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme EdTech Pvt. Ltd."
                      value={form.company}
                      onChange={handleChange}
                      required
                      data-testid="input-consultation-company"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Work Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      data-testid="input-consultation-email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      data-testid="input-consultation-phone"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service">Service of Interest <span className="text-destructive">*</span></Label>
                  <Select
                    required
                    onValueChange={(val) => setForm((prev) => ({ ...prev, service: val }))}
                  >
                    <SelectTrigger data-testid="select-consultation-service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recruitment">Recruitment Services</SelectItem>
                      <SelectItem value="executive">Executive Hiring</SelectItem>
                      <SelectItem value="bulk">Bulk Hiring</SelectItem>
                      <SelectItem value="hr-outsourcing">HR Outsourcing</SelectItem>
                      <SelectItem value="payroll">Payroll Coordination</SelectItem>
                      <SelectItem value="screening">Candidate Screening</SelectItem>
                      <SelectItem value="ai-sourcing">AI-based Talent Sourcing</SelectItem>
                      <SelectItem value="startup">Startup Hiring Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Preferred Date <span className="text-destructive">*</span></Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    data-testid="input-consultation-date"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Brief on Hiring Needs</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="We are looking to hire 10 academic counselors for our EdTech startup..."
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    data-testid="textarea-consultation-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  data-testid="button-consultation-submit"
                >
                  Request Consultation
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
