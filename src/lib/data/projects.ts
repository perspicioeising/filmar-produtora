import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";

/**
 * Funções de leitura de projetos. Nunca lançam: em caso de erro (ex.:
 * Supabase não configurado) retornam vazio/nulo para o site não quebrar.
 */

/** Projetos publicados, destaque primeiro e depois pela ordem manual. */
export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getProjects]", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getProjects] falha inesperada:", err);
    return [];
  }
}

/** Todos os projetos, inclusive rascunhos (uso do admin). */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getAllProjects]", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getAllProjects] falha inesperada:", err);
    return [];
  }
}

/** Projeto publicado pelo slug (página pública). */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("[getProjectBySlug]", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[getProjectBySlug] falha inesperada:", err);
    return null;
  }
}

/** Projeto por id, inclusive rascunho (edição no admin). */
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[getProjectById]", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[getProjectById] falha inesperada:", err);
    return null;
  }
}
