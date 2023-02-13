import BasePage from "./BasePage";

export default class SignUpPage extends BasePage {
    selectors = {
        signUpForm: '.form-create-account',
        firstNameInputField: '#firstname',
        lastNameInputField: '#lastname',
        newsletterCheckbox: '#is_subscribed',
        emailInputField: '#email_address',
        passwordInputField: '#password',
        passwordConfirmationField: '[name="password_confirmation"]',
        createAccountButton: '[title="Create an Account"]',
        emailError: '#email_address-error',
        passwordError: '#password-error',
        confirmPasswordError: '#password-confirmation-error',
        firstNameError: '#firstname-error',
        lastNameError: '#lastname-error',
        allInputErrors: [
            this.firstNameError,
            this.lastNameError,
            this.emailError,
            this.passwordError,
            this.confirmPasswordError
        ],
        passwordStrengthMeter: '#password-strength-meter-container',

    };

    errorMessages = {
        emptyFieldErrorMessage: 'This is a required field.',
        emailAddresInvalidErrorMessage: 'Please enter a valid email address (Ex: johndoe@domain.com).',
        tooShortPasswordErrorMessage: 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.',
        notEnoughCharactersClassesErrorMessage: 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.',
        passwordsDoNotMatchErrorMessage: 'Please enter the same value again.'

    };

    passwordStrengthClasses = [
        '.password-none',
        '.password-weak',
        '.password-medium',
        '.password-strong',
        '.password-very-strong'
    ];

    async waitForSignUpPageToRender() {
        await this.page.waitForSelector(this.selectors.signUpForm);
    };

    async clickCreateAccountButton() {
        await this.page.waitForSelector(this.selectors.createAccountButton);
        await this.page.click(this.selectors.createAccountButton);
    };

    async assertEmptyInputsErrorMessages() {
        for(let error of this.selectors.allInputErrors) {
            const expectedErrorMessage = await this.getText(error);

            expect(expectedErrorMessage).toEqual(this.errorMessages.emptyFieldErrorMessage);
        };
    };

    async assertErrorMessage(selector, errorMessage) {
        await this.page.waitForSelector(selector);
        
        const displayedErrorMsg = await this.getText(selector);

        expect(displayedErrorMsg).toEqual(errorMessage);
    };

    async setFirstName(text) {
        await this.page.waitForSelector(this.selectors.firstNameInputField);
        await this.page.type(this.selectors.firstNameInputField, text);
    };

    async setLastName(text) {
        await this.page.waitForSelector(this.selectors.lastNameInputField);
        await this.page.type(this.selectors.lastNameInputField, text);
    };

    async checkNewsletterCheckbox() {
        await this.page.waithForSelector(this.selectors.newsletterCheckbox);
        await this.page.click(this.selectors.newsletterCheckbox);
    };

    async setEmailAddress(text) {
        await this.page.waitForSelector(this.selectors.emailInputField);
        await this.page.type(this.selectors.emailInputField, text);
    };

    async setPassword(text) {
        await this.page.waitForSelector(this.selectors.passwordInputField);
        await this.page.type(this.selectors.passwordInputField, text);
    };

    async repeatPassword(text) {
        await this.page.waitForSelector(this.selectors.passwordConfirmationField);
        await this.page.type(this.selectors.passwordConfirmationField, text);
    };
};