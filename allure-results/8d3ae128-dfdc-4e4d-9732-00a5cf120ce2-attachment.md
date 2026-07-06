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
  - waiting for locator('div[class=\'casesearch-head br-bottom\'] div:nth-child(2)')
    - locator resolved to <div class="buttons-row">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    4 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 500ms
  - element was detached from the DOM, retrying
    - locator resolved to <div class="buttons-row">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    56 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms

```

# Test source

```ts
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
  115 | 
  116 |         for (const row of rows) {
  117 |             await this.createOneModule(row);
  118 |         }
  119 |     }
  120 | 
  121 |     // This Private method was called in above method with CSV data value as paramenter
  122 |     private async createOneModule(row: SRModuleRow) {
  123 | 
  124 |         await this.NewSRModuleBtn.click();
  125 |         await visible40(this.NewSRHeading);
  126 |         await this.MNametxt.fill(row.ModuleName ?? data.SRModule.Name);
  127 | 
  128 |         if (row.ModuleID) { await this.ModuleIDtxt.fill(row.ModuleID); }
  129 |         if (row.ModuleCategory) { await Dprowdown(this.ModuleCategoryDD, row.ModuleCategory); }
  130 |         if (row.Approval?.toLowerCase() === "yes") { await this.ApprovalCheck.check(); }
  131 | 
  132 |         //File uploading related
  133 |         await this.fileUploadImg.click();
  134 |         const filePath = path.join(__dirname, '..', 'test-data', row.FileName ?? 'Doc1 version1.docx');
  135 |         await this.browseUploadImg.setInputFiles(filePath);
  136 |         await this.GoUploadBtn.click();
  137 | await waitForProcessingToFinish(this.page);
  138 | 
  139 |         //File Formate realted
  140 |         // Auto-update on Publish response
  141 |         if (row.AutoUP_PuRSPCheck?.toLowerCase() === "yes") {
  142 |             await visible40(this.AutoUP_PuRSPCheck);
  143 |             await this.AutoUP_PuRSPCheck.check();
  144 |             await expect(this.AutoUP_PuRSPMinorRadio).toBeChecked();
  145 |             await this.AutoUP_PuRSPMajorRadio.check();
  146 |             //await expect(this.AutoUP_PuRSPMinorRadio).toBeDisabled();
  147 |         }
  148 | 
  149 |         // Auto-update on Check-in response
  150 |         if (row.AutoUP_CIRESPCheck?.toLowerCase() === "yes") {
  151 |             await visible40(this.AutoUP_CIRESPCheck);
  152 |             await this.AutoUP_CIRESPCheck.check();
  153 |             await expect(this.AutoUP_CIRESPMinorRadio).toBeChecked();
  154 |             await this.AutoUP_CIRESPMajorRadio.check();
  155 |             //await expect(this.AutoUP_CIRESPCheck).toBeDisabled();
  156 |         }
  157 | 
  158 |         if (row.AutoExp_ArcRSPCheck) {
  159 |             await visible40(this.AutoExp_ArcRSPCheck);
  160 |             await this.AutoExp_ArcRSPCheck.check();
  161 |         }
  162 | 
  163 |         if (row.Keywords) {
  164 |             await visible40(this.KeywordTxt);
  165 |             await this.KeywordTxt.fill(row.Keywords);
  166 |         }
  167 | 
  168 |         //Product Specific Configuration
  169 | 
  170 |         if (row.ProductSpecific?.toLowerCase() === "yes") {
  171 |             await visible40(this.ProdCheck);
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
  194 |         await visible40(this.Save_CheckINBtn);
  195 |         await waitForProcessingToFinish(this.page)
  196 |         await this.Save_CheckINBtn.click();
  197 |         await waitForProcessingToFinish(this.page)
  198 |         await visible40(this.SRCheckInHeading);
  199 |         await waitForProcessingToFinish(this.page)
  200 |         await this.ReasonforCheckIntxt.fill("Created & Saved SR Module with Mandatory data");
  201 |         await visible40(this.CfrmCheckInBtn);
  202 |         await waitForProcessingToFinish(this.page)
> 203 |         await this.CfrmCheckInBtn.click();
      |                                   ^ Error: locator.click: Target page, context or browser has been closed
  204 |     }
  205 | 
  206 | 
  207 | }
  208 | 
```