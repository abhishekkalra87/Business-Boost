import { Router } from "express";
import { z } from "zod";

const router = Router();

const NEXZENTA_EMAIL = "talent@nexzenta.com";
const NEXZENTA_PHONE = "919968563781";

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

  req.log.info({ name, company, email, phone, inquiry }, "Contact form submission received");

  const results: string[] = [];

  // ── 1. WhatsApp via CallMeBot ──────────────────────────────────────────────
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  if (callMeBotKey) {
    try {
      const waText = [
        `📩 *New NexZenta Enquiry*`,
        `👤 Name: ${name}`,
        `🏢 Company: ${company || "—"}`,
        `📧 Email: ${email}`,
        `📞 Phone: ${phone || "—"}`,
        `🔍 Type: ${inquiry}`,
        ``,
        `💬 Message:`,
        message,
      ].join("\n");

      const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${NEXZENTA_PHONE}&text=${encodeURIComponent(waText)}&apikey=${callMeBotKey}`;
      const waRes = await fetch(waUrl);
      if (waRes.ok) {
        results.push("whatsapp:sent");
        req.log.info("WhatsApp notification sent via CallMeBot");
      } else {
        results.push("whatsapp:failed");
        req.log.warn({ status: waRes.status }, "CallMeBot returned non-OK status");
      }
    } catch (err) {
      results.push("whatsapp:error");
      req.log.error({ err }, "Failed to send WhatsApp notification");
    }
  } else {
    results.push("whatsapp:skipped (CALLMEBOT_API_KEY not set)");
    req.log.warn("CALLMEBOT_API_KEY not set — WhatsApp notification skipped");
  }

  // ── 2. Email via nodemailer ────────────────────────────────────────────────
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
        from: `"NexZenta Website" <${smtpUser}>`,
        to: NEXZENTA_EMAIL,
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
          <h2 style="color:#0B1221;font-family:sans-serif">New Enquiry from NexZenta Website</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
            <tr style="background:#f5f5f5"><td style="padding:10px;font-weight:bold">Name</td><td style="padding:10px">${name}</td></tr>
            <tr><td style="padding:10px;font-weight:bold">Company</td><td style="padding:10px">${company || "—"}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:10px;font-weight:bold">Email</td><td style="padding:10px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:10px;font-weight:bold">Phone</td><td style="padding:10px">${phone || "—"}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:10px;font-weight:bold">Inquiry</td><td style="padding:10px">${inquiry}</td></tr>
          </table>
          <h3 style="color:#0B1221;margin-top:20px;font-family:sans-serif">Message</h3>
          <p style="background:#f5f5f5;padding:14px;border-radius:8px;font-family:sans-serif;line-height:1.6">${message.replace(/\n/g, "<br>")}</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #ddd"/>
          <p style="color:#aaa;font-size:12px;font-family:sans-serif">Sent via NexZenta website contact form</p>
        `,
      });

      results.push("email:sent");
      req.log.info({ to: NEXZENTA_EMAIL }, "Contact email sent successfully");
    } catch (err) {
      results.push("email:error");
      req.log.error({ err }, "Failed to send contact email");
    }
  } else {
    results.push("email:skipped (SMTP_USER/SMTP_PASS not set)");
    req.log.warn("SMTP credentials not set — email notification skipped");
  }

  req.log.info({ results }, "Contact form processing complete");
  res.status(200).json({ success: true });
});

export default router;
