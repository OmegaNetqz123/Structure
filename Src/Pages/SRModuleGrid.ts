import { Locator, Page } from "@playwright/test";
import *as data from "../test-data/Credentials.json"
import { visible40, visible60, waitForProcessingToFinish} from "./BasePage";
import path from "path";

export class SRModuleGrid {

    private readonly page: Page;
    private readonly GearIcon: Locator;
    private readonly CMConsole: Locator;
    private readonly CMHeading: Locator;
    private readonly SRModuleMenu: Locator;
    private readonly SRModuleHeading: Locator;
    private readonly SearcCriteriaExpandIcon: Locator;
    private readonly SCMNameTxt: Locator;
    private readonly SCKeywordtxt:Locator;
    private readonly SearchBtn: Locator;
    private readonly displayHeading: Locator;
    private readonly ModuleSlct: Locator;
    private readonly ModuleActionIcon: Locator;
    private readonly ModPublishbtn: Locator;



    constructor(page: Page) {
        this.page = page;
        this.GearIcon = this.page.locator('[title="Setup"]');
        this.CMConsole = this.page.locator('#CMH');
        this.CMHeading = this.page.locator('.edicasepageheading');
        this.SRModuleMenu = this.page.locator('#SRM');
        this.SRModuleHeading = this.page.locator('.edicasepageheading');


        //Search Criteria
        this.SearcCriteriaExpandIcon = this.page.locator('[class="accordion-head accordion-head2"] .plusminus2');
        this.SCMNameTxt = this.page.locator('#txtModuleName');
        this.SCKeywordtxt = this.page.locator('#txtSearchTags');
        this.SearchBtn = this.page.locator('[class="add-docuform bn-top"] .buttons-row [data-ng-click="btnGoClick()"]');
        this.displayHeading = this.page.locator('#moduleCount');
        this.ModuleSlct = this.page.locator('#AllSRDModules tr');
        this.ModuleActionIcon = this.page.locator('#AllSRDModules td [title="Actions"]');
        this.ModPublishbtn = this.page.locator('[data-ng-click="PublishOnClick(css.SRDModuleID, css.LatestVersion)"]');
        //this.CheckoutCnfmBtn = this.page.locator('[data-ng-click="CheckoutConfirmClick()"]');

    }



    async SRModuleCreation() {

        await this.GearIcon.click();
        await this.CMConsole.click();
        await visible40(this.CMHeading);
        await this.SRModuleMenu.click();
        await visible40(this.SRModuleHeading);

    }
    async SearchModules() {
        await this.SCMNameTxt.fill(data.SRModule.Name);
        await this.SCKeywordtxt.fill(data.SRModule.Keyword);
        await this.SearchBtn.click();
        await waitForProcessingToFinish(this.page);
        const availableModules = this.ModuleSlct.count();
        return availableModules;

    }
    async SRModuleView() {

    }

    async SRModuleCopy() {

    }

    async SRModuleApproval() {

    }

    async SRModulePublish() {
        await this.SearcCriteriaExpandIcon.click();
        await this.SCMNameTxt.fill(data.SRModule.Name);
        await this.SearchBtn.click();
        await visible40(this.displayHeading);
        await this.ModuleSlct.click();
        await this.ModuleActionIcon.click();
        await this.ModPublishbtn.click();
    }

    async SRModuleArchive() {

    }

    async SRModuleDelete() {

    }











}