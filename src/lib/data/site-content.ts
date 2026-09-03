import { createClient } from "@/lib/supabase/server";
import { defaultSiteContent } from "@/lib/content/defaults";
import type {
  SiteContent,
  SiteContentKey,
  SiteContentRow,
} from "@/lib/supabase/types";

/**
 * Mescla o `data` salvo no banco sobre os defaults de uma seção.
 * Merge raso por chave: um valor presente no banco sobrescreve o default;
 * arrays vêm inteiros do banco quando presentes (senão mantém o default).
 */
function mergeSection<T extends Record<string, unknown>>(
  defaults: T,
  stored: Record<string, unknown> | undefined | null,
): T {
  if (!stored || typeof stored !== "object") return defaults;
  const result = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(defaults)) {
    const value = stored[key];
    if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }
  return result as T;
}

/** Aplica as linhas do banco (por chave) sobre os defaults do site. */
function mergeSiteContent(rows: SiteContentRow[]): SiteContent {
  const byKey = new Map(rows.map((row) => [row.key, row.data]));
  const keys = Object.keys(defaultSiteContent) as SiteContentKey[];

  const merged = {} as SiteContent;
  for (const key of keys) {
    // @ts-expect-error — merge por seção preserva o tipo de cada chave.
    merged[key] = mergeSection(defaultSiteContent[key], byKey.get(key));
  }
  return merged;
}

/**
 * Busca o conteúdo editável do site e mescla sobre os defaults.
 *
 * Segue a mesma filosofia de getProjects: nunca lança — em qualquer erro
 * (Supabase não configurado, tabela vazia, etc.) retorna os defaults,
 * garantindo que a landing page sempre renderize.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_content").select("*");

    if (error) {
      console.error("[getSiteContent] erro ao buscar conteúdo:", error.message);
      return defaultSiteContent;
    }

    return mergeSiteContent((data as SiteContentRow[]) ?? []);
  } catch (err) {
    console.error("[getSiteContent] falha inesperada:", err);
    return defaultSiteContent;
  }
}
