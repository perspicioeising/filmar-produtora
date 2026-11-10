import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Film } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/data/projects";
import { parseVideo } from "@/lib/media";
import { getProjectCover } from "@/components/portfolio/project-card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projeto não encontrado" };

  const description =
    project.description ??
    `${project.title}${project.client ? `, para ${project.client}` : ""} — projeto da Filmar.`;
  const cover = getProjectCover(project);

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      type: "website",
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [project, all] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);
  if (!project) notFound();

  const source = parseVideo(project.video_url);
  const cover = getProjectCover(project);

  const index = all.findIndex((p) => p.id === project.id);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;

  const details = [
    { label: "Cliente", value: project.client },
    { label: "Categoria", value: project.category },
    { label: "Ano", value: project.year ? String(project.year) : null },
    { label: "Nossa função", value: project.role },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value));

  return (
    <article className="pb-20 pt-24 sm:pt-28">
      <div className="container-x">
        <Link
          href="/#portfolio"
          className="inline-flex h-11 items-center gap-2 text-sm text-mist-400 transition-colors hover:text-sky-glow"
        >
          <ArrowLeft size={16} />
          Todos os trabalhos
        </Link>

        {/* Player */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-black ring-1 ring-mist-100/10 sm:rounded-3xl">
          <div className="relative aspect-video w-full">
            {source?.type === "file" ? (
              <video
                src={source.url}
                poster={cover ?? undefined}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full"
              />
            ) : source ? (
              <iframe
                src={source.embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : cover ? (
              <Image
                src={cover}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink-600">
                <Film size={56} strokeWidth={1} />
              </div>
            )}
          </div>
        </div>

        {/* Informações */}
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {project.category && (
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-glow">
                {project.category}
              </p>
            )}
            <h1 className="mt-4 text-4xl leading-[1.08] text-balance text-mist-100 sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-mist-300 sm:text-lg">
                {project.description}
              </p>
            )}
          </div>

          {details.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start border-t border-mist-100/10 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs uppercase tracking-[0.22em] text-mist-500">
                    {d.label}
                  </dt>
                  <dd className="mt-1.5 text-mist-100">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* CTA + próximo projeto */}
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-sky-glow p-8 text-ink-950 sm:p-10">
            <p className="font-display text-3xl leading-tight text-balance sm:text-4xl">
              Tem um projeto parecido em mente?
            </p>
            <Button href="/#contato" variant="light" size="lg">
              Vamos conversar
              <ArrowUpRight size={18} />
            </Button>
          </div>

          {next && (
            <Link
              href={`/projetos/${next.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-3xl border border-mist-100/10 p-8 transition-colors hover:border-sky-glow/60 sm:p-10"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-mist-500">
                Próximo projeto
              </span>
              <span className="flex items-end justify-between gap-4">
                <span className="font-display text-3xl leading-tight text-mist-100 sm:text-4xl">
                  {next.title}
                </span>
                <ArrowUpRight
                  size={28}
                  className="shrink-0 text-sky-glow transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
