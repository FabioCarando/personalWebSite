"use client";

import { useRef, useState, type FormEvent } from "react";

const fieldClass = "w-full rounded-none border border-white/20 bg-black/20 px-4 py-3 text-base leading-6 text-white placeholder:text-white/30 focus:border-orange-400 focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const submissionId = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setStatus("sending");
    setError("");
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": submissionId.current },
        body: JSON.stringify(Object.fromEntries(data.entries())),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      form.reset();
      submissionId.current = null;
      setStatus("success");
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "TimeoutError" && failure.name !== "TypeError" ? failure.message : "The connection was interrupted. Your message is still here; please try again.");
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form onSubmit={submit} onChange={() => { submissionId.current = null; if (status !== "sending") setStatus("idle"); }} aria-label="Contact Fabio Carando" aria-busy={status === "sending"} className="flex flex-col gap-7 border border-white/15 bg-white/[0.025] p-5 sm:p-8">
      <div className="flex flex-col gap-3"><h3 className="text-2xl tracking-tight">Send me a message.</h3><p className="text-sm leading-6 text-white/55">Have a project, a research question or an opportunity in mind? Tell me a little about it.</p></div>
      <fieldset disabled={status === "sending"} className="grid min-w-0 gap-6 border-0 p-0 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-3"><span className="text-sm text-white/80">Name <span className="text-orange-400">*</span></span><input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Your name" className={fieldClass} /></label>
        <label className="flex min-w-0 flex-col gap-3"><span className="text-sm text-white/80">Email <span className="text-orange-400">*</span></span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={fieldClass} /></label>
        <label className="flex min-w-0 flex-col gap-3 sm:col-span-2"><span className="text-sm text-white/80">Subject <span className="text-orange-400">*</span></span><input name="subject" required minLength={3} maxLength={140} placeholder="What would you like to discuss?" className={fieldClass} /></label>
        <label className="flex min-w-0 flex-col gap-3 sm:col-span-2"><span className="text-sm text-white/80">Message <span className="text-orange-400">*</span></span><textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Describe your request, idea or project…" className={`${fieldClass} resize-y`} /></label>
        <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      </fieldset>
      <div className="flex flex-col gap-4"><p className="text-xs leading-6 text-white/45">Your name, email and message will be used to respond to your enquiry. Please avoid including sensitive information.</p><button type="submit" disabled={status === "sending"} className="min-h-12 w-full border border-orange-400 bg-orange-400/10 px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-orange-300 transition-colors hover:bg-orange-400/20 disabled:cursor-wait disabled:opacity-60 sm:w-fit">{status === "sending" ? "Sending…" : "Send message →"}</button></div>
      <div role="status" aria-live="polite" aria-atomic="true">{status === "success" && <p className="border-l-2 border-emerald-400 pl-4 text-sm leading-6 text-emerald-300">Your message has been sent. Thank you for getting in touch.</p>}{status === "error" && <p className="border-l-2 border-orange-400 pl-4 text-sm leading-6 text-orange-300">{error}</p>}</div>
    </form>
  );
}
