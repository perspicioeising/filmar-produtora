import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getAllProjects, getProjectById } from "@/lib/data/projects";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Editar projeto" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, projects] = await Promise.all([
    getProjectById(id),
    getAllProjects(),
  ]);
  if (!project) notFound();

  const categories = [
    ...new Set(projects.map((p) => p.category).filter((c): c is string => !!c)),
  ];

  return (
    <>
      <PageHeader
        title="Editar projeto"
        description={project.title}
        action={
          project.published ? (
            <Button
              href={`/projetos/${project.slug}`}
              target="_blank"
              variant="outline"
              size="sm"
            >
              <ExternalLink size={14} />
              Ver no site
            </Button>
          ) : undefined
        }
      />
      {/* key força o formulário a reiniciar ao trocar de projeto */}
      <ProjectForm key={project.id} project={project} categories={categories} />
    </>
  );
}
