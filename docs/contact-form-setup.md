# Contact form setup

The form appears on the homepage and `/contact`. It sends to a fixed server-side recipient via Resend; no recipient address is rendered in HTML or included in the browser bundle. No submission is reported as successful unless the provider accepts the email. Provider acceptance does not guarantee inbox delivery.

## Activate on Vercel

1. Create a Resend account and an API key with permission to send email.
2. Configure an allowed sender. For production, verify a domain you own in Resend and use an address on that domain. You cannot verify `vercel.app` or `yahoo.it` as your own domain. Resend's test sender has recipient restrictions; consult its current documentation before using it.
3. In your Vercel project's Settings → Environment Variables, add these server-side variables (never prefix them with NEXT_PUBLIC):
   - `RESEND_API_KEY`: the private API key.
   - `CONTACT_FROM_EMAIL`: the sender accepted by Resend, for example `Portfolio <contact@your-domain.com>`.
   - `CONTACT_TO_EMAIL`: your receiving address.
   - Optional `CONTACT_SITE_URL`: the exact production origin without a trailing slash, for example `https://fabio-carando.vercel.app`. If omitted, the request URL's origin is used, which also supports preview deployments.
4. Redeploy. Submit a message and check receipt in your inbox and delivery status in Resend.

For local testing, set the same variables in `.env.local`, which is ignored by Git. Do not paste API keys into chat or client code.

## Validation and spam handling

The endpoint checks origin, content type, field lengths and types, rejects a populated honeypot, and bounds the request body. Retries use an idempotency key. These are basic controls, not a CAPTCHA or distributed rate limiter. Before exposing an active sender publicly, configure a rate-limit rule for POST `/api/contact` in the Vercel Firewall or add a verified challenge service if spam becomes a problem.

An unavailable provider leaves the user's text in the form and shows an error; it never silently drops a message or sends it with mailto.

API: https://resend.com/docs/api-reference/emails/send-email
