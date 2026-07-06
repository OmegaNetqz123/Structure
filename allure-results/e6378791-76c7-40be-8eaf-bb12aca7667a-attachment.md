# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModule.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModule.spec.ts:10:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('label.cbx-main').filter({ hasText: 'Product2 (AS)' }).locator('.checkmark')
    - locator resolved to <span class="checkmark"></span>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    25 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Test source

```ts
  107 |     /**
  108 |      * Reads all rows from datadriven.csv and creates one SR Module per row.
  109 |      * Matches the original method signature (no params) - CSV is read internally.
  110 |      */
  111 | 
  112 |     async SRModuleCreation() {
  113 |         SRgrid = new SRModuleGrid(this.page);
  114 |         DP = new Testdatacalls();
  115 |         const rows = DP.CSVreader<SRModuleRow>("datadriven.csv");
  116 |         await SRgrid.SRModuleCreation();
  117 | 
  118 |         for (const row of rows) {
  119 |             await this.createOneModule(row);
  120 |         }
  121 |     }
  122 | 
  123 |     // This Private method was called in above method with CSV data value as paramenter
  124 |     private async createOneModule(row: SRModuleRow) {
  125 | 
  126 |         await this.NewSRModuleBtn.click();
  127 |         await visible40(this.NewSRHeading);
  128 |         await this.MNametxt.fill(row.ModuleName ?? data.SRModule.Name);
  129 | 
  130 |         if (row.ModuleID) { await this.ModuleIDtxt.fill(row.ModuleID); }
  131 |         if (row.ModuleCategory) { await Dprowdown(this.ModuleCategoryDD, row.ModuleCategory); }
  132 |         if (row.Approval?.toLowerCase() === "yes") { await this.ApprovalCheck.check(); }
  133 | 
  134 |         //File uploading related
  135 |         await this.fileUploadImg.click();
  136 |         const filePath = path.join(__dirname, '..', 'test-data', row.FileName ?? `${row.FileName}`);
  137 |         await this.browseUploadImg.setInputFiles(filePath);
  138 |         await this.GoUploadBtn.click();
  139 |         await waitForProcessingToFinish(this.page);
  140 | 
  141 |         //File Formate realted
  142 |         // Auto-update on Publish response
  143 |         if (row.AutoUP_PuRSPCheck?.toLowerCase() === "yes") {
  144 |             await visible40(this.AutoUP_PuRSPCheck);
  145 |             await this.AutoUP_PuRSPCheck.check();
  146 |             await expect(this.AutoUP_PuRSPMinorRadio).toBeChecked();
  147 |             await this.AutoUP_PuRSPMajorRadio.check();
  148 |             //await expect(this.AutoUP_PuRSPMinorRadio).toBeDisabled();
  149 |         }
  150 | 
  151 |         // Auto-update on Check-in response
  152 |         if (row.AutoUP_CIRESPCheck?.toLowerCase() === "yes") {
  153 |             await visible40(this.AutoUP_CIRESPCheck);
  154 |             await this.AutoUP_CIRESPCheck.check();
  155 |             await expect(this.AutoUP_CIRESPMinorRadio).toBeChecked();
  156 |             await this.AutoUP_CIRESPMajorRadio.check();
  157 |             //await expect(this.AutoUP_CIRESPCheck).toBeDisabled();
  158 |         }
  159 | 
  160 |         if (row.AutoExp_ArcRSPCheck) {
  161 |             await visible40(this.AutoExp_ArcRSPCheck);
  162 |             await this.AutoExp_ArcRSPCheck.check();
  163 |         }
  164 | 
  165 |         if (row.Keywords) {
  166 |             await visible40(this.KeywordTxt);
  167 |             await this.KeywordTxt.fill(row.Keywords);
  168 |         }
  169 | 
  170 |         //Product Specific Configuration
  171 | 
  172 |         if (row.ProductSpecific?.toLowerCase() === "yes") {
  173 |             await visible40(this.ProdCheck);
  174 |             await this.ProdCheck.check();
  175 |             await this.ProdExpIcon.click();
  176 |             console.log('DEBUG itemName:', JSON.stringify(row.itemName)); //Added
  177 |             if (row.itemName) {
  178 |                 const itemsToSelect = row.itemName.split(',').map(s => s.trim());
  179 |                 for (const itemName of itemsToSelect) {
  180 |                     const familyRow = this.page
  181 |                         .locator('label.cbx-main')
  182 |                         .filter({ hasText: itemName });
  183 | 
  184 |                     const checkbox = familyRow.locator('input[type="checkbox"]');
  185 | 
  186 |                     if (!(await checkbox.isChecked())) {
  187 |                         await familyRow.locator('.checkmark').click();
  188 |                     }
  189 |                     await this.SlctProductOkBtn.click();
  190 |                 }
  191 |             }
  192 |             if (row.tradeName) {
  193 |                 const TNtoSelect = row.tradeName.split(',').map(v => v.trim());
  194 |                 const expandCount = await this.ProductExpandIcon.count();
  195 | 
  196 |                 for (let i = 0; i < expandCount; i++) {
  197 |                     await this.ProductExpandIcon.nth(i).click();
  198 |                 }
  199 | 
  200 |                 for (const tradeName of TNtoSelect) {
  201 |                     const tradeRow = this.page
  202 |                         .locator('label.cbx-main')
  203 |                         .filter({ hasText: tradeName });
  204 | 
  205 |                     const checkbox = tradeRow.locator('input[type="checkbox"]');
  206 |                     if (!(await checkbox.isChecked())) {
> 207 |                         await tradeRow.locator('.checkmark').click();
      |                                                              ^ Error: locator.click: Target page, context or browser has been closed
  208 |                     }
  209 | 
  210 |                     await this.SlctProductOkBtn.click();
  211 |                 }
  212 | 
  213 | 
  214 |             }
  215 |             // Save & Check-In action
  216 |             await visible40(this.Save_CheckINBtn);
  217 |             await waitForProcessingToFinish(this.page)
  218 |             await this.Save_CheckINBtn.click();
  219 |             await waitForProcessingToFinish(this.page)
  220 |             await visible40(this.SRCheckInHeading);
  221 |             await waitForProcessingToFinish(this.page)
  222 |             await this.ReasonforCheckIntxt.fill("Created & Saved SR Module with Mandatory data");
  223 |             await visible40(this.CfrmCheckInBtn);
  224 |             await waitForProcessingToFinish(this.page)
  225 |             await this.CfrmCheckInBtn.click();
  226 | 
  227 |         }
  228 |     }
  229 | 
  230 | }    
  231 | 
```