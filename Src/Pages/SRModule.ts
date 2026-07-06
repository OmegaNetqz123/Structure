import { expect, Locator, Page } from "@playwright/test";
import *as data from "../test-data/Credentials.json"
import { SRModuleGrid } from "../Pages/SRModuleGrid";
import path from "path";
import { visible40, visible60, Dprowdown, waitForProcessingToFinish } from "./BasePage";
import { Testdatacalls } from "../Utils/dataProviderMethods";


let SRgrid: SRModuleGrid;
let DP: Testdatacalls;

// Shape of a single CSV row — adjust field names to match your actual CSV headers
export interface SRModuleRow {
    ModuleName?: string;
    ModuleID?: string;
    ModuleCategory?: string;
    Approval?: string;
    FileName?: string;
    AutoUP_PuRSPCheck?: string;
    AutoUP_CIRESPCheck?: string;
    AutoUP_CIRESPCheck_Major?: string;
    AutoExp_ArcRSPCheck?: string;
    Keywords?: string;
    ProductSpecific?: string;
    itemName?: string;
    tradeName?: string;
}



export class srModules {

    private readonly page: Page;
    private readonly NewSRModuleBtn: Locator;
    private readonly NewSRHeading: Locator;
    private readonly MNametxt: Locator;
    private readonly fileUploadImg: Locator;
    private readonly browseUploadImg: Locator;
    private readonly GoUploadBtn: Locator;
    private readonly Save_CheckINBtn: Locator;
    private readonly SRCheckInHeading: Locator;
    private readonly CfrmCheckInBtn: Locator;
    private readonly ReasonforCheckIntxt: Locator;
    private readonly ModuleIDtxt: Locator;
    private readonly ModuleCategoryDD: Locator;
    private readonly ApprovalCheck: Locator;
    private readonly composeON: Locator;
    private readonly AutoUP_PuRSPCheck: Locator;
    private readonly AutoUP_PuRSPMinorRadio: Locator;
    private readonly AutoUP_PuRSPMajorRadio: Locator;
    private readonly AutoUP_CIRESPCheck: Locator;
    private readonly AutoUP_CIRESPMinorRadio: Locator;
    private readonly AutoUP_CIRESPMajorRadio: Locator;
    private readonly AutoExp_ArcRSPCheck: Locator;
    private readonly KeywordTxt: Locator;
    private readonly SaveBtn: Locator;
    private readonly Close_CancelBtn: Locator;
    // Product Specific Locators
    private readonly SlctProductOkBtn: Locator;
    private readonly SlctProductCancelBtn: Locator;
    private readonly ProdCheck: Locator;
    private readonly ProdExpIcon: Locator;
    private readonly FamilyItems: Locator;   // note: plain Locator, resolved with .all() at point of use
    private readonly ProductExpandIcon: Locator;



    constructor(page: Page) {

        this.page = page;
        this.NewSRModuleBtn = this.page.locator('#btnCreateSRModule');
        this.NewSRHeading = this.page.locator('#divtitle');
        this.MNametxt = this.page.locator('#txtmodulename');
        // For uploading file
        this.fileUploadImg = this.page.locator('#aupload');
        this.browseUploadImg = this.page.locator('#imguploadp');
        this.GoUploadBtn = this.page.locator('[onclick="UploadFileClick()"]');
        this.Save_CheckINBtn = this.page.locator('#btnSaveCheckIn');
        this.SRCheckInHeading = this.page.locator(`div[class='casesearch-head br-bottom'] div:nth-child(1)`);
        this.CfrmCheckInBtn = this.page.locator(`div[class='casesearch-head br-bottom'] div:nth-child(2)`);
        this.ReasonforCheckIntxt = this.page.locator('#txtModuleCheckInReason');

        // All SR Module Locators
        this.ModuleIDtxt = this.page.locator('#txtModuleID');
        this.ModuleCategoryDD = this.page.locator('#ddlModCatagory');
        this.ApprovalCheck = this.page.locator('#spnchkApprovalRequired');
        this.composeON = this.page.locator('[title="Compose"]');
        this.AutoUP_PuRSPCheck = this.page.locator('#spnchkAutoUpdate');
        this.AutoUP_PuRSPMinorRadio = this.page.locator('#rdMinor');
        this.AutoUP_PuRSPMajorRadio = this.page.locator('#spnrdMajor');
        this.AutoUP_CIRESPCheck = this.page.locator('#spnchkAutoUpdatecheckin');
        this.AutoUP_CIRESPMinorRadio = this.page.locator('#rdMinorcheckin');
        this.AutoUP_CIRESPMajorRadio = this.page.locator('#spnrdMajorcheckin');
        this.AutoExp_ArcRSPCheck = this.page.locator('#spnchkAutoExpire');
        this.KeywordTxt = this.page.locator('#txtSearch');
        this.SaveBtn = this.page.locator('#btnSave');
        this.Close_CancelBtn = this.page.locator('#btnCancel');

        //Product Specific Locators
        this.ProdCheck = this.page.locator('#spnchkProdSpecific');
        this.ProdExpIcon = this.page.locator('#imgPInfoProductSearch');
        this.SlctProductOkBtn = this.page.locator('.pro-specificDD .defultbtn:nth-child(1)');
        this.SlctProductCancelBtn = this.page.locator('.pro-specificDD .defultbtn:nth-child(2)');
        this.FamilyItems = this.page.locator(".family strong:has-text(`${this.row.itemName}`)");
        this.ProductExpandIcon = this.page.locator('.pnl-plusminus-2');
    }
    /**
     * Reads all rows from datadriven.csv and creates one SR Module per row.
     * Matches the original method signature (no params) - CSV is read internally.
     */

