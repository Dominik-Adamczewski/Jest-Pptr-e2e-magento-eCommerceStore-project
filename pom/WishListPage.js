import BasePage from "./BasePage";

export default class WishListPage extends BasePage {
    selectors = {
        wishListHeading: '.page-title',
        itemAddedToWishListAlert: '[role="alert"]',
        wishListItems: '.products-grid > ol > li.product-item',
        wishListItemTitle: '.products-grid > ol > li.product-item > div > a:last-of-type',
        mainLogo: '.logo',
    };

    async waitForWishListToRender() {
        await page.waitForSelector(this.selectors.wishListHeading);
    };

    async waitForSuccessAlertMessageToRender() {
        await page.waitForSelector(this.selectors.itemAddedToWishListAlert);
    };

    async navigateToHomePage() {
        await page.click(this.selectors.mainLogo);
    };
}