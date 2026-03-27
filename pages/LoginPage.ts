// pages/LoginPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

// என்ன பண்றோம்:

// Page type import பண்றோம்
// நாம் எழுதின BasePage-ஐ import பண்றோம்

// ஏன்:
// LoginPage, BasePage-ஐ extend பண்ணணும் — அதுக்கு முதல்ல import வேணும்

export class LoginPage extends BasePage {
  // BasePage-ல இருக்கற எல்லா methods-உம் LoginPage-க்கு automatically கிடைக்கும்!
  // navigateTo() — BasePage-ல எழுதினோம், LoginPage directly use பண்ணலாம் ✅

  constructor(page: Page) {
    super(page);
  }

  // என்ன பண்றோம்:

  // Constructor-ல page receive பண்றோம்
  // super(page) — parent class (BasePage) constructor-க்கு pass பண்றோம்

  // ஏன் super():
  // BasePage-ல this.page = page நடக்கணும்னா — BasePage constructor call ஆகணும்

  async navigate() {
    await this.navigateTo("https://www.automationexercise.com/login");
  }

  // என்ன பண்றோம்:
  // Login page URL-க்கு navigate பண்ற method
  // ஏன்:
  // Test file-ல URL hardcode பண்ண வேண்டாம்

  async login(email: string, password: string) {
    await this.page.fill('[data-qa="login-email"]', email);
    await this.page.fill('[data-qa="login-password"]', password);
    await this.page.click('[data-qa="login-button"]');
  }

 async isLoginSuccessful(): Promise<boolean> {
    await this.page.locator('a:has-text("Logout")').waitFor({ 
        state: 'visible' 
    });
    return await this.page.locator('a:has-text("Logout")').isVisible();
}

async logout() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
}
}
