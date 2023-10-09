import { test, expect } from "../fixtures";

const socialLinks = [
  {
    host: "github.com",
    ariaLabel: "My Github profile",
  },
  {
    host: "linkedin.com",
    ariaLabel: "My Linkedin profile",
  },
  {
    host: "facebook.com",
    ariaLabel: "My Facebook profile",
  },
];

test.beforeEach(async ({ homePage }) => {
  await homePage.goto();
});

test("footer can be rendered", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Follow me" })).toBeVisible();

  socialLinks.forEach(({ ariaLabel }) => {
    expect(page.getByRole("link", { name: ariaLabel })).toBeVisible();
  });
});

for (const { ariaLabel, host } of socialLinks) {
  test(`navigating ${ariaLabel} works`, async ({ context, page }) => {
    const responsePromise$ = context.waitForEvent(
      "response",
      (response) => response.url().includes(host) && response.status() === 200,
    );

    page.getByRole("link", { name: ariaLabel }).click();

    await responsePromise$;
  });
}
