import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Corpo: sans-serif contemporânea, pesos leves/médios.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// Títulos: sans display editorial, elegante e não "tech/geométrica".
const instrument = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${inter.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950 text-mist-100">
        {children}
      </body>
    </html>
  );
}
