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

  private getProjectDetailsTileLink({ name }: Project): Locator {
    return this.page.getByRole("link", {
      name: `View ${name} project details`,
    });
  }

  private getProjectCodeTileLink({ name }: Project): Locator {
    return this.page.getByRole("link", {
      name: `View ${name} code`,
    });
  }

  private getProjectTileLink({ name }: Project): Locator {
    return this.page.getByRole("link", {
      name: `View ${name} project`,
      exact: true,
    });
  }

  async searchForProject(term: string): Promise<void> {
    await this.projectsSearchbox.fill(term);
  }

  async filterCateogry(category: string): Promise<void> {
    await this.projectsCategoriesFilter.selectOption(category);
  }

  async validateProjectTile(project: Project): Promise<void> {
    await this.validateProjectDetailsTileLink(project);
    await this.validateProjectTileLink(project);
    await this.validateProjectCodeTileLink(project);
  }

  async validateProjectDetailsTileLink(project: Project): Promise<void> {
    await expect(this.getProjectDetailsTileLink(project)).toBeVisible();
  }

  async clickOnProjectDetailsTileLink(project: Project): Promise<void> {
    await this.getProjectDetailsTileLink(project).click();
  }

  async validateProjectTileLink(project: Project): Promise<void> {
    await expect(this.getProjectTileLink(project)).toBeVisible();
  }

  async clickOnProjectTileLink(project: Project): Promise<void> {
    await this.getProjectTileLink(project).click();
  }

  async validateProjectCodeTileLink(project: Project): Promise<void> {
    await expect(this.getProjectCodeTileLink(project)).toBeVisible();
  }

  async clickOnProjectCodeTileLink(project: Project): Promise<void> {
    await this.getProjectCodeTileLink(project).click();
  }
}
