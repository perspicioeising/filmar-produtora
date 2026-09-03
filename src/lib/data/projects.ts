import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";

/**
 * Busca os projetos do portfólio ordenados por destaque e ordem manual.
 * Retorna array vazio em caso de erro (ex: Supabase não configurado),
 * para que a landing page nunca quebre por causa do banco.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getProjects] erro ao buscar projetos:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getProjects] falha inesperada:", err);
    return [];
  }
}
