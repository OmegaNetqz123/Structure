import { Locator, Page } from "@playwright/test";
import { DateSelection, Dprowdown, Country, TradeNameSelection } from "./BasePage";

export class CaseQuery {

    readonly page: Page;
    readonly CQMenu: Locator;
    readonly CaseIDSF: Locator;
    readonly CQSearchBtn: Locator;
    readonly CQActionsIcon: Locator;
    readonly AOBtn: Locator;



    constructor(page: Page) {
        this.page = page;
        this.CQMenu = page.locator('#M_CQ');
        this.CaseIDSF = page.locator('[name="Case ID"]');
        this.CQSearchBtn = page.locator(`[data-ng-click="MandatoryCheck(0,'CS')"]`);
        this.CQActionsIcon = page.locator('.pull-right [title="Actions"]');
        this.AOBtn = page.locator('#CaseDetailsSetting [alt="Accept-open"]');
    }

    async SearchingCaseNdAcceptNdOpening(CaseID: string) {
        await this.CQMenu.click();
        await this.page.locator('.edicaserow').waitFor({ state: "visible", timeout: 30000 });
        await this.CaseIDSF.fill(CaseID);
        await this.CQSearchBtn.click();
        await this.CQActionsIcon.click();
        await this.AOBtn.click();
        console.log('Case was successfully Accept & Opened by User2...!')
    }





}