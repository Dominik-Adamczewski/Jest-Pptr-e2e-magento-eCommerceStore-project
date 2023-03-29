import BasePage from "./BasePage";
import { E2E_BASE_URL } from "../e2e/globals";

export default class ProductPage extends BasePage {
    productUrls = {
        multipleSizesAndColorsProduct: `${E2E_BASE_URL}/juno-jacket.html`,
    };

    selectors = {
        productHeading: '.page-title',
        colorsList: '[aria-labelledby="option-label-color-93"]',
        sizesList: '[class="swatch-attribute size"]',
        chosenColor: '#option-label-color-93 + span.swatch-attribute-selected-option',
        chosenSize: '[class="swatch-attribute size"] > .swatch-attribute-selected-option',
        avalableColors: '[aria-labelledby="option-label-color-93"] > div.swatch-option',
        firstAvailableColor: '[attribute-code="color"] > div > div.swatch-option:nth-of-type(1)',
        availableSizes: '[class="swatch-attribute size"] > div.swatch-attribute-options > div',
        firstAvailableSize: '[attribute-code="size"] > div > div.swatch-option:nth-of-type(1)',
        firstImage: '.fotorama__stage > div:nth-of-type(3) > div:nth-of-type(1) > img.fotorama__img',
        reviewsSection: '#tab-label-reviews',
        fiveStarsRating: '#Rating_5_label',
        nickNameInputField: '#nickname_field',
        summaryInputField: '#summary_field',
        reviewInputField: '#review_field',
        submitReviewButton: '.actions-primary > button',
        reviewFormContainer: '.review-add',
        addToWishlistButton: '.towishlist',
        addToCartButton: '[title="Add to Cart"]',
        missingSizeError: '[attribute-code="size"] > div.mage-error',
        missingColorError: '[attribute-code="color"] > div.mage-error'
    };

    errorMessages = {
        missingSizeOrColorErrorMessage: 'This is a required field.'
    };

    async openProductPage(url) {
        await page.goto(url);
        await page.waitForSelector(this.selectors.productHeading);
    };

    async waitForFirstPictureToRender() {
        await page.waitForSelector(this.selectors.firstImage);
    };

    async waitForSizesListToRender() {
        await page.waitForSelector(this.selectors.sizesList);
    };

    async waitForColorPickerToRender() {
        await page.waitForSelector(this.selectors.colorsList);
    };
    
    async waitForReviewFormToRender() {
        await page.waitForSelector(this.selectors.reviewFormContainer);
    };

    async waitForProductPageToRender() {
        await page.waitForSelector(this.selectors.productHeading);
    };

    async chooseFiveStarRating() {
        const element = await page.$(this.selectors.fiveStarsRating);

        await element.evaluate(el => el.click());
    };

    async setNickname(nickname) {
        await page.type(this.selectors.nickNameInputField, nickname);
    };

    async setSummary(summary) {
        await page.type(this.selectors.summaryInputField, summary);
    };

    async setReviewText(reviewText) {
        await page.type(this.selectors.reviewInputField, reviewText);
    };

    async submitTheReview() {
        await page.click(this.selectors.submitReviewButton);
    };

    async openReviewForm() {
        await page.click(this.selectors.reviewsSection);
    };

    async addProductToWishList() {
        await page.click(this.selectors.addToWishlistButton);
    };

    async addProductToCart() {
        await page.waitForSelector(this.selectors.addToCartButton);
        await page.click(this.selectors.addToCartButton);
    };

    async assertColorErrorMessage() {
        const text = await this.getText(this.selectors.missingColorError);

        expect(text).toEqual(this.errorMessages.missingSizeOrColorErrorMessage);
    };

    async assertSizeErrorMessage() {
        const text = await this.getText(this.selectors.missingSizeError);

        expect(text).toEqual(this.errorMessages.missingSizeOrColorErrorMessage);
    };

    async pickFirstAvailableColor() {
        await page.click(this.selectors.firstAvailableColor);
    };

    async pickFirstAvailableSize() {
        await page.click(this.selectors.firstAvailableSize);
    };
}