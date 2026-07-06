import { Page, test, expect, Locator } from "@playwright/test";
import { DateSelection, Dprowdown, Country, TradeNameSelection } from "./BasePage";

export class CaseForm {
    readonly page: Page;
    readonly NCBtn: Locator;
    readonly AutosaveNoBtn: Locator;
    readonly OrgDD: Locator;
    readonly SiteDD: Locator;
    readonly CtnBtn: Locator;
    readonly LNTxt: Locator;
    readonly ReqCntry: Locator;
    readonly Reqtype: Locator;
    readonly TNSearchIcon: Locator;
    readonly SaveIcon: Locator;
    readonly reqCntLi: Locator;
    readonly TNSearchField: Locator;
    readonly TNLi: Locator;
    readonly NDISearchField: Locator;
    readonly TNselect: Locator;
    readonly CaseID: Locator;
    readonly CSCfmNoBtn: Locator;
    readonly CProcessing: Locator;
    readonly MyCases:Locator;
    CSID!: string;
    

    constructor(page: Page) {
        this.page = page;
        this.NCBtn = page.locator('#NC');
        this.AutosaveNoBtn = page.locator('#confirmNo');
        this.OrgDD = page.locator('#ddlCaseOrg'); //DD
        this.SiteDD = page.locator('#ddlCaseSite');//DD
        this.CtnBtn = page.locator('[onclick="ValidateNewCaseSiteAndOpenCaseForm()"]');
        this.LNTxt = page.locator('#txt_CRI_LN');
        this.ReqCntry = page.locator('[data-ng-model="CurrentRep.COUNTRYID_NAME"]'); //Push head
        this.reqCntLi = page.locator('#ui-id-13 div');
        this.Reqtype = page.locator('#ddl_CRI_RT'); //DD
        this.TNSearchIcon = page.locator('#imgPInfoProductSearch img');// PS selection through Overlay
        this.TNSearchField = page.locator('#txtTradeName');
        this.TNLi = page.locator('#gvTradeName td span');
        this.NDISearchField = page.locator('#txtNDCDIN');
        this.TNselect = page.locator('#btnSelect');
        this.SaveIcon = page.locator('[title="Save"]');
        this.CaseID = page.locator('#confirmText b');
        this.CSCfmNoBtn = page.locator('#confirmNo');
        this.CProcessing = page.locator('.actionProcessing');
        this.MyCases=page.locator('.edicasepageheading');

    }


    async CaseCreationWithMandatoryData():  Promise<string> {

        await this.NCBtn.click();
        try {
            await this.AutosaveNoBtn.waitFor({ state: "visible", timeout: 3000 })
            await this.AutosaveNoBtn.click();
            console.log("Previously LoggedIn Browser is Active");
        }
        catch {
            console.log('No Auto save temp data case...')
        }
        await Dprowdown(this.OrgDD, "SIGMA");
        await Dprowdown(this.SiteDD, "azitroqa");
        await this.CtnBtn.click();

        try {
            await this.CProcessing.waitFor({ state: 'visible', timeout: 90000 })

        }
        catch {
            console.log('CaseProcessing state is not tracked..')
        }

        await this.LNTxt.fill("Case 1");
        await Country(this.ReqCntry, this.reqCntLi, "BULGARIA");
        await Dprowdown(this.Reqtype, "Non Health Care Professional");
        await TradeNameSelection(this.TNSearchIcon, "Product 2B (DZ)", this.TNselect, this.TNLi);
        await this.SaveIcon.click();
        this.CSID = (await this.CaseID.innerText()).trim();
        await this.CSCfmNoBtn.click();
        console.log('Case Successfully Created..!' ,this.CSID);
        return this.CSID;

    }


















}