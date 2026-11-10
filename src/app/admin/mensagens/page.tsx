import type { Metadata } from "next";
import Link from "next/link";
import { Archive, Check, Inbox, Mail, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { getLeads } from "@/lib/data/leads";
import { deleteLead, setLeadStatus } from "@/lib/actions/leads";
import type { Lead, LeadStatus } from "@/lib/supabase/types";
import { PageHeader } from "@/components/admin/page-header";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Mensagens" };
export const dynamic = "force-dynamic";

const tabs = [
  { id: "ativas", label: "Ativas" },
  { id: "new", label: "Novas" },
  { id: "archived", label: "Arquivadas" },
] as const;

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const [leads, { filtro }] = await Promise.all([getLeads(), searchParams]);
  const current = tabs.find((t) => t.id === filtro)?.id ?? "ativas";

  const visible = leads.filter((l) =>
    current === "ativas"
      ? l.status !== "archived"
      : current === "new"
        ? l.status === "new"
        : l.status === "archived",
  );

  return (
    <>
      <PageHeader
        title="Mensagens"
        description="Contatos enviados pelo formulário do site."
      />

      <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.id === "ativas" ? "/admin/mensagens" : `?filtro=${tab.id}`}
            className={cn(
              "flex h-10 shrink-0 items-center rounded-full border px-5 text-sm transition-colors",
              current === tab.id
                ? "border-sky-glow bg-sky-glow text-ink-950"
                : "border-ink-600 text-mist-300 hover:border-mist-400",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-600 px-4 py-16 text-center">
          <Inbox size={26} className="text-mist-500" />
          <p className="text-sm text-mist-400">Nada por aqui.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      )}
    </>
  );
}

function StatusButton({
  id,
  status,
  Icon,
  children,
}: {
  id: string;
  status: LeadStatus;
  Icon: typeof Check;
  children: React.ReactNode;
}) {
  return (
    <form action={setLeadStatus} className="flex-1 sm:flex-none">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-ink-600 px-4 text-sm text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-100"
      >
        <Icon size={15} />
        {children}
      </button>
    </form>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const phoneDigits = lead.phone?.replace(/\D/g, "") ?? "";
  // Número brasileiro sem DDI: assume +55 para o link do WhatsApp
  const waNumber =
    phoneDigits.length >= 10 && phoneDigits.length <= 11
      ? `55${phoneDigits}`
      : phoneDigits;

  const linkClass =
    "flex h-11 items-center gap-2 rounded-xl bg-ink-800 px-3.5 text-sm text-mist-100 transition-colors hover:bg-ink-700";

  return (
    <li
      className={cn(
        "rounded-2xl border bg-ink-900/60 p-4 sm:p-5",
        lead.status === "new" ? "border-sky-glow/40" : "border-ink-700",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {lead.status === "new" && (
              <span
                aria-label="Nova"
                className="h-2 w-2 shrink-0 rounded-full bg-sky-glow"
              />
            )}
            <h2 className="truncate font-sans text-base font-medium text-mist-100">
              {lead.name}
            </h2>
          </div>
          <time className="mt-0.5 block text-xs text-mist-500">
            {new Date(lead.created_at).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </time>
        </div>
      </div>

      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-mist-300">
        {lead.message}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={`mailto:${lead.email}`} className={linkClass}>
          <Mail size={15} className="text-sky-glow" />
          Responder
        </a>
        {waNumber && (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <MessageCircle size={15} className="text-sky-glow" />
            WhatsApp
          </a>
        )}
        {phoneDigits && (
          <a href={`tel:+${waNumber}`} className={linkClass}>
            <Phone size={15} className="text-sky-glow" />
            {lead.phone}
          </a>
        )}
      </div>
      <p className="mt-2 truncate text-xs text-mist-500">{lead.email}</p>

      <div className="mt-4 flex items-center gap-2 border-t border-ink-700 pt-4">
        {lead.status === "new" && (
          <StatusButton id={lead.id} status="read" Icon={Check}>
            Marcar como lida
          </StatusButton>
        )}
        {lead.status === "read" && (
          <StatusButton id={lead.id} status="new" Icon={RotateCcw}>
            Marcar como nova
          </StatusButton>
        )}
        {lead.status !== "archived" ? (
          <StatusButton id={lead.id} status="archived" Icon={Archive}>
            Arquivar
          </StatusButton>
        ) : (
          <StatusButton id={lead.id} status="read" Icon={RotateCcw}>
            Restaurar
          </StatusButton>
        )}
        <ConfirmDeleteButton
          action={deleteLead}
          id={lead.id}
          confirmText={`Excluir a mensagem de ${lead.name}? Essa ação não pode ser desfeita.`}
        />
      </div>
    </li>
  );
}
