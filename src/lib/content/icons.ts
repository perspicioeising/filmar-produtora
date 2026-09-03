import {
  Aperture,
  Award,
  Briefcase,
  Calendar,
  CalendarDays,
  Camera,
  Clapperboard,
  Clock,
  Eye,
  Film,
  Heart,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Music,
  Phone,
  Play,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react";

/**
 * Registro central de ícones.
 *
 * Os ícones ficam fixos no código; o admin escolhe apenas o NOME (string),
 * que é salvo no banco. Os componentes resolvem o nome para o componente
 * lucide via `resolveIcon`, com fallback seguro para nomes desconhecidos.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  Eye,
  Clapperboard,
  Sparkles,
  Megaphone,
  Music,
  CalendarDays,
  Calendar,
  Wand2,
  Film,
  Video,
  Camera,
  Aperture,
  Play,
  Award,
  Star,
  Heart,
  Users,
  Rocket,
  TrendingUp,
  Briefcase,
  Clock,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
};

/** Ícone usado quando o nome salvo não existe no registro. */
export const FALLBACK_ICON: LucideIcon = Sparkles;

/** Nomes de ícones disponíveis (para o dropdown no admin). */
export const iconNames = Object.keys(iconRegistry);

/** Resolve o nome de um ícone para o componente lucide, com fallback. */
export function resolveIcon(name: string | null | undefined): LucideIcon {
  if (!name) return FALLBACK_ICON;
  return iconRegistry[name] ?? FALLBACK_ICON;
}

/** Indica se um nome de ícone é válido (existe no registro). */
export function isValidIcon(name: string): boolean {
  return name in iconRegistry;
}
