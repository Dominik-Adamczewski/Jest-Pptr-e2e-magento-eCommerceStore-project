import ProductPage from "../../pom/ProductPage";
import BasePage from "../../pom/BasePage";


jest.setTimeout(30000);

describe('Test suite for product page', () => {
    let productPage;
    let basePage;
    
    beforeEach(async () => {
        productPage = new ProductPage(page);
        basePage = new BasePage(page);

        await productPage.openProductPage(productPage.productUrls.multipleSizesAndColorsProduct);
    })


    test('Verify whether change of color applies to the photo of the product', async () => {
        await productPage.waitForColorPickerToRender();

        const colors = await page.$$(productPage.selectors.avalableColors);

        for(let color of colors) {
            await color.click();
            await productPage.waitForFirstPictureToRender();

            const chosenColor = await basePage.getText(productPage.selectors.chosenColor);
            const colorInLowerCase = await basePage.convertTextToLowerCase(chosenColor);
            const imageWithCHangedColorUrl = await basePage.getElementsHTMLAttribute(productPage.selectors.firstImage, 'src');

            expect(imageWithCHangedColorUrl).toContain(colorInLowerCase);
        }
    });

    test('Verify whether change of size, is properly applied to the product', async () => {
        await productPage.waitForSizesListToRender();

        const sizes = await page.$$(productPage.selectors.availableSizes);

        for(let size of sizes) {
            await size.click();

            const chosenSize = await basePage.getText(productPage.selectors.chosenSize);
            const clickedSize = await basePage.getTextOfAnIterable(size);

            expect(clickedSize).toEqual(chosenSize);
        }
    });

    test('Verify whether product review request is properly handled and if payload matches data, typed by the user', async () => {
        const payload = '&ratings%5B4%5D=20&validate_rating=&nickname=Dominik+testowy&title=The+best+jacket+ever%21&detail=Looks+nice+and+wears+nice.';
        
        await productPage.openReviewForm();
        await productPage.waitForReviewFormToRender();

        page.on('request', (request) => {
            if(request.resourceType() === 'document' && request.method() === 'POST') {
                expect(request.postData()).toContain(payload);
            }
        });

        await productPage.chooseFiveStarRating();
        await productPage.setNickname('Dominik testowy');
        await productPage.setSummary('The best jacket ever!');
        await productPage.setReviewText('Looks nice and wears nice.');
        await productPage.submitTheReview();
    });
})