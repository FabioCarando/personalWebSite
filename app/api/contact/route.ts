import { validateContact } from "@/lib/contactValidation";

export const runtime = "nodejs";

const reply = (error: string, status: number) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.CONTACT_SITE_URL || new URL(request.url).origin;
  if (!origin || origin !== allowedOrigin) return reply("This request is not allowed.", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply("Invalid request format.", 415);
  const reader = request.body?.getReader();
  if (!reader) return reply("Please complete the contact form.", 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); return reply("Your message is too long.", 413); }
      chunks.push(value);
    }
  } catch { return reply("Could not read your message. Please try again.", 400); }
  let raw: unknown;
  try { raw = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { return reply("Invalid form data.", 400); }
  const fields = validateContact(raw);
  if (typeof fields === "string") return reply(fields, 400);
  if (fields.website) return reply("Your message could not be sent.", 400);
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[a-f0-9-]{36}$/i.test(key)) return reply("Invalid submission. Please reload the page.", 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return reply("The contact form is temporarily unavailable. Please reach me via LinkedIn or phone.", 503);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": key },
      body: JSON.stringify({
        from, to: [to], reply_to: fields.email,
        subject: `[Portfolio] ${fields.subject}`,
        text: `Name: ${fields.name}\nReply to: ${fields.email}\n\n${fields.message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return reply("Your message could not be sent. Please try again later or reach me via LinkedIn.", 502);
    return Response.json({ ok: true });
  } catch { return reply("The email service is unavailable. Please try again later or reach me via LinkedIn.", 502); }
}
