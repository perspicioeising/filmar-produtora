"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isValidIcon } from "@/lib/content/icons";
import type { SiteContentKey } from "@/lib/supabase/types";

export type SiteContentActionState = {
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

// ─── Schemas de validação por seção ──────────────────────────────

const iconItemSchema = z.object({
  icon: z
    .string()
    .trim()
    .refine(isValidIcon, { message: "Ícone inválido." }),
  title: z.string().trim().min(1, "O título do item é obrigatório."),
  text: z.string().trim().default(""),
});

const metricSchema = z.object({
  value: z.string().trim().min(1, "O valor da métrica é obrigatório."),
  label: z.string().trim().min(1, "O rótulo da métrica é obrigatório."),
});

const heroSchema = z.object({
  badge: z.string().trim().default(""),
  titlePrefix: z.string().trim().default(""),
  titleHighlight: z.string().trim().default(""),
  titleSuffix: z.string().trim().default(""),
  paragraph: z.string().trim().default(""),
  primaryCta: z.string().trim().min(1, "O texto do botão é obrigatório."),
  secondaryCta: z.string().trim().min(1, "O texto do botão é obrigatório."),
  metrics: z.array(metricSchema),
});

const aboutSchema = z.object({
  eyebrow: z.string().trim().default(""),
  title: z.string().trim().min(1, "O título é obrigatório."),
  paragraph1: z.string().trim().default(""),
  paragraph2: z.string().trim().default(""),
  pillars: z.array(iconItemSchema),
});

const servicesSchema = z.object({
  eyebrow: z.string().trim().default(""),
  title: z.string().trim().min(1, "O título é obrigatório."),
  paragraph: z.string().trim().default(""),
  items: z.array(iconItemSchema),
});

const contactSchema = z.object({
  eyebrow: z.string().trim().default(""),
  title: z.string().trim().min(1, "O título é obrigatório."),
  paragraph: z.string().trim().default(""),
  email: z.string().trim().email("E-mail inválido."),
  phone: z.string().trim().default(""),
  whatsapp: z.string().trim().default(""),
  location: z.string().trim().default(""),
  instagram: z.string().trim().default(""),
  youtube: z.string().trim().default(""),
  vimeo: z.string().trim().default(""),
  description: z.string().trim().default(""),
});

const sectionSchemas = {
  hero: heroSchema,
  about: aboutSchema,
  services: servicesSchema,
  contact: contactSchema,
} as const;

const VALID_KEYS = Object.keys(sectionSchemas) as SiteContentKey[];

/**
 * Monta o objeto da seção a partir do FormData.
 *
 * Campos simples vêm como pares nome/valor. As listas (metrics, pillars,
 * items) são enviadas como um único campo JSON serializado pelo cliente
 * (ex.: name="metrics" com JSON.stringify do array), o que evita problemas
 * de indexação e ordem no FormData.
 */
function buildSectionData(
  key: SiteContentKey,
  formData: FormData,
): Record<string, unknown> {
  const raw: Record<string, unknown> = {};

  for (const [name, value] of formData.entries()) {
    if (name === "key") continue;
    if (typeof value !== "string") continue;

    // Campos de lista chegam serializados em JSON.
    if (["metrics", "pillars", "items"].includes(name)) {
      try {
        raw[name] = JSON.parse(value);
      } catch {
        raw[name] = [];
      }
    } else {
      raw[name] = value;
    }
  }

  return raw;
}

/** Cria ou atualiza (upsert) o conteúdo de uma seção da landing page. */
export async function saveSiteContent(
  _prev: SiteContentActionState,
  formData: FormData,
): Promise<SiteContentActionState> {
  try {
    const supabase = await requireAuth();

    const key = String(formData.get("key") ?? "").trim() as SiteContentKey;
    if (!VALID_KEYS.includes(key)) {
      return { status: "error", message: "Seção inválida." };
    }

    const raw = buildSectionData(key, formData);
    const parsed = sectionSchemas[key].safeParse(raw);

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return {
        status: "error",
        message: first?.message ?? "Dados inválidos.",
      };
    }

    const { error } = await supabase.from("site_content").upsert(
      {
        key,
        data: parsed.data as Record<string, unknown>,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/admin");
    return { status: "success", message: "Conteúdo salvo." };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[saveSiteContent]", message);
    return { status: "error", message };
  }
}
