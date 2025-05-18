import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login page - Valid inputs', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // this one was seeded so I know it will be valid
    const validEmail = 'gziemann@example.com';
    const validPassword = 'password';

    await loginPage.login(validEmail, validPassword);

    await expect(loginPage.loginButton).toHaveCount(0);

    await expect(loginPage.registerButton).toHaveCount(0);
  });

  test('shouldnt login with invalid credentials', async ({ page }) => {
     const timestamp = Date.now();
  const invalidEmail = `testuser${timestamp}@example.com`;
  const invalidPassword = `password${timestamp}`;

  await loginPage.login(invalidEmail, invalidPassword);

  // Wait for the specific error message to appear
  const errorMessage = page.locator("//strong[normalize-space()='These credentials do not match our records.']");
  await expect(errorMessage).toBeVisible();

  await expect(loginPage.loginButton).toHaveCount(1);

  await expect(loginPage.registerButton).toHaveCount(1);

});

test('shouldnt login with invalid email and valid password', async ({ page }) => {
  const timestamp = Date.now();
  const invalidEmail = `testuser${timestamp}@example.com`;
  //we know multiple seeded users have "password" as a password
  const validPassword = 'password';

  await loginPage.login(invalidEmail, validPassword);

  const errorMessage = page.locator("//strong[normalize-space()='These credentials do not match our records.']");
  await expect(errorMessage).toBeVisible();

  await expect(loginPage.loginButton).toHaveCount(1);

  await expect(loginPage.registerButton).toHaveCount(1);
});

test('shouldnt login with valid email and invalid password', async ({ page }) => {
  const timestamp = Date.now();
  //this user exist after seeding
  const validEmail = "gziemann@example.com";
  const invalidPassword = `password${timestamp}`;

  await loginPage.login(validEmail, invalidPassword);

  const errorMessage = page.locator("//strong[normalize-space()='These credentials do not match our records.']");
  await expect(errorMessage).toBeVisible();

  await expect(loginPage.loginButton).toHaveCount(1);

  await expect(loginPage.registerButton).toHaveCount(1);
});

test('should stay on login page when submitting empty credentials', async ({ page }) => {
  await loginPage.login('', '');

  await expect(page).toHaveURL(/.*\/login/);
// check if the form is still visible
  const loginForm = page.locator("//div[@class='card-body']//form[@method='POST']");
  await expect(loginForm).toBeVisible();

  await expect(loginPage.loginButton).toHaveCount(1);

  await expect(loginPage.registerButton).toHaveCount(1);
});

});
