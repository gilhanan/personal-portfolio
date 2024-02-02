export interface SocialLink {
  icon: React.FC;
  url: string;
  ariaLabel: string;
}

export const categories = ["Chrome Extension", "Web development"] as const;

export type Category = (typeof categories)[number];

export interface Project {
  id: string;
  title: string;
  description: JSX.Element;
  url: string;
  category: Category;
  repo: string;
  images: {
    light: string;
    dark: string;
  };
}
