import BasePage from "../../pom/BasePage";
import HomePage from "../../pom/HomePage";
import LoginPage from "../../pom/LoginPage";
import ProductPage from "../../pom/ProductPage";
import WishListPage from "../../pom/WishListPage";
import { E2E_BASE_URL } from "../globals";
import { isElementVisible } from "../helpers/helpers";

jest.setTimeout(90000);

const path = 'customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

describe('Test suite for a wishlist', () => {
    let productPage;
    let homePage;
    let loginPage;
    let basePage;
    let wishListPage;

    beforeAll(async () => {
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

    test('Should remove all the items from the wishlist', async () => {
        await homePage.openWishListPage();
        await wishListPage.waitForWishListToRender();

        let wishListItems = await page.$$(wishListPage.selectors.wishListItems);

        while(wishListItems.length > 0) {
            await wishListItems[0].hover();
            await page.click(wishListPage.selectors.removeItemButton);
        
            await wishListPage.waitForSuccessAlertMessageToRender();
        
            wishListItems = await page.$$(wishListPage.selectors.wishListItems);
        };

        // assert if the empty wish list message is visible
        await page.waitForSelector(wishListPage.selectors.emptyWishListMessage, { visible: true, timeout: 2000 });
    });
})