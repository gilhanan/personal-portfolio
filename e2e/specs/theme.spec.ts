import { test } from "../fixtures";

test.describe("light color scheme", () => {
  test.use({
    colorScheme: "light",
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("should be rendered correctly", async ({ homePage }) => {
    await homePage.validateThemeIsLight();
  });

  test("should able to toggle theme", async ({ homePage }) => {
    await homePage.validateThemeIsLight();
    await homePage.clickThemeToggle();
    await homePage.validateThemeIsDark();
    await homePage.clickThemeToggle();
    await homePage.validateThemeIsLight();
  });
});

test.describe("dark color scheme", () => {
  test.use({
    colorScheme: "dark",
  });

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("should be rendered correctly", async ({ homePage }) => {
    await homePage.validateThemeIsDark();
  });

  test("should able to toggle theme", async ({ homePage }) => {
    await homePage.validateThemeIsDark();
    await homePage.clickThemeToggle();
    await homePage.validateThemeIsLight();
    await homePage.clickThemeToggle();
    await homePage.validateThemeIsDark();
  });
});
