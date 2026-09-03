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
    };
    Views: { [key: string]: never };
    Functions: { [key: string]: never };
    Enums: { [key: string]: never };
    CompositeTypes: { [key: string]: never };
  };
};
