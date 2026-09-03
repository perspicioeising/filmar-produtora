import { Reveal } from "@/components/ui/reveal";
import { PortfolioGallery } from "./portfolio-gallery";
import type { Project } from "@/lib/supabase/types";

type Props = {
  projects: Project[];
};

export function Portfolio({ projects }: Props) {
  return (
    <section id="portfolio" className="border-t border-ink-800 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-glow">
            Nosso trabalho
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            Portfólio selecionado
          </h2>
          <p className="mt-6 text-mist-400">
            Uma amostra das produções que já entregamos. Clique em um projeto
            para assistir.
          </p>
        </Reveal>

        <PortfolioGallery projects={projects} />
      </div>
    </section>
  );
}
