import { test as base } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { ProjectsPage } from "./pages/projects-page";
import { Projects } from "./pages/projects";

type Fixtures = {
  homePage: HomePage;
  projectsPage: ProjectsPage;
  projects: Projects;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page, baseURL }, use) => {
    await use(new HomePage(page, baseURL as string));
  },
  projectsPage: async ({ page, baseURL }, use) => {
    await use(new ProjectsPage(page, baseURL as string));
  },
  projects: async ({ page, baseURL }, use) => {
    await use(new Projects(page, baseURL as string));
  },
});

export { expect } from "@playwright/test";
