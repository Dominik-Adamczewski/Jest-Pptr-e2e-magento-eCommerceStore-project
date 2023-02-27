import { E2E_BASE_URL } from "../globals";
import HomePage from "../../pom/HomePage";
import CategoryPage from "../../pom/CategoryPage";

jest.setTimeout(30000);

describe('Smoke tests for main sale categories', () => {
    let homePage;
    let categoryPage;

    beforeEach(async () => {
        homePage = new HomePage(page);
        categoryPage = new CategoryPage(page);

        await page.goto(E2E_BASE_URL);
        await homePage.waitForHomePageToRender();
    });

    test('Navigating to the section should use GET method and return 200 response code', async () => {
        
        let categories = await page.$$(homePage.selectors.navigationListItems);

        for(let i = 0; i < categories.length; i++) {
            
            page.on('request', (request) => {
                if(request.url() === `${E2E_BASE_URL}${homePage.urlEndpoints[i]}`) {
                    expect(request.method()).toEqual('GET');
                };
            });

            page.on('response', (response) => {
                if(response.url() === `${E2E_BASE_URL}${homePage.urlEndpoints[i]}`) {
                    expect(response.status()).toEqual(200);
                };
            })

            await categories[i].click();
            await categoryPage.waitForCategoryPageToRender();

            await page.goBack();

            // Refresh the category context, to not loose it because of the navigation, and prevent test from crashing
            categories = await page.$$(homePage.selectors.navigationListItems);
        }
        
    });
})