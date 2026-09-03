"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play, X, Film } from "lucide-react";
import type { Project } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
};

const ALL = "Todos";

export function PortfolioGallery({ projects }: Props) {
  const [active, setActive] = useState<string>(ALL);
  const [selected, setSelected] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return [ALL, ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => p.category === active),
    [projects, active],
  );

  // Estado vazio: nenhum projeto cadastrado ainda.
  if (projects.length === 0) {
    return (
      <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-600 bg-ink-850/40 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-800 text-sky-glow">
          <Film size={26} />
        </div>
        <h3 className="text-lg font-medium text-mist-100">
          Portfólio em produção
        </h3>
        <p className="max-w-sm text-sm text-mist-400">
          Os projetos aparecerão aqui assim que forem publicados pelo painel
          administrativo.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Filtros por categoria */}
      {categories.length > 1 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === cat
                  ? "border-sky-glow bg-sky-glow/10 text-sky-bright"
                  : "border-ink-600 text-mist-400 hover:border-mist-500 hover:text-mist-100",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grade de cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => project.video_url && setSelected(project)}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 text-left transition-all hover:border-sky-glow/50"
          >
            {project.thumbnail_url ? (
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900 text-ink-600">
                <Film size={40} />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

            {/* Ícone de play no hover */}
            {project.video_url && (
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-glow/90 text-ink-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </span>
            )}

            {/* Info */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              {project.category && (
                <span className="text-xs uppercase tracking-widest text-sky-glow">
                  {project.category}
                </span>
              )}
              <h3 className="mt-1 font-medium text-mist-100">
                {project.title}
              </h3>
              {project.client && (
                <p className="text-sm text-mist-400">{project.client}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal do player */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setSelected(null)}
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 bg-ink-950/70 text-mist-300 backdrop-blur transition-colors hover:border-sky-glow hover:text-sky-bright sm:-top-12 sm:right-0 sm:bg-transparent sm:backdrop-blur-none"
            >
              <X size={20} />
            </button>

            <div className="overflow-hidden rounded-2xl border border-ink-700 bg-black">
              <video
                key={selected.id}
                src={selected.video_url ?? undefined}
                poster={selected.thumbnail_url ?? undefined}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full"
              />
            </div>

            <div className="mt-4">
              {selected.category && (
                <span className="text-xs uppercase tracking-widest text-sky-glow">
                  {selected.category}
                </span>
              )}
              <h3 className="mt-1 font-display text-xl font-semibold text-mist-100 sm:text-2xl">
                {selected.title}
              </h3>
              {selected.description && (
                <p className="mt-2 max-w-2xl text-sm text-mist-400">
                  {selected.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
