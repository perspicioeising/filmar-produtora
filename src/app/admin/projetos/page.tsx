import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Eye, EyeOff, Film, Pencil, Plus, Star } from "lucide-react";
import { getAllProjects } from "@/lib/data/projects";
import { deleteProject, togglePublished } from "@/lib/actions/projects";
import { parseVideo } from "@/lib/media";
import { PageHeader } from "@/components/admin/page-header";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Projetos" };
export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const [projects, { salvo }] = await Promise.all([
    getAllProjects(),
    searchParams,
  ]);

  return (
    <>
      <PageHeader
        title="Projetos"
        description="Os vídeos que aparecem no portfólio do site."
        action={
          <Button href="/admin/projetos/novo">
            <Plus size={16} />
            Novo projeto
          </Button>
        }
      />

      {salvo && (
        <p
          role="status"
          className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
        >
          <CheckCircle2 size={16} />
          Projeto salvo.
        </p>
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-600 px-6 py-20 text-center">
          <Film size={30} strokeWidth={1.25} className="text-mist-500" />
          <p className="text-mist-100">Nenhum projeto ainda</p>
          <p className="max-w-xs text-sm text-mist-500">
            Adicione o primeiro vídeo para ele aparecer no portfólio.
          </p>
          <Button href="/admin/projetos/novo">
            <Plus size={16} />
            Adicionar projeto
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => {
            const source = parseVideo(project.video_url);
            const cover =
              project.thumbnail_url ??
              (source?.type === "youtube" ? source.thumbnail : null);

            return (
              <li
                key={project.id}
                className="rounded-2xl border border-ink-700 bg-ink-900/60 p-3 sm:p-4"
              >
                <div className="flex gap-3 sm:gap-4">
                  <Link
                    href={`/admin/projetos/${project.id}`}
                    className="relative aspect-video w-28 shrink-0 self-start overflow-hidden rounded-lg bg-ink-800 sm:w-40"
                    aria-label={`Editar ${project.title}`}
                  >
                    {cover ? (
                      <Image
                        src={cover}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-ink-600">
                        <Film size={22} />
                      </span>
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h2 className="truncate font-sans text-base font-medium text-mist-100">
                        {project.title}
                      </h2>
                      {project.featured && (
                        <Star
                          size={14}
                          className="shrink-0 text-sky-glow"
                          fill="currentColor"
                          aria-label="Destaque"
                        />
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-mist-500">
                      {[project.category, project.client, project.year]
                        .filter(Boolean)
                        .join(" · ") || "Sem detalhes"}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs ${
                        project.published
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-ink-700 text-mist-400"
                      }`}
                    >
                      {project.published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-ink-700 pt-3">
                  <Link
                    href={`/admin/projetos/${project.id}`}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-ink-600 text-sm text-mist-100 transition-colors hover:border-sky-glow hover:text-sky-glow sm:flex-none sm:px-5"
                  >
                    <Pencil size={15} />
                    Editar
                  </Link>
                  <form action={togglePublished} className="flex-1 sm:flex-none">
                    <input type="hidden" name="id" value={project.id} />
                    <input
                      type="hidden"
                      name="next"
                      value={String(!project.published)}
                    />
                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-ink-600 px-4 text-sm text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-100"
                    >
                      {project.published ? (
                        <>
                          <EyeOff size={15} />
                          Despublicar
                        </>
                      ) : (
                        <>
                          <Eye size={15} />
                          Publicar
                        </>
                      )}
                    </button>
                  </form>
                  <ConfirmDeleteButton
                    action={deleteProject}
                    id={project.id}
                    confirmText={`Excluir "${project.title}"? Essa ação não pode ser desfeita.`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
