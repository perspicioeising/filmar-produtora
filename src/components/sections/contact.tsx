import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";
import type { ContactContent } from "@/lib/supabase/types";

export function Contact({ content }: { content: ContactContent }) {
  const whatsapp = content.whatsapp.replace(/\D/g, "");

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-ink-950 py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-sky-glow/10 blur-3xl"
      />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          {content.eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-glow">
              {content.eyebrow}
            </p>
          )}
          <h2 className="mt-5 text-4xl leading-[1.08] text-balance text-mist-100 sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 text-lg text-mist-300">{content.paragraph}</p>

          <ul className="mt-10 space-y-2">
            <ContactItem
              icon={<Mail size={18} strokeWidth={1.5} />}
              label="Email"
              value={content.email}
              href={`mailto:${content.email}`}
            />
            {content.phone && (
              <ContactItem
                icon={<Phone size={18} strokeWidth={1.5} />}
                label="Telefone"
                value={content.phone}
                href={`tel:${content.phone.replace(/[^\d+]/g, "")}`}
              />
            )}
            {whatsapp && (
              <ContactItem
                icon={<MessageCircle size={18} strokeWidth={1.5} />}
                label="WhatsApp"
                value="Enviar mensagem"
                href={`https://wa.me/${whatsapp}`}
                external
              />
            )}
            {content.location && (
              <ContactItem
                icon={<MapPin size={18} strokeWidth={1.5} />}
                label="Localização"
                value={content.location}
              />
            )}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <div className="rounded-3xl border border-mist-100/10 bg-ink-900/70 p-6 backdrop-blur sm:p-10">
            <ContactForm submitLabel={content.cta} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mist-100/15 text-sky-glow transition-colors group-hover:border-sky-glow">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-[0.2em] text-mist-500">
          {label}
        </span>
        <span className="block break-words text-mist-100">{value}</span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group -mx-2 flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-mist-100/5"
        >
          {inner}
        </a>
      ) : (
        <div className="-mx-2 flex items-center gap-4 p-2">{inner}</div>
      )}
    </li>
  );
}
