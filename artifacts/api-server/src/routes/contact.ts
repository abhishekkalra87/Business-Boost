import { Router } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";

const router = Router();

const NEXZENTA_EMAIL = "talent@nexzenta.com";
const NEXZENTA_PHONE = "919968563781";

// ── Persistent transporter (created once, reused for all requests) ────────────
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
      pool: true,
      maxConnections: 3,
      rateDelta: 1000,
      rateLimit: 5,
    });
  }
  return transporter;
}

// Warm up connection on server start
const warmupTransporter = (): void => {
  const t = getTransporter();
  if (t) {
    t.verify((err) => {
      if (err) {
        console.error("[SMTP] Connection verify failed:", err.message);
        // Reset so it retries on next request
        transporter = null;
      } else {
        console.log("[SMTP] Connection verified — ready to send emails");
      }
    });
  } else {
    console.warn("[SMTP] SMTP_USER/SMTP_PASS not set — email disabled");
  }
};
warmupTransporter();

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

  // ── 1. Email ─────────────────────────────────────────────────────────────────
  let t = getTransporter();

  // If transporter was reset due to earlier error, rebuild it
  if (!t) {
    transporter = null;
    t = getTransporter();
  }

  if (t) {
    let attempts = 0;
    let sent = false;

    while (attempts < 3 && !sent) {
      attempts++;
      try {
        await t.sendMail({
          from: `"NexZenta Website" <${process.env.SMTP_USER}>`,
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
            <h2 style="color:#0B1221;font-family:sans-serif">New Enquiry — NexZenta Website</h2>
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
        sent = true;
        results.push("email:sent");
        req.log.info({ to: NEXZENTA_EMAIL, attempts }, "Contact email sent successfully");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        req.log.error({ err, attempt: attempts }, `Email attempt ${attempts} failed: ${msg}`);
        // Reset transporter on failure so it reconnects next attempt
        transporter = null;
        t = getTransporter()!;
        // Wait briefly before retrying
        if (attempts < 3) await new Promise((r) => setTimeout(r, 1000 * attempts));
      }
    }

    if (!sent) {
      results.push("email:failed-after-3-attempts");
      req.log.error({ to: NEXZENTA_EMAIL }, "All 3 email attempts failed");
    }
  } else {
    results.push("email:skipped (SMTP_USER/SMTP_PASS not set)");
    req.log.warn("SMTP credentials not set — email notification skipped");
  }

  // ── 2. WhatsApp via CallMeBot ─────────────────────────────────────────────
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
      results.push(waRes.ok ? "whatsapp:sent" : `whatsapp:failed(${waRes.status})`);
    } catch (err) {
      results.push("whatsapp:error");
      req.log.error({ err }, "Failed to send WhatsApp notification");
    }
  } else {
    results.push("whatsapp:skipped (CALLMEBOT_API_KEY not set)");
  }

  // ── 3. Save to database ───────────────────────────────────────────────────
  try {
    await db.insert(contactsTable).values({ name, company, email, phone, inquiry, message });
    results.push("db:saved");
    req.log.info("Contact saved to database");
  } catch (err) {
    results.push("db:error");
    req.log.error({ err }, "Failed to save contact to database");
  }

  req.log.info({ results }, "Contact form processing complete");
  res.status(200).json({ success: true });
});

export default router;
