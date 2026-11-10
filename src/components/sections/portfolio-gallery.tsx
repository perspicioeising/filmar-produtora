"use client";

import { useMemo, useState } from "react";
import { Film } from "lucide-react";
import type { Project } from "@/lib/supabase/types";
import { ProjectCard } from "@/components/portfolio/project-card";
import { cn } from "@/lib/utils";

const ALL = "Todos";

export function PortfolioGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return [ALL, ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(
    () =>
      active === ALL ? projects : projects.filter((p) => p.category === active),
    [projects, active],
  );

  if (projects.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-mist-100/15 px-6 py-24 text-center">
        <Film size={30} strokeWidth={1.25} className="text-mist-500" />
        <p className="text-xl text-mist-100">Portfólio em produção</p>
        <p className="max-w-sm text-sm text-mist-400">
          Os primeiros projetos aparecem aqui em breve.
        </p>
      </div>
    );
  }

  // O primeiro item vira destaque largo quando há o que comparar
  const showLead = active === ALL && filtered.length >= 3;

  return (
    <>
      {categories.length > 2 && (
        <div
          role="tablist"
          aria-label="Filtrar por categoria"
          className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                "h-10 shrink-0 rounded-full border px-5 text-sm transition-colors",
                active === cat
                  ? "border-sky-glow bg-sky-glow text-ink-950"
                  : "border-mist-100/15 text-mist-300 hover:border-mist-100/50 hover:text-mist-100",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={cn(showLead && i === 0 && "sm:col-span-2")}
          >
            <ProjectCard
              project={project}
              large={showLead && i === 0}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </>
  );
}
