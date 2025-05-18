import { Page, Locator } from '@playwright/test';

export class DetailPage {
  readonly page: Page;

  // Define Locators
  readonly productTitle: Locator;
  readonly productImage: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly productPrice: Locator;
  readonly minusButton: Locator;
  readonly plusButton: Locator;
  readonly quantityNumber: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.productTitle = page.locator("//div[@class='flex-grow flex flex-col justify-around']/child::h1[1]");
    this.productImage = page.locator("//img[@class='object-cover xl:rounded-l-lg h-full']");
    this.productDescription = page.locator("//div[@class='flex-grow flex flex-col justify-around']/child::h1[3]");
    this.addToCartButton = page.locator("//button[@id='addCartBtn']");
    this.productPrice = page.locator("//div[@class='flex-grow flex flex-col justify-around']/child::h1[2]");
    this.minusButton = page.locator("//button[@id='minusBtn']");
    this.plusButton = page.locator("//button[@id='plusBtn']");
    this.quantityNumber = page.locator("//p[@id='qty']");
  }

  async waitForLoad() {
    await this.productTitle.waitFor({ state: 'visible' });
  }

  async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() ?? '';
  }

  async getProductDescription(): Promise<string> {
    return await this.productDescription.textContent() ?? '';
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() ?? '';
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async isProductImageVisible(): Promise<boolean> {
    return await this.productImage.isVisible();
  }

  async increaseQuantity() {
    await this.plusButton.click();
  }

  async decreaseQuantity() {
    await this.minusButton.click();
  }

  async getQuantity(): Promise<string> {
    return await this.quantityNumber.textContent() ?? '';
  }
}
