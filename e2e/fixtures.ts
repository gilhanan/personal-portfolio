import { test as base } from "@playwright/test";
import { HomePage } from "./pages/home-page";
import { ProjectsPage } from "./pages/projects-page";
import { AboutPage } from "./pages/about-page";
import { ContactPage } from "./pages/contact-page";
import { Projects } from "./pages/projects";

type Fixtures = {
  homePage: HomePage;
  projectsPage: ProjectsPage;
  aboutPage: AboutPage;
  contactPage: ContactPage;
  projects: Projects;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page, baseURL }, use) => {
    await use(new HomePage(page, baseURL as string));
  },
  projectsPage: async ({ page, baseURL }, use) => {
    await use(new ProjectsPage(page, baseURL as string));
  },
  aboutPage: async ({ page, baseURL }, use) => {
    await use(new AboutPage(page, baseURL as string));
  },
  contactPage: async ({ page, baseURL }, use) => {
    await use(new ContactPage(page, baseURL as string));
  },
  projects: async ({ page, baseURL }, use) => {
    await use(new Projects(page, baseURL as string));
  },
});

export { expect } from "@playwright/test";
