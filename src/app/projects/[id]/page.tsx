import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@data/projects";
import { ProjectDetails } from "@components/ProjectDetails";

type Props = {
  params: { id: string };
};

function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const project = getProject(id);

  return {
    title: project?.title,
  };
}

export default function ProjectPage({ params: { id } }: Props) {
  const project = getProject(id);

  if (!project) {
    return notFound();
  }

  return <ProjectDetails project={project} />;
}

export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}
