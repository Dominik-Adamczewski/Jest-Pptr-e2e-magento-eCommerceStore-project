import BasePage from "./BasePage";

export default class MyAccountPage extends BasePage {
    selectors = {
        contactInformationBox: '.box-information > div:nth-child(2)',
        signUpSuccessMessage: '.message-success',
    };

    messages = {
        signUpSuccessMessage: 'Thank you for registering with Fake Online Clothing Store.',
    };

    async waitForMyAccountPageToLoad() {
        await this.page.waitForSelector(this.selectors.contactInformationBox);
    };

    async assertSignUpSuccessMessage() {
        await this.page.waitForSelector(this.selectors.signUpSuccessMessage);

        const msgText = await this.getText(this.selectors.signUpSuccessMessage);

        expect(msgText).toContain(this.messages.signUpSuccessMessage);
    };

    async assertRegisteredFirstName(firstName) {
        await this.page.waitForSelector(this.selectors.contactInformationBox);

        const contactInformation = await this.getText(this.selectors.contactInformationBox);

        expect(contactInformation).toContain(firstName);
    };

    async assertRegisteredLastName(lastName) {
        await this.page.waitForSelector(this.selectors.contactInformationBox);

        const contactInformation = await this.getText(this.selectors.contactInformationBox);

        expect(contactInformation).toContain(lastName);
    };

    async assertRegisteredEmail(email) {
        await this.page.waitForSelector(this.selectors.contactInformationBox);

        const contactInformation = await this.getText(this.selectors.contactInformationBox);

        expect(contactInformation).toContain(email);
    };
};