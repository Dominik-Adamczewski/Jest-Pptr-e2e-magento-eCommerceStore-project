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
        availableSizes: '[class="swatch-attribute size"] > div.swatch-attribute-options > div',
        firstImage: '.fotorama__stage > div:nth-of-type(3) > div:nth-of-type(1) > img.fotorama__img',
        reviewsSection: '#tab-label-reviews',
        fiveStarsRating: '#Rating_5_label',
        nickNameInputField: '#nickname_field',
        summaryInputField: '#summary_field',
        reviewInputField: '#review_field',
        submitReviewButton: '.actions-primary > button',
        reviewFormContainer: '.review-add',
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
    }
}