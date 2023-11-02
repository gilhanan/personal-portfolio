import { FiTag } from "react-icons/fi";
import chromeWebStore from "@images/chrome-web-store.svg";
import githubLight from "@images/github.svg";
import githubDark from "@images/github-dark.svg";
import { Project } from "@shared/models";
import { ThemedImage } from "@components/ThemedImage";
import { ButtonLink } from "@components/ButtonLink";

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
        <div className="w-full sm:w-80 flex flex-col gap-8">
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
              <ButtonLink
                url={url}
                text="Get extension"
                lightSrc={chromeWebStore}
                darkSrc={chromeWebStore}
              />
              <ButtonLink
                url={repo}
                text="Source code"
                lightSrc={githubLight}
                darkSrc={githubDark}
              />
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
