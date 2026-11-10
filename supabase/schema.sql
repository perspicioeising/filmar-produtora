-- =============================================================
-- Filmar Produtora — Schema do Supabase (v2, do zero)
--
-- Como usar: cole este script inteiro no SQL Editor do Supabase e execute.
-- Ele é idempotente: pode ser rodado de novo sem duplicar nada.
--
-- ATENÇÃO: se você já tem o banco antigo, apague as tabelas antigas antes
-- (projects, leads, site_content) ou crie um projeto Supabase novo.
--
-- Depois: crie o usuário admin em Authentication > Users (email + senha).
-- =============================================================

-- ─── Função utilitária: mantém updated_at em dia ─────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── Tabela: projects (portfólio) ────────────────────────────
-- `video_url` aceita um arquivo enviado ao Storage OU um link do
-- YouTube/Vimeo. O front detecta o tipo automaticamente.
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  description   text,
  category      text,
  client        text,
  role          text,                        -- ex.: "Direção e montagem"
  year          int check (year between 1900 and 2100),
  video_url     text,
  thumbnail_url text,
  featured      boolean not null default false,
  published     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists projects_listing_idx
  on public.projects (published, featured desc, sort_order, created_at desc);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ─── Tabela: site_content (textos editáveis do site) ─────────
-- Uma linha por seção; `data` guarda o JSON da seção.
-- Chaves: hero, transition, about, studio, services, portfolio,
-- process, beliefs, contact. O código tem defaults como fallback,
-- então a tabela pode ficar vazia sem quebrar o site.
create table if not exists public.site_content (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ─── Tabela: leads (mensagens do formulário de contato) ──────
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  message    text not null,
  status     text not null default 'new'
             check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);

-- ─── Row Level Security ──────────────────────────────────────
alter table public.projects     enable row level security;
alter table public.site_content enable row level security;
alter table public.leads        enable row level security;

-- Projetos: visitantes veem só os publicados; admin vê e edita tudo.
drop policy if exists "projects: public read published" on public.projects;
create policy "projects: public read published" on public.projects
  for select using (published or (select auth.role()) = 'authenticated');

drop policy if exists "projects: admin write" on public.projects;
create policy "projects: admin write" on public.projects
  for all to authenticated
  using (true) with check (true);

-- Conteúdo: leitura pública, escrita só do admin.
drop policy if exists "site_content: public read" on public.site_content;
create policy "site_content: public read" on public.site_content
  for select using (true);

drop policy if exists "site_content: admin write" on public.site_content;
create policy "site_content: admin write" on public.site_content
  for all to authenticated
  using (true) with check (true);

-- Leads: qualquer visitante insere (sempre como "new"); só o admin lê/gerencia.
drop policy if exists "leads: public insert" on public.leads;
create policy "leads: public insert" on public.leads
  for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "leads: admin read" on public.leads;
create policy "leads: admin read" on public.leads
  for select to authenticated using (true);

drop policy if exists "leads: admin update" on public.leads;
create policy "leads: admin update" on public.leads
  for update to authenticated using (true) with check (true);

drop policy if exists "leads: admin delete" on public.leads;
create policy "leads: admin delete" on public.leads
  for delete to authenticated using (true);

-- =============================================================
-- STORAGE — um único bucket público `media`
-- Pastas usadas pelo admin: videos/, thumbnails/, site/
-- (O limite de tamanho por arquivo depende do plano do Supabase;
--  em Storage > Settings você pode ajustá-lo.)
-- =============================================================
insert into storage.buckets (id, name, public, allowed_mime_types)
values (
  'media',
  'media',
  true,
  array['video/mp4', 'video/webm', 'video/quicktime',
        'image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media: public read" on storage.objects;
create policy "media: public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media: admin insert" on storage.objects;
create policy "media: admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media: admin update" on storage.objects;
create policy "media: admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "media: admin delete" on storage.objects;
create policy "media: admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
