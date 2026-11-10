"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./admin-nav";

type Props = {
  email: string;
  unread: number;
  logoutAction: () => void | Promise<void>;
  children: React.ReactNode;
};

const STORAGE_KEY = "filmar-admin-sidebar-collapsed";

/**
 * Casca do painel: sidebar recolhível no desktop (lembra a escolha) e
 * gaveta deslizante no celular, aberta pelo botão de menu.
 */
export function AdminShell({ email, unread, logoutAction, children }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerPath, setDrawerPath] = useState<string | null>(null);

  // A gaveta só vale para a rota em que foi aberta: navegar a fecha sozinha.
  const drawerOpen = drawerPath === pathname;
  const openDrawer = () => setDrawerPath(pathname);
  const closeDrawer = () => setDrawerPath(null);

  // Restaura a preferência de sidebar recolhida
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lê localStorage só no cliente
    setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function toggleCollapsed() {
    setCollapsed((v) => {
      localStorage.setItem(STORAGE_KEY, v ? "0" : "1");
      return !v;
    });
  }

  // Gaveta aberta: trava o scroll e fecha com ESC
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const footer = (compact: boolean) => (
    <div className="space-y-1">
      <Link
        href="/"
        target="_blank"
        title="Ver site"
        aria-label="Ver site"
        className={cn(
          "flex h-11 items-center rounded-xl text-sm text-mist-400 transition-colors hover:bg-ink-800 hover:text-mist-100",
          compact ? "justify-center" : "gap-3 px-3",
        )}
      >
        <ExternalLink size={18} className="shrink-0" />
        {!compact && "Ver site"}
      </Link>
      <form action={logoutAction}>
        <button
          type="submit"
          title="Sair"
          aria-label="Sair"
          className={cn(
            "flex h-11 w-full items-center rounded-xl text-sm text-mist-400 transition-colors hover:bg-red-500/10 hover:text-red-400",
            compact ? "justify-center" : "gap-3 px-3",
          )}
        >
          <LogOut size={18} className="shrink-0" />
          {!compact && "Sair"}
        </button>
      </form>
      {!compact && (
        <p className="truncate px-3 pt-2 text-xs text-mist-500">{email}</p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (desktop) */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col justify-between border-r border-ink-700 bg-ink-900 p-3 transition-[width] duration-300 lg:flex",
          collapsed ? "w-[4.5rem]" : "w-64 p-4",
        )}
      >
        <div className="space-y-6">
          <div
            className={cn(
              "flex h-12 items-center",
              collapsed ? "justify-center" : "justify-between pl-2",
            )}
          >
            {!collapsed && (
              <Link href="/admin" aria-label="Início do painel">
                <Logo size="sm" />
              </Link>
            )}
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              aria-expanded={!collapsed}
              title={collapsed ? "Expandir menu" : "Recolher menu"}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-mist-400 transition-colors hover:bg-ink-800 hover:text-mist-100"
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
          <SidebarNav unread={unread} collapsed={collapsed} />
        </div>
        {footer(collapsed)}
      </aside>

      {/* Gaveta (mobile/tablet) */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          drawerOpen ? "visible" : "invisible pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          tabIndex={drawerOpen ? 0 : -1}
          onClick={closeDrawer}
          className={cn(
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          id="admin-drawer"
          aria-label="Menu do painel"
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col justify-between border-r border-ink-700 bg-ink-900 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] transition-transform duration-300",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="space-y-6">
            <div className="flex h-12 items-center justify-between pl-2">
              <Logo size="sm" />
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Fechar menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl text-mist-400 hover:bg-ink-800"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarNav unread={unread} onNavigate={closeDrawer} />
          </div>
          {footer(false)}
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra superior (mobile/tablet) */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink-700 bg-ink-950/90 px-2 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Abrir menu"
            aria-expanded={drawerOpen}
            aria-controls="admin-drawer"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-mist-100"
          >
            <Menu size={22} />
            {unread > 0 && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-sky-glow" />
            )}
          </button>
          <Link href="/admin" aria-label="Início do painel">
            <Logo size="sm" showTagline={false} />
          </Link>
          <span className="w-11" aria-hidden />
        </header>

        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 pb-28 sm:px-8 sm:py-12 lg:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
