import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly userMenu: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly productCards: Locator;
  readonly aboutUs: Locator;
  readonly contactUs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator("//a[normalize-space()='Logout']");
    this.userMenu = page.locator("//a[@id='navbarDropdown']");
    this.loginButton = page.locator('//a[normalize-space()="Login"]');
    this.registerButton = page.locator('//a[normalize-space()="Register"]');
    this.productCards = this.page.locator("//div[@class='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5']/child::div");
    this.aboutUs = page.locator("//button[normalize-space()='About Us']");
    this.contactUs = page.locator("//button[normalize-space()='Contact Us']");
  }

  async navigate() {
    await this.page.goto('http://127.0.0.1:8000/home');
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }


  async isLoggedIn(): Promise<boolean> {
    const loginCount = await this.loginButton.count();
    const registerCount = await this.registerButton.count();
    const userMenuVisible = await this.userMenu.isVisible().catch(() => false);

    return loginCount === 0 && registerCount === 0 && userMenuVisible;
  }

  async getNumberOfProductsListed(): Promise<number> {
    return await this.productCards.count();
  }

  async clickProduct(index: number): Promise<void> {
    //console.log(await this.productCards.count()); 
    const productCard = this.productCards.nth(index);
    //console.log(await productCard.count()); 
    await productCard.click();
  }

  async clickAboutUs() {
    await this.aboutUs.click();
  }

  async clickContactUs() {
    await this.contactUs.click();
  }
}
