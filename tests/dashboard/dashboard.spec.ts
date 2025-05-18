import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Dashboard Page Login Flow', () => {
  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Login and wait for dashboard
    await loginPage.login('gziemann@example.com', 'password');
    await page.waitForURL('**/home', { timeout: 10000 });
  });


  test('should navigate to product detail page when clicking on product', async ({ page }) => {
    //for the first element i = 0 but its id is gonna be id = i+1 since id starts at 1
    let i: number = 0; //if we want the first product
    await dashboardPage.clickProduct(i);
    let id: number = i+1;
    await page.waitForURL('http://127.0.0.1:8000/food/'+id, { timeout: 5000 });

    expect(page.url()).toBe('http://127.0.0.1:8000/food/'+id);
  });
});
