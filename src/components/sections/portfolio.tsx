import { Reveal } from "@/components/ui/reveal";
import { PortfolioGallery } from "./portfolio-gallery";
import type { PortfolioContent, Project } from "@/lib/supabase/types";

type Props = {
  projects: Project[];
  content: PortfolioContent;
};

export function Portfolio({ projects, content }: Props) {
  return (
    <section
      id="portfolio"
      className="border-t border-ink-800 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl leading-tight text-balance text-mist-100 sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-xs font-light text-mist-400 sm:text-right">
            {content.description}
          </p>
        </Reveal>

        <PortfolioGallery projects={projects} />
      </div>
    </section>
  );
}
