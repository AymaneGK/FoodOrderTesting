import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';

test.describe('Register Page', () => {
      let registerPage: RegisterPage;
      test.beforeEach(async ({ page }) => {
          registerPage = new RegisterPage(page);
          await registerPage.navigate();
        });
    
  test('should register a new user successfully', async ({ page }) => {

    const timestamp = Date.now();
    const name = 'Test User';
    const email = `testuser${timestamp}@example.com`;
    const password = 'Qwerty0$';
    const address = '123 Test Street, Testville';

    await registerPage.register(name, email, password, address);

    await expect(page).toHaveURL(/.*home/);
  });

  test('should show error when passwords do not match', async ({ page }) => {

  const timestamp = Date.now();
  const name = 'Mismatch User';
  const email = `mismatch${timestamp}@example.com`;
  const password = 'Qwerty0$';
  const confirmPassword = 'Difsdadsafa1!'; 
  const address = '456 Mismatch Road, Failtown';

  await registerPage.register(name, email, password, address, confirmPassword);

  const passwordFormatError = page.locator("//strong[normalize-space()='The password confirmation does not match.']");

  await expect(passwordFormatError).toBeVisible();
  //await expect(passwordFormatError).toHaveText("The password confirmation does not match.");
});

test('should show error when name exceeds 255 characters', async ({ page }) => {

    const timestamp = Date.now();
    const longName = 'a'.repeat(256);  
    const email = `longname${timestamp}@example.com`;
    const password = 'Qwerty0$';
    const address = '789 Longname Blvd';

    await registerPage.register(longName, email, password, address);

    const nameLengthError = page.locator("//strong[contains(text(),'The name must not be greater than 255 characters.')]");

    await expect(nameLengthError).toBeVisible();
    //await expect(nameLengthError).toHaveText(/The name must not be greater than 255 characters./i);
  });

test('should block registration with invalid email (missing @) due to native validation', async ({ page }) => {
  const timestamp = Date.now();
  const name = 'Invalid Email User';
  const email = `invalidemail${timestamp}.com`; 
  const password = 'Qwerty0$';
  const address = '123 Invalid Email St';

  await registerPage.register(name, email, password, address);

    // Assert that url is still the same
  await expect(page).toHaveURL('http://127.0.0.1:8000/register');
});

test('should block registration with invalid email like example@x due to native validation', async ({ page }) => {
  try {
    const timestamp = Date.now();
    const name = 'Invalid Domain Email User';
    const email = `example${timestamp}@x`; 
    const password = 'Qwerty0$';
    const address = '123 Invalid Domain St';

    await registerPage.register(name, email, password, address);

    // Assert that url is still the same
    await expect(page).toHaveURL('http://127.0.0.1:8000/register');

  } catch (error) {
    await page.screenshot({ path: 'screenshots/invalid-email-registration-failure.png', fullPage: true });
    throw error;
  }
});


test('should show error when registering with address longer than 255 characters', async ({ page }) => {
  try {
    const timestamp = Date.now();
    const name = 'Test User';
    const email = `testuser${timestamp}@example.com`;
    const password = 'Qwerty0$';

    const longAddress = 'A'.repeat(256);

    await registerPage.register(name, email, password, longAddress);

    const addressError = page.locator("//strong[contains(text(),'The address must not be greater than 255 characters.')]");

    await expect(addressError).toBeVisible();

  } catch (error) {
    await page.screenshot({ path: 'screenshots/long-address-registration-failure.png', fullPage: true });
    throw error;
  }
});



});
