import BasePage from "./BasePage";
import { credentials } from "../e2e/credentials";

export default class HomePage extends BasePage {
    selectors = {
        header: '.page-header',
        loggedInUserMenu: '[class="page-header"] > div.panel > div.panel > ul.header > li.greet > span.logged-in',
        navigationMenu: '.navigation',
        navigationListItems: 'li.level0',
    };

    urlEndpoints = [
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
};