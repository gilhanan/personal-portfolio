import { test, expect } from "@playwright/test";

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "load" });
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Create Next App/);
});

test("docs link", async ({ page }) => {
  const newPage$ = page.waitForEvent("popup");

  await page.getByRole("link", { name: "Docs" }).click();

  const newPage = await newPage$;

  await expect(newPage).toHaveURL(/.*docs/);
});
