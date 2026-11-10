"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SiteContent } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import {
  AboutForm,
  BeliefsForm,
  ContactForm,
  HeroForm,
  PortfolioForm,
  ProcessForm,
  ServicesForm,
  StudioForm,
  TransitionForm,
} from "./content-forms";

type SectionId = keyof SiteContent;

const sections: { id: SectionId; label: string; hint: string }[] = [
  { id: "hero", label: "Topo da página", hint: "Título, descrição, botão e fundo" },
  { id: "portfolio", label: "Portfólio (cabeçalho)", hint: "Título e texto acima dos vídeos" },
  { id: "transition", label: "Frase em destaque (azul)", hint: "Manifesto depois do portfólio" },
  { id: "about", label: "Sobre", hint: "Abertura, textos e foto" },
  { id: "studio", label: "Quem é a Filmar", hint: "Apresentação e pilares" },
  { id: "services", label: "Serviços", hint: "O que a produtora faz" },
  { id: "process", label: "Como trabalhamos", hint: "Etapas do processo" },
  { id: "beliefs", label: "O que acreditamos", hint: "Bloco editorial azul" },
  { id: "contact", label: "Contato e redes", hint: "Email, telefone, WhatsApp e redes sociais" },
];

/**
 * Edição dos textos do site em blocos colapsáveis, na mesma ordem da página.
 * Cada bloco tem seu próprio formulário e Server Action.
 */
export function ContentManager({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState<SectionId | null>("hero");

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isOpen = open === section.id;
        const panelId = `painel-${section.id}`;
        return (
          <div
            key={section.id}
            className={cn(
              "overflow-hidden rounded-2xl border bg-ink-900/60 transition-colors",
              isOpen ? "border-sky-glow/40" : "border-ink-700",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : section.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-800/40 sm:px-6"
            >
              <span className="min-w-0">
                <span className="block font-medium text-mist-100">
                  {section.label}
                </span>
                <span className="block truncate text-sm text-mist-500">
                  {section.hint}
                </span>
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 text-mist-400 transition-transform",
                  isOpen && "rotate-180 text-sky-glow",
                )}
              />
            </button>

            {isOpen && (
              <div id={panelId} className="border-t border-ink-700 p-5 sm:p-6">
                {section.id === "hero" && <HeroForm content={content.hero} />}
                {section.id === "transition" && (
                  <TransitionForm content={content.transition} />
                )}
                {section.id === "about" && <AboutForm content={content.about} />}
                {section.id === "studio" && (
                  <StudioForm content={content.studio} />
                )}
                {section.id === "services" && (
                  <ServicesForm content={content.services} />
                )}
                {section.id === "portfolio" && (
                  <PortfolioForm content={content.portfolio} />
                )}
                {section.id === "process" && (
                  <ProcessForm content={content.process} />
                )}
                {section.id === "beliefs" && (
                  <BeliefsForm content={content.beliefs} />
                )}
                {section.id === "contact" && (
                  <ContactForm content={content.contact} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
