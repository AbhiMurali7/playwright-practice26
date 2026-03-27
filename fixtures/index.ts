import { test as base } from "@playwright/test";
// என்ன பண்றோம்:
// Playwright-ஓட default test-ஐ import பண்றோம் — ஆனா base என்று rename பண்றோம்
// ஏன்:
// நாம் இந்த base-ஐ extend பண்ணி நம்மோட custom test create பண்ணுவோம்
// Original test-ஐ directly மாத்த வேண்டாம் — அதான் base என்று வெச்சோம்
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import userData from "../testdata/users.json";
// என்ன பண்றோம்:
// நமக்கு தேவையான classes + data import பண்றோம்
// ஏன்:
// Fixture-ல LoginPage create பண்ணணும் — அதுக்கு import வேணும்

// என்னென்ன fixtures வேணும்னு define பண்றோம்
type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};
// என்ன பண்றோம்:
// நம்மோட custom fixtures என்னென்ன இருக்கும்னு TypeScript-க்கு சொல்றோம்

export const test = base.extend<MyFixtures>({
  // என்ன பண்றோம்:
  // `base` test-ஐ extend பண்ணி — நம்மோட fixtures add பண்றோம்

  // ஏன்:
  // ```
  // base test → page, browser (Playwright default)
  //       +
  // MyFixtures → loginPage, homePage (நம்மோட custom)
  //       ↓
  // export test → எல்லாமே இருக்கும்! ✅

  // loginPage fixture
  loginPage: async ({ page }, use) => {
    // என்ன பண்றோம்:
    // loginPage fixture define பண்றோம்
    // 2 parameters:

    // { page } — Playwright-ஓட default page inject ஆகுது
    // use — "test-க்கு இந்த object கொடு" function

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      userData.validUser.email,
      userData.validUser.password,
    );
    // என்ன பண்றோம்:
    // LoginPage create பண்ணி, navigate பண்ணி, login பண்றோம்
    // ஏன் இங்க பண்றோம்:
    // Every test-ல beforeEach எழுதாம — fixture automatically இதை பண்ணும்! ✅

    await use(loginPage);
    // என்ன பண்றோம்:
    // Login பண்ணிட்டு — `loginPage` object-ஐ test-க்கு கொடுக்கிறோம்

    // ஏன்:
    // ```
    // Fixture                    Test
    //    ↓                         ↓
    // login பண்ணுச்சு    →    use பண்ணலாம்!
    //    ↓
    // use(loginPage) call ஆகுது
    //    ↓
    // test({ loginPage }) — inject ஆகுது ✅
  },

  // homePage fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage); // ← Test-க்கு கொடு
  },
  // என்ன பண்றோம்:
  // HomePage object create பண்ணி test-க்கு கொடுக்கிறோம்
  // ஏன் login இல்லை:
  // HomePage-க்கு login வேண்டாம் — just object கொடுத்தா போதும்
  // Login already loginPage fixture பண்ணிடும் ✅
});

export { expect } from "@playwright/test";
