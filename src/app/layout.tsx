import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filmarprodutora.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Filmar Produtora — Audiovisual & Cinematografia",
    template: "%s | Filmar Produtora",
  },
  description:
    "Produtora audiovisual especializada em comerciais, clipes, coberturas de eventos e motion design. Contamos histórias com imagem e movimento.",
  keywords: [
    "produtora audiovisual",
    "vídeo comercial",
    "clipe musical",
    "cobertura de eventos",
    "motion design",
    "filmar produtora",
  ],
  authors: [{ name: "Filmar Produtora" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Filmar Produtora",
    title: "Filmar Produtora — Audiovisual & Cinematografia",
    description:
      "Produtora audiovisual especializada em comerciais, clipes, eventos e motion design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmar Produtora — Audiovisual & Cinematografia",
    description:
      "Produtora audiovisual especializada em comerciais, clipes, eventos e motion design.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950 text-mist-100">
        {children}
      </body>
    </html>
  );
}
