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
    default: "Filmar — Direção e produção audiovisual",
    template: "%s | Filmar",
  },
  description:
    "Estúdio independente de direção e produção audiovisual para marcas, lugares e experiências.",
  keywords: [
    "direção audiovisual",
    "produção audiovisual",
    "estúdio audiovisual",
    "filme para marcas",
    "documentário",
    "filmar",
  ],
  authors: [{ name: "Filmar" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Filmar",
    title: "Filmar — Direção e produção audiovisual",
    description:
      "Estúdio independente de direção e produção audiovisual para marcas, lugares e experiências.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmar — Direção e produção audiovisual",
    description:
      "Estúdio independente de direção e produção audiovisual para marcas, lugares e experiências.",
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
