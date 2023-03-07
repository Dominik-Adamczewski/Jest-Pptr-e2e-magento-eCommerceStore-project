import { E2E_BASE_URL } from "../globals";

import HomePage from "../../pom/HomePage";
import CategoryPage from "../../pom/CategoryPage";

jest.setTimeout(55000);

describe('Smoke tests for product categories', () => {
    let homePage;
    let categoryPage;

    beforeEach(async () => {
        homePage = new HomePage(page);
        categoryPage = new CategoryPage(page);

        await page.goto(E2E_BASE_URL);
        await homePage.waitForHomePageToRender();
    });

    test('Navigating to the product category should use GET method and return 200 response code', async () => {

        const arrayOfCategoriesLinks = await categoryPage.getArrayOfLinks(homePage.selectors.categories);

        for(let categoryLink of arrayOfCategoriesLinks) {

            // Exclude What's new and Sale page, cause it contains duplicated urls  
            if(categoryLink.includes('/what-is-new.html' || categoryLink.includes('/sale.html'))) {
                continue;
            }

            await page.goto(categoryLink);
            await categoryPage.waitForCategoryPageToRender();

            const arrayOfProductCategoriesLinks = await categoryPage.getArrayOfLinks(categoryPage.selectors.productCategories);

            for(let link of arrayOfProductCategoriesLinks) {
                page.on('request', (request) => {
                    if(request.resourceType() === 'document') {
                        expect(request.method()).toEqual('GET');
                    };
                });
    
                page.on('response', (response) => {
                    if(response.request().resourceType() === 'document') {
                        expect(response.status()).toEqual(200);
                    };
                })

                await page.goto(link);
            }
        }
    });
});