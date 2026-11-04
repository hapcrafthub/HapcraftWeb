import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Mail goes out through the support@hapcraftmedia.com mailbox (GoDaddy Workspace Email by default).
// Only SMTP_PASS has to be set; the rest have defaults. See README for the Vercel setup.
const SMTP_HOST = process.env.SMTP_HOST || "smtpout.secureserver.net";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "support@hapcraftmedia.com";
const CONTACT_TO = process.env.CONTACT_TO || "support@hapcraftmedia.com";

const MAX = { name: 100, email: 200, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort limit per visitor. Serverless instances do not share memory, so this only slows down
// a single instance; the honeypot and the length limits do the rest.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const json = (body: object, status: number) => Response.json(body, { status });

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  // Hidden field that people never fill in; bots do. Pretend it worked so they move on.
  if (typeof data.website === "string" && data.website.trim() !== "") return json({ ok: true }, 200);

  const name = typeof data.name === "string" ? oneLine(data.name) : "";
  const email = typeof data.email === "string" ? oneLine(data.email) : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || name.length > MAX.name || !EMAIL_RE.test(email) || email.length > MAX.email || message.length > MAX.message) {
    return json({ error: "invalid" }, 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "rate_limited" }, 429);

  const pass = process.env.SMTP_PASS;
  if (!pass) {
    console.error("[contact] SMTP_PASS is not set; the enquiry from", email, "was not sent.");
    return json({ error: "not_configured" }, 503);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass },
  });

  const body = message || "(no message)";
  try {
    await transporter.sendMail({
      from: `"Hapcraft website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New enquiry from ${name} — hapcraftmedia.com`,
      text: `Name: ${name}\nEmail: ${email}\n\nAbout their business:\n${body}\n`,
      html:
        `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>About their business:</strong></p><p>${escapeHtml(body).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (err) {
    console.error("[contact] sending failed:", err);
    return json({ error: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
