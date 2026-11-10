"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/supabase/types";

const STATUSES: LeadStatus[] = ["new", "read", "archived"];

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado.");
  return supabase;
}

/** Atualiza o status de uma mensagem (nova, lida ou arquivada). */
export async function setLeadStatus(formData: FormData): Promise<void> {
  const supabase = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "") as LeadStatus;
  if (!id || !STATUSES.includes(status)) return;

  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) {
    console.error("[setLeadStatus]", error.message);
    return;
  }
  revalidatePath("/admin", "layout");
}

/** Exclui uma mensagem definitivamente. */
export async function deleteLead(formData: FormData): Promise<void> {
  const supabase = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) {
    console.error("[deleteLead]", error.message);
    return;
  }
  revalidatePath("/admin", "layout");
}
