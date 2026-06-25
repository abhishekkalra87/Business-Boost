import { Router } from "express";
import { z } from "zod";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  inquiry: z.string().min(1),
  message: z.string().min(1),
});

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data" });
    return;
  }

  const { name, company, email, phone, inquiry, message } = parsed.data;

  req.log.info(
    { name, company, email, phone, inquiry },
    "Contact form submission received"
  );

  // Log full enquiry for ops visibility
  req.log.info(
    { message },
    `NexZenta enquiry from ${name} <${email}> — ${inquiry}`
  );

  // If SMTP credentials are configured, send email
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"NexZenta TalentBot" <${smtpUser}>`,
        to: "Talent@NexZenta.com",
        replyTo: email,
        subject: `New Enquiry: ${inquiry} — ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Name: ${name}`,
          `Company: ${company || "—"}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Inquiry Type: ${inquiry}`,
          ``,
          `Message:`,
          message,
        ].join("\n"),
        html: `
          <h2 style="color:#0B1221">New Enquiry from NexZenta Website</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${company || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Inquiry</td><td style="padding:8px">${inquiry}</td></tr>
          </table>
          <h3 style="color:#0B1221;margin-top:16px">Message</h3>
          <p style="background:#f5f5f5;padding:12px;border-radius:8px">${message.replace(/\n/g, "<br>")}</p>
          <hr style="margin:24px 0"/>
          <p style="color:#888;font-size:12px">Sent via NexZenta website contact form</p>
        `,
      });

      req.log.info({ to: "Talent@NexZenta.com" }, "Contact email sent successfully");
    } catch (err) {
      req.log.error({ err }, "Failed to send contact email — submission still recorded");
    }
  }

  res.status(200).json({ success: true });
});

export default router;
