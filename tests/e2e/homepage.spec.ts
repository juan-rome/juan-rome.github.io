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

test("AI Lab: Tool entries get a distinct spotlight treatment", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Try it yourself", level: 3 })
  ).toBeVisible();
  await expect(page.getByText("Live in your browser").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Skill Quality Scorecard", level: 4 })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Skill Workflow Builder", level: 4 })
  ).toBeVisible();
});

test("AI Lab: extra skills are collapsed behind a toggle by default, with a matching collapse control after them", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Accessibility Audit", level: 4 })
  ).toBeVisible();
  await expect(page.getByText("Secret Leak Scanner")).not.toBeVisible();

  const expandButton = page.getByRole("button", { name: "+4 more skills" });
  await expandButton.scrollIntoViewIfNeeded();
  await expect(expandButton).toHaveAttribute("aria-expanded", "false");
  await expandButton.click();

  await expect(page.getByText("Secret Leak Scanner")).toBeVisible();
  await expect(page.getByText("PM Ticket Readiness Checker")).toBeVisible();
  await expect(page.getByText("Design-to-Code Fidelity Checker")).toBeVisible();
  await expect(page.getByText("Cypress Test Generator")).toBeVisible();

  // The collapse control is a second, real button rendered after the
  // revealed cards, not the same element relabeled in place.
  const revealedCards = page.locator("#ai-lab-more-skills");
  const collapseButton = page.getByRole("button", { name: "Show fewer skills" });
  const [cardsBox, collapseBox] = await Promise.all([
    revealedCards.boundingBox(),
    collapseButton.boundingBox(),
  ]);
  expect(cardsBox).not.toBeNull();
  expect(collapseBox).not.toBeNull();
  expect(collapseBox!.y).toBeGreaterThan(cardsBox!.y);
  await expect(collapseButton).toHaveAttribute("aria-expanded", "true");

  await collapseButton.click();
  await expect(page.getByText("Secret Leak Scanner")).not.toBeVisible();
  // Focus returns to the expand control rather than being dropped.
  await expect(page.getByRole("button", { name: "+4 more skills" })).toBeFocused();
});

test("mobile nav menu closes after selecting a link", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const details = page.locator("header details");
  await page.locator('summary[aria-label="Open navigation menu"]').click();
  await expect(details).toHaveJSProperty("open", true);

  await details.getByRole("link", { name: "Experience" }).click();
  await expect(details).toHaveJSProperty("open", false);
});

test("AI Lab compact grid stays two columns at mobile viewport width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const prCard = page.getByRole("heading", { name: "PR Readiness Agent", level: 4 });
  const jiraCard = page.getByRole("heading", {
    name: "Jira → PR",
    exact: true,
    level: 4,
  });
  await prCard.scrollIntoViewIfNeeded();

  const [prBox, jiraBox] = await Promise.all([
    prCard.boundingBox(),
    jiraCard.boundingBox(),
  ]);
  expect(prBox).not.toBeNull();
  expect(jiraBox).not.toBeNull();
  // Two-column grid on mobile: the two cards should sit in the same row.
  expect(Math.abs(prBox!.y - jiraBox!.y)).toBeLessThan(4);
});

// Deliberately never triggers an actual score (that fires a real call to
// GitHub's public API, which would make CI depend on a live, rate-limited
// external service — flaky and needlessly noisy on every push). The
// scoring logic itself has its own offline, mocked test suite in the
// skill-quality-scorecard repo; this only proves the page's own wiring
// (heading, empty/typed input states, example buttons) is correct.
test("Skill Quality Scorecard page: real page, real interactive wiring", async ({
  page,
}) => {
  await page.goto("/tools/scorecard/");

  await expect(
    page.getByRole("heading", { name: "Skill Quality Scorecard", level: 1 })
  ).toBeVisible();

  const input = page.getByPlaceholder("owner/repo or a GitHub URL");
  const submitButton = page.getByRole("button", { name: "Score it" });
  await expect(submitButton).toBeDisabled();

  await input.fill("some-owner/some-repo");
  await expect(submitButton).toBeEnabled();

  await expect(
    page.getByRole("button", { name: "juan-rome/pr-readiness-agent" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "octocat/Hello-World" })).toBeVisible();
});

test("Skill Workflow Builder page: real page, real graph-to-markdown pipeline", async ({
  page,
}) => {
  await page.goto("/tools/workflow-builder/");

  await expect(
    page.getByRole("heading", { name: "Skill Workflow Builder", level: 1 })
  ).toBeVisible();

  // The example graph loads by default — its real dependency order should
  // already be visible in the generated preview without any interaction.
  const preview = page.getByLabel("Generated SKILL.md preview");
  await expect(preview).toContainText("flowchart TD");
  await expect(preview).toContainText("1. **fetch-ticket.mjs**");
  await expect(preview).toContainText("5. **Open PR**");

  // Adding a step should update the live preview without a page reload.
  await page.getByRole("button", { name: "+ Add step" }).click();
  await expect(preview).toContainText("New step");

  // Clearing the canvas still generates a valid SKILL.md (a real empty-
  // graph placeholder, not an error), which is graph-to-skill-md.mjs's
  // actual behavior for zero nodes: topoSort([], []) is a real, empty
  // (not cyclic) order, so it renders the doc's own "no steps yet" line
  // rather than falling back to this page's separate empty-state message.
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(preview).toContainText("No steps yet");
  await expect(preview).not.toContainText("fetch-ticket.mjs");
});
