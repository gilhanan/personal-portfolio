import type { Page } from "@playwright/test";
import { SharedPage } from "./shared-page";

export class AboutPage extends SharedPage {
  constructor(page: Page, baseURL: string) {
    super(page, baseURL);
  }

  async goto() {
    await super.goto("/about");
  }
}
