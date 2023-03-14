import { E2E_BASE_URL } from "../globals";
import { getRandomNumber } from "../helpers/helpers";
import SignUpPage from "../../pom/SignUpPage";
import MyAccountPage from "../../pom/MyAccountPage";
import { emulateMobileDevice, emulateTabletDevice } from "../helpers/emulators";


jest.setTimeout(30000);

const path = 'customer/account/create/';

const randomNumberForFirstName = getRandomNumber(10);
const randomNumberForEmail = getRandomNumber(10000);


const signUpDetails = {
    firstName: `Dominik${randomNumberForFirstName}`,
    lastName: 'Testing',
    emailAddress: `Testing+${randomNumberForEmail}@wp.pl`,
    password: 'Testertest1!'
};

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
            signUpPage.errorMessagesSelectors.emailError,
            signUpPage.errorMessages.emailAddresInvalidErrorMessage
        );
    });

    test('Should fail to Sign up and display two different errors for wrong password', async () => {
        await signUpPage.setPassword('asdf');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.errorMessagesSelectors.passwordError,
            signUpPage.errorMessages.tooShortPasswordErrorMessage
        );

        // clear input field
        await signUpPage.clearInputField(signUpPage.selectors.passwordInputField);

        await signUpPage.setPassword('asdftest');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.errorMessagesSelectors.passwordError,
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

            const classToCheck = await signUpPage.getElementsHTMLAttribute(signUpPage.selectors.passwordStrengthMeter, 'className');
                        
            expect(classToCheck).toEqual(passwordStrengthsArray[i]);

            await signUpPage.clearInputField(signUpPage.selectors.passwordInputField);
        };
    });

    test('Should fail to Sign up and display error, when passwords do not match', async () => {
        await signUpPage.setPassword('testtest1!');
        await signUpPage.repeatPassword('testtest');
        await signUpPage.clickCreateAccountButton();

        await signUpPage.assertErrorMessage(
            signUpPage.errorMessagesSelectors.confirmPasswordError,
            signUpPage.errorMessages.passwordsDoNotMatchErrorMessage
        );
    });

    test('DESKTOP: Should succesfully Sign up new user', async () => {

        await signUpPage.setFirstName(signUpDetails.firstName);
        await signUpPage.setLastName(signUpDetails.lastName);
        await signUpPage.setEmailAddress(signUpDetails.emailAddress);
        await signUpPage.setPassword(signUpDetails.password);
        await signUpPage.repeatPassword(signUpDetails.password);
        await signUpPage.clickCreateAccountButton();

        await myAccountPage.waitForMyAccountPageToLoad();
        await myAccountPage.assertSignUpSuccessMessage();

        await myAccountPage.assertRegisteredFirstName(signUpDetails.firstName);
        await myAccountPage.assertRegisteredLastName(signUpDetails.lastName);
        await myAccountPage.assertRegisteredEmail(signUpDetails.emailAddress);
    });

    test('MOBILE: Should successfully Sign up new user', async () => {
        await emulateMobileDevice();
        
        await signUpPage.setFirstName(signUpDetails.firstName);
        await signUpPage.setLastName(signUpDetails.lastName);
        await signUpPage.setEmailAddress(signUpDetails.emailAddress);
        await signUpPage.setPassword(signUpDetails.password);
        await signUpPage.repeatPassword(signUpDetails.password);
        await signUpPage.clickCreateAccountButton();

        await myAccountPage.waitForMyAccountPageToLoad();
        await myAccountPage.assertSignUpSuccessMessage();

        await myAccountPage.assertRegisteredFirstName(signUpDetails.firstName);
        await myAccountPage.assertRegisteredLastName(signUpDetails.lastName);
        await myAccountPage.assertRegisteredEmail(signUpDetails.emailAddress);
    });

    test('TABLET: Should successfully Sign up new user', async () => {
        await emulateTabletDevice();
        
        await signUpPage.setFirstName(signUpDetails.firstName);
        await signUpPage.setLastName(signUpDetails.lastName);
        await signUpPage.setEmailAddress(signUpDetails.emailAddress);
        await signUpPage.setPassword(signUpDetails.password);
        await signUpPage.repeatPassword(signUpDetails.password);
        await signUpPage.clickCreateAccountButton();

        await myAccountPage.waitForMyAccountPageToLoad();
        await myAccountPage.assertSignUpSuccessMessage();

        await myAccountPage.assertRegisteredFirstName(signUpDetails.firstName);
        await myAccountPage.assertRegisteredLastName(signUpDetails.lastName);
        await myAccountPage.assertRegisteredEmail(signUpDetails.emailAddress);
    });
})