# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModule.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModule.spec.ts:9:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('.pro-specificDD .defultbtn:nth-child(1)')
    - locator resolved to <a href="#" class="defultbtn" onclick="ProductSpecificOKClick();">Ok</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

```

# Test source

```ts
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
  104 |         // this.ProductItems = this.page.locator('#FamilyProductTreePop .family [onclick="CheckUnCheckProduct(this)"]');
  105 |         // this.TNItems = this.page.locator('#FamilyProductTreePop .family [onclick="CheckUnCheckApproval(this)"]');
  106 |         // this.SlctProductFamilyList = this.page.locator('#FamilyProductTreePop .family [onclick="CheckUnCheckFamily(this)"]').all();
  107 |         // this.SlctProductProductList = this.page.locator('#FamilyProductTreePop .family [onclick="CheckUnCheckProduct(this)"]').all();
  108 |         // this.SlctProductTNList = this.page.locator('#FamilyProductTreePop .family [onclick="CheckUnCheckApproval(this)"]').all();
  109 | 
  110 | 
  111 | 
  112 |     }
  113 |     /**
  114 |      * Reads all rows from datadriven.csv and creates one SR Module per row.
  115 |      * Matches the original method signature (no params) - CSV is read internally.
  116 |      */
  117 | 
  118 |     async SRModuleCreation() {
  119 | 
  120 |         SRgrid = new SRModuleGrid(this.page);
  121 |         DP = new Testdatacalls();
  122 |         const rows = DP.CSVreader<SRModuleRow>("datadriven.csv");
  123 | 
  124 |         for (const row of rows) {
  125 |             await this.createOneModule(row);
  126 |         }
  127 |     }
  128 |     // This Private method was called in above method
  129 |     private async createOneModule(row: SRModuleRow) {
  130 | 
  131 |         await SRgrid.SRModuleCreation();
  132 |         await this.NewSRModuleBtn.click();
  133 |         await visible40(this.NewSRHeading);
  134 |         await this.MNametxt.fill(row.ModuleName ?? data.SRModule.Name);
  135 | 
  136 |         if (row.ModuleID) { await this.ModuleIDtxt.fill(row.ModuleID); }
  137 |         if (row.ModuleCategory) { await Dprowdown(this.ModuleCategoryDD, row.ModuleCategory); }
  138 |         if (row.Approval?.toLowerCase() === "yes") { await this.ApprovalCheck.check(); }
  139 | 
  140 |         //File uploading related
  141 |         await this.fileUploadImg.click();
  142 |         const filePath = path.join(__dirname, '..', 'test-data', row.FileName ?? 'Doc1 version1.docx');
  143 |         await this.browseUploadImg.setInputFiles(filePath);
  144 |         await this.GoUploadBtn.click();
  145 |         await visible60(this.AutoUP_PuRSPCheck);
  146 | 
  147 |         //File Formate realted
  148 |         // Auto-update on Publish response
  149 |         if (row.AutoUP_PuRSPCheck?.toLowerCase() === "yes") {
  150 |             await this.AutoUP_PuRSPCheck.check();
  151 |             await expect(this.AutoUP_PuRSPMinorRadio).toBeChecked();
  152 |             await this.AutoUP_PuRSPMajorRadio.check();
  153 |             //await expect(this.AutoUP_PuRSPMinorRadio).toBeDisabled();
  154 |         }
  155 | 
  156 |         // Auto-update on Check-in response
  157 |         if (row.AutoUP_CIRESPCheck?.toLowerCase() === "yes") {
  158 |             await this.AutoUP_CIRESPCheck.check();
  159 |             await expect(this.AutoUP_CIRESPMinorRadio).toBeChecked();
  160 |             await this.AutoUP_CIRESPMajorRadio.check();
  161 |             //await expect(this.AutoUP_CIRESPCheck).toBeDisabled();
  162 |         }
  163 | 
  164 |         if (row.AutoExp_ArcRSPCheck) {
  165 |             await this.AutoExp_ArcRSPCheck.check();
  166 |         }
  167 | 
  168 |         if (row.Keywords) {
  169 |             await this.KeywordTxt.fill(row.Keywords);
  170 |         }
  171 | 
  172 |         //Product Specific Configuration
  173 | 
  174 |         if (row.ProductSpecific?.toLowerCase() === "yes") {
  175 |             await this.ProdCheck.check();
  176 |             await this.ProdExpIcon.click();
  177 |   console.log('DEBUG itemName:', JSON.stringify(row.itemName)); //Added
  178 |             if (row.itemName) {
  179 |                  const itemsToSelect = row.itemName.split(',').map(s => s.trim());
  180 |             for (const itemName of itemsToSelect) {
  181 |             const familyRow = this.page
  182 |                 .locator('label.cbx-main')
  183 |                 .filter({ hasText: itemName });
  184 | 
  185 |             const checkbox = familyRow.locator('input[type="checkbox"]');
  186 | 
  187 |             if (!(await checkbox.isChecked())) {
  188 |                 await familyRow.locator('.checkmark').click();
  189 |             }
  190 |         }
  191 |     }
  192 | 
> 193 |     await this.SlctProductOkBtn.click();
      |                                 ^ Error: locator.click: Target page, context or browser has been closed
  194 | 
  195 |             // for (const family of families) {
  196 |             //     if ((await family.innerText()).trim() === row.itemName) {
  197 |             //         await family.check();
  198 |             //     }
  199 |             // }
  200 |         }
  201 | 
  202 | 
  203 | 
  204 |         // Save actions
  205 |         await this.Save_CheckINBtn.click();
  206 |         await visible60(this.SRCheckInHeading);
  207 |         await this.ReasonforCheckIntxt.fill("Created & Saved SR Module with Mandatory data");
  208 |         await this.CfrmCheckInBtn.click();
  209 |     }
  210 | 
  211 | 
  212 | }
  213 | 
```