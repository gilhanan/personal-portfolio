import { test, expect } from "../fixtures";
import { Project } from "../models";

const paths = [
  {
    route: "home",
    path: "",
  },
  {
    route: "projects",
    path: "/projects",
  },
] as const;

for (const { route, path } of paths) {
  test.describe(route, () => {
    test.beforeEach(async ({ projects }) => {
      await projects.goto(path);
    });

    test("projects can be rendered", async ({ page, projects }) => {
      await expect(
        page.getByRole("heading", { name: "Projects portfolio" }),
      ).toBeVisible();
      await expect(
        page.getByText("Search projects by title or filter by category"),
      ).toBeVisible();
      await expect(projects.projectsSearchbox).toBeVisible();
      await expect(projects.projectsCategoriesFilter).toBeVisible();
    });

    test.describe("projects", () => {
      const projects = [
        {
          name: "ChatGPT RTL",
          category: "Chrome Extension",
          url: "https://chrome.google.com/webstore/detail/chatgpt-rtl/nabcbpmmefiigmjpopfciegmlgihkofd",
          repo: "https://github.com/gilhanan/chat-gpt-rtl",
        },
      ] satisfies Project[];

      for (const project of projects) {
        const { name, category, url, repo } = project;

        test.describe(name, () => {
          test("can be rendered", async ({ projects }) => {
            await projects.validateProjectTileLink(project);
            await projects.validateProjectTileCodeLink(name);
          });

          test("can be searched", async ({ projects }) => {
            await projects.searchForProject(name);
            await projects.validateProjectTileLink(project);
          });

          test("can be filtered", async ({ projects }) => {
            await projects.filterCateogry(category);
            await projects.validateProjectTileLink(project);
          });

          test("can be searched and filtered", async ({ projects }) => {
            await projects.searchForProject(name);
            await projects.filterCateogry(category);
            await projects.validateProjectTileLink(project);
          });

          test("can view project page", async ({ context, projects }) => {
            const responsePromise$ = context.waitForEvent(
              "response",
              (response) =>
                response.url().includes(url) && response.status() === 200,
            );

            await projects.clickOnProjectTileLink(project);

            await responsePromise$;
          });

          test("can view project source code", async ({
            context,
            projects,
          }) => {
            const responsePromise$ = context.waitForEvent(
              "response",
              (response) =>
                response.url().includes(repo) && response.status() === 200,
            );

            await projects.clickOnProjectTileCodeLink(name);

            await responsePromise$;
          });
        });
      }
    });
  });
}
