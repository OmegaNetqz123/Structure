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
  - waiting for locator('[data-ng-click="OkCustomiseColumn()"]')
    - locator resolved to <a href="#" class="defultbtn bluebtn" data-ng-click="OkCustomiseColumn()">Save & Close</a>
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
    20 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms
  - element was detached from the DOM, retrying

```

# Test source

```ts
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
  155 |         this.AvailableClmslist = this.page.locator('#columns-available .inputrow-80 label'); //List
  156 |         this.ToCheckClmsList = this.page.locator('#columns-available .inputrow-80 label input')//List
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
  179 |         await visible40(this.AvailableClmslist.first());
  180 |         const Tochecklist = await this.AvailableClmslist.all();
  181 |         const Checked: String[] = [];
  182 |         for (const check of Tochecklist) {
  183 |             if (await check.locator('input').isChecked()) {
  184 |                 Checked.push((await check.innerText()).trim());
  185 |             }
  186 |         }
  187 |         console.log(`Checked values are: ${Checked}`);
  188 |         await this.ChooseClmnCancelBtn.click();
  189 |         await this.CancelBtn.click();
  190 |         const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
  191 |         return (Checked.every(t => displayColmnNames.includes(t.toString()))) ? true : false;
  192 | 
  193 |     }
  194 | 
  195 |     async CustomizeGridDDT() {
  196 | 
  197 |         await this.GearIcon.waitFor({ state: "visible", timeout: 60000 })
  198 |         await this.SRModuleCreation();
  199 |         DDT = new Testdatacalls();
  200 |         const rows = await DDT.CSVreader<CustomizeGridRow>("datadrivenCustomizationGrid.csv");
  201 | 
  202 |         for (const row of rows) {
  203 |             await this.CustomizationtableSelectionComparision(row);
  204 |         }
  205 | 
  206 |     }
  207 |     async CustomizationtableSelectionComparision(row: CustomizeGridRow) {
  208 | 
  209 |         await this.CustomizeTableIcon.click();
  210 |         await visible40(this.ChooseClmsBtn);
  211 |         await this.ChooseClmsBtn.click();
  212 |         await visible40(this.AvailableClmslist.first());
  213 |         const availablelist = await this.AvailableClmslist.all();
  214 |         for (const clms of availablelist) {
  215 |             const label = (await clms.innerText()).trim();
  216 |             const key = label.replace(/\s+/g, '') as keyof CustomizeGridRow; // "Module Name" -> "ModuleName"
  217 |             const desiredValue = row[key];
  218 |             if (desiredValue === undefined) continue;
  219 |             const shouldBeCheckedDDT = desiredValue.toString().trim().toLowerCase() === 'yes';
  220 |             const checkbox = clms.locator('span');
  221 |             const isCurrentlyChecked = await checkbox.isChecked();
  222 |             if (shouldBeCheckedDDT && !isCurrentlyChecked) {
  223 |                 await checkbox.check();
  224 |             }
  225 |             else if (!shouldBeCheckedDDT && isCurrentlyChecked) {
  226 |                 await checkbox.uncheck();
  227 |             }
  228 | 
  229 |         }
  230 | 
  231 |         const Tochecklist = await this.AvailableClmslist.all();
  232 |         const Checked: String[] = [];
  233 |         for (const check of Tochecklist) {
  234 |             if (await check.locator('input').isChecked()) {
  235 |                 Checked.push((await check.innerText()).trim());
  236 |             }
  237 |         }
  238 | 
  239 |         console.log(`Checked values are: ${Checked}`);
  240 |         await this.ChooseClmnCancelBtn.click();
  241 |         await this.CancelBtn.click();
  242 |         const displayColmnNames: string[] = (await this.DisplayColumnsTxt.allInnerTexts()).map(v => v.trim());
> 243 |         await this.Save_CloseBtn.click();
      |                                  ^ Error: locator.click: Target page, context or browser has been closed
  244 |         return (Checked.every(t => displayColmnNames.includes(t.toString()))) ? true : false;
  245 | 
  246 |     }
  247 | 
  248 | 
  249 | 
  250 |     //******************************************************************************************* */
  251 | 
  252 |     // Search Method
  253 |     async SRModuleSearchField(moduleName: string = data.SRModule.Name, moduleID?: string, keyword: string = data.SRModule.Keyword) {
  254 |         await this.SearcCriteriaExpandIcon.click();
  255 |         await this.SCMNameTxt.fill(moduleName);
  256 |         if (moduleID) {
  257 |             await this.SCSysModIDTxt.fill(moduleID);
  258 |         }
  259 |         await this.SCKeywordtxt.fill(keyword);
  260 |         await this.SearchBtn.click();
  261 |         await waitForProcessingToFinish(this.page);
  262 |         await visible40(this.displayHeading);
  263 |     }
  264 | 
  265 |     async SRModuleCreation() {
  266 | 
  267 |         await this.GearIcon.click();
  268 |         await this.CMConsole.click();
  269 |         await visible40(this.CMHeading);
  270 |         await this.SRModuleMenu.click();
  271 |         await visible40(this.SRModuleHeading);
  272 | 
  273 |     }
  274 | 
  275 |     async SearchModules(moduleName: string = data.SRModule.Name, keyword: string = data.SRModule.Keyword) {
  276 |         await this.SRModuleSearchField(moduleName, undefined, keyword);
  277 |         return await this.ModuleRows.count();
  278 |     }
  279 | 
  280 |     private async selectModule(moduleName: string) {
  281 |         await this.SRModuleSearchField(moduleName);
  282 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  283 |         await matchingRow.click();
  284 |         await visible40(matchingRow.locator('a.a-menu.gridsetting'));
  285 |     }
  286 | 
  287 |     private async openRowActions(moduleName: string) {
  288 |         await this.selectModule(moduleName);
  289 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  290 |         await matchingRow.locator('a.a-menu.gridsetting').click();
  291 |         await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu').waitFor({ state: 'visible', timeout: 10000 });
  292 |     }
  293 | 
  294 |     private async clickActionFromRow(moduleName: string, actionText: string) {
  295 |         await this.openRowActions(moduleName);
  296 |         const matchingRow = this.ModuleRows.filter({ hasText: moduleName }).first();
  297 |         await matchingRow.locator('ul.actionMenu-sub.gridsettingpopupmenu a').filter({ hasText: actionText }).first().click();
  298 |     }
  299 | 
  300 |     async OpenModuleActions(moduleName: string) {
  301 |         await this.openRowActions(moduleName);
  302 |     }
  303 | 
  304 |     async SRModuleView(moduleName: string) {
  305 |         await this.clickActionFromRow(moduleName, 'View');
  306 |     }
  307 | 
  308 |     async SRModuleCopy(moduleName: string) {
  309 |         await this.clickActionFromRow(moduleName, 'Copy');
  310 |     }
  311 | 
  312 |     async SRModuleApproval(moduleName: string) {
  313 |         await this.clickActionFromRow(moduleName, 'Initiate Review');
  314 |     }
  315 | 
  316 |     async SRModulePublish(moduleName: string) {
  317 |         await this.clickActionFromRow(moduleName, 'Publish');
  318 |     }
  319 | 
  320 |     async SRModuleArchive(moduleName: string) {
  321 |         await this.clickActionFromRow(moduleName, 'Archive');
  322 |     }
  323 | 
  324 |     async SRModuleDelete(moduleName: string) {
  325 |         await this.clickActionFromRow(moduleName, 'Delete');
  326 |     }
  327 | 
  328 | 
  329 | 
  330 | 
  331 | 
  332 | 
  333 | 
  334 | 
  335 | 
  336 | 
  337 | 
  338 | }
```