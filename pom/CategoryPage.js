import BasePage from "./BasePage";
import { E2E_BASE_URL } from "../e2e/globals";

export default class CategoryPage extends BasePage {
    selectors = {
        categoryPageTitle: '.page-title-wrapper',
        productCategories: 'div.categories-menu > ul.items > li.item > a',
        productCategoryPageHeading: '#page-title-heading',
    };

    async waitForCategoryPageToRender() {
        await page.waitForSelector(this.selectors.categoryPageTitle);
    };

    async waitForProductCategoryPageToRender() {
        await page.waitForSelector(this.selectors.productCategoryPageHeading);
    };
}