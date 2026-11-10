import type { PortfolioContent, Project } from "@/lib/supabase/types";
import { Reveal } from "@/components/ui/reveal";
import { PortfolioGallery } from "./portfolio-gallery";

export function Portfolio({
  projects,
  content,
}: {
  projects: Project[];
  content: PortfolioContent;
}) {
  return (
    <section id="portfolio" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-glow">
              Portfólio
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1.08] text-balance text-mist-100 sm:text-5xl lg:text-6xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-mist-400">
            {content.description}
          </p>
        </Reveal>

        <PortfolioGallery projects={projects} />
      </div>
    </section>
  );
}
