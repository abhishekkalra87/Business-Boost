import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter | null {
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

export function resetTransporter(): void {
  transporter = null;
}

export function verifyTransporter(): void {
  const t = getTransporter();
  if (t) {
    t.verify((err) => {
      if (err) {
        console.error("[SMTP] Connection verify failed:", err.message);
        transporter = null;
      } else {
        console.log("[SMTP] Connection verified — ready to send emails");
      }
    });
  } else {
    console.warn("[SMTP] SMTP_USER/SMTP_PASS not set — email disabled");
  }
}
