// homePage.spec.ts
// import { test, expect } from "@playwright/test";
// import { LoginPage } from "../pages/LoginPage";
// import { HomePage } from "../pages/HomePage";
import { test, expect } from '../../fixtures/index'; // ← playwright இல்லை!
import userData from '../../testdata/users.json';

// test.describe("Homepage Tests", () => {
//   let loginPage: LoginPage;
//   let homePage: HomePage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     homePage = new HomePage(page);

//     // Every test-க்கும் முன்னாடி login பண்றோம்
//     // Step 1 — Login பண்ணு
//     await loginPage.navigate();
//     await loginPage.login(
//         userData.validUser.email,
//         userData.validUser.password
//     );
//   });

//   // Step 2 — Homepage verify பண்ணு
//   test("Should show logged in username", async ({ page }) => {
//     const username = await homePage.getLoggedInUsername();
//     expect(username).toContain(userData.validUser.username);
//   });

//   test("Should show logout button", async ({ page }) => {
//     await expect(page.locator('a:has-text("Logout")')).toBeVisible();
//   });

//   test.afterEach(async () => {
//     await loginPage.logout();
//   });
// });

//After fixtures folder create



test.describe('Homepage Tests', () => {

    test('Should show logged in username', async ({ loginPage, homePage }) => {
        const username = await homePage.getLoggedInUsername();
        expect(username).toContain(userData.validUser.username);
    });

    test('Should show logout button', async ({ loginPage, page }) => {
        await expect(page.locator('a:has-text("Logout")')).toBeVisible();
    });

});
