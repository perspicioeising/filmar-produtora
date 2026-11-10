import Link from "next/link";
import { Lock } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import type { ContactContent } from "@/lib/supabase/types";
import {
  InstagramIcon,
  YoutubeIcon,
  VimeoIcon,
} from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";

export function Footer({ content }: { content: ContactContent }) {
  const year = new Date().getFullYear();

  const socials = [
    { href: content.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: content.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: content.vimeo, label: "Vimeo", Icon: VimeoIcon },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-mist-100/10 bg-ink-950 pb-24 sm:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={siteConfig.name}>
            <Logo size="lg" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-400">
            {content.description}
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-mist-100/15 text-mist-300 transition-colors hover:border-sky-glow hover:text-sky-glow"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-mist-500">
            Navegação
          </h2>
          <ul className="mt-5 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block py-1.5 text-sm text-mist-300 transition-colors hover:text-sky-glow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-mist-500">
            Contato
          </h2>
          <ul className="mt-5 space-y-1 text-sm text-mist-300">
            <li>
              <a
                href={`mailto:${content.email}`}
                className="inline-block break-all py-1.5 transition-colors hover:text-sky-glow"
              >
                {content.email}
              </a>
            </li>
            {content.phone && (
              <li>
                <a
                  href={`tel:${content.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-block py-1.5 transition-colors hover:text-sky-glow"
                >
                  {content.phone}
                </a>
              </li>
            )}
            {content.location && <li className="py-1.5">{content.location}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-mist-100/10">
        {/* sm:pr-44 reserva o espaço do botão flutuante do WhatsApp */}
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-mist-500 sm:flex-row sm:items-center sm:justify-between sm:pr-44">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap items-center gap-x-4">
            <span>{siteConfig.tagline}</span>
            <Link
              href="/admin"
              className="inline-flex h-9 items-center gap-1.5 text-mist-500 transition-colors hover:text-sky-glow"
            >
              <Lock size={12} />
              Área administrativa
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
