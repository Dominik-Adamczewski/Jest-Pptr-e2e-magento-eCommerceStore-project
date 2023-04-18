import { E2E_BASE_URL } from "../globals";
import { getRandomNumber } from "../helpers/helpers";
import ProductPage from "../../pom/ProductPage";
import HomePage from "../../pom/HomePage";
import LoginPage from "../../pom/LoginPage";
import ProductListPage from "../../pom/ProductsListPage";
import CartPage from "../../pom/CartPage";
import BasePage from "../../pom/BasePage";

jest.setTimeout(30000);

const path = 'customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';
const productNumber = getRandomNumber(10);

describe('CURRENT', () => {
    let productPage;
    let homePage;
    let loginPage;
    let productListPage;
    let cartPage;
    let basePage;


    beforeAll(async () => {
        productPage = new ProductPage(page);
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        productListPage = new ProductListPage(page);
        cartPage = new CartPage(page);
        basePage = new BasePage(page);

        await page.goto(`${E2E_BASE_URL}${path}`);
        await loginPage.loginAsUser();

        await page.goto(E2E_BASE_URL);
        await homePage.waitForHomePageToRender();
    });

    beforeEach(async () => {
        await homePage.openproductsListWithMensJackets();
        await productListPage.waitForProductsPageToRender();
        await productListPage.pickRandomProductFromTheList(productNumber);
    });

    test('It should not allow to add product to the cart, without picking size and color', async () => {
        await productPage.waitForSizesListToRender();
        await productPage.waitForColorPickerToRender();

        await productPage.addProductToCart();
        await page.waitForSelector(productPage.selectors.missingSizeError, { visible: true });
        await page.waitForSelector(productPage.selectors.missingColorError, { visible: true });

        await productPage.assertColorErrorMessage();
        await productPage.assertSizeErrorMessage();
    });

    test('It should not allow to add product to the cart, without picking size', async () => {
        await productPage.waitForSizesListToRender();
        await productPage.waitForColorPickerToRender();
        await productPage.pickFirstAvailableColor();

        await productPage.addProductToCart();
        await page.waitForSelector(productPage.selectors.missingSizeError, { visible: true });
        await productPage.assertSizeErrorMessage();
    });

    test('It should not allow to add product to the cart, without picking the color', async () => {
        await productPage.waitForSizesListToRender();
        await productPage.waitForColorPickerToRender();
        await productPage.pickFirstAvailableSize();

        await productPage.addProductToCart();
        await page.waitForSelector(productPage.selectors.missingColorError, { visible: true });
        await productPage.assertColorErrorMessage();
    });

    test('It should properly add a product to the cart', async () => {
        await productPage.waitForSizesListToRender();
        await productPage.waitForColorPickerToRender();

        await productPage.pickFirstAvailableColor();
        await productPage.pickFirstAvailableSize();

        await productPage.addProductToCart();
        await productPage.waitForAddToCartSuccessMessage();

        await productPage.openCart();
        await cartPage.waitForCartToRender();

        const cartItems = await page.$$(cartPage.selectors.cartItems);

        expect(cartItems.length).toEqual(1);
    });

    test('It should properly remove a product from the cart', async () => {
        await productPage.openCart();
        await cartPage.removeSingleProductFromCart();

        await cartPage.assertEmptyCart();
    });

})