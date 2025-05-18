import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Navigation and Logout flow', () => {
  test('should log in, open user menu, log out, and verify Login/Register buttons visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login('gziemann@example.com', 'password');

    await dashboardPage.logout();

    await expect(dashboardPage.loginButton).toBeVisible();
    await expect(dashboardPage.registerButton).toBeVisible();
  });

  test('should redirect to /about-us when About Us button is clicked', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navigate();

  try {
    await dashboardPage.clickAboutUs();
    await expect(page).toHaveURL(/.*\/about-us$/);
  } catch (error) {
    await page.screenshot({ path: 'screenshots/about-us-failure.png', fullPage: true });
    throw error;
  }
});

test('should redirect to /contact-us when Contact Us button is clicked', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navigate();

  try {
    await dashboardPage.clickContactUs();
    await expect(page).toHaveURL(/.*\/contact-us$/);
  } catch (error) {
    await page.screenshot({ path: 'screenshots/contact-us-failure.png', fullPage: true });
    throw error;
  }
});
});
