import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { DetailPage } from '../../pages/DetailsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Product Cart Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let detailPage: DetailPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    detailPage = new DetailPage(page);
    cartPage = new CartPage(page);
  });

  const loginAndOpenFirstProduct = async () => {
    await loginPage.navigate();
    await loginPage.login('gziemann@example.com', 'password');

    await loginPage.page.waitForURL('**/home', { timeout: 10000 });
    expect(loginPage.page.url()).toContain('/home');

    await expect(dashboardPage.loginButton).toHaveCount(0);
    await expect(dashboardPage.registerButton).toHaveCount(0);

    await dashboardPage.clickProduct(0);
    await detailPage.waitForLoad();
  };

  test('should log in, add product to cart, remove it and confirm removal', async ({ page }) => {
    await loginAndOpenFirstProduct();

    await detailPage.addToCart();

    await page.waitForURL('**/home', { timeout: 10000 });
    expect(page.url()).toContain('/home');

    const cartButton = page.locator("//div[@id='navbtncart']");
    await cartButton.click();

    await cartPage.clickFirstRemove();

    // Waiting for the popup
    const confirmButton = page.locator("//button[@type='submit' and contains(@class, 'closeRemoveModal') and normalize-space(text())='Confirm']");
    await expect(confirmButton).toBeVisible({ timeout: 5000 });

    await confirmButton.click();

    await page.waitForURL('**/cart', { timeout: 5000 });
    expect(page.url()).toContain('/cart');

    const successMessage = page.locator("//strong[normalize-space()='Successfully removed from cart.']");
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  const loginAndAddProductToCart = async () => {
    await loginPage.navigate();
    await loginPage.login('gziemann@example.com', 'password');

    await loginPage.page.waitForURL('**/home', { timeout: 10000 });
    expect(loginPage.page.url()).toContain('/home');

    await dashboardPage.clickProduct(0);
    await detailPage.waitForLoad();
    await detailPage.addToCart();

    await loginPage.page.waitForURL('**/home', { timeout: 10000 });
  };

  test('should complete checkout with Pick Up order type', async ({ page }) => {
    await loginAndAddProductToCart();

    const cartButton = page.locator("//div[@id='navbtncart']");
    await cartButton.click();

    await expect(cartPage.placeOrderButton).toBeVisible({ timeout: 5000 });

    await cartPage.clickPlaceOrder();

    await expect(cartPage.pickUpRadioButton).toBeVisible({ timeout: 5000 });

    await cartPage.selectPickUpType();

    await cartPage.clickProceedToPayment();

    const successMessage = page.locator("//strong[normalize-space()='Successfully placed order.']");
    await expect(successMessage).toBeVisible({ timeout: 10000 }); //this one takes time to pop bc of loading
  });

  test('should complete checkout with Delivery order type and valid address', async ({ page }) => {
    await loginAndAddProductToCart();

    const cartButton = page.locator("//div[@id='navbtncart']");
    await cartButton.click();

    await expect(cartPage.placeOrderButton).toBeVisible({ timeout: 5000 });

    await cartPage.clickPlaceOrder();

    await expect(cartPage.deliveryRadioButton).toBeVisible({ timeout: 5000 });

    await cartPage.selectDeliveryType();

    await cartPage.fillDeliveryAddress('456 Example Street, Marrakech');

    await cartPage.clickProceedToPayment();

    const successMessage = page.locator("//strong[normalize-space()='Successfully placed order.']");
    await expect(successMessage).toBeVisible({ timeout: 10000 });
});

  test('should stay on /cart when trying to checkout with Delivery order type and empty address', async ({ page }) => {
    await loginAndAddProductToCart();

    const cartButton = page.locator("//div[@id='navbtncart']");
    await cartButton.click();

    await expect(cartPage.placeOrderButton).toBeVisible({ timeout: 5000 });

    await cartPage.clickPlaceOrder();

    await expect(cartPage.deliveryRadioButton).toBeVisible({ timeout: 5000 });

    await cartPage.selectDeliveryType();

    await cartPage.clickProceedToPayment();

    // Assert that url is still the same
    await page.waitForTimeout(1000); 
    await expect(page).toHaveURL(/.*\/cart/);
});

  test('should stay on /cart when trying to checkout with Delivery order type and 1000+ characters address', async ({ page }) => {
  try {
    await loginAndAddProductToCart();

    const cartButton = page.locator("//div[@id='navbtncart']");
    await cartButton.click();

    await expect(cartPage.placeOrderButton).toBeVisible({ timeout: 5000 });

    await cartPage.clickPlaceOrder();

    await expect(cartPage.deliveryRadioButton).toBeVisible({ timeout: 5000 });

    await cartPage.selectDeliveryType();

    const longAddress = 'A'.repeat(1001);
    await cartPage.fillDeliveryAddress(longAddress);

    await cartPage.clickProceedToPayment();

    // Assert that url is still the same
    await page.waitForTimeout(10000);
    await expect(page).toHaveURL("/cart/");
    
  } catch (error) {
    await page.screenshot({ path: 'screenshots/cart-delivery-longaddress-failure.png', fullPage: true });
    throw error;
  }
});


test('should increase quantity to 1000, add to cart and not show success message', async ({ page }) => {
  try {
    await loginAndOpenFirstProduct();

    for (let i = 1; i < 1000; i++) {
      await detailPage.increaseQuantity();
    }

    const quantity = await detailPage.getQuantity();
    expect(quantity).toBe('1000');

    await detailPage.addToCart();

    await page.waitForTimeout(5000);

    const successMessage = page.locator("//strong[normalize-space()='Successfully added to cart.']");
    await expect(successMessage).toHaveCount(0);
    await page.waitForTimeout(10000);


  } catch (error) {
    await page.screenshot({ path: 'screenshots/add-1000-to-cart.png', fullPage: true });
    throw error;
  }
});


test('should add the product to cart and show success message', async ({ page }) => {
    await loginAndOpenFirstProduct();

    await detailPage.addToCart();

    await page.waitForURL('**/home', { timeout: 10000 });
    expect(page.url()).toContain('/home');

    const successMessage = page.locator("//strong[normalize-space()='Successfully added to cart.']");
    await expect(successMessage).toBeVisible({ timeout: 5000 });
});

test('should redirect to login and show error when adding to cart without login', async ({ page }) => {
    await dashboardPage.navigate();
    await dashboardPage.clickProduct(0);
    await detailPage.waitForLoad();
    await detailPage.addToCart();

    await page.waitForURL('**/login', { timeout: 5000 });
    expect(page.url()).toContain('/login');

    const errorMessage = page.locator("//strong[contains(text(),'You must be logged in to add to cart and place ord')]");
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
});
});
