import Link from "next/link";
import { FiCode } from "react-icons/fi";
import { Project } from "@shared/models";
import { ThemedImage } from "@components/ThemedImage";

export function ProjectTile({
  title,
  url,
  category,
  repo,
  images: { light, dark },
}: Project): ReturnType<React.FC> {
  return (
    <div className="relative" data-testid="project-tile">
      <Link
        href={repo}
        target="_blank"
        aria-label={`View ${title} code`}
        className="absolute z-10 top-2 right-2 p-2 bg-primary-bg hover:bg-secondary-bg shadow-sm rounded-md"
      >
        <FiCode />
      </Link>
      <Link href={url} target="_blank" aria-label={`View ${title} ${category}`}>
        <div className="flex flex-col relative divide-y border rounded-xl shadow-md hover:shadow-xl">
          <ThemedImage
            lightSrc={light}
            darkSrc={dark}
            className="rounded-t-xl border-0"
            alt="Project tile image"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <div className="text-center px-4 py-6">
            <p className="text-primary text-xl md:text-2xl mb-2">{title}</p>
            <span className="text-secondary text-sm">{category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
