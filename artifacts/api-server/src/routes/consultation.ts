import { Router } from "express";
import { z } from "zod";
import { getTransporter } from "./emailTransporter";

const router = Router();

const NEXZENTA_EMAIL = "talent@nexzenta.com";

const consultationSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  date: z.string().min(1),
  message: z.string().optional(),
});

const SERVICE_LABELS: Record<string, string> = {
  recruitment: "Recruitment Services",
  executive: "Executive Hiring",
  bulk: "Bulk Hiring",
  payroll: "Payroll Coordination",
  screening: "Candidate Screening",
  "ai-sourcing": "AI-based Talent Sourcing",
  startup: "Startup Hiring Support",
};

router.post("/consultation", async (req, res) => {
  const parsed = consultationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data" });
    return;
  }

  const { name, company, email, phone, service, date, message } = parsed.data;
  const serviceLabel = SERVICE_LABELS[service] || service;
  const preferredDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  req.log.info({ name, company, email, service, date }, "Consultation booking received");

  const t = getTransporter();
  if (t) {
    try {
      await t.sendMail({
        from: `"NexZenta Website" <${process.env.SMTP_USER}>`,
        to: NEXZENTA_EMAIL,
        replyTo: email,
        subject: `📅 New Consultation Request — ${name} (${company})`,
        text: [
          `New consultation request from the NexZenta website.`,
          ``,
          `Name: ${name}`,
          `Company: ${company}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Service: ${serviceLabel}`,
          `Preferred Date: ${preferredDate}`,
          ``,
          `Hiring Needs:`,
          message || "—",
        ].join("\n"),
        html: `
          <h2 style="color:#0B1221;font-family:sans-serif">📅 New Consultation Request — NexZenta</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
            <tr style="background:#f5f5f5"><td style="padding:10px;font-weight:bold">Name</td><td style="padding:10px">${name}</td></tr>
            <tr><td style="padding:10px;font-weight:bold">Company</td><td style="padding:10px">${company}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:10px;font-weight:bold">Email</td><td style="padding:10px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:10px;font-weight:bold">Phone</td><td style="padding:10px">${phone || "—"}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:10px;font-weight:bold">Service</td><td style="padding:10px">${serviceLabel}</td></tr>
            <tr><td style="padding:10px;font-weight:bold">Preferred Date</td><td style="padding:10px">${preferredDate}</td></tr>
          </table>
          <h3 style="color:#0B1221;margin-top:20px;font-family:sans-serif">Hiring Needs</h3>
          <p style="background:#f5f5f5;padding:14px;border-radius:8px;font-family:sans-serif;line-height:1.6">${(message || "—").replace(/\n/g, "<br>")}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #ddd"/>
          <p style="color:#aaa;font-size:12px;font-family:sans-serif">Sent via NexZenta website — Book a Consultation form</p>
        `,
      });
      req.log.info({ to: NEXZENTA_EMAIL }, "Consultation email sent successfully");
    } catch (err) {
      req.log.error({ err }, "Failed to send consultation email");
    }
  } else {
    req.log.warn("SMTP not configured — consultation email skipped");
  }

  res.status(200).json({ success: true });
});

export default router;
