import { E2E_BASE_URL } from "../globals";
import SignUpPage from "../../pom/SignUpPage";


jest.setTimeout(15000);

const path = 'customer/account/create/';

describe('Sign up test suite', () => {
    let signUpPage;

    beforeEach(async () => {
        signUpPage = new SignUpPage(page);

        await page.goto(`${E2E_BASE_URL}${path}`);
        await signUpPage.waitForSignUpPageToRender();
    });

    test('Should fail to Sign up and display errors, after submitting the form with empty inputs', async () => {
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertEmptyInputsErrorMessages();
    });

    test('Should fail to Sign up and display email error, after submitting invalid email address', async () => {
        await signUpPage.setEmailAddress('test');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.selectors.emailError,
            signUpPage.errorMessages.emailAddresInvalidErrorMessage
        );
    });

    test('Should fail to Sign up and display two different errors for wrong password', async () => {
        await signUpPage.setPassword('asdf');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.selectors.passwordError,
            signUpPage.errorMessages.tooShortPasswordErrorMessage
        );

        // clear input field
        await signUpPage.clearInputField(signUpPage.selectors.passwordInputField);

        await signUpPage.setPassword('asdftest');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.selectors.passwordError,
            signUpPage.errorMessages.notEnoughCharactersClassesErrorMessage
        );
    });

    // test('Should fail to Sign up and display all the available password strengths', async () => {
    //     let password = '';
    //     const passwordStrengthsArray = signUpPage.passwordStrengthClasses;

    //     for(let strength of passwordStrengthsArray) {
    //         expect(signUpPage.selectors.passwordStrengthMeter)
    //     };
    // });
    // TODO: method to get Class name from element
})