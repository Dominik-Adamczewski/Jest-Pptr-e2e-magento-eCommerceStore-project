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
    };

    async convertTextToLowerCase(text) {
        return text.toLowerCase();
    };

    async assertText(selector, expectedText) {
        await page.waitForSelector(selector);

        const text = await this.getText(selector);

        expect(text).toEqual(expectedText);
    };

    async clearInputField(selector) {
        await page.waitForSelector(selector);

        const input = await page.$(selector);
        await input.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
    };

    async getElementsHTMLAttribute(selector, attribute) {
        await page.waitForSelector(selector);

        const element = await page.$(selector);

        const className = await (await element.getProperty(attribute)).jsonValue();

        return className;
    };

    async getArrayOfLinks(selector) {
        return await page.$$eval(selector, anchors => [].map.call(anchors, a => a.href));
    };
}