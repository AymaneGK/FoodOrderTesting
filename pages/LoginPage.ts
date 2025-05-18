import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly form: Locator;
  readonly errorMessage: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;



  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('//button[normalize-space()="Login"]');
    this.form = page.locator('form');
    this.errorMessage = page.locator('.error-message');
    this.loginButton = page.locator('//a[normalize-space()="Login"]');
    this.registerButton = page.locator('//a[normalize-space()="Register"]');

  }

  async navigate() {
    await this.page.goto('http://127.0.0.1:8000/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
