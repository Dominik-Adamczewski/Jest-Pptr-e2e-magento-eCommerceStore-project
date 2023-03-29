import BasePage from "./BasePage";
import { credentials } from "../e2e/credentials";

export default class HomePage extends BasePage {
    selectors = {
        header: '.page-header',
        loggedInUserMenu: '[class="page-header"] > div.panel > div.panel > ul.header > li.greet > span.logged-in',
        loggedInUserMenuActionArrow: '[class="action switch"]:nth-of-type(1)',
        loggedInUserMenuOptions: '.header > ul.header',
        navigationMenu: '.navigation',
        wishListButton: '.header > ul.header > li.customer-welcome > div.customer-menu > ul > li.wishlist',
        categories: 'nav.navigation > ul#ui-id-2 > li > a',
        listOfHotSellersProducts: 'ol.product-items > li',
        navbarMenSectionDropdown: '.nav-3',
        navbarMenSubsectionTops: '.nav-3-1',
        navbarMenSubsectionTopsJackets: '.nav-3-1-1'
    };

    categoriesEndpoints = [
        'what-is-new.html',
        'women.html',
        'men.html',
        'gear.html',
        'training.html',
        'sale.html'
    ];

    textContents = {
        loggedInUserMessage: `Welcome, ${credentials.userName}!`,
    };

    async waitForHomePageToRender() {
        await page.waitForSelector(this.selectors.header);
    };

    async assertUserLoggedIn() {
        await page.waitForSelector(this.selectors.loggedInUserMenu);
        
        const text = await this.getText(this.selectors.loggedInUserMenu);

        expect(text).toEqual(this.textContents.loggedInUserMessage);
    };

    async clickShopSection(selector) {
        await page.waitForSelector(selector);
        await page.click(selector);
    };

    async openWishListPage() {
        await page.click(this.selectors.loggedInUserMenuActionArrow);
        await page.waitForSelector(this.selectors.loggedInUserMenuOptions);
        await page.click(this.selectors.wishListButton);
    };

    async openproductsListWithMensJackets() {
        await page.hover(this.selectors.navbarMenSectionDropdown);
        await page.hover(this.selectors.navbarMenSubsectionTops);
        await page.click(this.selectors.navbarMenSubsectionTopsJackets);
    }
};