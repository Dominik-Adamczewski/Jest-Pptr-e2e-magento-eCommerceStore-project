const puppeteer = require('puppeteer');
const { devices } = puppeteer;

const MOBILE_DEVICE = devices["iPhone X"];
const TABLET_DEVICE = devices["iPad"];

export async function emulateMobileDevice() {
    try {
        await page.emulate(MOBILE_DEVICE);
    } catch (error) {
        console.error(`Could not emulate device, because ${error}`);
    }
};

export async function emulateTabletDevice() {
    try {
        await page.emulate(TABLET_DEVICE);
    } catch (error) {
        console.error(`Could not emulate device, because ${error}`);
    }
};