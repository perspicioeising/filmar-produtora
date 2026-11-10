import type { NextConfig } from "next";

/**
 * Ambientes de desenvolvimento atrás de proxies/antivírus que fazem
 * inspeção de HTTPS (TLS interception) apresentam um certificado raiz que o
 * Node não reconhece, causando "fetch failed" ao falar com o Supabase.
 *
 * Somente em desenvolvimento, relaxamos a validação de TLS se ela ainda não
 * tiver sido configurada. Em produção isso NUNCA é aplicado — a conexão deve
 * ser validada normalmente. Para manter o TLS validado localmente, aponte
 * NODE_EXTRA_CA_CERTS para o certificado raiz da sua rede.
 */
if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_TLS_REJECT_UNAUTHORIZED === undefined &&
  !process.env.NODE_EXTRA_CA_CERTS
) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Extrai o hostname do Supabase para liberar imagens do Storage no next/image.
function supabaseHostname(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const host = supabaseHostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      host
        ? {
            protocol: "https",
            hostname: host,
            pathname: "/storage/v1/object/public/**",
          }
        : {
            // Fallback: qualquer subdomínio supabase.co (env ausente em build).
            protocol: "https",
            hostname: "*.supabase.co",
            pathname: "/storage/v1/object/public/**",
          },
      // Capas automáticas de vídeos do YouTube
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
