-- =============================================================
-- Filmar Produtora — Schema do Supabase
-- Aplique este script no SQL Editor do dashboard do Supabase.
-- =============================================================

-- ─── Tabela: projects (portfólio) ────────────────────────────
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  client text,
  video_url text,
  thumbnail_url text,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ─── Tabela: site_content (conteúdo editável da landing) ─────
-- Uma linha por seção. A coluna `data` guarda o JSON da seção.
-- Chaves esperadas em `key`: 'hero', 'transition', 'about', 'studio',
-- 'services', 'portfolio', 'process', 'beliefs', 'contact'.
-- O código usa defaults (src/lib/content/defaults.ts) como fallback,
-- então esta tabela pode ficar vazia sem quebrar a landing page. Chaves
-- ausentes simplesmente caem no fallback — não há migração destrutiva.
create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- ─── Tabela: leads (formulário de contato) ───────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

-- ─── Row Level Security ──────────────────────────────────────
alter table public.projects enable row level security;
alter table public.leads enable row level security;
alter table public.site_content enable row level security;

-- Projetos: leitura pública, escrita só para autenticados (admin)
drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects
  for select using (true);

drop policy if exists "auth write projects" on public.projects;
create policy "auth write projects" on public.projects
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Leads: qualquer visitante pode inserir; só autenticados leem
drop policy if exists "public insert leads" on public.leads;
create policy "public insert leads" on public.leads
  for insert with check (true);

drop policy if exists "auth read leads" on public.leads;
create policy "auth read leads" on public.leads
  for select using (auth.role() = 'authenticated');

-- Conteúdo do site: leitura pública, escrita só para autenticados (admin)
drop policy if exists "public read site_content" on public.site_content;
create policy "public read site_content" on public.site_content
  for select using (true);

drop policy if exists "auth write site_content" on public.site_content;
create policy "auth write site_content" on public.site_content
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Verificação manual (SQL Editor do Supabase), após aplicar este script:
--   select * from public.site_content;                       -- deve existir e (por padrão) vir vazia
--   insert into public.site_content (key, data) values ('hero', '{}'::jsonb); -- só funciona autenticado
-- A landing page continua funcionando mesmo com a tabela vazia (fallback no código).

-- =============================================================
-- STORAGE — buckets para vídeos e thumbnails
-- =============================================================
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

-- Leitura pública dos buckets
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id in ('videos', 'thumbnails'));

-- Upload / update / delete apenas para autenticados (admin)
drop policy if exists "auth upload media" on storage.objects;
create policy "auth upload media" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('videos', 'thumbnails'));

drop policy if exists "auth update media" on storage.objects;
create policy "auth update media" on storage.objects
  for update to authenticated
  using (bucket_id in ('videos', 'thumbnails'));

drop policy if exists "auth delete media" on storage.objects;
create policy "auth delete media" on storage.objects
  for delete to authenticated
  using (bucket_id in ('videos', 'thumbnails'));

-- =============================================================
-- SEED opcional — dados de exemplo para testar o portfólio
-- =============================================================
-- insert into public.projects (title, description, category, client, featured, sort_order)
-- values
--   ('Campanha Verão', 'Filme publicitário de 30s.', 'Comercial', 'Marca X', true, 1),
--   ('Clipe Aurora', 'Videoclipe autoral.', 'Clipe', 'Artista Y', false, 2);
