import Link from "next/link";
import { FiCode, FiShoppingBag } from "react-icons/fi";
import { Project } from "@shared/models";
import { ThemedImage } from "@components/ThemedImage";

interface TileLinkProps {
  url: string;
  icon: React.ReactNode;
  label: string;
}

function TileLink({ url, icon, label }: TileLinkProps): ReturnType<React.FC> {
  return (
    <Link
      href={url}
      target="_blank"
      aria-label={label}
      className="text-secondary block p-2 bg-primary-bg hover:bg-secondary-bg shadow-sm rounded-md"
    >
      {icon}
    </Link>
  );
}

export function ProjectTile({
  id,
  title,
  category,
  url,
  repo,
  images: { light, dark },
}: Project): ReturnType<React.FC> {
  const tileLinks: TileLinkProps[] = [
    {
      url: repo,
      icon: <FiCode />,
      label: `View ${title} code`,
    },
    {
      url,
      icon: <FiShoppingBag />,
      label: `View ${title} project`,
    },
  ];

  return (
    <div className="relative" data-testid="project-tile">
      <div className="absolute z-10 top-2 right-2 flex flex-row gap-2">
        {tileLinks.map(({ url, icon, label }) => (
          <TileLink key={url} url={url} icon={icon} label={label} />
        ))}
      </div>
      <Link
        href={`/projects/${id}`}
        aria-label={`View ${title} project details`}
      >
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
