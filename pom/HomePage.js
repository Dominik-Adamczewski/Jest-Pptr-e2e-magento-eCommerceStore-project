import BasePage from "./BasePage";
import { credentials } from "../e2e/credentials";

export default class HomePage extends BasePage {
    selectors = {
        navbar: '.page-header',
        loggedInUserMenu: '[class="page-header"] > div.panel > div.panel > ul.header > li.greet > span.logged-in'
    };

    textContents = {
        loggedInUserMessage: `Welcome, ${credentials.userName}!`,
    };

    async waitForHomePageToRender() {
        await page.waitForSelector(this.selectors.navbar);
    };

    async assertUserLoggedIn() {
        await page.waitForSelector(this.selectors.loggedInUserMenu);
        
        const text = await this.getText(this.selectors.loggedInUserMenu);

        expect(text).toEqual(this.textContents.loggedInUserMessage);
    };
};