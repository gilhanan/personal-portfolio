import { MetadataRoute } from "next";
import { projects } from "@data/projects";
import sitemap from "@app/sitemap";

jest.mock("./data/projects", () => ({
  projects: [{ id: "project1" }, { id: "project2" }],
}));

describe("sitemap", () => {
  const host = "https://gil-hanan.com";
  let lastModified: Date;
  let sitemapResult: MetadataRoute.Sitemap;

  beforeEach(() => {
    lastModified = new Date();
    jest.useFakeTimers().setSystemTime(lastModified);
    sitemapResult = sitemap();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should include the required static URLs", () => {
    const staticUrls = [
      host,
      `${host}/projects`,
      `${host}/about`,
      `${host}/contact`,
    ];

    staticUrls.forEach((url) => {
      expect(sitemapResult).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            url,
          }),
        ]),
      );
    });
  });

  it("should include all projects with correct URLs", () => {
    projects.forEach(({ id }) => {
      expect(sitemapResult).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            url: `${host}/projects/${id}`,
          }),
        ]),
      );
    });
  });

  it("should have lastModified date set for all entries", () => {
    sitemapResult.forEach((entry) => {
      expect(entry.lastModified).toEqual(lastModified);
    });
  });
});
