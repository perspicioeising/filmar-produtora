import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/supabase/types";

/** Busca os leads (mais recentes primeiro). Requer sessão autenticada (RLS). */
export const getLeads = cache(async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getLeads]", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[getLeads] falha inesperada:", err);
    return [];
  }
});
