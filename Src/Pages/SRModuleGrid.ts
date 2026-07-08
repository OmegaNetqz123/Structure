import { expect, Locator, Page } from "@playwright/test";
import *as data from "../test-data/Credentials.json"
import { visible40, visible60, waitForProcessingToFinish } from "./BasePage";
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
    private readonly SCSysModIDTxt: Locator;
    private readonly SCKeywordtxt: Locator;
    private readonly SearchBtn: Locator;
    private readonly displayHeading: Locator;
    //private readonly ModuleSlct: Locator;
    private readonly ModuleActionIcon: Locator;
    private readonly ModPublishbtn: Locator;
    private readonly ModViewbtn: Locator;
    private readonly ModCopybtn: Locator;
    private readonly ModApprovalbtn: Locator;
    private readonly ModArchivebtn: Locator;
    private readonly ModDeletebtn: Locator;
    private readonly ModuleRows: Locator;
    private readonly ModuleActionToggle: Locator;
    private readonly ModuleActionMenu: Locator;
    private readonly SelectAllCheckbox: Locator;
    private readonly SortByDropdown: Locator;
    private readonly AscendingIcon: Locator;
    private readonly DescendingIcon: Locator;
    private readonly ModuleGridTable: Locator;
    private readonly SCModCatDD: Locator;
    private readonly SCTNPushHead: Locator;
    private readonly SCModIDTxt: Locator;
    private readonly SCKeywordTxt: Locator;
    private readonly SCStatusDD: Locator;
    private readonly SCDateCriteriaDD: Locator;
    private readonly SCDateRangeDD: Locator;
    private readonly SCCustomStartDate: Locator;
    private readonly SCCustomEndDate: Locator;
    private readonly ClearBtn: Locator;
    private readonly ViewAllBtn: Locator;
    private readonly SaveBtn: Locator;
    private readonly WrapTxtIcon: Locator;
    private readonly CustomizeTableIcon: Locator;
    private readonly SelectedTable: Locator;
    private readonly SelectedTableColumns: Locator;
    private readonly SelectedColumnsMoveDown: Locator;
    private readonly SelectedColumnsMoveUp: Locator;
    private readonly SelectedColumnsMovetoBottum: Locator;
    private readonly SelectedColumnsMovetoUp: Locator;
    private readonly ChooseClmsBtn: Locator;
    private readonly AvailableClmslist: Locator;
    private readonly ToCheckClmsList: Locator;
    private readonly CancelBtn: Locator;
    private readonly Save_CloseBtn: Locator;
    private readonly RestBtn: Locator;
    private readonly DisplayColumnsTxt: Locator;
    private readonly Selectallchk: Locator;
    private readonly ToCheckSelectallChk: Locator;
    private readonly CheckClmsListChk: Locator;



    constructor(page: Page) {
        this.page = page;
        this.GearIcon = this.page.locator('[title="Setup"]');
        this.CMConsole = this.page.locator('#CMH');
        this.CMHeading = this.page.locator('.edicasepageheading');
        this.SRModuleMenu = this.page.locator('#SRM');
        this.SRModuleHeading = this.page.locator('.edicasepageheading');


        //Search Criteria fields
        this.SearcCriteriaExpandIcon = this.page.locator('[class="accordion-head accordion-head2"] .plusminus2');
        this.SCMNameTxt = this.page.locator('#txtModuleName');
        this.SCSysModIDTxt = this.page.locator('#txtModuleID');
        this.SCKeywordtxt = this.page.locator('#txtSearchTags');
        this.SCModCatDD = this.page.locator('#ddlModCatagory');
        this.SCTNPushHead = this.page.locator('[data-ng-model="searchCriteria.txtProduct"]')//Shadow DOM
        this.SCModIDTxt = this.page.locator('#txtModuleCode');
        this.SCKeywordTxt = this.page.locator('#txtSearchTags');
        this.SCStatusDD = this.page.locator('#ddlStatus');
        this.SCDateCriteriaDD = this.page.locator('#ddlDtCriteria');
        this.SCDateRangeDD = this.page.locator('ddlDtRange');
        this.SCCustomStartDate = this.page.locator('#txtCustomStartDate');
        this.SCCustomEndDate = this.page.locator('#txtCustomEndDate');

        //Search Actions
        this.SearchBtn = this.page.locator('[class="add-docuform bn-top"] .buttons-row [data-ng-click="btnGoClick()"]');
        this.ClearBtn = this.page.locator('[data-ng-click="btnClearClick()"]');
        this.ViewAllBtn = this.page.locator('[data-ng-click="btnViewAllClick()"]');
        this.SaveBtn = this.page.locator('[data-ng-click="btnSaveCriteriaClick()"]');

        //Displaying Grid
        this.displayHeading = this.page.locator('#moduleCount');
        //this.ModuleSlct = this.page.locator('#AllSRDModules tr');

        //Displaying Grid Actions
        this.ModuleActionIcon = this.page.locator('#AllSRDModules td [title="Actions"]');
        this.ModPublishbtn = this.page.locator('[data-ng-click="PublishOnClick(css.SRDModuleID, css.LatestVersion)"]');
        this.ModViewbtn = this.page.locator('[data-ng-click="ViewOnClick(css.SRDModuleID)"]');
        this.ModCopybtn = this.page.locator('[data-ng-click="CopyOnClick(css.SRDModuleID)"]');
        this.ModApprovalbtn = this.page.locator('[data-ng-click="ApprovalOnClick(css.SRDModuleID)"]');
        this.ModArchivebtn = this.page.locator('[data-ng-click="ArchiveOnClick(css.SRDModuleID)"]');
        this.ModDeletebtn = this.page.locator('[data-ng-click="DeleteOnClick(css.SRDModuleID)"]');
        this.ModuleRows = this.page.locator('#AllSRDModules tr');
        this.ModuleActionToggle = this.page.locator('#AllSRDModules a.a-menu.gridsetting');
        this.ModuleActionMenu = this.page.locator('#AllSRDModules ul.actionMenu-sub.gridsettingpopupmenu');//Actions list of items
        this.ModuleGridTable = this.page.locator('#tblAllModuleData');

        // Grid Heading Actions
        this.SelectAllCheckbox = this.page.locator('#multiCheckbox span');
        this.SortByDropdown = this.page.locator('#ddlSortby');
        this.AscendingIcon = this.page.locator('#imgA');
        this.DescendingIcon = this.page.locator('#imgB');
        this.WrapTxtIcon = this.page.locator('[title="Wrap Columns"]');
        this.DisplayColumnsTxt = this.page.locator('.dynamicColumn:first-child th[data-ng-class="ShowFullColumnData"]');
        this.CustomizeTableIcon = this.page.locator('[title="Customize Table"]');
        this.SelectedTable = this.page.locator('.clearFix div'); //List
        this.SelectedTableColumns = this.SelectedTable.locator('.inputrow-60 label');  //List
        this.SelectedColumnsMoveDown = this.SelectedTable.locator('.inputrow-40 a img[title="Move Down"]')  //List
        this.SelectedColumnsMoveUp = this.SelectedTable.locator('.inputrow-40 a img[title="Move Up"]');  //List
        this.SelectedColumnsMovetoBottum = this.SelectedTable.locator('.inputrow-40 a img[title="Move to Bottom"]');  //List
        this.SelectedColumnsMovetoUp = this.SelectedTable.locator('.inputrow-40 a img[title="Move to Top"]');  //List
        this.ChooseClmsBtn = this.page.locator('[data-ng-click="OpenAvaColumns()"]');
        this.AvailableClmslist = this.page.locator('.smoothSrcollbar .inputrow-80 label'); //List
        this.ToCheckClmsList = this.page.locator('.smoothSrcollbar .inputrow-80 label input')//List
        this.CheckClmsListChk = this.page.locator('.smoothSrcollbar .inputrow-80 label span');//List
        this.Selectallchk = this.page.locator('[class="cbx-main pull-left"] span');
        this.ToCheckSelectallChk = this.page.locator('#chkUnkSelectAll');
        this.CancelBtn = this.page.locator('[data-ng-click="CancelCustomise()"]');
        this.Save_CloseBtn = this.page.locator('[data-ng-click="OkCustomiseColumn()"]');
        this.RestBtn = this.page.locator('[data-ng-click="ResetCustomiseColumn()"]');


    }

    //Validating Grid headings based on Customizing Table
    async CustomizationTableComparision(): Promise<boolean> {
        await this.SRModuleCreation();
        await this.CustomizeTableIcon.click();
        const selectedTableNames: string[] = (await this.SelectedTableColumns.allInnerTexts()).map(v => v.trim());
        await this.CancelBtn.click();
        const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
        return (selectedTableNames.every(t => displayColmnNames.includes(t))) ? true : false;
    }

    async CustomizationtableSelectionComparision() {
        await this.SRModuleCreation();
        await this.CustomizeTableIcon.click();
        await this.ChooseClmsBtn.click();
        const Tochecklist = await this.AvailableClmslist.all();
        const Checked: String[] = [];
        for (const check of Tochecklist) {
            if (await check.locator('input').isChecked()) {
                Checked.push((await check.innerText()).trim());
            }
        }
        console.log(`Checked values are: ${Checked}`);
        await this.CancelBtn.click();
        const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
        return (Checked.every(t => displayColmnNames.includes(t.toString()))) ? true : false;

    }





    // Search Method
    async SRModuleSearchField(moduleName: string = data.SRModule.Name, moduleID?: string, keyword: string = data.SRModule.Keyword) {
        await this.SearcCriteriaExpandIcon.click();
        await this.SCMNameTxt.fill(moduleName);
        if (moduleID) {
            await this.SCSysModIDTxt.fill(moduleID);
        }
        await this.SCKeywordtxt.fill(keyword);
        await this.SearchBtn.click();
        await waitForProcessingToFinish(this.page);
        await visible40(this.displayHeading);
    }

    async SRModuleCreation() {

        await this.GearIcon.click();
        await this.CMConsole.click();
        await visible40(this.CMHeading);
        await this.SRModuleMenu.click();
        await visible40(this.SRModuleHeading);

    }

    async SearchModules(moduleName: string = data.SRModule.Name, keyword: string = data.SRModule.Keyword) {
        await this.SRModuleSearchField(moduleName, undefined, keyword);
        return await this.ModuleRows.count();
    }

    private async selectModule(moduleName: string) {
        await this.SRModuleSearchField(moduleName);
        const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
        await matchingRow.click();
        await visible40(matchingRow.locator('a.a-menu.gridsetting'));
    }

    private async openRowActions(moduleName: string) {
        await this.selectModule(moduleName);
        const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
        await matchingRow.locator('a.a-menu.gridsetting').click();
        await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu').waitFor({ state: 'visible', timeout: 10000 });
    }

    private async clickActionFromRow(moduleName: string, actionText: string) {
        await this.openRowActions(moduleName);
        const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
        await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu a').filter({ hasText: actionText }).first().click();
    }

    async OpenModuleActions(moduleName: string) {
        await this.openRowActions(moduleName);
    }

    async SRModuleView(moduleName: string) {
        await this.clickActionFromRow(moduleName, 'View');
    }

    async SRModuleCopy(moduleName: string) {
        await this.clickActionFromRow(moduleName, 'Copy');
    }

    async SRModuleApproval(moduleName: string) {
        await this.clickActionFromRow(moduleName, 'Initiate Review');
    }

    async SRModulePublish(moduleName: string) {
        await this.clickActionFromRow(moduleName, 'Publish');
    }

    async SRModuleArchive(moduleName: string) {
        await this.clickActionFromRow(moduleName, 'Archive');
    }

    async SRModuleDelete(moduleName: string) {
        await this.clickActionFromRow(moduleName, 'Delete');
    }











}