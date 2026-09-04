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

type Props = {
  content: SiteContent;
};

type SectionId =
  | "hero"
  | "transition"
  | "about"
  | "studio"
  | "services"
  | "portfolio"
  | "process"
  | "beliefs"
  | "contact";

const sections: { id: SectionId; label: string; hint: string }[] = [
  { id: "hero", label: "Hero", hint: "Título, descrição, CTA e mídia de fundo" },
  { id: "transition", label: "Transição", hint: "Frase contemplativa após o hero" },
  { id: "about", label: "Sobre mim", hint: "Andressa: abertura, textos e foto" },
  { id: "studio", label: "Quem é a Filmar", hint: "Apresentação e 3 pilares" },
  { id: "services", label: "Serviços", hint: "Categorias de trabalho" },
  { id: "portfolio", label: "Portfólio", hint: "Título e descrição da seção" },
  { id: "process", label: "Processo", hint: "Etapas de como trabalhamos" },
  { id: "beliefs", label: "O que acreditamos", hint: "Bloco editorial" },
  { id: "contact", label: "Contato", hint: "Textos, dados de contato e redes" },
];

/**
 * Painel de edição do conteúdo da landing page, organizado em blocos
 * colapsáveis por seção. Cada bloco tem seu próprio formulário e Server Action.
 * A ordem espelha a da landing page.
 */
export function ContentManager({ content }: Props) {
  const [open, setOpen] = useState<SectionId | null>("hero");

  function toggle(id: SectionId) {
    setOpen((cur) => (cur === id ? null : id));
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-mist-100">
        Conteúdo do site
      </h2>
      <p className="mt-1 text-sm text-mist-500">
        Edite os textos, contato, redes e seções exibidos na landing page.
      </p>

      <div className="mt-5 space-y-3">
        {sections.map((section) => {
          const isOpen = open === section.id;
          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-850/50"
            >
              <button
                type="button"
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-ink-800/40"
              >
                <span>
                  <span className="block font-medium text-mist-100">
                    {section.label}
                  </span>
                  <span className="block text-sm text-mist-500">
                    {section.hint}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-mist-400 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <div className="border-t border-ink-700 p-6">
                  {section.id === "hero" && <HeroForm content={content.hero} />}
                  {section.id === "transition" && (
                    <TransitionForm content={content.transition} />
                  )}
                  {section.id === "about" && (
                    <AboutForm content={content.about} />
                  )}
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
    </section>
  );
}
