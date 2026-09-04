import { Resend } from "resend";

type LeadEmailPayload = {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
};

/**
 * Envia um email de notificação de novo lead via Resend.
 *
 * Projetado para NÃO lançar exceção: retorna { ok } para que o chamador
 * (a Server Action de contato) nunca falhe a persistência por causa do email.
 * Se a env não estiver configurada, apenas registra e segue.
 */
export async function sendLeadNotification(
  payload: LeadEmailPayload,
): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_NOTIFICATION_FROM;
  const to = process.env.LEAD_NOTIFICATION_TO;

  // Sem configuração válida: não é erro, só não envia.
  if (!apiKey || apiKey.startsWith("re_placeholder") || !from || !to) {
    console.warn(
      "[sendLeadNotification] Resend não configurado — email ignorado.",
    );
    return { ok: false };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Novo contato: ${payload.name}`,
      text: buildText(payload),
      html: buildHtml(payload),
    });

    if (error) {
      console.error("[sendLeadNotification] erro do Resend:", error);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[sendLeadNotification] falha inesperada:", err);
    return { ok: false };
  }
}

function buildText({ name, email, phone, message }: LeadEmailPayload): string {
  return [
    "Novo contato pelo site da Filmar",
    "",
    `Nome: ${name}`,
    `Email: ${email}`,
    `Telefone: ${phone || "não informado"}`,
    "",
    "Mensagem:",
    message,
  ].join("\n");
}

function buildHtml({ name, email, phone, message }: LeadEmailPayload): string {
  const safe = (v: string) =>
    v
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#0f0f0f;color:#f2f1ef;border:1px solid #242424;overflow:hidden">
    <div style="background:#141414;padding:20px 24px;border-bottom:1px solid #242424">
      <h1 style="margin:0;font-size:18px;color:#f2f1ef;letter-spacing:2px">FILMAR</h1>
      <p style="margin:4px 0 0;font-size:13px;color:#9a9a96">Novo contato pelo site</p>
    </div>
    <div style="padding:24px">
      <p style="margin:0 0 12px"><strong style="color:#cfcecb">Nome:</strong> ${safe(name)}</p>
      <p style="margin:0 0 12px"><strong style="color:#cfcecb">Email:</strong> ${safe(email)}</p>
      <p style="margin:0 0 12px"><strong style="color:#cfcecb">Telefone:</strong> ${safe(phone || "não informado")}</p>
      <p style="margin:16px 0 6px;color:#cfcecb"><strong>Mensagem:</strong></p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6;color:#cfcecb">${safe(message)}</p>
    </div>
  </div>`;
}
