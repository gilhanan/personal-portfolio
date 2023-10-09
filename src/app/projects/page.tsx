import type { Metadata } from "next";
import { Projects } from "@components/Projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mt-12 sm:mt-6">
      <Projects />
    </div>
  );
}
