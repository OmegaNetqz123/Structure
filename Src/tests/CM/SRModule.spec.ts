import { test, expect, Page } from "@playwright/test";
import { srModules } from "../../Pages/SRModule";
import { SRModuleGrid } from "../../Pages/SRModuleGrid";
import { Login } from "../../Pages/LogInPage";
import * as data from "../../test-data/Credentials.json";


let page: Page;

test('Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria', async ({ browser }) => {
    page = await browser.newPage();
    const LoggingIn = new Login(page);
    await LoggingIn.gotoLogInPage();
    await LoggingIn.LogIntoApplication(data["Credentials 1"].UserID, data["Credentials 1"].Password);
    const SRM = new srModules(page);
    await SRM.SRModuleCreation();
    const SRG = new SRModuleGrid(page);
    const availableModules = SRG.SearchModules();
    expect(availableModules).toBe(3);
    await LoggingIn.Signingout();

})