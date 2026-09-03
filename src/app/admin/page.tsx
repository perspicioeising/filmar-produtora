import { Mail, Phone } from "lucide-react";
import { getProjects } from "@/lib/data/projects";
import { getLeads } from "@/lib/data/leads";
import { ProjectsManager } from "@/components/admin/projects-manager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [projects, leads] = await Promise.all([getProjects(), getLeads()]);

  return (
    <div className="space-y-14">
      <ProjectsManager projects={projects} />

      <section>
        <h2 className="font-display text-2xl font-semibold text-mist-100">
          Leads
          <span className="ml-2 text-sm font-normal text-mist-500">
            ({leads.length})
          </span>
        </h2>

        <div className="mt-5 space-y-3">
          {leads.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-600 bg-ink-850/40 px-4 py-10 text-center text-sm text-mist-400">
              Nenhum contato recebido ainda.
            </p>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-xl border border-ink-700 bg-ink-850/50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium text-mist-100">{lead.name}</h3>
                  <time className="text-xs text-mist-500">
                    {new Date(lead.created_at).toLocaleString("pt-BR")}
                  </time>
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-mist-400">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1.5 hover:text-sky-bright"
                  >
                    <Mail size={14} />
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} />
                      {lead.phone}
                    </span>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-mist-300">
                  {lead.message}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
