// pages/BasePage.ts
import { Page } from "@playwright/test";

// என்ன பண்றோம்:
// Playwright-ல இருந்து Page type-ஐ import பண்றோம்
// ஏன்:
// page variable-ஓட type என்னன்னு TypeScript-க்கு சொல்லணும் — அதுக்காக

export class BasePage {
  //     என்ன பண்றோம்:
  // BasePage என்ற class create பண்றோம், export பண்றோம்
  // ஏன்:

  // export — வேற files இந்த class-ஐ import பண்ணி use பண்ணலாம்
  // இது parent class — LoginPage, HomePage எல்லாம் இதை extend பண்ணும்

  protected page: Page;

  //   என்ன பண்றோம்:
  // page என்ற variable declare பண்றோம், type Page
  // ஏன் protected:
  // protected - அந்த class + child classes ✅
  // LoginPage, HomePage எல்லாம் this.page use பண்ணணும் — அதுக்காக protected

  constructor(page: Page) {
    this.page = page;
  }
  // என்ன பண்றோம்:
  // Constructor-ல page-ஐ receive பண்ணி, class variable-ல store பண்றோம்
  // ஏன்:
  // Test file-ல நாம் இப்படி பண்றோம்:
  // const loginPage = new LoginPage(page);
  //                               ↑
  //                     இந்த page இங்க வருது
  //                     constructor-ல receive ஆகுது
  //                     this.page-ல store ஆகுது

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  //   என்ன பண்றோம்:
  // URL-க்கு navigate பண்ற common method
  // ஏன் BasePage-ல போட்டோம்:
  // LoginPage, HomePage, ProductPage — எல்லாருக்கும் navigate பண்ண வேணும்
  // Same code எல்லா page-லயும் எழுதாம — ஒரே ஒரு place-ல எழுதி எல்லாரும் use பண்ணலாம்
}
