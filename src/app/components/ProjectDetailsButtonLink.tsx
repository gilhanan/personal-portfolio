import Image from "next/image";
import { FiGlobe } from "react-icons/fi";
import chromeWebStore from "@images/chrome-web-store.svg";
import { Category } from "@shared/models";
import { ButtonLink } from "@components/ButtonLink";

interface ProjectDetailsButtonLinkProps {
  category: Category;
  url: string;
}

const categoryToLinkIcon: Record<
  Category,
  { title: string; icon: JSX.Element }
> = {
  "Chrome Extension": {
    title: "Get extension",
    icon: <Image src={chromeWebStore} alt="Chrome Web Store" />,
  },
  "Web development": {
    title: "Open website",
    icon: <FiGlobe className="w-full h-full text-primary" />,
  },
};

export function ProjectDetailsButtonLink({
  category,
  url,
}: ProjectDetailsButtonLinkProps): ReturnType<React.FC> {
  return (
    <ButtonLink url={url} text={categoryToLinkIcon[category].title}>
      {categoryToLinkIcon[category].icon}
    </ButtonLink>
  );
}
