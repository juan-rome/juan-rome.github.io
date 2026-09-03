import { expect, test } from "@playwright/test";

test("homepage renders hero and all primary sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Juan Romero", level: 1 })
  ).toBeVisible();

  for (const id of [
    "work",
    "experience",
    "expertise",
    "projects",
    "ai-lab",
    "philosophy",
    "resume",
    "contact",
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test("nav links jump to the right sections", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Experience" }).first().click();
  await expect(page).toHaveURL(/#experience$/);
});

test("skip-to-content link is keyboard accessible", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await skipLink.click();
  await expect(page).toHaveURL(/#main-content$/);
});

test("nav highlights the section currently in view while scrolling", async ({ page }) => {
  await page.goto("/");
  const experienceLink = page
    .locator('nav[aria-label="Primary"] a[href="#experience"]')
    .first();
  await expect(experienceLink).not.toHaveAttribute("aria-current", "location");

  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(experienceLink).toHaveAttribute("aria-current", "location");
});

test("mobile nav menu closes after selecting a link", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const details = page.locator("details");
  await page.locator('summary[aria-label="Open navigation menu"]').click();
  await expect(details).toHaveJSProperty("open", true);

  await details.getByRole("link", { name: "Experience" }).click();
  await expect(details).toHaveJSProperty("open", false);
});
