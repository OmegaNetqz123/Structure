import { Locator, chromium, Browser, BrowserContext, Page } from "@playwright/test"



export class BrowserManaging {

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    private constructor() { }
    
    static async createInstance(positionX: number = 0): Promise<BrowserManaging> {
        const instance = new BrowserManaging();
        instance.browser = await chromium.launch({
        headless: false,
        slowMo: 600,
        args: [`--window-position=${positionX},0`, '--window-size=850,900']
    });
        instance.context = await instance.browser.newContext();
        instance.page = await instance.context.newPage();

        return instance;

    }

}