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
  - waiting for locator('[data-ng-click="CancelChoose()"]')
    - locator resolved to <a href="#" class="defultbtn closebtn" data-ng-click="CancelChoose()">Cancel</a>
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
    53 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms

```

# Test source

```ts
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
  198 |         DDT = new Testdatacalls();
  199 |         const rows = await DDT.CSVreader<CustomizeGridRow>("datadrivenCustomizationGrid.csv");
  200 | 
  201 |         for (const row of rows) {
  202 |             await this.CustomizationtableSelectionComparision(row);
  203 |         }
  204 | 
  205 |     }
  206 |     async CustomizationtableSelectionComparision(row: CustomizeGridRow) {
  207 | 
  208 |         await this.CustomizeTableIcon.click();
  209 |         await this.ChooseClmsBtn.click();
  210 |         const availablelist = await this.AvailableClmslist.all();
  211 |         for (const clms of availablelist) {
  212 |             const label = (await clms.innerText()).trim();
  213 |             const key = label.replace(/\s+/g, '') as keyof CustomizeGridRow; // "Module Name" -> "ModuleName"
  214 |             const desiredValue = row[key];
  215 |             if (desiredValue === undefined) continue;
  216 |             const shouldBeCheckedDDT = desiredValue.toString().trim().toLowerCase() === 'yes';
  217 |             const checkbox = clms.locator('span');
  218 |             const isCurrentlyChecked = await checkbox.isChecked();
  219 |             if (shouldBeCheckedDDT && !isCurrentlyChecked) {
  220 |                 await checkbox.check();
  221 |             }
  222 |             else if (!shouldBeCheckedDDT && isCurrentlyChecked) {
  223 |                 await checkbox.uncheck();
  224 |             }
  225 | 
  226 |         }
  227 |         await this.ChooseClmnProceedBtn.click();
  228 |         const Tochecklist = await this.AvailableClmslist.all();
  229 |         const Checked: String[] = [];
  230 |         for (const check of Tochecklist) {
  231 |             if (await check.locator('input').isChecked()) {
  232 |                 Checked.push((await check.innerText()).trim());
  233 |             }
  234 |         }
  235 |         console.log(`Checked values are: ${Checked}`);
> 236 |         await this.ChooseClmnCancelBtn.click();
      |                                        ^ Error: locator.click: Target page, context or browser has been closed
  237 |         await this.CancelBtn.click();
  238 |         const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
  239 |         await this.Save_CloseBtn.click();
  240 |         return (Checked.every(t => displayColmnNames.includes(t.toString()))) ? true : false;
  241 | 
  242 |     }
  243 | 
  244 | 
  245 | 
  246 |     //******************************************************************************************* */
  247 | 
  248 |     // Search Method
  249 |     async SRModuleSearchField(moduleName: string = data.SRModule.Name, moduleID?: string, keyword: string = data.SRModule.Keyword) {
  250 |         await this.SearcCriteriaExpandIcon.click();
  251 |         await this.SCMNameTxt.fill(moduleName);
  252 |         if (moduleID) {
  253 |             await this.SCSysModIDTxt.fill(moduleID);
  254 |         }
  255 |         await this.SCKeywordtxt.fill(keyword);
  256 |         await this.SearchBtn.click();
  257 |         await waitForProcessingToFinish(this.page);
  258 |         await visible40(this.displayHeading);
  259 |     }
  260 | 
  261 |     async SRModuleCreation() {
  262 | 
  263 |         await this.GearIcon.click();
  264 |         await this.CMConsole.click();
  265 |         await visible40(this.CMHeading);
  266 |         await this.SRModuleMenu.click();
  267 |         await visible40(this.SRModuleHeading);
  268 | 
  269 |     }
  270 | 
  271 |     async SearchModules(moduleName: string = data.SRModule.Name, keyword: string = data.SRModule.Keyword) {
  272 |         await this.SRModuleSearchField(moduleName, undefined, keyword);
  273 |         return await this.ModuleRows.count();
  274 |     }
  275 | 
  276 |     private async selectModule(moduleName: string) {
  277 |         await this.SRModuleSearchField(moduleName);
  278 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  279 |         await matchingRow.click();
  280 |         await visible40(matchingRow.locator('a.a-menu.gridsetting'));
  281 |     }
  282 | 
  283 |     private async openRowActions(moduleName: string) {
  284 |         await this.selectModule(moduleName);
  285 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  286 |         await matchingRow.locator('a.a-menu.gridsetting').click();
  287 |         await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu').waitFor({ state: 'visible', timeout: 10000 });
  288 |     }
  289 | 
  290 |     private async clickActionFromRow(moduleName: string, actionText: string) {
  291 |         await this.openRowActions(moduleName);
  292 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  293 |         await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu a').filter({ hasText: actionText }).first().click();
  294 |     }
  295 | 
  296 |     async OpenModuleActions(moduleName: string) {
  297 |         await this.openRowActions(moduleName);
  298 |     }
  299 | 
  300 |     async SRModuleView(moduleName: string) {
  301 |         await this.clickActionFromRow(moduleName, 'View');
  302 |     }
  303 | 
  304 |     async SRModuleCopy(moduleName: string) {
  305 |         await this.clickActionFromRow(moduleName, 'Copy');
  306 |     }
  307 | 
  308 |     async SRModuleApproval(moduleName: string) {
  309 |         await this.clickActionFromRow(moduleName, 'Initiate Review');
  310 |     }
  311 | 
  312 |     async SRModulePublish(moduleName: string) {
  313 |         await this.clickActionFromRow(moduleName, 'Publish');
  314 |     }
  315 | 
  316 |     async SRModuleArchive(moduleName: string) {
  317 |         await this.clickActionFromRow(moduleName, 'Archive');
  318 |     }
  319 | 
  320 |     async SRModuleDelete(moduleName: string) {
  321 |         await this.clickActionFromRow(moduleName, 'Delete');
  322 |     }
  323 | 
  324 | 
  325 | 
  326 | 
  327 | 
  328 | 
  329 | 
  330 | 
  331 | 
  332 | 
  333 | 
  334 | }
```