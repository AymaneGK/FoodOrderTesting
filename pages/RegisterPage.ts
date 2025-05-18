import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly form: Locator;
  readonly adress: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="password_confirmation"]');
    this.submitButton = page.locator('//button[normalize-space()="Register"]');
    this.form = page.locator('form');
    this.adress = page.locator("//textarea[@id='address']")
    this.errorMessage = page.locator('.error-message'); // adjust selector if needed
  }

  async navigate() {
    await this.page.goto('http://127.0.0.1:8000/register');
  }

  async register(name: string, email: string, password: string, adress: string, confirmPassword?: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword ?? password);
    await this.adress.fill(adress);
    await this.submitButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
