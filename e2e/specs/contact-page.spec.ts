import { test, expect } from "../fixtures";

test.beforeEach(async ({ contactPage }) => {
  await contactPage.goto();
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Gil Hanan | Contact");
});

test("can submit form", async ({ page }) => {
  await page.waitForSelector(".grecaptcha-badge");

  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Subject").fill("Test Subject");
  await page.getByLabel("Text").fill("Test description");

  const responsePromise$ = page.waitForResponse(
    (resp) => resp.url().includes("/api/contact") && resp.status() === 200,
  );

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();

  await responsePromise$;

  await page.waitForURL("/contact/success");
  await expect(page.getByText(/Thank you for your message!/i)).toBeVisible();
});
