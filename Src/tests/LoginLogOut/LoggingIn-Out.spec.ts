import { test, expect, Locator, Page } from "@playwright/test"
import { Login } from "../../Pages/LogInPage";
import * as data from "../../test-data/Credentials.json";

let page: Page;
let LI: Login;



test('logging In & out', async ({ browser }) => {
    page = await browser.newPage();
    
    LI = new Login(page)
    await LI.gotoLogInPage();
    await LI.LogIntoApplication(data["Credentials 1"].UserID, data["Credentials 1"].Password);
    await LI.Signingout();
    expect((await LI.SuccessfulSignout.innerText()).trim()).toBe('You have logged out successfully.');

});
