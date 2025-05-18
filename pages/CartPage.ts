import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productDivs: Locator;
  readonly removeButtons: Locator;
  readonly placeOrderButton: Locator;
  readonly pickUpRadioButton: Locator;
  readonly deliveryRadioButton: Locator;
  readonly deliveryAddressField: Locator;
  readonly proceedToPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDivs = page.locator("//div[@class='px-3 py-2']");
    this.removeButtons = page.locator("//span[contains(text(),'Remove')]");
    this.placeOrderButton = page.locator("//button[normalize-space()='Place Order']");
    this.pickUpRadioButton = page.locator("//input[@id='pickupType']");
    this.deliveryRadioButton = page.locator("//input[@id='deliveryType']");
    this.deliveryAddressField = page.locator("//textarea[@id='address']");
    this.proceedToPaymentButton = page.locator("//button[normalize-space()='Proceed to Payment']");
  }

  async getProductCount() {
    return await this.productDivs.count();
  }

  async clickFirstRemove() {
    await this.removeButtons.first().click();
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }

  async selectPickUpType() {
    await this.pickUpRadioButton.click();
  }

  async selectDeliveryType() {
    await this.deliveryRadioButton.click();
  }

  async fillDeliveryAddress(address: string) {
    await this.deliveryAddressField.fill(address);
  }

  async clickProceedToPayment() {
    await this.proceedToPaymentButton.click();
  }
}
