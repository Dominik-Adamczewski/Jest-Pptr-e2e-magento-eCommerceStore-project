import BasePage from "./BasePage";

export default class LoginPage extends BasePage {

    selectors = {
        emailInput: '#email',
        passwordInput: '#pass',
        signInButton: '#send2',
        forgotYourPasswordButton: '.remind',
        emailErrorMessage: '#email-error'
    };

    errorMessages = {
        notValidEmail: 'Please enter a valid email address (Ex: johndoe@domain.com).',
    }

    async waitForLoginPageToRender() {
        await this.page.waitForSelector(this.selectors.emailInput);
    };

    async setEmail(email) {
        await this.page.type(this.selectors.emailInput, email);
    };

    async setPassword(password) {
        await this.page.type(this.selectors.passwordInput, password);
    };

    async submitLogInForm() {
        await this.page.click(this.selectors.signInButton);
    };

    async assertErrorMessage(selector, errorMsgContent) {
        await this.page.waitForSelector(selector);

        const errorMessageText = await this.getText(this.selectors.emailErrorMessage);

        expect(errorMessageText).toEqual(errorMsgContent);
    };
};