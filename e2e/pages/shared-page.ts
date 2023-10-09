import type { Page } from "@playwright/test";
import { expect } from "../fixtures";

export abstract class SharedPage {
  constructor(
    protected readonly page: Page,
    private readonly baseURL: string,
  ) {}

  async goto(path: "" | "/projects" = ""): Promise<void> {
    await this.page.goto(this.baseURL + path);
  }

  async clickThemeToggle(): Promise<void> {
    await this.page
      .getByRole("button", {
        name: "Theme Toggler",
      })
      .click();
  }

  private async validateTheme(theme: "light" | "dark"): Promise<void> {
    const className =
      (await this.page.locator("html").getAttribute("class")) || "";

    const isLight = className.includes("light");
    const isDark = className.includes("dark");

    if (isLight && isDark) {
      throw new Error("Theme is both light and dark");
    }

    if (!isLight && !isDark) {
      throw new Error("Theme is neither light nor dark");
    }

    expect(theme === "light").toBe(isLight);
    expect(theme === "dark").toBe(isDark);
  }

  async validateThemeIsLight(): Promise<void> {
    await this.validateTheme("light");
  }

  async validateThemeIsDark(): Promise<void> {
    await this.validateTheme("dark");
  }
}
