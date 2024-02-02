import { FiTag } from "react-icons/fi";
import githubLight from "@images/github.svg";
import githubDark from "@images/github-dark.svg";
import { Project } from "@shared/models";
import { ThemedImage } from "@components/ThemedImage";
import { ButtonLink } from "@components/ButtonLink";
import { ProjectDetailsButtonLink } from "@components/ProjectDetailsButtonLink";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({
  project: {
    title,
    category,
    url,
    repo,
    description,
    images: { light, dark },
  },
}: ProjectDetailsProps): ReturnType<React.FC> {
  return (
    <section className="mt-12 sm:mt-6">
      <div className="flex sm:flex-row flex-col gap-8">
        <div className="w-full sm:max-w-[300px] flex flex-col gap-8">
          <ThemedImage
            lightSrc={light}
            darkSrc={dark}
            className="border"
            alt="Project tile image"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <div>
            <h2 className="text-primary">Links</h2>
            <div className="flex flex-col gap-2">
              <ProjectDetailsButtonLink category={category} url={url} />
              <ButtonLink url={repo} text="Source code">
                <ThemedImage
                  lightSrc={githubLight}
                  darkSrc={githubDark}
                  className="w-full h-full"
                  alt="Source code"
                />
              </ButtonLink>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl text-primary">{title}</h1>
            <div className="flex gap-2 items-center text-secondary">
              <FiTag className="w-4 h-4" />
              <span className="text-sm">{category}</span>
            </div>
          </div>
          <div className="mt-4 text-secondary">{description}</div>
        </div>
      </div>
    </section>
  );
}
