"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify, storagePathFromUrl } from "@/lib/media";

export type ProjectActionState = {
  status: "idle" | "error";
  message?: string;
};

/** Garante que há um admin autenticado antes de qualquer mutação. */
async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado.");
  return supabase;
}

function revalidateAll() {
  revalidatePath("/", "layout");
}

/** Gera um slug único: titulo, titulo-2, titulo-3... */
async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  base: string,
  ignoreId?: string,
): Promise<string> {
  let candidate = base;
  for (let n = 2; n < 50; n++) {
    let query = supabase.from("projects").select("id").eq("slug", candidate);
    if (ignoreId) query = query.neq("id", ignoreId);
    const { data } = await query.maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

/**
 * Cria ou atualiza um projeto. Os arquivos (vídeo/thumbnail) já foram
 * enviados direto do navegador ao Storage; aqui chegam apenas as URLs.
 */
export async function saveProject(
  _prev: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  let redirectTo: string | null = null;

  try {
    const supabase = await requireAuth();

    const id = String(formData.get("id") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    if (!title) {
      return { status: "error", message: "O título é obrigatório." };
    }

    const text = (name: string) => {
      const value = String(formData.get(name) ?? "").trim();
      return value || null;
    };

    const yearRaw = String(formData.get("year") ?? "").trim();
    const year = yearRaw ? Number(yearRaw) : null;
    if (year !== null && (!Number.isInteger(year) || year < 1900 || year > 2100)) {
      return { status: "error", message: "Ano inválido." };
    }

    const slugInput = String(formData.get("slug") ?? "").trim();
    const slug = await uniqueSlug(
      supabase,
      slugify(slugInput || title),
      id || undefined,
    );

    const payload = {
      slug,
      title,
      description: text("description"),
      category: text("category"),
      client: text("client"),
      role: text("role"),
      year,
      video_url: text("video_url"),
      thumbnail_url: text("thumbnail_url"),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    };

    if (id) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) throw new Error(error.message);
    }

    revalidateAll();
    redirectTo = "/admin/projetos?salvo=1";
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[saveProject]", message);
    return { status: "error", message };
  }

  // redirect lança internamente; precisa ficar fora do try/catch.
  redirect(redirectTo);
}

/** Remove um projeto e, quando possível, seus arquivos no Storage. */
export async function deleteProject(formData: FormData): Promise<void> {
  const supabase = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const { data: project } = await supabase
    .from("projects")
    .select("video_url, thumbnail_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    console.error("[deleteProject]", error.message);
    return;
  }

  // Best-effort: remove os arquivos associados (só os que estão no bucket).
  const paths = [project?.video_url, project?.thumbnail_url]
    .map((url) => (url ? storagePathFromUrl(url) : null))
    .filter((p): p is string => Boolean(p));
  if (paths.length > 0) {
    await supabase.storage.from("media").remove(paths);
  }

  revalidateAll();
}

/** Alterna entre publicado e rascunho direto na lista. */
export async function togglePublished(formData: FormData): Promise<void> {
  const supabase = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  const next = formData.get("next") === "true";
  if (!id) return;

  const { error } = await supabase
    .from("projects")
    .update({ published: next })
    .eq("id", id);
  if (error) {
    console.error("[togglePublished]", error.message);
    return;
  }
  revalidateAll();
}
