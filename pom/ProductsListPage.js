import BasePage from "./BasePage";

export default class ProductListPage extends BasePage {
    selectors = {
        filtersNavbar: '.filter-content',
        products: 'ol.products > li'
    };

    async waitForProductsPageToRender() {
        await page.waitForSelector(this.selectors.filtersNavbar);
    };

    async pickRandomProductFromTheList(n) {
        const selector = `${this.selectors.products}:nth-of-type(${n})`;

        await page.click(selector);
    };
}