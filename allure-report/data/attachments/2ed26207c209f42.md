# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModuleSearch.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModuleSearch.spec.ts:11:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('[title="Customize Table"]')
    - locator resolved to <img alt="maximize" src="Images/Choose.png" title="Customize Table" class="p-L1 p-t1 p-st1" data-ng-click="OpenCustomizeColumns(this)"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="inputrow-40">…</div> from <div id="columns-orderchange" class="case-searchmain open-canvas">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="inputrow-40">…</div> from <div id="columns-orderchange" class="case-searchmain open-canvas">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    5 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="inputrow-40">…</div> from <div id="columns-orderchange" class="case-searchmain open-canvas">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="micategorylistone-2 br-rd tbodyHeight-75 m1 p-b2 p-R1 smoothSrcollbar">…</div> from <div id="columns-available" class="case-searchmain open-canvas">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
    14 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="inputrow-40">…</div> from <div id="columns-orderchange" class="case-searchmain open-canvas">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Test source

```ts
  110 |         this.SCCustomEndDate = this.page.locator('#txtCustomEndDate');
  111 | 
  112 |         //Search Actions
  113 |         this.SearchBtn = this.page.locator('[class="add-docuform bn-top"] .buttons-row [data-ng-click="btnGoClick()"]');
  114 |         this.ClearBtn = this.page.locator('[data-ng-click="btnClearClick()"]');
  115 |         this.ViewAllBtn = this.page.locator('[data-ng-click="btnViewAllClick()"]');
  116 |         this.SaveBtn = this.page.locator('[data-ng-click="btnSaveCriteriaClick()"]');
  117 | 
  118 |         //Displaying Grid
  119 |         this.displayHeading = this.page.locator('#moduleCount');
  120 |         //this.ModuleSlct = this.page.locator('#AllSRDModules tr');
  121 | 
  122 |         //Displaying Grid Actions
  123 |         this.ModuleActionIcon = this.page.locator('#AllSRDModules td [title="Actions"]');
  124 |         this.ModPublishbtn = this.page.locator('[data-ng-click="PublishOnClick(css.SRDModuleID, css.LatestVersion)"]');
  125 |         this.ModViewbtn = this.page.locator('[data-ng-click="ViewOnClick(css.SRDModuleID)"]');
  126 |         this.ModCopybtn = this.page.locator('[data-ng-click="CopyOnClick(css.SRDModuleID)"]');
  127 |         this.ModApprovalbtn = this.page.locator('[data-ng-click="ApprovalOnClick(css.SRDModuleID)"]');
  128 |         this.ModArchivebtn = this.page.locator('[data-ng-click="ArchiveOnClick(css.SRDModuleID)"]');
  129 |         this.ModDeletebtn = this.page.locator('[data-ng-click="DeleteOnClick(css.SRDModuleID)"]');
  130 |         this.ModuleRows = this.page.locator('#AllSRDModules tr');
  131 |         this.ModuleActionToggle = this.page.locator('#AllSRDModules a.a-menu.gridsetting');
  132 |         this.ModuleActionMenu = this.page.locator('#AllSRDModules ul.actionMenu-sub.gridsettingpopupmenu');//Actions list of items
  133 |         this.ModuleGridTable = this.page.locator('#tblAllModuleData');
  134 | 
  135 |         // Grid Heading Actions
  136 |         this.SelectAllCheckbox = this.page.locator('#multiCheckbox span');
  137 |         this.SortByDropdown = this.page.locator('#ddlSortby');
  138 |         this.AscendingIcon = this.page.locator('#imgA');
  139 |         this.DescendingIcon = this.page.locator('#imgB');
  140 |         this.WrapTxtIcon = this.page.locator('[title="Wrap Columns"]');
  141 |         this.DisplayColumnsTxt = this.page.locator('.dynamicColumn:first-child th[data-ng-class="ShowFullColumnData"]');
  142 |         this.CustomizeTableIcon = this.page.locator('[title="Customize Table"]');
  143 |         this.SelectedTable = this.page.locator('.clearFix div'); //List
  144 |         this.SelectedTableColumns = this.SelectedTable.locator('.inputrow-60 label');  //List
  145 |         this.SelectedColumnsMoveDown = this.SelectedTable.locator('.inputrow-40 a img[title="Move Down"]')  //List
  146 |         this.SelectedColumnsMoveUp = this.SelectedTable.locator('.inputrow-40 a img[title="Move Up"]');  //List
  147 |         this.SelectedColumnsMovetoBottum = this.SelectedTable.locator('.inputrow-40 a img[title="Move to Bottom"]');  //List
  148 |         this.SelectedColumnsMovetoUp = this.SelectedTable.locator('.inputrow-40 a img[title="Move to Top"]');  //List
  149 |         this.CancelBtn = this.page.locator('[data-ng-click="CancelCustomise()"]');
  150 |         this.Save_CloseBtn = this.page.locator('[data-ng-click="OkCustomiseColumn()"]');
  151 |         this.RestBtn = this.page.locator('[data-ng-click="ResetCustomiseColumn()"]');
  152 | 
  153 |         // Choose Column overlay
  154 |         this.ChooseClmsBtn = this.page.locator('[data-ng-click="OpenAvaColumns()"]');
  155 |         this.AvailableClmslist = this.page.locator('.smoothSrcollbar .inputrow-80 label'); //List
  156 |         this.ToCheckClmsList = this.page.locator('.smoothSrcollbar .inputrow-80 label input')//List
  157 |         this.CheckClmsListChk = this.page.locator('.smoothSrcollbar .inputrow-80 label span');//List
  158 |         this.Selectallchk = this.page.locator('[class="cbx-main pull-left"] span');
  159 |         this.ToCheckSelectallChk = this.page.locator('#chkUnkSelectAll');
  160 |         this.ChooseClmnCancelBtn = this.page.locator('[data-ng-click="CancelChoose()"]');
  161 |         this.ChooseClmnProceedBtn = this.page.locator('[data-ng-click="SpecificOkClick()"]');
  162 | 
  163 |     }
  164 | 
  165 |     //Validating Grid headings based on Customizing Table
  166 |     async CustomizationTableComparision(): Promise<boolean> {
  167 |         await this.SRModuleCreation();
  168 |         await this.CustomizeTableIcon.click();
  169 |         const selectedTableNames: string[] = (await this.SelectedTableColumns.allInnerTexts()).map(v => v.trim());
  170 |         await this.CancelBtn.click();
  171 |         const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
  172 |         return (selectedTableNames.every(t => displayColmnNames.includes(t))) ? true : false;
  173 |     }
  174 | 
  175 |     async CustomizationtableDefaultComparision() {
  176 |         //await this.SRModuleCreation();
  177 |         await this.CustomizeTableIcon.click();
  178 |         await this.ChooseClmsBtn.click();
  179 |         const Tochecklist = await this.AvailableClmslist.all();
  180 |         const Checked: String[] = [];
  181 |         for (const check of Tochecklist) {
  182 |             if (await check.locator('input').isChecked()) {
  183 |                 Checked.push((await check.innerText()).trim());
  184 |             }
  185 |         }
  186 |         console.log(`Checked values are: ${Checked}`);
  187 |         await this.ChooseClmnCancelBtn.click();
  188 |         await this.CancelBtn.click();
  189 |         const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
  190 |         return (Checked.every(t => displayColmnNames.includes(t.toString()))) ? true : false;
  191 | 
  192 |     }
  193 | 
  194 |     async CustomizeGridDDT() {
  195 | 
  196 |         await this.GearIcon.waitFor({ state: "visible", timeout: 60000 })
  197 |         await this.SRModuleCreation();
  198 |         await waitForProcessingToFinish(this.page);
  199 |         await visible40(this.displayHeading);
  200 |         DDT = new Testdatacalls();
  201 |         const rows = await DDT.CSVreader<CustomizeGridRow>("datadrivenCustomizationGrid.csv");
  202 | 
  203 |         for (const row of rows) {
  204 |             await this.CustomizationtableSelectionComparision(row);
  205 |         }
  206 | 
  207 |     }
  208 |     async CustomizationtableSelectionComparision(row: CustomizeGridRow) {
  209 | 
> 210 |         await this.CustomizeTableIcon.click();
      |                                       ^ Error: locator.click: Target page, context or browser has been closed
  211 |         await visible40(this.ChooseClmsBtn);
  212 |         await this.ChooseClmsBtn.click();
  213 |         await visible40(this.ChooseClmnProceedBtn);
  214 |         const availablelist = await this.AvailableClmslist.all();
  215 |         for (const clms of availablelist) {
  216 |             const label = (await clms.innerText()).trim();
  217 |             const key = label.replace(/\s+/g, '') as keyof CustomizeGridRow; // "Module Name" -> "ModuleName"
  218 |             const desiredValue = row[key];
  219 |             if (desiredValue === undefined) continue;
  220 |             const shouldBeCheckedDDT = desiredValue.toString().trim().toLowerCase() === 'yes';
  221 |             const checkbox = clms.locator('span');
  222 |             const isCurrentlyChecked = await checkbox.isChecked();
  223 |             if (shouldBeCheckedDDT && !isCurrentlyChecked) {
  224 |                 await checkbox.check();
  225 |             }
  226 |             else if (!shouldBeCheckedDDT && isCurrentlyChecked) {
  227 |                 await checkbox.uncheck();
  228 |             }
  229 | 
  230 |         }
  231 | 
  232 |         const Tochecklist = await this.AvailableClmslist.all();
  233 |         const Checked: String[] = [];
  234 |         for (const check of Tochecklist) {
  235 |             if (await check.locator('input').isChecked()) {
  236 |                 Checked.push((await check.innerText()).trim());
  237 |             }
  238 |         }
  239 | 
  240 |         console.log(`Checked values are: ${Checked}`);
  241 |         await this.ChooseClmnCancelBtn.click();
  242 |         await this.CancelBtn.click();
  243 |         const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
  244 |         await this.Save_CloseBtn.click();
  245 |         return (Checked.every(t => displayColmnNames.includes(t.toString()))) ? true : false;
  246 | 
  247 |     }
  248 | 
  249 | 
  250 | 
  251 |     //******************************************************************************************* */
  252 | 
  253 |     // Search Method
  254 |     async SRModuleSearchField(moduleName: string = data.SRModule.Name, moduleID?: string, keyword: string = data.SRModule.Keyword) {
  255 |         await this.SearcCriteriaExpandIcon.click();
  256 |         await this.SCMNameTxt.fill(moduleName);
  257 |         if (moduleID) {
  258 |             await this.SCSysModIDTxt.fill(moduleID);
  259 |         }
  260 |         await this.SCKeywordtxt.fill(keyword);
  261 |         await this.SearchBtn.click();
  262 |         await waitForProcessingToFinish(this.page);
  263 |         await visible40(this.displayHeading);
  264 |     }
  265 | 
  266 |     async SRModuleCreation() {
  267 | 
  268 |         await this.GearIcon.click();
  269 |         await this.CMConsole.click();
  270 |         await visible40(this.CMHeading);
  271 |         await this.SRModuleMenu.click();
  272 |         await visible40(this.SRModuleHeading);
  273 | 
  274 |     }
  275 | 
  276 |     async SearchModules(moduleName: string = data.SRModule.Name, keyword: string = data.SRModule.Keyword) {
  277 |         await this.SRModuleSearchField(moduleName, undefined, keyword);
  278 |         return await this.ModuleRows.count();
  279 |     }
  280 | 
  281 |     private async selectModule(moduleName: string) {
  282 |         await this.SRModuleSearchField(moduleName);
  283 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  284 |         await matchingRow.click();
  285 |         await visible40(matchingRow.locator('a.a-menu.gridsetting'));
  286 |     }
  287 | 
  288 |     private async openRowActions(moduleName: string) {
  289 |         await this.selectModule(moduleName);
  290 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  291 |         await matchingRow.locator('a.a-menu.gridsetting').click();
  292 |         await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu').waitFor({ state: 'visible', timeout: 10000 });
  293 |     }
  294 | 
  295 |     private async clickActionFromRow(moduleName: string, actionText: string) {
  296 |         await this.openRowActions(moduleName);
  297 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  298 |         await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu a').filter({ hasText: actionText }).first().click();
  299 |     }
  300 | 
  301 |     async OpenModuleActions(moduleName: string) {
  302 |         await this.openRowActions(moduleName);
  303 |     }
  304 | 
  305 |     async SRModuleView(moduleName: string) {
  306 |         await this.clickActionFromRow(moduleName, 'View');
  307 |     }
  308 | 
  309 |     async SRModuleCopy(moduleName: string) {
  310 |         await this.clickActionFromRow(moduleName, 'Copy');
```