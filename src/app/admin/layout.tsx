import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { Logo } from "@/components/ui/logo";

export default async function AdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Não logado: renderiza só o conteúdo (a própria página de login).
  // O proxy.ts já garante o redirect das demais rotas /admin.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-ink-700 bg-ink-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" showTagline={false} />
            <span className="hidden text-sm text-mist-500 sm:inline">
              Painel administrativo
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-sky-bright"
            >
              Ver site
              <ExternalLink size={14} />
            </Link>
            <span className="hidden text-xs text-mist-500 md:inline">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
              >
                <LogOut size={14} />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
