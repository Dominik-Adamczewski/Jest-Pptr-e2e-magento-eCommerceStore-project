import { E2E_BASE_URL } from "../globals";
import { getRandomNumber } from "../helpers/helpers";
import SignUpPage from "../../pom/SignUpPage";
import MyAccountPage from "../../pom/MyAccountPage";


jest.setTimeout(30000);

const path = 'customer/account/create/';

describe('Sign up test suite', () => {
    let signUpPage;
    let myAccountPage;

    beforeEach(async () => {
        signUpPage = new SignUpPage(page);
        myAccountPage = new MyAccountPage(page);

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

    test('Should fail to Sign up and display all the available password strengths', async () => {
        const arrayOfPasswords = [
            'test',
            'testtest1!',
            'testtest1!@#',
            'testtest1!@#qwe'
        ];
        const passwordStrengthsArray = signUpPage.passwordStrengthClasses;

        for(let i = 0; i < passwordStrengthsArray.length; i++) {
            await signUpPage.setPassword(arrayOfPasswords[i]);

            const classToCheck = await signUpPage.getElementClass(signUpPage.selectors.passwordStrengthMeter);
                        
            expect(classToCheck).toEqual(passwordStrengthsArray[i]);

            await signUpPage.clearInputField(signUpPage.selectors.passwordInputField);
        };
    });

    test('Should fail to Sign up and display error, when passwords do not match', async () => {
        await signUpPage.setPassword('testtest1!');
        await signUpPage.repeatPassword('testtest');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.selectors.confirmPasswordError,
            signUpPage.errorMessages.passwordsDoNotMatchErrorMessage
        );
    });

    test('Should succesfully Sign up new user', async () => {

        const randomNumberForFirstName = getRandomNumber(10);
        const randomNumberForEmail = getRandomNumber(10000);

        const firstName = `Dominik${randomNumberForFirstName}`;
        const lastName = 'Testerowy';
        const emailAddress = `dominikonx+${randomNumberForEmail}@wp.pl`;
        const password = 'Testertest1!';

        await signUpPage.setFirstName(firstName);
        await signUpPage.setLastName(lastName);
        await signUpPage.setEmailAddress(emailAddress);
        await signUpPage.setPassword(password);
        await signUpPage.repeatPassword(password);
        await signUpPage.clickCreateAccountButton();

        await myAccountPage.waitForMyAccountPageToLoad();
        await myAccountPage.assertSignUpSuccessMessage();

        await myAccountPage.assertRegisteredFirstName(firstName);
        await myAccountPage.assertRegisteredLastName(lastName);
        await myAccountPage.assertRegisteredEmail(emailAddress);
    });
})