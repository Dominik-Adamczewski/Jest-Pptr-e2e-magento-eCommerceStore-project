import BasePage from "./BasePage";

export default class CartPage extends BasePage {
    selectors = {
        totalAmount: '.grand',
        productsInCartCount: '.counter-number',
        cartIcon: '.minicart-wrapper',
        viewCartButton: 'a.viewcart',
        cartItems: 'tbody.item',
        removeCartItemButton: '.action-delete',
        emptyCartMessage: '.cart-empty',
        tooltipEmptyCartMessage: '[class="subtitle empty"]',
    };

    async waitForCartToRender() {
        await page.waitForSelector(this.selectors.totalAmount);
    };

    async getNumberOfProductsInCart() {
        await page.waitForSelector(this.selectors.productsInCartCount);
        const text = this.getText(this.selectors.productsInCartCount);

        return text;
    };

    async assertEmptyCart() {
        await page.waitForSelector(this.selectors.emptyCartMessage, { visible: true });
    };

    async openCart() {
        await page.waitForSelector(this.selectors.cartIcon);
        await page.click(this.selectors.cartIcon);

        await page.waitForSelector(this.selectors.viewCartButton);
        await page.click(this.selectors.viewCartButton);
    };

    async clickCartIcon() {
        await page.waitForSelector(this.selectors.cartIcon);
        await page.click(this.selectors.cartIcon);
    };

    async removeProductsFromCart() {
        let productCarts = await page.$$(this.selectors.cartItems);

        if(productCarts.length > 0) {
            while(productCarts.length > 0) {
                await page.click(this.selectors.removeCartItemButton);
                await this.waitForCartToRender();
    
                productCarts = await page.$$(this.selectors.cartItems);
            };
        }
    };
}