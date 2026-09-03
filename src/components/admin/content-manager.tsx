"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SiteContent } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import {
  AboutForm,
  ContactForm,
  HeroForm,
  ServicesForm,
} from "./content-forms";

type Props = {
  content: SiteContent;
};

type SectionId = "hero" | "about" | "services" | "contact";

const sections: { id: SectionId; label: string; hint: string }[] = [
  { id: "hero", label: "Hero", hint: "Título, badge, botões e métricas" },
  { id: "about", label: "Sobre", hint: "Textos e pilares" },
  { id: "services", label: "Serviços", hint: "Textos e cards de serviço" },
  { id: "contact", label: "Contato", hint: "Dados de contato e redes" },
];

/**
 * Painel de edição do conteúdo da landing page, organizado em blocos
 * colapsáveis por seção. Cada bloco tem seu próprio formulário e Server Action.
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
        Edite os textos, contato, redes e métricas exibidos na landing page.
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
                  {section.id === "about" && (
                    <AboutForm content={content.about} />
                  )}
                  {section.id === "services" && (
                    <ServicesForm content={content.services} />
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
