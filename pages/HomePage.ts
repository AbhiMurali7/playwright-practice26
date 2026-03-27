import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

 constructor(page: Page) {
    super(page);
  }
    async getLoggedInUsername(): Promise<string> {
    const text = await this.page.locator('a:has-text("Logged in as")').innerText();
    return text;
}

}