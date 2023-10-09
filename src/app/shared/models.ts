export interface SocialLink {
  icon: React.FC;
  url: string;
  ariaLabel: string;
}

export const categories = ["Chrome Extension"] as const;

export type Category = (typeof categories)[number];

export interface Project {
  title: string;
  url: string;
  category: Category;
  repo: string;
  images: {
    light: string;
    dark: string;
  };
}
