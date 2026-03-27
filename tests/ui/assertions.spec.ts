import { test, expect } from "@playwright/test";

test("Basic Assertions", async ({ page }) => {
  await page.goto("https://automationexercise.com", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });

  // 1. "Signup / Login" link visible-ஆ இருக்கா? — toBeVisible()
  // 2. Page title "Automation Exercise" -ஆ இருக்கா? — toHaveTitle()
  // 3. URL "automationexercise.com" contain பண்றதா? — toHaveURL()
  await expect(
    page.getByRole("link", { name: "Signup / Login" }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Automation Exercise");
  await expect(page).toHaveURL("https://automationexercise.com/");
});

test("Text Assertions", async ({ page }) => {
  await page.goto("https://automationexercise.com", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });

  // 1. Homepage heading-ல் "Full-Fledged" text இருக்கா?
  //    — toContainText() use பண்ணு

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    }),
  ).toContainText("Full-Fledged");

  // 2. "Signup / Login" link exact text சரியா இருக்கா?
  //    — toHaveText() use பண்ணு

  await expect(page.getByRole("link", { name: "Signup / Login" })).toHaveText(
    "Signup / Login",
  );

  // 1. Email input-ல் 'test@gmail.com' fill பண்ணு
  await page.locator("#susbscribe_email").fill("test@gmail.com");
  // 2. Value 'test@gmail.com'-ஆ இருக்கான்னு assert பண்ணு — toHaveValue()
  await expect(page.locator("#susbscribe_email")).toHaveValue("test@gmail.com");
  // 3. Clear பண்ணு
  await page.locator("#susbscribe_email").clear();
  // 4. Value empty-ஆ இருக்கான்னு assert பண்ணு — toHaveValue('')
  await expect(page.locator("#susbscribe_email")).toHaveValue("");
});

test("Soft Assertions", async ({ page }) => {
  await page.goto("https://automationexercise.com", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });

  // 1. Soft assertion — Title check பண்ணு (wrong title குடு — fail ஆகட்டும்)
  await expect.soft(page).toHaveTitle("Automation Exercise");
  // 2. Soft assertion — URL check பண்ணு (correct URL குடு)
  await expect.soft(page).toHaveURL("https://automationexercise.com");
  // 3. Soft assertion — "Signup / Login" visible-ஆ இருக்கான்னு check பண்ணு
  await expect
    .soft(page.getByRole("link", { name: "Signup / Login" }))
    .toBeVisible();
  // 4. console-ல் "Test completed" print பண்ணு
  //    (Soft fail ஆனாலும் இது print ஆகணும்!)
  console.log("Test completed");
});

test("Screenshot Assertion", async ({ page }) => {
  await page.goto("https://automationexercise.com", {
    timeout: 60000,
    waitUntil: "domcontentloaded",
  });

  // Slider settle ஆகும் வரை wait பண்ணு
  await page.waitForTimeout(3000);

  // Full page screenshot
  await expect(page).toHaveScreenshot("homepage.png", {
    maxDiffPixelRatio: 0.3, // 30% difference allow
    timeout: 15000,
  });

  // Element — toMatchSnapshot
  await expect(page.locator(".navbar")).toHaveScreenshot("navbar.png");
});
