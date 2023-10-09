import { test, expect } from "../fixtures";

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Gil Hanan");
});

test("home page can be rendered", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "HI, I'M GIL" }),
  ).toBeVisible();
  await expect(page.getByText("I build things for the web")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Projects portfolio" }),
  ).toBeVisible();
  await expect(
    page.getByText("Search projects by title or filter by category"),
  ).toBeVisible();
});
