module.exports = {
    launch: {
        headless: false,
        slowMo: 50,
        devtools: false,
        args : [
            '--window-size=1920,1080',
            '--disable-dev-shm-usage',
        ],
        defaultViewport: null,
    },
    browserContext: "default"
};