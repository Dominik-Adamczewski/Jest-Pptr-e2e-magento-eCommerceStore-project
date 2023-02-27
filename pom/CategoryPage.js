import BasePage from "./BasePage";

export default class CategoryPage extends BasePage {
    selectors = {
        categoryPageTitle: '.page-title-wrapper',
    };

    async waitForCategoryPageToRender() {
        await page.waitForSelector(this.selectors.categoryPageTitle);
    }
}