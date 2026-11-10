"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Film, Play } from "lucide-react";
import type { Project } from "@/lib/supabase/types";
import { parseVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Melhor imagem de capa disponível: thumbnail enviada > thumb do YouTube. */
export function getProjectCover(project: Project): string | null {
  if (project.thumbnail_url) return project.thumbnail_url;
  const video = parseVideo(project.video_url);
  return video?.type === "youtube" ? video.thumbnail : null;
}

type Props = {
  project: Project;
  /** Card largo (destaque) */
  large?: boolean;
  priority?: boolean;
};

/**
 * Card de projeto. Em dispositivos com hover (desktop), vídeos em arquivo
 * tocam um preview mudo ao passar o mouse. No toque, a capa fica estática
 * (economiza dados e bateria) e o clique abre a página do projeto.
 */
export function ProjectCard({ project, large, priority }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cover = getProjectCover(project);
  const source = parseVideo(project.video_url);
  const isFile = source?.type === "file";

  const meta = [project.category, project.year].filter(Boolean).join(" · ");

  function play() {
    videoRef.current?.play().catch(() => {});
  }
  function stop() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <Link
      href={`/projetos/${project.slug}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group block"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-ink-850",
          large ? "aspect-video lg:aspect-[21/9]" : "aspect-video",
        )}
      >
        {cover ? (
          <Image
            src={cover}
            alt={`Capa do projeto ${project.title}`}
            fill
            priority={priority}
            sizes={
              large
                ? "(max-width: 1024px) 100vw, 1200px"
                : "(max-width: 640px) 100vw, 600px"
            }
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
          />
        ) : isFile ? (
          <video
            src={`${source.url}#t=0.5`}
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-600">
            <Film size={44} strokeWidth={1.25} />
          </div>
        )}

        {/* Preview em vídeo (só desktop, só arquivos) */}
        {isFile && cover && (
          <video
            ref={videoRef}
            src={source.url}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:block"
          />
        )}
        {isFile && !cover && (
          <video
            ref={videoRef}
            src={source.url}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:hover)]:block"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />

        {source && (
          <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-mist-100/90 text-ink-950 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-glow sm:bottom-4 sm:left-4 sm:h-12 sm:w-12">
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </span>
        )}

        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-sky-glow backdrop-blur">
            Destaque
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {meta && (
            <p className="text-xs uppercase tracking-[0.22em] text-mist-500">
              {meta}
            </p>
          )}
          <h3
            className={cn(
              "mt-1.5 text-mist-100 transition-colors group-hover:text-sky-glow",
              large ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {project.title}
          </h3>
          {project.client && (
            <p className="mt-1 text-sm text-mist-400">{project.client}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
