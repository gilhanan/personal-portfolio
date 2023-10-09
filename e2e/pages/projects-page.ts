import type { Page } from "@playwright/test";
import { SharedPage } from "./shared-page";

export class ProjectsPage extends SharedPage {
  constructor(page: Page, baseURL: string) {
    super(page, baseURL);
  }

  async goto() {
    await super.goto("/projects");
  }
}
