import { MetadataRoute } from "next";
import { projects } from "@data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = "https://gil-hanan.com";
  const lastModified = new Date();

  return [
    {
      url: host,
      lastModified,
    },
    {
      url: `${host}/projects`,
      lastModified,
    },
    {
      url: `${host}/about`,
      lastModified,
    },
    {
      url: `${host}/contact`,
      lastModified,
    },
    ...projects.map(({ id }) => ({
      url: `${host}/projects/${id}`,
      lastModified,
    })),
  ];
}
