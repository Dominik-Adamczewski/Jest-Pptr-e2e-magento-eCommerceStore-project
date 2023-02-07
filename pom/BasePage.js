export default class BasePage {
    constructor(page) {
        this.page = page;
    };
    
    async wait(time) {
        await page.waitForTimeout(time);
    };

    async getTitle() {
        return await page.getTitle();
    };

    async getUrl() {
        return await page.url();
    };

    async getText(selector) {
        await page.waitForSelector(selector);

        const text = await page.$eval(selector, element => element.textContent);

        return text;
    }
}