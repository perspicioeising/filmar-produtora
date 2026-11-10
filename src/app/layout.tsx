import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Produtora audiovisual independente: direção e produção de filmes para marcas, lugares e experiências.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Filmar — Produtora audiovisual",
    template: "%s | Filmar",
  },
  description,
  keywords: [
    "produtora de vídeo",
    "produção audiovisual",
    "direção audiovisual",
    "filme institucional",
    "vídeo para marcas",
    "documentário",
    "filmar",
  ],
  authors: [{ name: "Filmar" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Filmar",
    title: "Filmar — Produtora audiovisual",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmar — Produtora audiovisual",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink-950 text-mist-100">
        {children}
      </body>
    </html>
  );
}
