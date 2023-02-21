import BasePage from "./BasePage";
import { credentials } from "../e2e/credentials";

export default class HomePage extends BasePage {
    selectors = {
        header: '.page-header',
        loggedInUserMenu: '[class="page-header"] > div.panel > div.panel > ul.header > li.greet > span.logged-in',
        navigationMenu: '.navigation',
        navigationListItems: '#ui-id-2 > li',
    };

    urlEndpoints = {
        whatsNewPage: 'what-is-new.html',
        womenPage: 'women.html',
        menPage: 'men.html',
        gearPage: 'gear.html',
        trainingPage: 'training.html',
        salePage: 'sale.html'
    };

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
};