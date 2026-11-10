import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Novo projeto" };
export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const projects = await getAllProjects();
  const categories = [
    ...new Set(projects.map((p) => p.category).filter((c): c is string => !!c)),
  ];

  return (
    <>
      <PageHeader title="Novo projeto" />
      <ProjectForm categories={categories} />
    </>
  );
}
