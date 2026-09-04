import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";
import type { ContactContent } from "@/lib/supabase/types";

export function Contact({ content }: { content: ContactContent }) {
  return (
    <section
      id="contato"
      className="border-t border-ink-800 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-mist-500">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 text-4xl leading-tight text-balance text-mist-100 sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 text-xl font-light text-mist-300">
            {content.paragraph}
          </p>

          <ul className="mt-12 space-y-5">
            <ContactItem
              icon={<Mail size={18} strokeWidth={1.25} />}
              label="Email"
              value={content.email}
              href={`mailto:${content.email}`}
            />
            <ContactItem
              icon={<Phone size={18} strokeWidth={1.25} />}
              label="Telefone"
              value={content.phone}
              href={`tel:${content.phone.replace(/\D/g, "")}`}
            />
            <ContactItem
              icon={<MessageCircle size={18} strokeWidth={1.25} />}
              label="WhatsApp"
              value="Enviar mensagem"
              href={`https://wa.me/${content.whatsapp}`}
              external
            />
            <ContactItem
              icon={<MapPin size={18} strokeWidth={1.25} />}
              label="Localização"
              value={content.location}
            />
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-ink-700 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
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
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-700 text-mist-300">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-widest text-mist-500">
          {label}
        </span>
        <span className="text-mist-100">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="flex items-center gap-4 transition-colors hover:text-mist-300"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-center gap-4">{content}</li>;
}
