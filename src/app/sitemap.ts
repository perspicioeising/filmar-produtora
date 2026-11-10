import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${siteUrl}/projetos/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
