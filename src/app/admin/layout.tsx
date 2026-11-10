import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { getLeads } from "@/lib/data/leads";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: { default: "Painel", template: "%s | Painel Filmar" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Não logado: renderiza só o conteúdo (a página de login).
  // O proxy.ts já redireciona as demais rotas /admin.
  if (!user) return <>{children}</>;

  const leads = await getLeads();
  const unread = leads.filter((l) => l.status === "new").length;

  return (
    <AdminShell
      email={user.email ?? ""}
      unread={unread}
      logoutAction={logout}
    >
      {children}
    </AdminShell>
  );
}
