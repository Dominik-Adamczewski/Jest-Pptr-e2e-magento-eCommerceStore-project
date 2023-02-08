import { E2E_BASE_URL } from "../globals";
import { credentials } from "../credentials";

import LoginPage from "../../pom/LoginPage";
import HomePage from "../../pom/HomePage";

jest.setTimeout(15000);

const path = 'customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

describe('Login test suite', () => {
    let loginPage;
    let homePage;

    beforeEach(async () => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);


        await page.goto(`${E2E_BASE_URL}${path}`);
        await loginPage.waitForLoginPageToRender();
    });

    test('Login should fail after providing not valid email address', async () => {
        await loginPage.setEmail('test');
        await loginPage.submitLogInForm();


        await loginPage.assertErrorMessage(
            loginPage.selectors.emailErrorMessage,
            loginPage.errorMessages.notValidEmail
        );

    });

    test('Login should fail after submitting form with both empty inputs', async () => {
        await loginPage.submitLogInForm();

        await loginPage.assertErrorMessage(
            loginPage.selectors.emailErrorMessage,
            loginPage.errorMessages.emptyInput
        );
        await loginPage.assertErrorMessage(
            loginPage.selectors.passwordErrorMessage,
            loginPage.errorMessages.emptyInput
        );
    });

    // TODO: Test with wrong login details - there was an issue with waiting for error element

    test('Login should pass, after providing correct credentials', async () => {
        await loginPage.setEmail(credentials.login);
        await loginPage.setPassword(credentials.password);
        await loginPage.submitLogInForm();

        await homePage.waitForHomePageToRender();

        await homePage.assertUserLoggedIn();
    });
});