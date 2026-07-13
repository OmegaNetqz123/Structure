import { test, expect, Locator } from "@playwright/test"
import { Login } from "../../Pages/LogInPage";
import { BrowserManaging } from "../../Pages/BrowserManager";
import * as data from "../../test-data/Credentials.json";

let browserManager: BrowserManaging;
let loginPage: Login;

test.beforeEach(async () => {
    browserManager = await BrowserManaging.createInstance();
    loginPage = new Login(browserManager.page);
});

test.afterEach(async () => {
    await browserManager.context.close();
    await browserManager.browser.close();
});


test("Logging In with User 1517", async () => {

  
  await loginPage.gotoLogInPage();
  await loginPage.LogIntoApplication(data["Credentials 1"].UserID, data["Credentials 1"].Password);
  loginPage.Homepg();
  

})
