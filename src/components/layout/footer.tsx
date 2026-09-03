import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
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

  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <Link href="#hero" aria-label={siteConfig.name}>
            <Logo size="md" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-mist-400">
            {content.description}
          </p>
          <div className="mt-5 flex gap-4">
            {content.instagram && (
              <a
                href={content.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-mist-400 transition-colors hover:text-sky-bright"
              >
                <InstagramIcon size={20} />
              </a>
            )}
            {content.youtube && (
              <a
                href={content.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-mist-400 transition-colors hover:text-sky-bright"
              >
                <YoutubeIcon size={20} />
              </a>
            )}
            {content.vimeo && (
              <a
                href={content.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vimeo"
                className="text-mist-400 transition-colors hover:text-sky-bright"
              >
                <VimeoIcon size={20} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-mist-300">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-mist-400 transition-colors hover:text-sky-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-mist-300">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-mist-400">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-sky-glow" />
              <a
                href={`mailto:${content.email}`}
                className="transition-colors hover:text-sky-bright"
              >
                {content.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-sky-glow" />
              <span>{content.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-glow" />
              <span>{content.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-mist-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>Feito com dedicação ao audiovisual.</p>
        </div>
      </div>
    </footer>
  );
}
