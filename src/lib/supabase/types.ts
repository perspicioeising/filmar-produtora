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

export type HeroContent = {
  title: string;
  description: string;
  cta: string;
  /** URL opcional de imagem/vídeo de fundo (mídia cinematográfica). */
  mediaUrl: string;
};

export type TransitionContent = {
  text: string;
};

/** "Sobre mim" (Andressa). Foto é opcional — slot para o futuro. */
export type AboutContent = {
  title: string;
  openingLine: string;
  paragraphs: string[];
  /** URL opcional de foto pessoal. */
  photoUrl: string;
};

/** "Quem é a Filmar" — apresentação do estúdio + 3 pilares. */
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

/** Cabeçalho editável da seção de portfólio. */
export type PortfolioContent = {
  title: string;
  description: string;
};

/** Etapa numerada do processo (sem ícone). */
export type ProcessStep = {
  title: string;
  text: string;
};

export type ProcessContent = {
  title: string;
  description: string;
  steps: ProcessStep[];
};

/** "O que acreditamos" — momento editorial. */
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
  /** Descrição usada no footer/SEO. */
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