    async SRModuleCreation() {
        SRgrid = new SRModuleGrid(this.page);
        DP = new Testdatacalls();
        const rows = DP.CSVreader<SRModuleRow>("datadriven.csv");
        await SRgrid.SRModuleCreation();

        for (const row of rows) {
            await this.createOneModule(row);
        }
    }

    // This Private method was called in above method with CSV data value as paramenter
    private async createOneModule(row: SRModuleRow) {

        await this.NewSRModuleBtn.click();
        await visible40(this.NewSRHeading);
        await this.MNametxt.fill(row.ModuleName ?? data.SRModule.Name);

        if (row.ModuleID) { await this.ModuleIDtxt.fill(row.ModuleID); }
        if (row.ModuleCategory) { await Dprowdown(this.ModuleCategoryDD, row.ModuleCategory); }
        if (row.Approval?.toLowerCase() === "yes") { await this.ApprovalCheck.check(); }

        //File uploading related
        await this.fileUploadImg.click();
        const filePath = path.join(__dirname, '..', 'test-data', row.FileName ?? `${row.FileName}`);
        await this.browseUploadImg.setInputFiles(filePath);
        await this.GoUploadBtn.click();
        await waitForProcessingToFinish(this.page);

        //File Formate realted
        // Auto-update on Publish response
        if (row.AutoUP_PuRSPCheck?.toLowerCase() === "yes") {
            await visible40(this.AutoUP_PuRSPCheck);
            await this.AutoUP_PuRSPCheck.check();
            await expect(this.AutoUP_PuRSPMinorRadio).toBeChecked();
            await this.AutoUP_PuRSPMajorRadio.check();
            //await expect(this.AutoUP_PuRSPMinorRadio).toBeDisabled();
        }

        // Auto-update on Check-in response
        if (row.AutoUP_CIRESPCheck?.toLowerCase() === "yes") {
            await visible40(this.AutoUP_CIRESPCheck);
            await this.AutoUP_CIRESPCheck.check();
            await expect(this.AutoUP_CIRESPMinorRadio).toBeChecked();
            await this.AutoUP_CIRESPMajorRadio.check();
            //await expect(this.AutoUP_CIRESPCheck).toBeDisabled();
        }

        if (row.AutoExp_ArcRSPCheck) {
            await visible40(this.AutoExp_ArcRSPCheck);
            await this.AutoExp_ArcRSPCheck.check();
        }

        if (row.Keywords) {
            await visible40(this.KeywordTxt);
            await this.KeywordTxt.fill(row.Keywords);
        }

        //Product Specific Configuration

        if (row.ProductSpecific?.toLowerCase() === "yes") {
            await visible40(this.ProdCheck);
            await this.ProdCheck.check();
            await this.ProdExpIcon.click();
            console.log('DEBUG itemName:', JSON.stringify(row.itemName)); //Added
            if (row.itemName) {
                const itemsToSelect = row.itemName.split(',').map(s => s.trim());
                for (const itemName of itemsToSelect) {
                    const familyRow = this.page
                        .locator('label.cbx-main')
                        .filter({ hasText: itemName });

                    const checkbox = familyRow.locator('input[type="checkbox"]');

                    if (!(await checkbox.isChecked())) {
                        await familyRow.locator('.checkmark').click();
                    }
                }
                await this.SlctProductOkBtn.click();
            }
            if (row.tradeName) {
                const TNtoSelect = row.tradeName.split(',').map(v => v.trim());
                const expandCount = await this.ProductExpandIcon.count();

                for (let i = 0; i < expandCount; i++) {
                    await this.ProductExpandIcon.nth(i).click();
                }

                for (const tradeName of TNtoSelect) {
                    const tradeRow = this.page
                        .locator('label.cbx-main')
                        .filter({ hasText: tradeName });

                    const checkbox = tradeRow.locator('input[type="checkbox"]');
                    if (!(await checkbox.isChecked())) {
                        await tradeRow.locator('.checkmark').click();
                    }

                }
                 await this.SlctProductOkBtn.click();
            }
            
            // Save & Check-In action
            await visible40(this.Save_CheckINBtn);
            await waitForProcessingToFinish(this.page)
            await this.Save_CheckINBtn.click();
            await waitForProcessingToFinish(this.page)
            await visible40(this.SRCheckInHeading);
            await waitForProcessingToFinish(this.page)
            await this.ReasonforCheckIntxt.fill("Created & Saved SR Module with Mandatory data");
            await visible40(this.CfrmCheckInBtn);
            await waitForProcessingToFinish(this.page)
            await this.CfrmCheckInBtn.click();

        }
    }

}    
