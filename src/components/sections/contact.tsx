import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section id="contato" className="border-t border-ink-800 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-glow">
            Vamos conversar
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            Conte sua ideia. A gente coloca em movimento.
          </h2>
          <p className="mt-6 text-mist-400">
            Preencha o formulário ou fale com a gente pelos canais abaixo.
            Respondemos rápido e adoramos um bom projeto.
          </p>

          <ul className="mt-10 space-y-5">
            <ContactItem
              icon={<Mail size={18} />}
              label="Email"
              value={siteConfig.email}
              href={`mailto:${siteConfig.email}`}
            />
            <ContactItem
              icon={<Phone size={18} />}
              label="Telefone"
              value={siteConfig.phone}
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
            />
            <ContactItem
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value="Enviar mensagem"
              href={`https://wa.me/${siteConfig.whatsapp}`}
              external
            />
            <ContactItem
              icon={<MapPin size={18} />}
              label="Localização"
              value={siteConfig.location}
            />
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-ink-700 bg-ink-850/50 p-6 sm:p-8">
            <ContactForm />
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-800 text-sky-glow">
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
          className="flex items-center gap-4 transition-colors hover:text-sky-bright"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-center gap-4">{content}</li>;
}
