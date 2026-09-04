"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
      <div className="mt-16 flex flex-col items-center gap-4 border border-dashed border-ink-700 px-6 py-24 text-center">
        <Film size={28} strokeWidth={1.25} className="text-mist-500" />
        <h3 className="text-lg font-normal text-mist-100">
          Portfólio em produção
        </h3>
        <p className="max-w-sm text-sm font-light text-mist-400">
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
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                "text-sm transition-colors",
                active === cat
                  ? "text-mist-100"
                  : "text-mist-500 hover:text-mist-300",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grade de projetos — vídeos em destaque */}
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => project.video_url && setSelected(project)}
          />
        ))}
      </div>

      {/* Modal do player */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setSelected(null)}
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 bg-ink-950/70 text-mist-300 backdrop-blur transition-colors hover:border-mist-300 hover:text-mist-100 sm:-top-12 sm:right-0 sm:bg-transparent sm:backdrop-blur-none"
            >
              <X size={20} />
            </button>

            <div className="overflow-hidden bg-black">
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

            <div className="mt-5">
              {selected.category && (
                <span className="text-xs uppercase tracking-[0.25em] text-mist-500">
                  {selected.category}
                </span>
              )}
              <h3 className="mt-2 text-xl font-normal text-mist-100 sm:text-2xl">
                {selected.title}
              </h3>
              {selected.description && (
                <p className="mt-2 max-w-2xl text-sm font-light text-mist-400">
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

/**
 * Card de projeto. Se houver vídeo, ele inicia em preview mudo/loop quando
 * entra na viewport (respeitando prefers-reduced-motion), reforçando o
 * protagonismo do audiovisual. Caso contrário, mostra a thumbnail.
 */
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const hasVideo = Boolean(project.video_url);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      className="group text-left"
    >
      <div className="relative aspect-video overflow-hidden bg-ink-850">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={project.video_url ?? undefined}
            poster={project.thumbnail_url ?? undefined}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        ) : project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-900 text-ink-600">
            <Film size={40} strokeWidth={1.25} />
          </div>
        )}

        <div className="absolute inset-0 bg-ink-950/10 transition-colors duration-500 group-hover:bg-ink-950/0" />

        {hasVideo && (
          <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-mist-100/40 bg-ink-950/40 text-mist-100 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </span>
        )}
      </div>

      <div className="mt-4">
        {project.category && (
          <span className="text-xs uppercase tracking-[0.25em] text-mist-500">
            {project.category}
          </span>
        )}
        <h3 className="mt-1.5 text-lg font-normal text-mist-100">
          {project.title}
        </h3>
        {project.client && (
          <p className="text-sm font-light text-mist-400">{project.client}</p>
        )}
      </div>
    </button>
  );
}
