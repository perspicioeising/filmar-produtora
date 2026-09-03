# Filmar Produtora — Landing Page

Landing page moderna e cinematográfica para a **Filmar Produtora**, com portfólio
de vídeos gerenciável, painel administrativo e formulário de contato que captura
leads e envia notificação por email.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **React 19**
- **Tailwind CSS v4** (CSS-first, tema em `globals.css`)
- **Supabase** (`@supabase/ssr`) — banco de dados, Storage e Auth
- **Resend** — notificação de novos leads por email
- **React Hook Form + Zod** — validação de formulários

## Estrutura

```
src/
├── app/
│   ├── layout.tsx            # layout raiz, fontes, metadata/SEO
│   ├── page.tsx              # landing (Hero, Sobre, Serviços, Portfólio, Contato)
│   ├── globals.css           # tema (cores da marca, utilities)
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx
│   └── admin/                # painel protegido
│       ├── layout.tsx        # verifica sessão + header
│       ├── page.tsx          # CRUD de projetos + lista de leads
│       └── login/page.tsx
├── components/
│   ├── layout/ (navbar, footer)
│   ├── sections/ (hero, about, services, portfolio, contact, ...)
│   ├── admin/ (projects-manager, project-form)
│   └── ui/ (button, input, textarea, logo, reveal, social-icons)
├── lib/
│   ├── supabase/ (client, server, proxy, types)
│   ├── actions/ (contact, auth, projects)
│   ├── data/ (projects, leads)
│   ├── email.ts, site.ts, validation.ts, utils.ts
└── proxy.ts                  # protege /admin e atualiza a sessão
```

> No Next.js 16 o antigo `middleware` chama-se **`proxy`** (`src/proxy.ts`).

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=       # Supabase > Project Settings > API
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # secreta — nunca expor no client
RESEND_API_KEY=                 # https://resend.com/api-keys
LEAD_NOTIFICATION_FROM="Filmar Produtora <onboarding@resend.dev>"
LEAD_NOTIFICATION_TO=contato@filmarprodutora.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> O `.env.local` tem **precedência** sobre o `.env` no Next.js e é ignorado
> pelo git.

### 3. Banco de dados e Storage

No dashboard do Supabase, abra o **SQL Editor** e rode o conteúdo de
[`supabase/schema.sql`](./supabase/schema.sql). Ele cria:

- Tabelas `projects` e `leads`
- Políticas de RLS (leitura pública de projetos, escrita só autenticada; inserção
  pública de leads, leitura só autenticada)
- Buckets de Storage `videos` e `thumbnails` (públicos para leitura)

### 4. Criar o usuário admin

Não há tela de cadastro aberta (por segurança). Crie o admin no
**Supabase Dashboard > Authentication > Users > Add user**, marcando
_"Auto confirm user"_. Use esse email/senha para entrar em `/admin`.

## Rodando o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000`. O painel fica em `http://localhost:3000/admin`.

### Rede corporativa (interceptação de SSL)

Se aparecer o erro `fetch failed` / `SELF_SIGNED_CERT_IN_CHAIN` ao conectar no
Supabase, sua rede provavelmente intercepta HTTPS com um certificado próprio.
Para desenvolver mesmo assim, use:

```bash
npm run dev:insecure
```

Esse script desabilita a verificação de TLS **apenas em desenvolvimento local**.
Nunca use em produção. A solução definitiva é apontar o certificado raiz da sua
empresa via `NODE_EXTRA_CA_CERTS`.

## Uso do painel

1. Acesse `/admin` e faça login.
2. Em **Projetos**, clique em _Novo projeto_, preencha título/categoria/cliente,
   faça upload do vídeo (mp4/webm) e da thumbnail, defina destaque e ordem.
3. O projeto aparece automaticamente no portfólio da home.
4. Em **Leads**, veja os contatos recebidos pelo formulário.

## Build de produção

```bash
npm run build
npm run start
```

## Deploy

Recomendado: **Vercel**. Configure as mesmas variáveis de ambiente no painel do
projeto. Ajuste `NEXT_PUBLIC_SITE_URL` para o domínio final e o
`LEAD_NOTIFICATION_FROM` para um domínio verificado no Resend.
