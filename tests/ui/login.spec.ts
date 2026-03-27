import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import userData from '../../testdata/users.json';

// test('Google Search Test', async ({ page }) => {
//   // Step 1: Google open பண்ணு
//   await page.goto('https://www.google.com');

//   // Step 2: Title check பண்ணு
//   await expect(page).toHaveTitle(/Google/);

//   // Step 3: Print பண்ணு
//   console.log('✅ Google opened successfully!');
// });

// test("User should login successfully", async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.navigate();
//   await loginPage.login("sweta@testmail.com", "test@123");

//   const success = await loginPage.isLoginSuccessful();
//   expect(success).toBe(true);
// });

//Using Testdata from testdata folder

test('User should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(
    userData.validUser.email,
    userData.validUser.password
  );

  const success = await loginPage.isLoginSuccessful();
  expect(success).toBe(true);
});