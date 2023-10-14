import { test, expect } from "../fixtures";

test.beforeEach(async ({ aboutPage }) => {
  await aboutPage.goto();
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Gil Hanan | About Me");
});
