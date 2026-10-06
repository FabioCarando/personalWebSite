import { contact } from "@/content/contact";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-[#111111] text-[#f1f0eb]">
      <div className="page-shell flex flex-col gap-12 py-16 md:gap-20 md:py-24">
        <div className="flex flex-col gap-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-500">Contact / Fabio Carando</span>
          <h2 id="contact-title" className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.06em]">LET&apos;S CONNECT.</h2>
        </div>
        <div className="grid gap-x-16 gap-y-10 border-t border-white/20 pt-10 md:grid-cols-2">
          <ContactLink label="Mail" text={contact.email} href={`mailto:${contact.email}`} />
          {contact.phones.map((phone) => <ContactLink key={phone.label} label={phone.label} text={phone.display} href={phone.href} />)}
          <ContactLink label="GitHub" text="github.com/FabioCarando" href={contact.github} />
          {contact.linkedin && <ContactLink label="LinkedIn" text="Fabio Carando" href={contact.linkedin} />}
        </div>
      </div>
    </section>
  );
}

function ContactLink({ label, text, href }: { label: string; text: string; href: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">{label}</span>
      <a href={href} className="w-fit break-words text-[clamp(1.15rem,2.2vw,2rem)] leading-relaxed tracking-tight transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">{text}</a>
    </div>
  );
}
