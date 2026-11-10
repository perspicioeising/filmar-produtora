"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Inbox,
  LayoutDashboard,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/admin", label: "Início", Icon: LayoutDashboard },
  { href: "/admin/projetos", label: "Projetos", Icon: Clapperboard },
  { href: "/admin/conteudo", label: "Textos do site", Icon: PenLine },
  { href: "/admin/mensagens", label: "Mensagens", Icon: Inbox },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

type Props = {
  unread: number;
  /** modo só-ícones (sidebar recolhida no desktop) */
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function SidebarNav({ unread, collapsed = false, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="space-y-1">
      {items.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        const showBadge = href === "/admin/mensagens" && unread > 0;

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            aria-label={collapsed ? label : undefined}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-11 items-center rounded-xl text-sm transition-colors",
              collapsed ? "justify-center" : "gap-3 px-3",
              active
                ? "bg-sky-glow/15 text-sky-glow"
                : "text-mist-400 hover:bg-ink-800 hover:text-mist-100",
            )}
          >
            <Icon size={19} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
            {showBadge &&
              (collapsed ? (
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-sky-glow" />
              ) : (
                <span className="ml-auto rounded-full bg-sky-glow px-2 py-0.5 text-xs font-medium text-ink-950">
                  {unread}
                </span>
              ))}
          </Link>
        );
      })}
    </nav>
  );
}
