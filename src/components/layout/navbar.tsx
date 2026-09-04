"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-700 bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#hero" aria-label="Filmar" onClick={() => setOpen(false)}>
          <Logo size="sm" />
        </Link>

        {/* Navegação desktop */}
        <ul className="hidden items-center gap-8 md:flex">
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

        <div className="hidden md:block">
          <Button href="#contato" size="sm">
            Contato
          </Button>
        </div>

        {/* Botão do menu mobile */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="text-mist-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Painel do menu mobile */}
      <div
        className={cn(
          "overflow-hidden border-t border-ink-700 bg-ink-950/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-transparent",
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-mist-300 transition-colors hover:bg-ink-800 hover:text-sky-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <Button
              href="#contato"
              size="sm"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Contato
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
