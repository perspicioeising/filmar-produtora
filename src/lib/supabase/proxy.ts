import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";

/**
 * Atualiza a sessão do Supabase a cada requisição, mantendo os cookies
 * de auth sincronizados entre servidor e browser.
 *
 * Chamado a partir do `proxy.ts` (o antigo middleware, renomeado no Next.js 16).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANTE: getClaims/getUser reidrata o token; não coloque lógica entre a
  // criação do client e esta chamada, para evitar sessões dessincronizadas.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protege as rotas do admin (exceto a própria página de login).
  const { pathname } = request.nextUrl;
  const isAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
