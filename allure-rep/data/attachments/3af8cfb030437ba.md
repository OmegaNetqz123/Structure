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
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - element is outside of the viewport
  - retrying click action
    - waiting 500ms

```

# Test source

```ts
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
  177 | 
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
  193 |     await this.SlctProductOkBtn.click();
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
> 208 |         await this.CfrmCheckInBtn.click();
      |                                   ^ Error: locator.click: Target page, context or browser has been closed
  209 |     }
  210 | 
  211 | 
  212 | }
  213 | 
```