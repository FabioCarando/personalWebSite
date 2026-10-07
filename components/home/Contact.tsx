import { contact } from "@/content/contact";
import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-[#111111] text-[#f1f0eb]">
      <div className="page-shell flex flex-col gap-12 py-16 md:gap-20 md:py-24">
        <div className="flex flex-col gap-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-500">Contact / Fabio Carando</span>
          <h2 id="contact-title" className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.06em]">LET&apos;S CONNECT.</h2>
        </div>
        <div className="grid items-start gap-12 border-t border-white/20 pt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <ContactForm />
          <div className="flex min-w-0 flex-col gap-10">
            <figure className="flex items-center gap-5 border-b border-white/15 pb-8 sm:gap-7">
              <div className="relative aspect-[4/5] w-[120px] shrink-0 overflow-hidden border border-white/15 sm:w-[144px]">
                <Image
                  src="/foto%20fabio%20professionale.png"
                  alt="Portrait of Fabio Carando"
                  fill
                  sizes="(max-width: 639px) 120px, 144px"
                  className="object-cover object-[center_35%]"
                />
              </div>
              <figcaption className="flex min-w-0 flex-col gap-3">
                <span className="text-xl font-medium leading-snug tracking-tight sm:text-2xl">Fabio Carando</span>
                <span className="text-sm leading-6 text-white/55">Data Scientist &amp;<br />Machine Learning Engineer</span>
              </figcaption>
            </figure>
            <div className="grid min-w-0 gap-9 sm:grid-cols-2 lg:grid-cols-1">
          {contact.phones.map((phone) => <ContactLink key={phone.label} label={phone.label} text={phone.display} href={phone.href} />)}
          <ContactLink label="GitHub" text="github.com/FabioCarando" href={contact.github} />
          {contact.linkedin && <ContactLink label="LinkedIn" text="Fabio Carando" href={contact.linkedin} />}
            </div>
          </div>
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
