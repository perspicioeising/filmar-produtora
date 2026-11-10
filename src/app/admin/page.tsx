import Link from "next/link";
import { ArrowUpRight, Clapperboard, Inbox, PenLine, Plus } from "lucide-react";
import { getAllProjects } from "@/lib/data/projects";
import { getLeads } from "@/lib/data/leads";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [projects, leads] = await Promise.all([getAllProjects(), getLeads()]);

  const published = projects.filter((p) => p.published).length;
  const drafts = projects.length - published;
  const unread = leads.filter((l) => l.status === "new").length;
  const latest = leads.filter((l) => l.status !== "archived").slice(0, 4);

  const stats = [
    { label: "Projetos no ar", value: published, href: "/admin/projetos" },
    { label: "Rascunhos", value: drafts, href: "/admin/projetos" },
    { label: "Mensagens novas", value: unread, href: "/admin/mensagens" },
  ];

  return (
    <>
      <PageHeader
        title="Olá 👋"
        description="Resumo do que está acontecendo no site."
        action={
          <Button href="/admin/projetos/novo">
            <Plus size={16} />
            Novo projeto
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-ink-700 bg-ink-900/60 p-4 transition-colors hover:border-sky-glow/50 sm:p-6"
          >
            <p className="font-display text-4xl text-mist-100 sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs text-mist-500 sm:text-sm">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Shortcut
          href="/admin/projetos"
          Icon={Clapperboard}
          title="Gerenciar projetos"
          text="Adicionar vídeos, editar capas e ordem."
        />
        <Shortcut
          href="/admin/conteudo"
          Icon={PenLine}
          title="Editar textos do site"
          text="Títulos, sobre, serviços e contatos."
        />
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl text-mist-100">Últimas mensagens</h2>
          <Link
            href="/admin/mensagens"
            className="text-sm text-sky-glow hover:underline"
          >
            Ver todas
          </Link>
        </div>

        {latest.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-600 px-4 py-12 text-center">
            <Inbox size={24} className="text-mist-500" />
            <p className="text-sm text-mist-400">Nenhuma mensagem por enquanto.</p>
          </div>
        ) : (
          <ul className="divide-y divide-ink-700 overflow-hidden rounded-2xl border border-ink-700 bg-ink-900/60">
            {latest.map((lead) => (
              <li key={lead.id}>
                <Link
                  href="/admin/mensagens"
                  className="flex items-start gap-3 p-4 transition-colors hover:bg-ink-800/60"
                >
                  <span
                    aria-label={lead.status === "new" ? "Nova" : "Lida"}
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${lead.status === "new" ? "bg-sky-glow" : "bg-ink-600"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate font-medium text-mist-100">
                        {lead.name}
                      </span>
                      <time className="shrink-0 text-xs text-mist-500">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </time>
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-sm text-mist-400">
                      {lead.message}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function Shortcut({
  href,
  Icon,
  title,
  text,
}: {
  href: string;
  Icon: typeof Clapperboard;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-900/60 p-5 transition-colors hover:border-sky-glow/50"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-glow/10 text-sky-glow">
        <Icon size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-mist-100">{title}</span>
        <span className="block text-sm text-mist-500">{text}</span>
      </span>
      <ArrowUpRight
        size={18}
        className="shrink-0 text-mist-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
