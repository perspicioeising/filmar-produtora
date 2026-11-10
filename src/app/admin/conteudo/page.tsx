import type { Metadata } from "next";
import { getSiteContent } from "@/lib/data/site-content";
import { PageHeader } from "@/components/admin/page-header";
import { ContentManager } from "@/components/admin/content-manager";

export const metadata: Metadata = { title: "Textos do site" };
export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHeader
        title="Textos do site"
        description="Edite títulos, descrições, contatos e redes. Cada bloco é salvo separadamente."
      />
      <ContentManager content={content} />
    </>
  );
}
