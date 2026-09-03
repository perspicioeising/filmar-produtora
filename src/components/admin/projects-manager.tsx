"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Film, Star } from "lucide-react";
import type { Project } from "@/lib/supabase/types";
import { deleteProject } from "@/lib/actions/projects";
import { ProjectForm } from "./project-form";
import { Button } from "@/components/ui/button";

type Props = {
  projects: Project[];
};

export function ProjectsManager({ projects }: Props) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-mist-100">
          Projetos
          <span className="ml-2 text-sm font-normal text-mist-500">
            ({projects.length})
          </span>
        </h2>
        {!creating && (
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus size={16} />
            Novo projeto
          </Button>
        )}
      </div>

      {/* Form de criação */}
      {creating && (
        <div className="mt-5 rounded-2xl border border-sky-glow/30 bg-ink-850/50 p-6">
          <h3 className="mb-4 font-medium text-mist-100">Novo projeto</h3>
          <ProjectForm onDone={() => setCreating(false)} />
        </div>
      )}

      {/* Lista */}
      <div className="mt-5 space-y-3">
        {projects.length === 0 && !creating && (
          <p className="rounded-xl border border-dashed border-ink-600 bg-ink-850/40 px-4 py-10 text-center text-sm text-mist-400">
            Nenhum projeto cadastrado ainda. Clique em “Novo projeto”.
          </p>
        )}

        {projects.map((project) =>
          editingId === project.id ? (
            <div
              key={project.id}
              className="rounded-2xl border border-sky-glow/30 bg-ink-850/50 p-6"
            >
              <h3 className="mb-4 font-medium text-mist-100">
                Editar: {project.title}
              </h3>
              <ProjectForm
                project={project}
                onDone={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-xl border border-ink-700 bg-ink-850/50 p-4"
            >
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-ink-800">
                {project.thumbnail_url ? (
                  <Image
                    src={project.thumbnail_url}
                    alt={project.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-600">
                    <Film size={20} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-medium text-mist-100">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Star
                      size={14}
                      className="shrink-0 text-sky-glow"
                      fill="currentColor"
                    />
                  )}
                </div>
                <p className="truncate text-sm text-mist-500">
                  {[project.category, project.client]
                    .filter(Boolean)
                    .join(" · ") || "Sem categoria"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Editar"
                  onClick={() => setEditingId(project.id)}
                  className="rounded-lg border border-ink-600 p-2 text-mist-300 transition-colors hover:border-sky-glow hover:text-sky-bright"
                >
                  <Pencil size={16} />
                </button>
                <form
                  action={deleteProject}
                  onSubmit={(e) => {
                    if (!confirm(`Excluir "${project.title}"?`))
                      e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    aria-label="Excluir"
                    className="rounded-lg border border-ink-600 p-2 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
