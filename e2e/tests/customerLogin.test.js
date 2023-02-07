import { E2E_BASE_URL } from "../globals";
import LoginPage from "../../pom/LoginPage";

jest.setTimeout(15000);

const path = 'customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/';

describe('Login test suite', () => {
    let loginPage;
    beforeEach(async () => {
        loginPage = new LoginPage(page);


        await page.goto(`${E2E_BASE_URL}${path}`);
        await loginPage.waitForLoginPageToRender();
    });

    test('Should fail after providing not valid email address', async () => {
        await loginPage.setEmail('test');
        await loginPage.submitLogInForm();


        await loginPage.assertErrorMessage(
            loginPage.selectors.emailErrorMessage,
            loginPage.errorMessages.notValidEmail
        );

    })
})