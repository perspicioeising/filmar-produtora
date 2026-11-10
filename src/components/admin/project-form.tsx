"use client";

import { useActionState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { saveProject, type ProjectActionState } from "@/lib/actions/projects";
import type { Project } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MediaUpload } from "./media-upload";

const initialState: ProjectActionState = { status: "idle" };

type Props = {
  /** projeto em edição; ausente = criação */
  project?: Project;
  /** categorias já usadas, para sugerir no campo */
  categories?: string[];
};

export function ProjectForm({ project, categories = [] }: Props) {
  const [state, formAction, pending] = useActionState(
    saveProject,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-8 pb-28 sm:pb-0">
      {project && <input type="hidden" name="id" value={project.id} />}

      <Block title="Mídia">
        <MediaUpload
          name="video_url"
          label="Vídeo"
          kind="video"
          folder="videos"
          defaultValue={project?.video_url}
          hint="Dica: links do YouTube ou Vimeo carregam mais rápido e não ocupam espaço de armazenamento."
        />
        <MediaUpload
          name="thumbnail_url"
          label="Capa (thumbnail)"
          kind="image"
          folder="thumbnails"
          defaultValue={project?.thumbnail_url}
          hint="Formato 16:9 funciona melhor. Para vídeos do YouTube, a capa é automática se você não enviar uma."
        />
      </Block>

      <Block title="Informações">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Título *" htmlFor="title">
            <Input
              id="title"
              name="title"
              required
              defaultValue={project?.title}
              placeholder="Nome do projeto"
            />
          </Field>
          <Field label="Cliente" htmlFor="client">
            <Input
              id="client"
              name="client"
              defaultValue={project?.client ?? ""}
              placeholder="Nome do cliente"
            />
          </Field>
          <Field label="Categoria" htmlFor="category">
            <Input
              id="category"
              name="category"
              list="categorias"
              defaultValue={project?.category ?? ""}
              placeholder="Comercial, Clipe, Institucional..."
            />
            <datalist id="categorias">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Ano" htmlFor="year">
            <Input
              id="year"
              name="year"
              type="number"
              inputMode="numeric"
              min={1900}
              max={2100}
              defaultValue={project?.year ?? ""}
              placeholder={String(new Date().getFullYear())}
            />
          </Field>
        </div>

        <Field label="Nossa função no projeto" htmlFor="role">
          <Input
            id="role"
            name="role"
            defaultValue={project?.role ?? ""}
            placeholder="Direção, captação e montagem"
          />
        </Field>

        <Field label="Descrição" htmlFor="description">
          <Textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={project?.description ?? ""}
            placeholder="Conte brevemente sobre o projeto"
          />
        </Field>
      </Block>

      <Block title="Exibição">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ordem (menor aparece primeiro)" htmlFor="sort_order">
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              inputMode="numeric"
              defaultValue={project?.sort_order ?? 0}
            />
          </Field>
          <Field label="Endereço da página (opcional)" htmlFor="slug">
            <Input
              id="slug"
              name="slug"
              defaultValue={project?.slug ?? ""}
              placeholder="gerado a partir do título"
            />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Toggle
            name="published"
            defaultChecked={project?.published ?? true}
            title="Publicado"
            description="Visível no site. Desligue para manter como rascunho."
          />
          <Toggle
            name="featured"
            defaultChecked={project?.featured ?? false}
            title="Destaque"
            description="Aparece primeiro e em tamanho maior no portfólio."
          />
        </div>
      </Block>

      {/* Barra de ações: fixa no rodapé em telas pequenas */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-700 bg-ink-950/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        {state.status === "error" && (
          <p
            role="alert"
            className="mb-3 flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle size={16} className="shrink-0" />
            {state.message}
          </p>
        )}
        <div className="flex gap-3">
          <Button type="submit" disabled={pending} className="flex-1 sm:flex-none">
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
          <Button href="/admin/projetos" variant="outline">
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-2xl border border-ink-700 bg-ink-900/60 p-5 sm:p-7">
      <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-mist-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-mist-300"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  name,
  title,
  description,
  defaultChecked,
}: {
  name: string;
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-ink-700 bg-ink-850 p-4 transition-colors has-[:checked]:border-sky-glow/60">
      <span>
        <span className="block text-sm font-medium text-mist-100">{title}</span>
        <span className="mt-0.5 block text-xs text-mist-500">{description}</span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-ink-600 transition-colors peer-checked:bg-sky-glow peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky-glow" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
