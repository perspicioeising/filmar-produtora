"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** erros por campo, para exibição inline */
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

/**
 * Recebe o formulário de contato, valida no servidor e grava o lead.
 * A notificação por email (Task 7) é disparada aqui mas não bloqueia a
 * persistência: se o email falhar, o lead permanece salvo.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: bots preenchem o campo oculto. Responde "sucesso" sem salvar.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "Mensagem enviada!" };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Confira os campos destacados.",
      errors: fieldErrors,
    };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      message,
    });

    if (error) {
      console.error("[submitContact] erro ao salvar lead:", error.message);
      return {
        status: "error",
        message:
          "Não conseguimos enviar sua mensagem agora. Tente novamente em instantes.",
      };
    }
  } catch (err) {
    console.error("[submitContact] falha inesperada:", err);
    return {
      status: "error",
      message: "Ocorreu um erro inesperado. Tente novamente.",
    };
  }

  // Notificação por email — NÃO bloqueia a persistência. Se o envio falhar,
  // o lead já está salvo e o usuário recebe sucesso mesmo assim.
  try {
    const { sendLeadNotification } = await import("@/lib/email");
    await sendLeadNotification({ name, email, phone, message });
  } catch (err) {
    console.error("[submitContact] notificação por email falhou:", err);
  }

  return {
    status: "success",
    message: "Mensagem enviada! Em breve entraremos em contato.",
  };
}
