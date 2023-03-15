import { E2E_BASE_URL } from "../globals";
import ProductPage from "../../pom/ProductPage";
import BasePage from "../../pom/BasePage";


jest.setTimeout(30000);

describe('CURRENT', () => {
    let productPage;
    let basePage;
    
    beforeEach(async () => {
        productPage = new ProductPage(page);
        basePage = new BasePage(page);
    })


    test('Verify whether change of color applies to the photo of the product', async () => {
        await productPage.openProductPage(productPage.productUrls.multipleSizesAndColorsProduct);

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
        await productPage.openProductPage(productPage.productUrls.multipleSizesAndColorsProduct);
        await productPage.waitForSizesListToRender();

        const sizes = await page.$$(productPage.selectors.availableSizes);

        for(let size of sizes) {
            await size.click();

            let attribute = 'option-label';
            const chosenSize = await basePage.getText(productPage.selectors.chosenSize);
            const clickedSize = await basePage.getTextOfAnIterable(size);

            expect(clickedSize).toEqual(chosenSize);
        }
    });
})