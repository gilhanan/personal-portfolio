import type { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures";
import { SharedPage } from "./shared-page";
import { Project } from "../models";

export class Projects extends SharedPage {
  public readonly projectsSearchbox: Locator;
  public readonly projectsCategoriesFilter: Locator;

  constructor(page: Page, baseURL: string) {
    super(page, baseURL);
    this.projectsSearchbox = page.getByRole("searchbox", {
      name: "Search projects",
    });
    this.projectsCategoriesFilter = page.getByRole("combobox", {
      name: "Select a category",
    });
  }

  async goto(path: "" | "/projects") {
    await super.goto(path);
  }

  private getProjectTileLink({ name, category }: Project): Locator {
    return this.page.getByRole("link", {
      name: `View ${name} ${category}`,
    });
  }

  private getProjectTileCodeLink(name: string): Locator {
    return this.page.getByRole("link", {
      name: `View ${name} code`,
    });
  }

  async searchForProject(term: string): Promise<void> {
    await this.projectsSearchbox.fill(term);
  }

  async filterCateogry(category: string): Promise<void> {
    await this.projectsCategoriesFilter.selectOption(category);
  }

  async validateProjectTileLink(project: Project): Promise<void> {
    await expect(this.getProjectTileLink(project)).toBeVisible();
  }

  async clickOnProjectTileLink(project: Project): Promise<void> {
    await this.getProjectTileLink(project).click();
  }

  async validateProjectTileCodeLink(name: string): Promise<void> {
    await expect(this.getProjectTileCodeLink(name)).toBeVisible();
  }

  async clickOnProjectTileCodeLink(name: string): Promise<void> {
    await this.getProjectTileCodeLink(name).click();
  }
}
