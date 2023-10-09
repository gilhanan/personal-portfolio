import { test, expect } from "../fixtures";

test.beforeEach(async ({ projectsPage }) => {
  await projectsPage.goto();
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Gil Hanan | Projects");
});
