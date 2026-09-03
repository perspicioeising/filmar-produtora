/** Tipos do banco de dados Supabase (tabelas projects e leads). */

export type Project = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  client: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

// ─── Conteúdo editável da landing (tabela site_content) ──────────

/** Item de lista com ícone selecionável (pilares do "Sobre", serviços). */
export type IconItem = {
  icon: string;
  title: string;
  text: string;
};

/** Métrica do hero (sem ícone). */
export type Metric = {
  value: string;
  label: string;
};

export type HeroContent = {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  paragraph: string;
  primaryCta: string;
  secondaryCta: string;
  metrics: Metric[];
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  pillars: IconItem[];
};

export type ServicesContent = {
  eyebrow: string;
  title: string;
  paragraph: string;
  items: IconItem[];
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  paragraph: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  instagram: string;
  youtube: string;
  vimeo: string;
  /** Descrição usada no footer/SEO. */
  description: string;
};

/** Conteúdo completo do site, uma propriedade por seção. */
export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
};

/** Chaves válidas de seção (uma linha por chave em site_content). */
export type SiteContentKey = keyof SiteContent;

/** Linha da tabela site_content. */
export type SiteContentRow = {
  key: string;
  data: Record<string, unknown>;
  updated_at: string;
};

/** Campos editáveis de um projeto (sem colunas geradas). */
export type ProjectInput = Omit<Project, "id" | "created_at">;

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Partial<ProjectInput> & { title: string };
        Update: Partial<ProjectInput>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at">;
        Update: Partial<Omit<Lead, "id" | "created_at">>;
        Relationships: [];
      };
      site_content: {
        Row: SiteContentRow;
        Insert: {
          key: string;
          data: Record<string, unknown>;
          updated_at?: string;
        };
        Update: Partial<{
          key: string;
          data: Record<string, unknown>;
          updated_at: string;
        }>;
        Relationships: [];
      };
    };
    Views: { [key: string]: never };
    Functions: { [key: string]: never };
    Enums: { [key: string]: never };
    CompositeTypes: { [key: string]: never };
  };
};
