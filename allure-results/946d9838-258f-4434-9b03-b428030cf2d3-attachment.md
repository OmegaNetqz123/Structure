# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModule.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModule.spec.ts:9:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
```

# Test source

```ts
  28  | 
  29  | 
  30  | export class srModules {
  31  | 
  32  |     private readonly page: Page;
  33  |     private readonly NewSRModuleBtn: Locator;
  34  |     private readonly NewSRHeading: Locator;
  35  |     private readonly MNametxt: Locator;
  36  |     private readonly fileUploadImg: Locator;
  37  |     private readonly browseUploadImg: Locator;
  38  |     private readonly GoUploadBtn: Locator;
  39  |     private readonly Save_CheckINBtn: Locator;
  40  |     private readonly SRCheckInHeading: Locator;
  41  |     private readonly CfrmCheckInBtn: Locator;
  42  |     private readonly ReasonforCheckIntxt: Locator;
  43  |     private readonly ModuleIDtxt: Locator;
  44  |     private readonly ModuleCategoryDD: Locator;
  45  |     private readonly ApprovalCheck: Locator;
  46  |     private readonly composeON: Locator;
  47  |     private readonly AutoUP_PuRSPCheck: Locator;
  48  |     private readonly AutoUP_PuRSPMinorRadio: Locator;
  49  |     private readonly AutoUP_PuRSPMajorRadio: Locator;
  50  |     private readonly AutoUP_CIRESPCheck: Locator;
  51  |     private readonly AutoUP_CIRESPMinorRadio: Locator;
  52  |     private readonly AutoUP_CIRESPMajorRadio: Locator;
  53  |     private readonly AutoExp_ArcRSPCheck: Locator;
  54  |     private readonly KeywordTxt: Locator;
  55  |     private readonly SaveBtn: Locator;
  56  |     private readonly Close_CancelBtn: Locator;
  57  |     // Product Specific Locators
  58  |     private readonly SlctProductOkBtn: Locator;
  59  |     private readonly SlctProductCancelBtn: Locator;
  60  |     private readonly ProdCheck: Locator;
  61  |     private readonly ProdExpIcon: Locator;
  62  |     private readonly FamilyItems: Locator;   // note: plain Locator, resolved with .all() at point of use
  63  | 
  64  | 
  65  | 
  66  | 
  67  |     constructor(page: Page) {
  68  | 
  69  |         this.page = page;
  70  |         this.NewSRModuleBtn = this.page.locator('#btnCreateSRModule');
  71  |         this.NewSRHeading = this.page.locator('#divtitle');
  72  |         this.MNametxt = this.page.locator('#txtmodulename');
  73  |         // For uploading file
  74  |         this.fileUploadImg = this.page.locator('#aupload');
  75  |         this.browseUploadImg = this.page.locator('#imguploadp');
  76  |         this.GoUploadBtn = this.page.locator('[onclick="UploadFileClick()"]');
  77  |         this.Save_CheckINBtn = this.page.locator('#btnSaveCheckIn');
  78  |         this.SRCheckInHeading = this.page.locator(`div[class='casesearch-head br-bottom'] div:nth-child(1)`);
  79  |         this.CfrmCheckInBtn = this.page.locator(`div[class='casesearch-head br-bottom'] div:nth-child(2)`);
  80  |         this.ReasonforCheckIntxt = this.page.locator('#txtModuleCheckInReason');
  81  | 
  82  |         // All SR Module Locators
  83  |         this.ModuleIDtxt = this.page.locator('#txtModuleID');
  84  |         this.ModuleCategoryDD = this.page.locator('#ddlModCatagory');
  85  |         this.ApprovalCheck = this.page.locator('#spnchkApprovalRequired');
  86  |         this.composeON = this.page.locator('[title="Compose"]');
  87  |         this.AutoUP_PuRSPCheck = this.page.locator('#spnchkAutoUpdate');
  88  |         this.AutoUP_PuRSPMinorRadio = this.page.locator('#rdMinor');
  89  |         this.AutoUP_PuRSPMajorRadio = this.page.locator('#spnrdMajor');
  90  |         this.AutoUP_CIRESPCheck = this.page.locator('#spnchkAutoUpdatecheckin');
  91  |         this.AutoUP_CIRESPMinorRadio = this.page.locator('#rdMinorcheckin');
  92  |         this.AutoUP_CIRESPMajorRadio = this.page.locator('#spnrdMajorcheckin');
  93  |         this.AutoExp_ArcRSPCheck = this.page.locator('#spnchkAutoExpire');
  94  |         this.KeywordTxt = this.page.locator('#txtSearch');
  95  |         this.SaveBtn = this.page.locator('#btnSave');
  96  |         this.Close_CancelBtn = this.page.locator('#btnCancel');
  97  | 
  98  |         //Product Specific Locators
  99  |         this.ProdCheck = this.page.locator('#spnchkProdSpecific');
  100 |         this.ProdExpIcon = this.page.locator('#imgPInfoProductSearch');
  101 |         this.SlctProductOkBtn = this.page.locator('.pro-specificDD .defultbtn:nth-child(1)');
  102 |         this.SlctProductCancelBtn = this.page.locator('.pro-specificDD .defultbtn:nth-child(2)');
  103 |         this.FamilyItems = this.page.locator(".family strong:has-text(`${this.row.itemName}`)");
  104 |     }
  105 |     /**
  106 |      * Reads all rows from datadriven.csv and creates one SR Module per row.
  107 |      * Matches the original method signature (no params) - CSV is read internally.
  108 |      */
  109 | 
  110 |     async SRModuleCreation() {
  111 |         SRgrid = new SRModuleGrid(this.page);
  112 |         DP = new Testdatacalls();
  113 |         const rows = DP.CSVreader<SRModuleRow>("datadriven.csv");
  114 |         await SRgrid.SRModuleCreation();
  115 |         await this.NewSRModuleBtn.click();
  116 |         await visible40(this.NewSRHeading);
  117 |         for (const row of rows) {
  118 |             await this.createOneModule(row);
  119 |         }
  120 |     }
  121 | 
  122 |     // This Private method was called in above method with CSV data value as paramenter
  123 |     private async createOneModule(row: SRModuleRow) {
  124 | 
  125 | 
  126 |         await this.MNametxt.fill(row.ModuleName ?? data.SRModule.Name);
  127 | 
> 128 |         if (row.ModuleID) { await this.ModuleIDtxt.fill(row.ModuleID); }
      |                                                    ^ Error: locator.fill: Target page, context or browser has been closed
  129 |         if (row.ModuleCategory) { await Dprowdown(this.ModuleCategoryDD, row.ModuleCategory); }
  130 |         if (row.Approval?.toLowerCase() === "yes") { await this.ApprovalCheck.check(); }
  131 | 
  132 |         //File uploading related
  133 |         await this.fileUploadImg.click();
  134 |         const filePath = path.join(__dirname, '..', 'test-data', row.FileName ?? 'Doc1 version1.docx');
  135 |         await this.browseUploadImg.setInputFiles(filePath);
  136 |         await this.GoUploadBtn.click();
  137 | 
  138 | 
  139 |         //File Formate realted
  140 |         // Auto-update on Publish response
  141 |         if (row.AutoUP_PuRSPCheck?.toLowerCase() === "yes") {
  142 |             await visible60(this.AutoUP_PuRSPCheck);
  143 |             await this.AutoUP_PuRSPCheck.check();
  144 |             await expect(this.AutoUP_PuRSPMinorRadio).toBeChecked();
  145 |             await this.AutoUP_PuRSPMajorRadio.check();
  146 |             //await expect(this.AutoUP_PuRSPMinorRadio).toBeDisabled();
  147 |         }
  148 | 
  149 |         // Auto-update on Check-in response
  150 |         if (row.AutoUP_CIRESPCheck?.toLowerCase() === "yes") {
  151 |             await visible60(this.AutoUP_CIRESPCheck);
  152 |             await this.AutoUP_CIRESPCheck.check();
  153 |             await expect(this.AutoUP_CIRESPMinorRadio).toBeChecked();
  154 |             await this.AutoUP_CIRESPMajorRadio.check();
  155 |             //await expect(this.AutoUP_CIRESPCheck).toBeDisabled();
  156 |         }
  157 | 
  158 |         if (row.AutoExp_ArcRSPCheck) {
  159 |             await visible60(this.AutoExp_ArcRSPCheck);
  160 |             await this.AutoExp_ArcRSPCheck.check();
  161 |         }
  162 | 
  163 |         if (row.Keywords) {
  164 |             await visible60(this.KeywordTxt);
  165 |             await this.KeywordTxt.fill(row.Keywords);
  166 |         }
  167 | 
  168 |         //Product Specific Configuration
  169 | 
  170 |         if (row.ProductSpecific?.toLowerCase() === "yes") {
  171 |             await visible60(this.ProdCheck);
  172 |             await this.ProdCheck.check();
  173 |             await this.ProdExpIcon.click();
  174 |             console.log('DEBUG itemName:', JSON.stringify(row.itemName)); //Added
  175 |             if (row.itemName) {
  176 |                 const itemsToSelect = row.itemName.split(',').map(s => s.trim());
  177 |                 for (const itemName of itemsToSelect) {
  178 |                     const familyRow = this.page
  179 |                         .locator('label.cbx-main')
  180 |                         .filter({ hasText: itemName });
  181 | 
  182 |                     const checkbox = familyRow.locator('input[type="checkbox"]');
  183 | 
  184 |                     if (!(await checkbox.isChecked())) {
  185 |                         await familyRow.locator('.checkmark').click();
  186 |                     }
  187 |                 }
  188 |             }
  189 | 
  190 |             await this.SlctProductOkBtn.click();
  191 |         }
  192 | 
  193 |         // Save & Check-In action
  194 |         await visible60(this.Save_CheckINBtn);
  195 |         await this.Save_CheckINBtn.click();
  196 |         await visible60(this.SRCheckInHeading);
  197 |         await this.ReasonforCheckIntxt.fill("Created & Saved SR Module with Mandatory data");
  198 |         await this.CfrmCheckInBtn.click();
  199 |     }
  200 | 
  201 | 
  202 | }
  203 | 
```