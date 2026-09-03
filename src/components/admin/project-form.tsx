"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import {
  saveProject,
  type ProjectActionState,
} from "@/lib/actions/projects";
import type { Project } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ProjectActionState = { status: "idle" };

type Props = {
  /** projeto em edição; ausente = criação */
  project?: Project;
  onDone?: () => void;
};

export function ProjectForm({ project, onDone }: Props) {
  const [state, formAction, pending] = useActionState(
    saveProject,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      if (!project) formRef.current?.reset();
      onDone?.();
    }
  }, [state.status, project, onDone]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Título *">
          <Input
            name="title"
            required
            defaultValue={project?.title}
            placeholder="Nome do projeto"
          />
        </Labeled>
        <Labeled label="Categoria">
          <Input
            name="category"
            defaultValue={project?.category ?? ""}
            placeholder="Comercial, Clipe, Evento..."
          />
        </Labeled>
      </div>

      <Labeled label="Cliente">
        <Input
          name="client"
          defaultValue={project?.client ?? ""}
          placeholder="Nome do cliente"
        />
      </Labeled>

      <Labeled label="Descrição">
        <Textarea
          name="description"
          defaultValue={project?.description ?? ""}
          placeholder="Breve descrição do projeto"
        />
      </Labeled>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled
          label={`Vídeo ${project?.video_url ? "(substituir)" : "(mp4/webm)"}`}
        >
          <input
            type="file"
            name="video"
            accept="video/mp4,video/webm"
            className="block w-full text-sm text-mist-400 file:mr-3 file:rounded-lg file:border-0 file:bg-ink-700 file:px-3 file:py-2 file:text-mist-100 hover:file:bg-ink-600"
          />
        </Labeled>
        <Labeled
          label={`Thumbnail ${project?.thumbnail_url ? "(substituir)" : "(imagem)"}`}
        >
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            className="block w-full text-sm text-mist-400 file:mr-3 file:rounded-lg file:border-0 file:bg-ink-700 file:px-3 file:py-2 file:text-mist-100 hover:file:bg-ink-600"
          />
        </Labeled>
      </div>

      <div className="grid items-end gap-4 sm:grid-cols-2">
        <Labeled label="Ordem de exibição">
          <Input
            name="sort_order"
            type="number"
            defaultValue={project?.sort_order ?? 0}
          />
        </Labeled>
        <label className="flex items-center gap-2 pb-2 text-sm text-mist-300">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="h-4 w-4 accent-sky-glow"
          />
          Destacar no portfólio
        </label>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Salvando...
            </>
          ) : project ? (
            "Salvar alterações"
          ) : (
            "Criar projeto"
          )}
        </Button>

        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="flex items-center gap-1 text-sm text-mist-400 hover:text-mist-100"
          >
            <X size={14} />
            Cancelar
          </button>
        )}

        {state.status !== "idle" && (
          <span
            className={cn(
              "flex items-center gap-1.5 text-sm",
              state.status === "success" ? "text-emerald-400" : "text-red-400",
            )}
          >
            {state.status === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-mist-300">
        {label}
      </span>
      {children}
    </div>
  );
}
