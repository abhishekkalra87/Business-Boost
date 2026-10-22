import { Router } from "express";
import { z } from "zod/v4";
import { SubmitAcademyEnquiryBody } from "@workspace/api-zod";
import { db, academyEnquiriesTable } from "@workspace/db";
import { getTransporter } from "./emailTransporter";

const router = Router();
const academyEnquiryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
const REQUESTS_PER_WINDOW = 4;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; expiresAt: number }>();

function consumeRateLimit(ip: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
  let bucket = rateLimitBuckets.get(ip);
  if (!bucket || bucket.expiresAt <= now) {
    bucket = { count: 0, expiresAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitBuckets.set(ip, bucket);
  }

  if (bucket.count >= REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.expiresAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  if (rateLimitBuckets.size > 5_000) {
    for (const [key, value] of rateLimitBuckets) {
      if (value.expiresAt <= now) rateLimitBuckets.delete(key);
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

function hasRequiredDetails(
  enquiryType: "individual" | "corporate" | "trainer",
  data: ReturnType<typeof SubmitAcademyEnquiryBody.parse>,
): boolean {
  if (!data.fullName.trim() || data.privacyConsent !== true) return false;

  if (enquiryType === "individual" || enquiryType === "corporate") return true;
  return Boolean(data.linkedinProfile?.trim());
}

router.post("/ai-academy/enquiries", async (req, res): Promise<void> => {
  const limit = consumeRateLimit(req.ip || "unknown");
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    res.status(429).json({ error: "Too many enquiries. Please try again later." });
    return;
  }

  const parsed = SubmitAcademyEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please check the enquiry details and try again." });
    return;
  }

  const data = parsed.data;
  if (data.website?.trim()) {
    // Honeypot: return a generic success to avoid teaching bots which field caught them.
    res.status(201).json(academyEnquiryResponseSchema.parse({
      success: true,
      message: "Your enquiry has been received.",
    }));
    return;
  }

  if (!hasRequiredDetails(data.enquiryType, data)) {
    res.status(400).json({ error: "Please complete the required fields and accept the privacy notice." });
    return;
  }

  try {
    const isCorporate = data.enquiryType === "corporate";
    const isTrainer = data.enquiryType === "trainer";
    await db.insert(academyEnquiriesTable).values({
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      enquiryType: data.enquiryType,
      courseInterest: isTrainer ? null : data.courseInterest ?? null,
      company: isCorporate ? data.company?.trim() || null : null,
      teamSize: isCorporate ? data.teamSize?.trim() || null : null,
      trainingNeeds: isCorporate ? data.trainingNeeds?.trim() || null : null,
      linkedinProfile: isTrainer ? data.linkedinProfile?.trim() || null : null,
      expertise: isTrainer ? data.expertise?.trim() || null : null,
      teachingExperience: isTrainer ? data.teachingExperience?.trim() || null : null,
      privacyConsent: data.privacyConsent,
    });
  } catch (err) {
    req.log.error({ err, enquiryType: data.enquiryType }, "Failed to save AI Academy enquiry");
    res.status(500).json({ error: "We could not save your enquiry. Please try again." });
    return;
  }

  const transporter = getTransporter();
  const recipient = process.env.ACADEMY_ENQUIRY_EMAIL || process.env.SMTP_USER;
  if (transporter && recipient) {
    const details = [
      `Type: ${data.enquiryType}`,
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Course interest: ${data.courseInterest || "Not provided"}`,
      `Company: ${data.company || "Not provided"}`,
      `Team size: ${data.teamSize || "Not provided"}`,
      `Training needs: ${data.trainingNeeds || "Not provided"}`,
      `LinkedIn profile: ${data.linkedinProfile || "Not provided"}`,
      `Expertise: ${data.expertise || "Not provided"}`,
      `Teaching experience: ${data.teachingExperience || "Not provided"}`,
    ].join("\n");

    try {
      await transporter.sendMail({
        from: `"NexZenta AI Academy" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: data.email,
        subject: `New AI Academy enquiry — ${data.enquiryType}`,
        text: details,
      });
      req.log.info({ enquiryType: data.enquiryType }, "AI Academy notification sent");
    } catch (err) {
      req.log.error({ err, enquiryType: data.enquiryType }, "Failed to send AI Academy notification");
    }
  } else {
    req.log.warn(
      { smtpConfigured: Boolean(transporter), recipientConfigured: Boolean(recipient) },
      "AI Academy enquiry saved; notification email is not configured",
    );
  }

  res.status(201).json(academyEnquiryResponseSchema.parse({
    success: true,
    message: "Your enquiry has been received. Our team will be in touch.",
  }));
});

export default router;
