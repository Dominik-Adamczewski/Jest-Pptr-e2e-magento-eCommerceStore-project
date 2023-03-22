import BasePage from "../../pom/BasePage";
import HomePage from "../../pom/HomePage";
import LoginPage from "../../pom/LoginPage";
import ProductPage from "../../pom/ProductPage";
import WishListPage from "../../pom/WishListPage";
import { E2E_BASE_URL } from "../globals";

jest.setTimeout(75000);

const path = 'customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

describe('CURRENT', () => {
    let productPage;
    let homePage;
    let loginPage;
    let basePage;
    let wishListPage;

    beforeEach(async () => {
        productPage = new ProductPage(page);
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        wishListPage = new WishListPage(page);

        await page.goto(`${E2E_BASE_URL}${path}`);
        await loginPage.loginAsUser();
        await page.goto(E2E_BASE_URL);
        await homePage.waitForHomePageToRender();
    });

    test('Should add all hot sellers items, to the wishlist', async () => {
        let hotSellers = await page.$$(homePage.selectors.listOfHotSellersProducts);

        for(let i = 0; i < hotSellers.length; i++) {
            await hotSellers[i].click();
            await productPage.waitForFirstPictureToRender();

            await productPage.addProductToWishList();
            await wishListPage.waitForWishListToRender();
            await wishListPage.waitForSuccessAlertMessageToRender();

            const addedItemTitle = await basePage.getOuterText(wishListPage.selectors.wishListItemTitle);
            const successAlertMessageText = await basePage.getOuterText(wishListPage.selectors.itemAddedToWishListAlert);
            expect(successAlertMessageText).toContain(addedItemTitle);

            await wishListPage.navigateToHomePage();
            await homePage.waitForHomePageToRender();

            hotSellers = await page.$$(homePage.selectors.listOfHotSellersProducts);
        }

        const itemsAddedToWishList = await page.$$(wishListPage.selectors.wishListItems);

        expect(itemsAddedToWishList.length).toEqual(hotSellers.length);
    });
})