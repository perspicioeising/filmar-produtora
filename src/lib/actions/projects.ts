"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProjectActionState = {
  status: "idle" | "success" | "error";
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

/** Faz upload de um arquivo para um bucket e retorna a URL pública. */
async function uploadToBucket(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: "videos" | "thumbnails",
  file: File,
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(`Falha no upload (${bucket}): ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

/** Extrai o path do objeto a partir de uma URL pública do Storage. */
function storagePathFromUrl(url: string, bucket: string): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

/** Cria ou atualiza um projeto, com upload opcional de vídeo/thumbnail. */
export async function saveProject(
  _prev: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  try {
    const supabase = await requireAuth();

    const id = String(formData.get("id") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    if (!title) {
      return { status: "error", message: "O título é obrigatório." };
    }

    const description = String(formData.get("description") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const client = String(formData.get("client") ?? "").trim();
    const featured = formData.get("featured") === "on";
    const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;

    const videoFile = formData.get("video") as File | null;
    const thumbFile = formData.get("thumbnail") as File | null;

    let video_url: string | undefined;
    let thumbnail_url: string | undefined;

    if (videoFile && videoFile.size > 0) {
      video_url = await uploadToBucket(supabase, "videos", videoFile);
    }
    if (thumbFile && thumbFile.size > 0) {
      thumbnail_url = await uploadToBucket(supabase, "thumbnails", thumbFile);
    }

    const payload = {
      title,
      description: description || null,
      category: category || null,
      client: client || null,
      featured,
      sort_order: sortOrder,
      ...(video_url ? { video_url } : {}),
      ...(thumbnail_url ? { thumbnail_url } : {}),
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

    revalidatePath("/admin");
    revalidatePath("/");
    return {
      status: "success",
      message: id ? "Projeto atualizado." : "Projeto criado.",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[saveProject]", message);
    return { status: "error", message };
  }
}

/** Remove um projeto e, quando possível, seus arquivos no Storage. */
export async function deleteProject(formData: FormData): Promise<void> {
  const supabase = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  // Busca URLs para limpar o Storage após remover a linha.
  const { data: project } = await supabase
    .from("projects")
    .select("video_url, thumbnail_url")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    console.error("[deleteProject]", error.message);
    return;
  }

  // Best-effort: remove os arquivos associados.
  if (project?.video_url) {
    const path = storagePathFromUrl(project.video_url, "videos");
    if (path) await supabase.storage.from("videos").remove([path]);
  }
  if (project?.thumbnail_url) {
    const path = storagePathFromUrl(project.thumbnail_url, "thumbnails");
    if (path) await supabase.storage.from("thumbnails").remove([path]);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
