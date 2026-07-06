import { test, expect } from "@playwright/test";
import { Login } from "../../Pages/LogInPage";
import { BrowserManaging } from "../../Pages/BrowserManager";
import * as data from "../../test-data/Credentials.json";
import { CaseForm } from "../../Pages/CaseForm";
import { CaseQuery } from "../../Pages/CaseQuery";


let browser1: BrowserManaging; let browser2: BrowserManaging;
let Logging1: Login;
let Logging2: Login;
let CSCreation: CaseForm;
let CQSearch: CaseQuery;
let CaseID: string;

test.beforeEach("BrowsingInstance", async () => {


})

test("Creating Case User1 & Searching it From User2", async () => {
    browser1 = await BrowserManaging.createInstance();
    Logging1 = new Login(browser1.page);
    // User 1517 Successfully created Case.
    CSCreation = new CaseForm(Logging1.page);
    await Logging1.gotoLogInPage();
   
    await Logging1.LogIntoApplication(data["Credentials 1"].UserID, data["Credentials 1"].Password);
    CaseID = await CSCreation.CaseCreationWithMandatoryData();
    expect((await CSCreation.MyCases.innerText())).toBe('My Cases');
    browser2 = await BrowserManaging.createInstance();
    Logging2 = new Login(browser2.page);
    
    //User vani searched the above created case & Accepted it.
    CQSearch = new CaseQuery(Logging2.page);
    await Logging2.gotoLogInPage();
    await Logging2.LogIntoApplication(data["Credentials 2"].UserID, data["Credentials 2"].Password);
    console.log("Two Users were Successfully Logged into the application...!!")
    await CQSearch.CQMenu.waitFor({ state: "visible", timeout: 40000 });
    await CQSearch.SearchingCaseNdAcceptNdOpening(CaseID);
})