/** Tipos do banco de dados Supabase (projects, leads e site_content). */

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  client: string | null;
  /** Função exercida no projeto (ex.: "Direção e montagem"). */
  role: string | null;
  year: number | null;
  /** Arquivo no Storage OU link do YouTube/Vimeo. */
  video_url: string | null;
  thumbnail_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type LeadStatus = "new" | "read" | "archived";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};

// ─── Conteúdo editável do site (tabela site_content) ─────────────

/** Item de lista com ícone selecionável (pilares do estúdio, serviços). */
export type IconItem = {
  icon: string;
  title: string;
  text: string;
};

export type HeroContent = {
  /** Texto pequeno acima do título. */
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  /** URL opcional de imagem/vídeo de fundo. */
  mediaUrl: string;
};

export type TransitionContent = {
  text: string;
};

export type AboutContent = {
  title: string;
  openingLine: string;
  paragraphs: string[];
  /** URL opcional de foto pessoal. */
  photoUrl: string;
};

export type StudioContent = {
  title: string;
  tagline: string;
  paragraphs: string[];
  pillars: IconItem[];
};

export type ServicesContent = {
  eyebrow: string;
  title: string;
  paragraph: string;
  items: IconItem[];
};

export type PortfolioContent = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  text: string;
};

export type ProcessContent = {
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type BeliefsContent = {
  title: string;
  paragraphs: string[];
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  paragraph: string;
  cta: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  instagram: string;
  youtube: string;
  vimeo: string;
  /** Descrição usada no rodapé e SEO. */
  description: string;
};

/** Conteúdo completo do site, uma propriedade por seção. */
export type SiteContent = {
  hero: HeroContent;
  transition: TransitionContent;
  about: AboutContent;
  studio: StudioContent;
  services: ServicesContent;
  portfolio: PortfolioContent;
  process: ProcessContent;
  beliefs: BeliefsContent;
  contact: ContactContent;
};

export type SiteContentKey = keyof SiteContent;

export type SiteContentRow = {
  key: string;
  data: Record<string, unknown>;
  updated_at: string;
};

/** Campos editáveis de um projeto (sem colunas geradas pelo banco). */
export type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at">;

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Partial<ProjectInput> & { title: string; slug: string };
        Update: Partial<ProjectInput>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at" | "status"> & {
          status?: LeadStatus;
        };
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
