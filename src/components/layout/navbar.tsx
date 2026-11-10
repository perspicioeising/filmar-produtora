"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { InstagramIcon } from "@/components/ui/social-icons";

type Props = {
  email: string;
  instagram: string;
};

export function Navbar({ email, instagram }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll e fecha com ESC quando o menu mobile está aberto
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-mist-100/10 bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Principal"
          className="container-x flex h-16 items-center justify-between"
        >
          <Link href="/" aria-label="Filmar — início" onClick={() => setOpen(false)}>
            <Logo size="sm" />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-mist-300 transition-colors hover:text-sky-glow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button href="/#contato" size="sm" className="hidden sm:inline-flex">
              Orçamento
            </Button>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-mist-100 lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink-950 pt-16 transition-all duration-500 lg:hidden",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        )}
      >
        <div className="container-x flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-8">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-mist-100/10 py-5 font-display text-3xl text-mist-100 transition-colors active:text-sky-glow"
                >
                  {link.label}
                  <ArrowUpRight size={22} className="text-mist-500" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-6">
            <Button
              href="/#contato"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Pedir orçamento
            </Button>
            <div className="flex items-center justify-between text-sm text-mist-400">
              <a href={`mailto:${email}`} className="truncate pr-4">
                {email}
              </a>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="shrink-0 text-mist-100"
                >
                  <InstagramIcon size={22} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
