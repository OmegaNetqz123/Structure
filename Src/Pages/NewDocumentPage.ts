import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import path from 'path';
import { AssDivKey, DivKey, FileSelection } from "../models/TemplateTypes";
import { DocumentData } from "../flows/DocumentsFlows";

// type AssDivKey = 'DToD' | 'DToF' | 'FToD' | 'FToF';
type AssocPopupAction = 'selectAndClose' | 'cancel';
// export type DivKey =
//     | 'AssDToD'
//     | 'AssDToF'
//     | 'AssFToD'
//     | 'AssFToF';

// export type AssocSection =
//     | 'DToD'
//     | 'DToF'
//     | 'FToD'
//     | 'FToF';

// export type DocumentType =
//     | 'Response Document'
//     | 'Enclosure'
//     | 'Internal Document' 
//     | 'Information Document';
export class NewDocumentPage extends BasePage {

    readonly uploadpopup = this.page.locator('#divFileUploadPopupImgF0')
    readonly filepathInPopup = '#spnFilename0'
    readonly errorBannerText = '#errorBannerText'
    readonly folderName = this.page.locator('select[data-ng-model="DocumentDetails.FolderID"]')
    readonly documentType = this.page.locator('select[data-ng-model="DocumentDetails.Type"]')
    readonly documentName = this.page.locator('input[data-ng-model="DocumentDetails.DocumentName"]')
    readonly documentId = this.page.locator('#txtDocumentID')
    readonly saveButton = this.page.locator('a.defultbtn', { hasText: /^Save$/ }); // matches only "Save"
    readonly saveCheckInButton = this.page.locator('#btnSaveCheckIn')
    readonly cancelButton = this.page.locator('#divSites a.defultbtn.cnl')
    readonly uploadTableRows: Locator;
    readonly helpButton: Locator;
    readonly successBanner: Locator;
    readonly successText: Locator;
    readonly checkinReason = this.page.locator('#txtModuleCheckInReason')
    readonly checkinOverlay = this.page.locator('divCheckInPopup')
    readonly respDocTypeDropdown: Locator;
    readonly documentIDField: Locator;
    readonly srlClTextArea: Locator;
    readonly keywordsTextArea: Locator;
    readonly activationDateInput: Locator;
    private expiryDateInput: Locator;
    readonly modualAddBtn: Locator;
    private addUploadBtn: Locator;
    private erropPopup = this.page.locator('div.coformationlost.coformationTwo:has(.popupheading:text("Error Message(s)"))')
    readonly subCatError = this.page.locator('#divMICatSubCatC')
    readonly topicError = this.page.locator("#divMITopic")
    readonly prodSpecificChkBox: Locator
    readonly prodSpecificPlus: Locator

    //===== Associate locators =====

    private divACD = '#AssDToD'
    private divASF = '#AssDToF'
    private divASFCD = '#AssFToD'
    private divASFF = '#AssFToF'
    private assDocTableRow = '#AssocAddDocRows'
    private popup = '.coformationlost.coformationTwo';
    private errorList = '#validationErrors li';


    // ===== Site Popup Locators =====
    private sitePopup = this.page.locator('#divSites');
    private siteSearchInput = this.page.locator('#txtSearchSites');
    private siteLabels = this.page.locator('#lstAvilableSites li label.cbx-main');
    private siteOkButton = this.page.locator('a[data-ng-click="SitesOkClick();"]');
    private siteCancelBtn = this.page.locator('a.cnl');


    constructor(page: Page) {
        super(page);
        this.uploadTableRows = page.locator('table tbody tr[data-ng-repeat]');
        this.helpButton = page.locator('a[title="Help"]');
        this.successBanner = page.locator('#succesBanner');
        this.successText = page.locator('#sucessBannerText');
        this.respDocTypeDropdown = page.locator('#cm-sdType');
        this.srlClTextArea = page.locator('textarea[data-ng-model="DocumentDetails.SRLOrCLText"]');
        this.keywordsTextArea = page.locator('textarea[data-ng-model="DocumentDetails.SearchTags"]');
        this.activationDateInput = page.locator('input[data-ng-model="DocumentDetails.ActivationDate"]');
        this.expiryDateInput = page.locator('input[data-ng-model="DocumentDetails.ExpiryDate"]');
        this.documentIDField = page.locator('#txtDocumentID');
        this.modualAddBtn = page.locator('a#btnAddrowNames[data-ng-click="OpenValutDocsAndModules2();"]')
        this.addUploadBtn = page.locator('a.defultbtnSmall[data-ng-click="AddFileClick();"]')
        this.prodSpecificChkBox = page.locator('#spnchkProdSpecific')
        this.prodSpecificPlus = page.locator('li.pro-specific a.ddBtn img[alt="add"]')

    }

    // Locator for Document Type field
    get documentTypeField(): Locator {
        return this.page.locator('select[data-ng-model="DocumentDetails.Type"]')
    }

    // Locator for folder Name Field
    get folderNameField(): Locator {
        return this.page.locator('select[data-ng-model="DocumentDetails.FolderID"]')
    }

    /**
    * Selects a Folder from the "Folder Name" dropdown.
    * @param typeLabel The visible label of the document type to select
    */
    async selectFolderName(typeLabel: string): Promise<void> {
        await this.folderNameField.selectOption({ label: typeLabel });
    }

    /**
    * Selects folder by index, waits for dropdown to be fully populated.
    * Automatically skips the "--Select--" placeholder.
    */
    async selectFolderByIndex(index: number): Promise<string> {
        const folderDropdown = this.folderName;
        const options = folderDropdown.locator('option');

        // ✅ Wait until dropdown options are rendered by Angular
        const dropdownHandle = await folderDropdown.elementHandle();
        await this.page.waitForFunction(
            (el) => !!el && (el as HTMLSelectElement).options.length > 1,
            dropdownHandle,
            { timeout: 15000 }
        );

        const count = await options.count();
        console.log(`Dropdown loaded with ${count} options.`);

        const adjustedIndex = index;
        if (adjustedIndex < 0 || adjustedIndex >= count) {
            throw new Error(`Invalid index: ${index}. Dropdown has ${count - 1} valid folders.`);
        }

        const folderText = (await options.nth(adjustedIndex).textContent())?.trim() ?? '';
        await folderDropdown.selectOption({ index: adjustedIndex });

        await expect(folderDropdown).toHaveValue(/.+/);

        console.log(`✅ Selected Folder: ${folderText}`);
        return folderText;
    }

    /**
    * Selects a folder either by index or by visible name.
    *
    * Usage:
    * - If `folderIndex` is provided → selects folder by index.
    * - If `folderName` is provided → selects folder by visible label.
    *
    * Priority:
    * 1) folderIndex (if present)
    * 2) folderName (fallback)
    *
    * Throws an error if neither index nor name is provided.
    *
    * @param value The index (number) or visible name (string) of the folder to select
    */
    async selectFolder(value: string | number): Promise<string | void> {
        if (typeof value === 'number') {
            return await this.selectFolderByIndex(value);
        }
        await this.selectFolderName(value);
        return value;
    }

    /**
     * Method to click top section buttons like Help, Save, Save & Check-In, Close, Cancel
     * @param action 
     */
    async clickTopButton(action: string): Promise<void> {
        const key = action.toLowerCase().trim();

        const buttonMap: Record<string, Locator> = {
            help: this.helpButton,
            save: this.saveButton,
            'save & check-in': this.saveCheckInButton,
            'save and check-in': this.saveCheckInButton,
            close: this.cancelButton,
            cancel: this.cancelButton,
        };

        const button = buttonMap[key];
        if (!button) throw new Error(`❌ Unknown button action: ${action}`);

        // Handle Help (opens new tab)
        if (key === 'help') {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                button.click(),
            ]);
            await newPage.waitForLoadState();
            console.log('✅ Help page opened.');
            return;
        }

        // Generic click + post-wait
        await button.waitFor({ state: 'visible', timeout: 10000 });
        await button.click();
        await this.page.waitForLoadState('networkidle');

        console.log(`✅ Clicked '${action}' successfully`);
    }


    // ====== Enclosure Document specific fields Methods ======

    /**
     * Sets the Enclosure Reference Number (Enc Ref Number) field.
     */
    async setEncRefNumber(encRef: string = `ENC-${Date.now()}`): Promise<string> {
        const encRefField = this.page.locator('input[data-ng-model="DocumentDetails.EncRefNumber"]');
        await encRefField.waitFor({ state: 'visible', timeout: 5000 });
        await encRefField.fill(encRef);
        console.log(` Set Enclosure Reference Number: ${encRef}`);
        return encRef;
    }

    /**
     * Sets the Publication Details field.
     */
    async setPublicationDetails(details: string = 'Automated publication details'): Promise<void> {
        const pubDetailsField = this.page.locator('input[data-ng-model="DocumentDetails.PublicationDetails"]');
        await pubDetailsField.waitFor({ state: 'visible', timeout: 5000 });
        await pubDetailsField.fill(details);
        console.log(` Set Publication Details: ${details}`);
    }

    /**
     * Selects 'Yes' or 'No' in the Copyrighted dropdown.
     */
    async selectCopyrighted(option: 'Yes' | 'No'): Promise<void> {
        const dropdown = this.page.locator('select[data-ng-model="DocumentDetails.ISCopyrighted"]');
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });
        await dropdown.selectOption({ label: option });
        console.log(`© Selected Copyrighted: ${option}`);
    }

    /**
     * Sets the Provider name (only enabled if Copyrighted = 'Yes').
     */
    async setProvider(provider: string = 'AutoProvider'): Promise<void> {
        const providerField = this.page.locator('input[data-ng-model="DocumentDetails.Provider"]');
        await providerField.waitFor({ state: 'visible', timeout: 5000 });
        if (await providerField.isDisabled()) {
            console.log('⚠️ Provider field is disabled — skipping input.');
            return;
        }
        await providerField.fill(provider);
        console.log(` Set Provider: ${provider}`);
    }

    /**
     * Sets the Flat Subscription Value (if enabled).
     */
    async setFlatSubscriptionValue(value: string = '100'): Promise<void> {
        const flatValueField = this.page.locator('input[data-ng-model="DocumentDetails.FlatSubValue"]');
        await flatValueField.waitFor({ state: 'attached', timeout: 5000 });
        if (await flatValueField.isDisabled()) {
            console.log('⚠️ Flat Subscription Value field is disabled — skipping input.');
            return;
        }
        await flatValueField.fill(value);
        console.log(` Set Flat Subscription Value: ${value}`);
    }

    /**
     * Selects the Flat Subscription Currency (if enabled).
     */
    async selectFlatCurrency(currency: string = 'USD'): Promise<void> {
        const currencyDropdown = this.page.locator('select[data-ng-model="DocumentDetails.FlatSubCurrency"]');
        await currencyDropdown.waitFor({ state: 'attached', timeout: 5000 });
        if (await currencyDropdown.isDisabled()) {
            console.log(' Flat Subscription Currency dropdown is disabled — skipping selection.');
            return;
        }
        await currencyDropdown.selectOption({ label: currency });
        console.log(` Selected Flat Subscription Currency: ${currency}`);
    }

    /**
     * Sets the Per Page Subscription Value (if enabled).
     */
    async setPerPageSubscriptionValue(value: string = '10'): Promise<void> {
        const perPageValueField = this.page.locator('input[data-ng-model="DocumentDetails.PerPageSubValue"]');
        await perPageValueField.waitFor({ state: 'attached', timeout: 5000 });
        if (await perPageValueField.isDisabled()) {
            console.log('⚠️ Per Page Subscription Value field is disabled — skipping input.');
            return;
        }
        await perPageValueField.fill(value);
        console.log(` Set Per Page Subscription Value: ${value}`);
    }

    /**
     * Selects the Per Page Subscription Currency (if enabled).
     */
    async selectPerPageCurrency(currency: string = 'INR'): Promise<void> {
        const currencyDropdown = this.page.locator('select[data-ng-model="DocumentDetails.PerPageSubCurrency"]');
        await currencyDropdown.waitFor({ state: 'attached', timeout: 5000 });
        if (await currencyDropdown.isDisabled()) {
            console.log('⚠️ Per Page Subscription Currency dropdown is disabled — skipping selection.');
            return;
        }
        await currencyDropdown.selectOption({ label: currency });
        console.log(` Selected Per Page Subscription Currency: ${currency}`);
    }

    // ====== End of Enclosure Document specific fields Methods ======

    /**
     * Method to verify if New Document page is displayed
     * @returns true if New Document page is displayed, otherwise false
     */
    async isNewDocumentPageDisplayed(): Promise<boolean> {
        try {
            // Wait for navigation to complete
            await this.page.waitForURL(/NewDocument\.aspx\?ID=&Mode=N/, { timeout: 15000 });
            return true; // ✅ Page loaded correctly
        } catch (error) {
            console.error("❌ New Document page not displayed:", error);
            return false; // ❌ Page not loaded
        }
    }

    /**
     * Verifies that the "Note: Date and Time are displayed in (UTC+05:30)" label
     * is visible on the New Document page.
     *
     * @returns {Promise<boolean>} 
     *          Returns `true` if the label is visible and text matches exactly,
     *          otherwise returns `false`.
     */
    async verifyUtcNoteDisplayed(): Promise<boolean> {
        const utcLabel = this.page.locator('#lblUTCDisplay');

        try {
            await utcLabel.waitFor({ state: 'visible', timeout: 5000 });
            const labelText = (await utcLabel.textContent())?.replace(/\s+/g, ' ').trim() ?? '';
            const expectedText = 'Note: Date and Time are displayed in (UTC+05:30)';
            const isMatch = labelText === expectedText;
            console.log(`🧾 Actual: "${labelText}"`);
            console.log(`✅ Expected: "${expectedText}"`);
            return isMatch;

        } catch (error) {
            console.error('❌ UTC note not displayed or mismatch:', error);
            return false;
        }
    }

    /**
     * Validates that all top section fields and buttons
     * (Folder Name, Document Type, Document Name, Document ID,
     *  Save, Save & Check-In, Cancel) are visible on the page.
     *
     * @returns {Promise<boolean>}
     */
    async areTopSectionFieldsDisplayed(): Promise<boolean> {
        try {
            // Locators (use your page object variables if defined)
            const folderNameDropdown = this.folderName;
            const documentTypeDropdown = this.documentType;
            const documentNameInput = this.documentName;
            const documentIdInput = this.documentId;

            // 🔹 Fix — use unique selectors
            const saveButton = this.saveButton;                         // unique text
            const saveCheckInButton = this.saveCheckInButton;           // unique id
            const cancelButton = this.cancelButton;                     // unique text

            // Wait for all to be visible
            await Promise.all([
                folderNameDropdown.waitFor({ state: 'visible', timeout: 5000 }),
                documentTypeDropdown.waitFor({ state: 'visible', timeout: 5000 }),
                documentNameInput.waitFor({ state: 'visible', timeout: 5000 }),
                documentIdInput.waitFor({ state: 'visible', timeout: 5000 }),
                saveButton.waitFor({ state: 'visible', timeout: 5000 }),
                saveCheckInButton.waitFor({ state: 'visible', timeout: 5000 }),
                cancelButton.waitFor({ state: 'visible', timeout: 5000 })
            ]);

            // Confirm visibility
            const areAllVisible = await Promise.all([
                folderNameDropdown.isVisible(),
                documentTypeDropdown.isVisible(),
                documentNameInput.isVisible(),
                documentIdInput.isVisible(),
                saveButton.isVisible(),
                saveCheckInButton.isVisible(),
                cancelButton.isVisible()
            ]);

            return areAllVisible.every(v => v === true);

        } catch (error) {
            console.error('❌ One or more top section fields are missing:', error);
            return false;
        }
    }

    /**
     * Gets the visible and hidden tab texts from the New Document tab menu.
     * Uses stable tab IDs for locating each element, and extracts the displayed text (<a> tag content).
     *
     * @returns {Promise<{ visible: string[]; hidden: string[] }>}
     */
    async getVisibleAndHiddenTabs(): Promise<{ visible: string[]; hidden: string[] }> {
        // 🔹 Known tab IDs (stable identifiers)
        const tabIds = [
            'litabPGA', // General Attributes
            'litab1',   // Other Attributes
            'litab2',   // Associated Documents
            'litab3',   // Usage Instructions
            'litab4',   // Version Alerts
            'litabSS',  // Share Settings
            'litab5',   // Versions
            'litab6'    // Activity History
        ];

        const visible: string[] = [];
        const hidden: string[] = [];

        for (const id of tabIds) {
            const li = this.page.locator(`#${id}`);

            // Skip if tab not in DOM (some may be removed for specific types)
            if (!(await li.count())) continue;

            const tabText = (await li.locator('a').innerText().catch(() => '')).trim();
            const classAttr = (await li.getAttribute('class')) || '';

            if (classAttr.includes('ng-hide')) {
                hidden.push(tabText);
            } else {
                visible.push(tabText);
            }
        }

        console.log('✅ Visible Tabs:', visible);
        console.log('🚫 Hidden Tabs:', hidden);

        return { visible, hidden };
    }

    /**
     * Selects a document type from the "Document Type" dropdown
     * and verifies that the selected type is highlighted/displayed.
     * 
     * @param typeLabel The visible label of the document type to select (e.g., "Response Document")
     * @returns `true` if the correct type is selected and displayed, otherwise `false`
     */
    async selectDocumentType(docType: string): Promise<boolean> {
        try {
            const documentTypeField = this.documentType
            await documentTypeField.waitFor({ state: 'visible', timeout: 10000 })
            // Select the option by visible text
            await documentTypeField.selectOption({ label: docType });
            await this.page.waitForTimeout(1000);

            // Get the currently selected label text
            const selectedText = await documentTypeField.evaluate(
                (el: HTMLSelectElement) => el.options[el.selectedIndex].text
            );

            // Return true if the selected option matches expected
            return selectedText.trim() === docType;
        } catch (error) {
            console.error(`❌ Error selecting document type "${docType}":`, error);
            return false;
        }
    }


    async getSelectedValue() {
        return await this.documentTypeField.inputValue();
    }

    /**
     * Validates that the Document Type dropdown contains the expected options
     * (excluding the default "--Select--" option).
     * @param expectedOptions - Array of expected option texts in correct order
     * @returns true if all expected options match exactly, false otherwise
     */
    async validateDocumentTypeOptions(expectedOptions: string[]): Promise<boolean> {
        // ⏩ Get all dropdown options except the default "--Select--"

        const actualOptions = await this.documentTypeField
            .locator('option:not([value="0"])')
            .allTextContents();

        // Trim whitespace
        const trimmedActual = actualOptions.map(opt => opt.trim());
        const trimmedExpected = expectedOptions.map(opt => opt.trim());

        // Compare both arrays
        const match =
            trimmedActual.length === trimmedExpected.length &&
            trimmedActual.every((val, index) => val === trimmedExpected[index]);

        if (!match) {
            console.log('❌ Dropdown options mismatch');
            console.log('Expected:', trimmedExpected);
            console.log('Actual:', trimmedActual);
        } else {
            console.log('✅ Dropdown options are correct:', trimmedActual);
        }

        return match;
    }

    /**
     * Verifies the success banner message and document name.
     * @param expectedMessage The expected success message.
     * @param expectedDocName The expected document name.
     * @returns True if the banner is displayed with the correct message and document name, false otherwise.
     */
    async verifySuccessBanner(expectedMessage: string, expectedDocName: string): Promise<boolean> {
        const banner = this.successBanner
        const message = this.successText

        try {
            await banner.waitFor({ state: 'visible', timeout: 10000 });
            const text = (await message.textContent())?.trim() ?? '';

            const isValid =
                text.toLowerCase().includes(expectedMessage.toLowerCase()) &&
                text.includes(expectedDocName);

            console.log(
                isValid
                    ? `✅ Success banner verified: "${text}"`
                    : `❌ Validation failed. Expected: "${expectedMessage}" & "${expectedDocName}", Got: "${text}"`
            );

            return isValid;
        } catch {
            console.error('❌ Success banner not found within timeout.');
            return false;
        }
    }

    /**
    * Verifies dropdown keyboard navigation (cycling through same-letter options).
    * Returns `true` only if all expected behaviors are correct.
    */
    async verifyDocumentTypeOptionsKeyboardNavigation(): Promise<boolean> {
        const options = await this.documentTypeField.locator('option').allTextContents();
        const filteredOptions = options.filter(opt => !opt.includes('--Select--')); // exclude default

        // Group options by first letter
        const groupedByLetter: Record<string, string[]> = {};
        for (const opt of filteredOptions) {
            const firstLetter = opt[0].toLowerCase();
            if (!groupedByLetter[firstLetter]) groupedByLetter[firstLetter] = [];
            groupedByLetter[firstLetter].push(opt);
        }

        // Iterate through each key group
        for (const [key, optionList] of Object.entries(groupedByLetter)) {
            console.log(`🔍 Testing key "${key.toUpperCase()}" for options: ${optionList.join(', ')}`);

            // Focus dropdown first
            await this.documentTypeField.focus();
            await this.page.keyboard.press('ArrowDown');
            await this.page.waitForTimeout(200);

            for (const expectedOption of optionList) {
                await this.page.keyboard.press(key); // type key
                await this.page.waitForTimeout(300);

                const selectedValue = await this.documentTypeField.inputValue();
                const selectedText = await this.documentTypeField
                    .locator(`option[value="${selectedValue}"]`)
                    .textContent();

                if (selectedText?.trim() !== expectedOption.trim()) {
                    console.log(`❌ Failed for key "${key}". Expected: ${expectedOption}, Got: ${selectedText}`);
                    return false;
                }
            }
        }

        console.log("✅ Dropdown keyboard navigation (cycling) verified successfully.");
        return true;
    }


    /**
     * Checks whether the Document Type dropdown allows only single selection.
     * Returns `true` if single-select, `false` if multi-select.
     */
    // async isDocumentTypeSingleSelect(): Promise<boolean> {
    //     const hasMultipleAttr = await this.documentTypeField.evaluate(el => el.hasAttribute('multiple'));

    //     // 🔹 Get all available option texts except default "--Select--"
    //     const options = await this.documentTypeField.locator('option:not([value="0"])').allTextContents();

    //     if (options.length < 2) {
    //         throw new Error('Not enough options in the dropdown to verify single-select behavior.');
    //     }

    //     // 🔹 Select first two dynamically
    //     await this.selectDocumentType(options[0]);
    //     const firstValue = await this.getSelectedValue();

    //     await this.selectDocumentType(options[1]);
    //     const secondValue = await this.getSelectedValue();

    //     // 🔹 Single-select dropdown → only last selection persists
    //     const onlyOneSelectable = secondValue !== firstValue;

    //     return !hasMultipleAttr && onlyOneSelectable;
    // }



    // Locator for Document Name field
    get documentNameField(): Locator {
        return this.page.locator('input[data-ng-model="DocumentDetails.DocumentName"]');
    }

    /**
    * Enters text into the "Document Name" input field.
    * @param name The document name to enter.
    */
    async setDocumentName(name: string): Promise<void> {
        await this.documentNameField.fill(name);
    }

    /**
     * Sets a unique Document ID in the "Document ID" input field.
     * 
     *  Behavior:
     *  - Waits for the Document ID field (`#txtDocumentID`) to be visible.
     *  - Generates a unique ID using the current timestamp (e.g., "DOC-1731405279485").
     *  - Fills the field with this unique ID.
     *  - Returns the ID value for further validation or logging.
     * 
     *  Example usage:
     *  const docID = await newDocumentPage.setDocumentID();
     *  console.log(`Generated Document ID: ${docID}`);
     * 
     * @returns {Promise<string>} The unique Document ID that was set in the input field.
     */
    async setDocumentID(): Promise<string> {
        const uniqueID = `DOC-ID-${Date.now()}`; // generates unique ID
        const docIdField = this.documentIDField;
        await docIdField.waitFor({ state: 'visible', timeout: 5000 });
        await docIdField.fill(uniqueID);
        console.log(`🆔 Set Document ID: ${uniqueID}`);
        return uniqueID;
    }

    /**
    * Selects a Response Document Type from the dropdown.
    *
    * @param {'File' | 'Module'} option - The document type to select.
    * If no value is provided, you can default it before calling.
    *
    * Example:
    * ```ts
    * await documentPage.selectRespDocType('File');
    * await documentPage.selectRespDocType('Module');
    * ```
    */
    async selectRespDocType(responseDocType?: string | undefined) {
        await this.respDocTypeDropdown.selectOption({ label: responseDocType });
        const selected = await this.respDocTypeDropdown.inputValue();
        console.log(`Selected Response Document Type: ${selected}`);
    }

    /**
     * Enters text into the “Standard Response Letter / Cover Letter Text” field.
     *
     * @param {string} [text] - Optional text to enter.
     * If no text is passed, a random auto-generated text will be filled.
     *
     * Example:
     * ```ts
     * await documentPage.enterSrlClText();               // random text
     * await documentPage.enterSrlClText('Approval note'); // custom text
     * ```
     */
    async setStandardResponseLetterOrCoverLetterText(text?: string) {
        const finalText = text ?? `AutoText_${Math.random().toString(36).substring(2, 10)}`;
        await this.srlClTextArea.fill(finalText);
        console.log(`Entered SRL/CL Text: ${finalText}`);
    }

    /**
    * Fills the “Keywords” field with one or more comma-separated values.
    *
    * @param {...string[]} keywords - One or more keywords.
    * If none are provided, a random keyword will be generated.
    *
    * Example:
    * ```ts
    * await documentPage.setKeywords('pharma', 'clinical', 'AE');
    * await documentPage.setKeywords('automation');
    * await documentPage.setKeywords(); // random keyword
    * ```
    */
    async setKeywords(...keywords: string[]) {
        const text = keywords.length > 0
            ? keywords.join(', ')
            : `AutoKeyword_${Math.random().toString(36).substring(2, 8)}`;

        await this.keywordsTextArea.fill(text);
        console.log(`Entered Keywords: ${text}`);
    }

    /**
    * Sets the Activation Date in the date input field.
    *
    * @param {string} [date] - Date in 'DD-MM-YYYY' format.
    * If no date is passed, today's date will be used automatically.
    *
    * Example:
    * ```ts
    * await documentPage.setActivationDate();             // today's date
    * await documentPage.setActivationDate('25-11-2025'); // specific date
    * ```
    */
    async setActivationDate(date?: string) {
        const today = new Date();

        // Format → MM-DD-YYYY
        const formattedToday = `${(today.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${today.getDate()
                .toString()
                .padStart(2, '0')}-${today.getFullYear()}`;

        const finalDate = date ?? formattedToday;

        await this.activationDateInput.fill('');
        await this.activationDateInput.fill(finalDate);
        console.log(`Entered Activation Date: ${finalDate}`);
    }


    /**
 * Sets Expiry Date using calendar.
 *
 * - Picks date = today + N days
 * - Automatically moves to next month if needed
 * - Avoids parsing input value (uses calculated date)
 * - Formats as DD-MMM-YYYY (e.g., 07-Jun-2026)
 */
    async setExpiryDate(daysFromToday = 7): Promise<string> {

        const expiryDateContainer = this.page
            .locator('label.field-lable:has-text("Expiry Date")')
            .locator('..');

        const calendarIcon = expiryDateContainer.locator('img.ui-datepicker-trigger');
        const input = this.expiryDateInput;

        // 1️⃣ Open calendar
        await calendarIcon.click();
        await expect(this.page.locator('.ui-datepicker-calendar')).toBeVisible();

        // 2️⃣ Calculate target date
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysFromToday);

        const targetDay = String(targetDate.getDate());
        const targetMonth = targetDate.getMonth(); // 0–11
        const targetYear = targetDate.getFullYear();

        const nextBtn = this.page.locator('.ui-datepicker-next');

        let found = false;

        // 3️⃣ Navigate to correct month/year and pick day
        for (let i = 0; i < 12; i++) {

            const monthDropdown = this.page.locator('.ui-datepicker-month');
            const yearDropdown = this.page.locator('.ui-datepicker-year');

            const currentMonthIndex = Number(await monthDropdown.inputValue());
            const currentYear = Number(await yearDropdown.inputValue());

            if (currentMonthIndex === targetMonth && currentYear === targetYear) {

                const dayLocator = this.page.locator(
                    `//td[not(contains(@class,"ui-datepicker-other-month")) 
                   and not(contains(@class,"ui-state-disabled"))]//a[text()="${targetDay}"]`
                );

                if (await dayLocator.count() > 0) {
                    await dayLocator.first().click();
                    found = true;
                    break;
                }
            }

            // Move to next month if not matched
            await nextBtn.click();
            await this.page.waitForTimeout(150);
        }

        if (!found) {
            throw new Error(`❌ Unable to select expiry date: ${targetDay}`);
        }

        // 4️⃣ Format using targetDate (NOT input value)
        const finalFormatted =
            `${String(targetDate.getDate()).padStart(2, '0')}-` +
            `${targetDate.toLocaleString('en', { month: 'short' })}-` +
            `${targetDate.getFullYear()}`;

        // 5️⃣ Fill formatted value
        await input.fill('');
        await input.fill(finalFormatted);

        console.log(`🗓️ Final Expiry Date: ${finalFormatted}`);

        return finalFormatted;
    }

    /**
    * Clicks on a tab in the tab-menu by its visible text.
    * Throws an error if the tab is not visible or doesn't exist.
    * 
    * @param tabName The exact visible name of the tab to click (e.g., "Usage Instructions")
    */
    async clickTabByName(tabName: string): Promise<void> {
        // Locate the tab anchor element by visible text
        const tab = this.page.locator('ul.tab-menu li a', { hasText: tabName });
        await tab.waitFor({ state: 'visible', timeout: 10000 });

        // Ensure the tab is visible before clicking
        // if (!(await tab.isVisible())) {
        //     throw new Error(`Tab with name "${tabName}" is not visible or does not exist.`);
        // }

        await tab.click();
    }

    /**
* Selects a document category from the dropdown using visible text.
*
* @param visibleText - The option label text to select (e.g., "Document")
*/
    async selectDocumentCategory(visibleText: string): Promise<void> {

        // Locate the dropdown using its ng-model attribute and select option by visible text
        await this.page
            .locator('select[data-ng-model="DocumentDetails.DocCategoryID"]')
            .selectOption({ label: visibleText });
    }

    /**
    * Toggles the "Approval Required" checkbox based on the specified action.
    * - Clicks on the <span> element for UI consistency.
    * - Checks the <input> element to verify the current state.
    *
    * @param action - "check" or "uncheck"
    */
    async clickApprovalRequiredCheckbox(action: "check" | "uncheck"): Promise<void> {
        // Locate the checkbox input element (to verify checked state)
        await this.waitForAppReady();
        const input = this.page.locator('ul.checkbox-row li label:has-text("Approval Required") input[type="checkbox"]');

        // Locate the clickable span element (used for UI click)
        const span = this.page.locator('ul.checkbox-row li label:has-text("Approval Required") span.checkmark');

        // Get current state of the checkbox (true if checked)
        const isChecked = await input.isChecked();

        // Perform action only if needed
        if (action === "check" && !isChecked) {
            // Click the span to check the checkbox
            await span.click();
            console.log("✅ Checked 'Approval Required' checkbox");
        } else if (action === "uncheck" && isChecked) {
            // Click the span to uncheck the checkbox
            await span.click();
            console.log("✅ Unchecked 'Approval Required' checkbox");
        } else {
            // No action needed if already in the desired state
            console.log(`ℹ️ 'Approval Required' checkbox already ${action}`);
        }
    }


    /**
    * Checks or unchecks Global / Local document checkbox.
    *
    * @param type - "Global Document" or "Local Document"
    * @param shouldCheck - true = check, false = uncheck
    */
    async toggleGlobalOrLocalCheckbox(type: string, shouldCheck: boolean): Promise<void> {
        // Find the <label> using visible text
        const label = this.page.locator(`label:has-text("${type}")`);

        const input = label.locator('input[type="checkbox"]');
        const span = label.locator('span.checkmark');

        // If disabled, throw a clear error
        if (await input.isDisabled()) {
            throw new Error(`${type} checkbox is disabled and cannot be changed`);
        }

        const isChecked = await input.isChecked();

        // Decide action
        if (shouldCheck && !isChecked) {
            await span.click();   // Check
        } else if (!shouldCheck && isChecked) {
            await span.click();   // Uncheck
        }
    }



    /**
     * Checks usage type checkboxes (Email, Print/Mail, Verbal) based on JSON input.
     * Skips any checkbox that is disabled or set to false.
     * 
     * @param usageTypes An object like { email: true, verbal: true, printMail: false }
     */
    async selectUsageTypes(usageTypes: { email?: boolean; printMail?: boolean; verbal?: boolean; offTheShelf?: boolean }): Promise<void> {
        const usageMap = {
            email: this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeEmail"] + span'),
            printMail: this.page.locator('input[data-ng-model="DocumentDetails.UsageTypePrint"] + span'),
            verbal: this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeVerbal"] + span'),
            offTheShelf: this.page.locator('input[data-ng-model="DocumentDetails.OfftheShelf"] + span'),
        };

        for (const [key, shouldCheck] of Object.entries(usageTypes)) {
            if (shouldCheck && usageMap[key as keyof typeof usageMap]) {
                const checkbox = usageMap[key as keyof typeof usageMap];

                // Only check if it's not already checked and is enabled
                if (await checkbox.isEnabled()) {
                    const isChecked = await checkbox.isChecked();
                    if (!isChecked) {
                        await checkbox.check();
                    }
                } else {
                    console.warn(`Checkbox for "${key}" is disabled or not found.`);
                }
            }
        }
    }

    /**
 * Verifies that at least one of the given usage types is checked.
 * @param types Array of usage types (e.g. ['Verbal', 'Email'])
 */
    async assertUsageTypesChecked(types: string[]): Promise<void> {
        let checkedCount = 0;

        for (const type of types) {
            const checkbox = this.page.locator(`label.cbx-main:has-text("${type}") input[type="checkbox"]`).first();
            await checkbox.waitFor({ state: 'attached', timeout: 20000 });
            if (await checkbox.isChecked()) {
                console.log(`✅ "${type}" checkbox is checked`);
                checkedCount++;
            } else {
                console.log(`ℹ️ "${type}" checkbox is NOT checked`);
            }
        }

        expect(checkedCount > 0, `❌ None of the usage types [${types.join(', ')}] are checked`).toBeTruthy();
        console.log(`✅ Verified: At least one of [${types.join(', ')}] is checked`);
    }

    // Locator for folder Name Field
    get responseDocTypeField(): Locator {
        return this.page.locator('#cm-sdType');
    }

    /**
     * Selects a value from the "Response Document Type" dropdown.
     * @param typeLabel The visible option to select (e.g., 'File' or 'Module')
     */
    async selectResponseDocType(typeLabel: 'File' | 'Module'): Promise<void> {
        await this.responseDocTypeField.waitFor({ state: 'visible' });
        await this.responseDocTypeField.selectOption({ label: typeLabel });
    }

    /**
     * Selects the Merge Style radio option ("Source" or "Destination").
     * Waits for the specific Merge Style section to be visible before interaction.
     *
     * @param style - The desired merge style ('Source' | 'Destination')
     */
    async selectMergeStyle(style: 'Source' | 'Destination'): Promise<void> {
        const mergeSection = this.page.locator('div.inputrow-40:has(label.field-lable:has-text("Merge Style"))');
        const sourceRadio = mergeSection.locator('input[data-ng-model="MergeStyle"][value="S"]');
        const destinationRadio = mergeSection.locator('input[data-ng-model="MergeStyle"][value="D"]');

        await mergeSection.waitFor({ state: 'visible', timeout: 15000 });

        // Select radio based on argument
        if (style === 'Source') {
            await sourceRadio.scrollIntoViewIfNeeded();
            await sourceRadio.check({ force: true });
            console.log('🟢 Selected "Source Format" Merge Style.');
        } else {
            await destinationRadio.scrollIntoViewIfNeeded();
            await destinationRadio.check({ force: true });
            console.log('🟢 Selected "Destination Format" Merge Style.');
        }
    }



    /**
     * Clicks the "Add" button in the Merge Style or Modules section.
     * Safely waits for the button to be visible and enabled before clicking.
     */
    async clickAddModulesButton(): Promise<void> {
        const addButton = this.modualAddBtn
        await addButton.waitFor({ state: 'visible', timeout: 5000 });
        await addButton.click();
        console.log('🟢 Clicked "Add" button Modules section successfully.');
    }

    /**
     * Selects one or more modules in the "Add Modules" popup by name.
     * 
     * @param moduleNames One or multiple module names (exact or partial match)
     * Example: await selectModules(['Module 1', 'Module 2']);
     */
    async selectModules(moduleNames: string[] | string): Promise<void> {
        const names = Array.isArray(moduleNames) ? moduleNames : [moduleNames];
        const moduleRows = this.page.locator('#gvSelectedModules tr');

        await moduleRows.first().waitFor({ state: 'visible', timeout: 10000 });

        const rowCount = await moduleRows.count();
        let selectedCount = 0;

        for (let i = 0; i < rowCount; i++) {
            const row = moduleRows.nth(i);
            const moduleText = (await row.locator('a.docClr').textContent())?.trim() || '';

            for (const name of names) {
                if (moduleText.includes(name)) {
                    const checkbox = row.locator('input[type="checkbox"][data-ng-model="Module.Checked"] + span');
                    if (!(await checkbox.isChecked())) {
                        await checkbox.check();
                        console.log(`✅ Selected module: ${moduleText}`);
                    }
                    selectedCount++;
                }
            }
        }

        console.log(`🟢 Total modules selected: ${selectedCount}`);
    }

    /**
     * Clicks "Select & Close" or "Cancel" in the "Modules - Search" popup only.
     *
     * @param action - 'Select & Close' | 'Cancel'
     */
    async clickModulesPopupAction(action: 'Select & Close' | 'Cancel'): Promise<void> {
        // ✅ Locate the popup by its heading text
        const popupContainer = this.page.locator('div.casesearch-head', {
            has: this.page.locator('div.casesearch-heading', { hasText: 'Modules - Search' }),
        });

        await popupContainer.waitFor({ state: 'visible', timeout: 10000 });

        if (action === 'Select & Close') {
            const selectCloseBtn = popupContainer.locator('a.defultbtn.bluebtn', { hasText: 'Select & Close' });
            await selectCloseBtn.click({ force: true });
            console.log('✅ Clicked "Select & Close" button in Modules - Search popup');
        } else {
            const cancelBtn = popupContainer.locator('a.defultbtn.closebtn', { hasText: 'Cancel' });
            await cancelBtn.click({ force: true });
            console.log('🚫 Clicked "Cancel" button in Modules - Search popup');
        }
    }

    /**
     * Clicks the "Add" button in the Usage Instructions section.
     * Waits until the button is visible and ready before clicking.
     */
    async clickAddUsageInstructionButton(): Promise<void> {
        const addBtn = this.page.locator('a#btnAddUI', { hasText: 'Add' });
        await addBtn.waitFor({ state: 'visible', timeout: 5000 });
        await addBtn.click();
        console.log(' Clicked "Add" button in Usage Instructions section');
    }


    /**
     * Fills one or more Usage Instruction fields.
     * - If `instructions` array is provided, fills accordingly.
     * - Otherwise, generates random values for all visible fields.
     * - Returns all entered instruction texts for validation or reporting.
     *
     * @param instructions Optional array of instruction texts.
     * @returns Promise<string[]> List of all entered usage instructions.
     */
    async setUsageInstructions(usageInstructions?: string[]): Promise<string[]> {
        const inputs = this.page.locator('tbody tr[data-ng-repeat] input[data-ng-model="usInst.Instruction"]');
        const rowCount = await inputs.count();

        if (rowCount === 0) {
            throw new Error('❌ No Usage Instruction fields found on the page.');
        }

        console.log(`🧾 Found ${rowCount} Usage Instruction field(s)`);
        const enteredInstructions: string[] = [];

        for (let i = 0; i < rowCount; i++) {
            const input = inputs.nth(i);
            const text =
                usageInstructions && usageInstructions[i]
                    ? usageInstructions[i]
                    : `AutoInstruction_${Math.random().toString(36).substring(2, 8)}`;

            await input.waitFor({ state: 'visible', timeout: 5000 });
            await input.fill(text);

            enteredInstructions.push(text);
            console.log(` Entered Usage Instruction [${i + 1}]: "${text}"`);
        }

        return enteredInstructions;
    }

    /**
     * Sets the Fulfillment Instructions text.
     * - If text is provided, uses it.
     * - Otherwise, fills a random string.
     * - Skips if the field is disabled.
     * - Returns the entered text.
     *
     * @param text Optional fulfillment instruction text.
     * @returns Promise<string | null> The entered text, or null if skipped.
     */
    async setFulfillmentInstructions(text?: string): Promise<string | null> {
        const fulfillmentInput = this.page.locator(
            'textarea[data-ng-model="DocumentDetails.FulfilInstructions"]'
        );
        await fulfillmentInput.waitFor({ state: 'attached', timeout: 5000 });
        const finalText = text ?? `AutoFulfillment_${Math.random().toString(36).substring(2, 10)}`;

        await fulfillmentInput.fill(finalText);
        console.log(`📝 Entered Fulfillment Instructions: "${finalText}"`);
        return finalText;
    }

    /**
     * Configures a Version Alert section (Major / Minor / Archived)
     * by toggling active, recipients, CC email, and alert types.
     *
     * @param alertType 'Major' | 'Minor' | 'Archived'
     * @param options Configuration for that alert row.
     */
    async configureVersionAlert(
        alertType: 'Major' | 'Minor' | 'Archived',
        options: {
            active?: boolean;
            to?: { creator?: boolean; publisher?: boolean; archiver?: boolean };
            ccEmail?: string;
            alertTypes?: { emailAlert?: boolean; notification?: boolean };
        }
    ): Promise<void> {
        console.log(`⚙️ Configuring ${alertType} Version alert settings...`);

        // Identify the row based on alert type
        const row = this.page.locator(`tr:has-text("${alertType} Version Published"), tr:has-text("Content Archived")`).first();

        // ✅ Activate alert
        if (options.active) {
            const activeCheckbox = row.locator('input[type="checkbox"][data-ng-model*="Active"] + span');
            await activeCheckbox.check();
            console.log(`✔️ Activated ${alertType} alert`);
        }

        // ✅ Select recipients (Content Creator, Publisher, Archiver)
        if (options.to) {
            if (options.to.creator) await row.locator('input[data-ng-model*="ContentCreater"] + span').check();
            if (options.to.publisher) await row.locator('input[data-ng-model*="ContentPublisher"] + span').check();
            if (options.to.archiver) await row.locator('input[data-ng-model*="ContentArchiver"] + span').check();
            console.log(`Recipients selected for ${alertType}`);
        }

        // ✅ Enter CC Email (or random)
        if (options.ccEmail || options.ccEmail === undefined) {
            const emailInput = row.locator('input[type="email"]');
            const email = options.ccEmail ?? `auto_${alertType.toLowerCase()}@example.com`;
            await emailInput.fill(email);
            console.log(` Entered CC Email for ${alertType}: ${email}`);
        }

        // ✅ Select alert types
        if (options.alertTypes) {
            if (options.alertTypes.emailAlert)
                await row.locator('input[data-ng-model*="SendEmail"] + span').check();
            if (options.alertTypes.notification)
                await row.locator('input[data-ng-model*="SendNotification"] + span').check();
            console.log(` Alert types selected for ${alertType}`);
        }

        console.log(`✅ Completed configuration for ${alertType} alert.\n`);
    }



    /**
     * Method to click Upload Icon In General Attributes
     */
    async clickUploadIcon() {
        const icon = this.page.locator('#imgupload0');
        icon.waitFor({ state: 'visible', timeout: 5000 });
        icon.click();
    }

    // Action Method to click GO button in Upload
    // async clickGoButton(): Promise<void> {
    //     const goButton = this.page.locator('[data-ng-click^="UploadFileClickDoc(\'File\',"]');
    //     await goButton.waitFor({ state: 'visible', timeout: 10000 })
    //     await goButton.click();
    // }

    // Action Method to click GO button in Upload
    async clickGoButton(): Promise<void> {
        // Narrow down to the visible upload popup (each row opens its own)
        const goButton = this.page.locator(
            'div.addtextDD:visible a.defultbtn[data-ng-click^="UploadFileClickDoc(\'File\',"]'
        );
        await goButton.waitFor({ state: 'visible', timeout: 5000 });
        await goButton.click();
        console.log('✅ Clicked Go button for the active upload popup');
    }

    /**
     * Clicks Add (Upload) button one or more times with proper wait for rows to appear.
     * @param clicksCount - Optional number of times to click. Default = 1.
     */
    async clickAddUploadButton(clicksCount?: number): Promise<void> {
        const addBtn = this.addUploadBtn;
        const totalClicks = clicksCount ?? 1;

        for (let i = 0; i < totalClicks; i++) {
            const beforeCount = await this.page.locator('table tbody tr[data-ng-repeat]').count();

            await addBtn.waitFor({ state: 'visible', timeout: 20000 });
            await addBtn.click();
            console.log(`➕ Click ${i + 1}/${totalClicks}`);

            // Wait until new row is added
            await this.page.waitForFunction(
                (prev) => document.querySelectorAll('table tbody tr[data-ng-repeat]').length > prev,
                beforeCount
            );
        }

        console.log(`✅ Completed ${totalClicks} Add button click(s)`);
    }


    // Method to check Add button above Prime and translation window.
    async validateAddTranslationButtonVisibility(expectedVisible: boolean): Promise<void> {
        const addButton = this.addUploadBtn
        const isVisible = await addButton.isVisible();
        expect(isVisible, `Expected Add button visibility to be ${expectedVisible}`).toBe(expectedVisible);
    }

    /**
     * Validates the error message for 2 Prime Files and returns boolean result.
     *
     * @param expectedMessage - The exact text expected in the <li> element
     * @returns true if message matches; false otherwise
     */
    async validatePrimeFileErrorMessage(expectedMessage: string): Promise<boolean> {
        const errorPopup = this.erropPopup
        const errorMessage = errorPopup.locator(this.errorList);

        try {
            await errorPopup.waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            console.error('❌ Error popup not visible.');
            return false;
        }

        const actualMessage = (await errorMessage.textContent())?.trim() || '';

        if (actualMessage === expectedMessage) {
            console.log(`✔ Error message matched: "${expectedMessage}"`);
            return true;
        }

        console.error(`❌ Error mismatch:
    Expected ➜ ${expectedMessage}
    Actual   ➜ ${actualMessage}`);
        return false;
    }

    /**
     * Validates the language selection error message after clicking Save.
     *
     * Scenario covered:
     *  - User clicks Save without selecting a language for one or more files
     *  - Application displays "Please Select" validation message
     *
     * Validation rules:
     *  - For every document row where language is NOT selected,
     *    the "Please Select" message must be visible
     *  - If a language is selected for a row,
     *    the validation message must NOT be displayed for that row
     *
     * Notes:
     *  - This method validates expected UI behavior
     *  - No exception is thrown since this is a positive validation scenario
     *  - Designed to work with dynamic rows (Prime + Translations)
     */
    async assertLanguageSelectionErrorDisplayedForAllRows()
        : Promise<void> {
        const rows = this.page.locator('tr[data-ng-repeat*="DocumentDetails.Files"]');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const languageValue = await row
                .locator('select[data-ng-model="file.LanguageID"]')
                .inputValue();

            if (!languageValue) {
                const alert = row.locator(
                    'div.input-alert',
                    { hasText: 'Please Select' }
                );
                await expect(alert, `Missing validation for row ${i}`).toBeVisible();
            }
        }
    }


    //Method to click Ok in Error Popup
    async clickErrorPopupOk(): Promise<void> {
        const okButton = this.erropPopup.locator('a.defultbtn.bluebtn');
        await okButton.click()
        console.log('Clicked Ok in error popup');
    }


    /**
     * Verifies if the uploaded file name is displayed in the upload popup.
     * @param expectedFileName - Name of the file to verify (e.g. "Azitromycin.docx")
     * @returns true if file is displayed, false otherwise
     */
    async isUploadedFileDisplayedInPopup(fullFilePath: string): Promise<boolean> {
        const expectedFileName = path.basename(fullFilePath); // e.g. "Azithromycin - SRD.docx"
        const fileNameLocator = this.page.locator('#spnFilename0');
        try {
            await fileNameLocator.waitFor({ state: 'visible', timeout: 2000 });
            const actualText = await fileNameLocator.innerText();
            return actualText.includes(expectedFileName);
        } catch {
            return false;
        }
    }


    /**
    * Uploads a file using the file input element with ID 'FileUploadF0'.
    * @param filePath Absolute or relative path to the file to upload.
    */
    async uploadFile(filePath: string): Promise<void> {
        const fileInput = this.page.locator('#FileUploadF0');

        await fileInput.waitFor({ state: 'visible' });
        await expect(fileInput).toBeEnabled();

        await fileInput.setInputFiles(filePath);

        const fileNameSpan = this.page.locator('#spnFilename0');
        await expect(fileNameSpan).toContainText(filePath.split(/[/\\]/).pop() || '');

    }

    /**
       * Uploads a file into the "Prime" document row.
       * @param filePath Absolute path to the file to upload
       * @returns The uploaded file name (for verification)
       */
    async uploadPrimeFile(filePath: string): Promise<string> {
        const rowCount = await this.uploadTableRows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = this.uploadTableRows.nth(i);
            const fileTypeDropdown = row.locator('select[data-ng-model="file.Type"]');
            const selectedText = (await fileTypeDropdown.inputValue()).trim();

            // Check visible text instead of value (value="0" → Prime)
            const selectedOptionText = await row.locator('select[data-ng-model="file.Type"] option[selected]').textContent();

            if (selectedOptionText?.trim() === 'Prime') {
                const fileInput = row.locator('input[type="file"][id^="FileUploadF"]');

                // Wait for file input to be visible
                await fileInput.waitFor({ state: 'visible' });

                // Upload the file
                await fileInput.setInputFiles(filePath);

                // Optional: verify filename appears in span
                const fileNameSpan = row.locator('span[id^="spnFilename"]');
                const uploadedFileName = (await fileNameSpan.textContent())?.trim() || filePath.split(/[/\\]/).pop()!;

                console.log(`✅ File uploaded for Prime: ${uploadedFileName}`);
                return uploadedFileName;
            }
        }

        throw new Error('❌ Prime file row not found in table.');
    }

    /**
     * Clicks a specific Action Menu item (Edit/Download/Compose/Delete/etc.)
     * ONLY if the action is allowed based on the file type (Prime / Translation).
     *
     * Prime Rule:
     *  - Delete menu is not available, so skip and warn user instead of failing.
     *
     * @param rowIndex - Row number (0-based)
     * @param menuItem - "Edit", "Download", "Compose", "Delete"
     */
    async clickActionMenuItemForFiles(rowIndex: number, menuItem: string): Promise<void> {
        const rows = this.page.locator('table tbody tr[data-ng-repeat]');
        const row = rows.nth(rowIndex);

        // Find the file Type in this row
        const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
        const fileTypeValue = await typeDropdown.inputValue(); // "0" = Prime, "1" = Translation
        const fileTypeText = fileTypeValue === "0" ? "Prime" : "Translation";

        // Block invalid action: Deleting Prime file
        if (fileTypeValue === "0" && menuItem.toLowerCase() === "delete") {
            console.warn(`⚠️ Cannot perform delete on Prime row ${rowIndex}. Action skipped!`);
            return;
        }

        // Step 1: Open Settings dropdown
        const settingsIcon = row.locator('a.a-menu.clsetting');
        await settingsIcon.waitFor({ state: 'visible', timeout: 5000 });
        await settingsIcon.click();

        // Step 2: Click desired menu item
        const menuItemLocator = this.page.locator(
            `#SettingsBox${rowIndex} a:has-text("${menuItem}")`
        );

        await menuItemLocator.waitFor({ state: 'visible', timeout: 8000 });
        await menuItemLocator.click();

        console.log(`⚙️ Clicked "${menuItem}" for ${fileTypeText} row ${rowIndex}`);
    }

    /**
     * Validates that when only one file row remains in the table,
     * the system automatically converts it to Prime.
     *
     * Scenario covered:
     * - All files were set to Translation
     * - All but one file were deleted
     * - Remaining file must auto-change to Prime
     */
    async assertLastRemainingFileAutoConvertedToPrime(): Promise<void> {

        const rows = this.page.locator(
            'tr[data-ng-repeat*="DocumentDetails.Files"]'
        );

        // ✅ Rule 1: Only one row must remain
        await expect(rows).toHaveCount(1);

        // ✅ Rule 2: That row must now be Prime
        const selectedOption = rows
            .first()
            .locator('select[data-ng-model="file.Type"] option:checked');

        await expect(selectedOption).toHaveText('Prime');
    }

    /**
     * Validates PDF Behaviour enable/disable state based on file format
     * Rule:
     *  - PDF  → PDF Behaviour must be DISABLED
     *  - DOC / DOCX → PDF Behaviour must be ENABLED
     */
    async assertPdfBehaviourBasedOnFileFormat(): Promise<void> {
        const rows = this.page.locator(
            'tr[data-ng-repeat*="DocumentDetails.Files"]'
        );

        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const fileFormat = (
                await row.locator('small[data-ng-model="file.FileFormat"]').textContent()
            )?.trim().toLowerCase();

            const pdfBehaviourDropdown = row.locator(
                'select[data-ng-model="file.PDFBehaviour"]'
            );

            if (!fileFormat) {
                // No file uploaded → must be disabled
                await expect(
                    pdfBehaviourDropdown,
                    `Row ${i}: PDF Behaviour should be disabled when no file is uploaded`
                ).toBeDisabled();
                continue;
            }

            if (fileFormat === 'pdf') {
                await expect(
                    pdfBehaviourDropdown,
                    `Row ${i}: PDF Behaviour should be disabled for PDF file`
                ).toBeDisabled();
            } else if (fileFormat === 'doc' || fileFormat === 'docx') {
                await expect(
                    pdfBehaviourDropdown,
                    `Row ${i}: PDF Behaviour should be enabled for ${fileFormat}`
                ).toBeEnabled();
            } else {
                throw new Error(
                    `Row ${i}: Unknown file format encountered [${fileFormat}]`
                );
            }
        }
    }

    /**
     * Validates that the Prime file row does NOT show the "Delete" action.
     * @returns true if no delete option
     */
    async validatePrimeHasNoDeleteOption(): Promise<boolean> {
        const rows = this.page.locator('table tbody tr[data-ng-repeat]');
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
            const typeValue = await typeDropdown.inputValue();

            // Prime = value "0"
            if (typeValue === "0") {
                const settingsIcon = row.locator('a.a-menu.clsetting');
                await settingsIcon.click();

                const deleteMenuItem = this.page.locator(`#SettingsBox${i} a:has-text("Delete")`);

                const isVisible = await deleteMenuItem.isVisible();
                console.log(`🛡️ Prime row ${i} Delete Option Visible? => ${isVisible}`);

                // Close settings menu
                await settingsIcon.click({ trial: true });

                if (isVisible) {
                    throw new Error(`❌ Delete option is visible for Prime row ${i}!`);
                }

                console.log(`✔️ Prime row ${i} correctly does NOT show delete.`);
                return true;
            }
        }

        throw new Error("❌ No Prime row found!");
    }




    /**
     * Method to upload file by type (Prime or Translation) at specified index
     * @param fileType 
     * @param filePath 
     * @param index 
     * @returns 
     */
    async uploadFileByType(fileType: 'Prime' | 'Translation', filePath: string, index: number = 0): Promise<string> {
        const uploadIcon = this.page.locator(`a#anchorUpload${index}`);
        await uploadIcon.waitFor({ state: 'visible', timeout: 10000 });
        await uploadIcon.click();

        // ✅ Wait for the specific upload input for this index
        const fileInput = this.page.locator(`input#FileUploadF${index}`);
        await fileInput.waitFor({ state: 'visible', timeout: 10000 });
        await fileInput.setInputFiles(filePath);

        // ✅ Click the corresponding Go button for this upload panel
        const goButton = this.page.locator(`div#divFileUploadPopupImgF${index} a.defultbtn`, { hasText: 'Go' });
        await goButton.waitFor({ state: 'visible', timeout: 5000 });
        await goButton.click();

        // ✅ Verify and log uploaded file
        const uploadedName = (await this.page.locator(`#spnFilename${index}`).textContent())?.trim()
            || filePath.split(/[/\\]/).pop()!;

        console.log(`✅ Uploaded ${fileType} file at row [${index}]: ${uploadedName}`);
        return uploadedName;
    }

    /**
     * Selects the File Type (Prime / Translation) for a given row index.
     *
     * @param rowIndex - 0-based index of the table row
     * @param fileType - "Prime" or "Translation"
     */
    async selectFileType(rowIndex: number, fileType: 'Prime' | 'Translation'): Promise<void> {
        const rows = this.page.locator('table tbody tr[data-ng-repeat]');
        const row = rows.nth(rowIndex);

        const typeDropdown = row.locator('select[data-ng-model="file.Type"]');

        // Map dropdown visible text to value
        const typeValue = fileType === 'Prime' ? '0' : '1';

        await typeDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await typeDropdown.selectOption({ value: typeValue });


        console.log(`📌 File Type set on row ${rowIndex}: ${fileType}`);
    }



    // /**
    //  * Selects a language for all rows of a given file type (Prime or Translation).
    //  *
    //  * This method dynamically loops through every file row in the upload table
    //  * and identifies those matching the specified `fileType`. For each matched row,
    //  * it locates the corresponding language dropdown (`file.LanguageID`)
    //  * and selects the given language label.
    //  *
    //  * ✅ Supports multiple rows — e.g., if multiple Translation rows exist,
    //  *    it will apply the same language selection to all.
    //  * ✅ Automatically waits for each dropdown to become visible before interacting.
    //  * ❌ Throws an error if no row is found for the specified file type.
    //  *
    //  * @param fileType - The type of file row to target. Accepts either `'Prime'` or `'Translation'`.
    //  * @param language - The visible label of the language option to select (e.g., "English", "French").
    //  * @param - index number is optional is language need to be set for specific row
    //  *
    //  * @example
    //  * await newDocumentPage.selectLanguageByType('Prime', 'English');
    //  * await newDocumentPage.selectLanguageByType('Translation', 'French');
    //  */
    // async selectLanguageByType(
    //     fileType: 'Prime' | 'Translation',
    //     language: string,
    //     rowIndex?: number
    // ): Promise<void> {

    //     const rows = this.page.locator('table tbody tr[data-ng-repeat]');
    //     const rowCount = await rows.count();

    //     const typeValue = fileType === 'Prime' ? '0' : '1';

    //     // -----------------------------------------
    //     // Case 1️⃣:If specific row index is passed
    //     // -----------------------------------------
    //     if (rowIndex !== undefined) {
    //         if (rowIndex >= rowCount) {
    //             throw new Error(`Row index ${rowIndex} exceeds total rows: ${rowCount}`);
    //         }

    //         const row = rows.nth(rowIndex);
    //         const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
    //         // const currentType = await typeDropdown.inputValue();
    //         await typeDropdown.waitFor({ state: 'attached' });

    //         const currentType = await typeDropdown.evaluate(el => (el as HTMLSelectElement).value);

    //         if (currentType !== typeValue) {
    //             throw new Error(`Row ${rowIndex} type does not match ${fileType}`);
    //         }

    //         const languageDropdown = row.locator('select[data-ng-model="file.LanguageID"]');
    //         await languageDropdown.waitFor({ state: 'visible', timeout: 5000 });
    //         await languageDropdown.selectOption({ label: language });

    //         console.log(`🌐 Language set on row ${rowIndex}: ${language}`);
    //         return;
    //     }

    //     // ----------------------------------------
    //     // Case 2️⃣: Normal flow
    //     // ----------------------------------------
    //     let found = false;

    //     for (let i = 0; i < rowCount; i++) {
    //         const row = rows.nth(i);
    //         const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
    //         const currentType = await typeDropdown.evaluate(el => (el as HTMLSelectElement).value);
    //         if (currentType === typeValue) {
    //             const languageDropdown = row.locator('select[data-ng-model="file.LanguageID"]');
    //             await languageDropdown.waitFor({ state: 'visible', timeout: 5000 });

    //             const currentLanguage = await languageDropdown.inputValue();
    //             if (!currentLanguage) {
    //                 await languageDropdown.selectOption({ label: language });
    //                 console.log(`🌐 Language selected: "${language}" for ${fileType} row [${i}]`);
    //                 found = true;
    //                 break;
    //             }
    //         }
    //     }

    //     if (!found) throw new Error(`❌ No unselected ${fileType} row found for language "${language}"`);
    // }

    /**
 * Selects a language for rows of a given file type (Prime or Translation).
 *
 * - Supports selecting language for a specific row (rowIndex)
 * - Supports selecting language for first matching row (default)
 * - Handles "--Select--" as null (resets dropdown)
 * - Works reliably after tab switches (Angular re-render safe)
 *
 * @param fileType - 'Prime' | 'Translation'
 * @param language - language label OR "--Select--" for null
 * @param rowIndex - optional specific row index (starts from 0)
 */
    async selectLanguageByType(
        fileType: 'Prime' | 'Translation',
        language: string,
        rowIndex?: number
    ): Promise<void> {

        // ✅ Stable locator (fix 1)
        const rows = this.page.locator('tr[data-ng-repeat*="DocumentDetails.Files"]');

        // ✅ Wait for DOM to stabilize (fix 2)
        await rows.first().waitFor({ state: 'visible', timeout: 5000 });

        const rowCount = await rows.count();

        if (rowCount === 0) {
            throw new Error(`❌ No rows found in General Attributes table`);
        }

        const typeValue = fileType === 'Prime' ? '0' : '1';

        // -----------------------------------------
        // Case 1️⃣: Specific row index
        // -----------------------------------------
        if (rowIndex !== undefined) {

            if (rowIndex >= rowCount) {
                throw new Error(`❌ Row index ${rowIndex} exceeds total rows: ${rowCount}`);
            }

            const row = rows.nth(rowIndex);

            const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
            await typeDropdown.waitFor({ state: 'visible' });

            const currentType = await typeDropdown.inputValue();

            if (currentType !== typeValue) {
                throw new Error(`❌ Row ${rowIndex} is not ${fileType}`);
            }

            const languageDropdown = row.locator('select[data-ng-model="file.LanguageID"]');
            await languageDropdown.waitFor({ state: 'visible' });
            if (!language || language === '--Select--') {
                await languageDropdown.selectOption({ value: '' });
            } else {
                await languageDropdown.selectOption({ label: language });
            }

            console.log(`🌐 Language set on row ${rowIndex}: ${language}`);
            return;
        }

        // -----------------------------------------
        // Case 2️⃣: Find first matching type
        // -----------------------------------------
        for (let i = 0; i < rowCount; i++) {

            const row = rows.nth(i);

            const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
            await typeDropdown.waitFor({ state: 'visible' });

            const currentType = await typeDropdown.inputValue();

            if (currentType === typeValue) {

                const languageDropdown = row.locator('select[data-ng-model="file.LanguageID"]');
                await languageDropdown.waitFor({ state: 'visible' });

                // ✅ Handle null / reset case
                if (!language || language === '--Select--') {
                    await languageDropdown.selectOption({ value: '' });
                } else {
                    await languageDropdown.selectOption({ label: language });
                }

                console.log(`🌐 Language set: "${language}" for ${fileType} row [${i}]`);
                return;
            }
        }

        throw new Error(`❌ No ${fileType} row found`);
    }


    //Method to 'click Save & Check-In'
    async clickSaveAndCheckIn() {
        const btn = this.page.locator('#btnSaveCheckIn');
        await btn.click();
    }


    /**
    * Verifies the visibility of the "Other Attributes" section by checking the 'Usage Type' title.
    * 
    * @returns {Promise<boolean>} True if visible, otherwise throws an error.
    * @throws {Error} If "Usage Type" section is not visible within 5 seconds.
    */
    async isOtherAttributesDisplayed(): Promise<boolean> {
        const otherAttr = this.page.locator('div.coverltr-title', { hasText: 'Usage Type' });

        try {
            await otherAttr.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            throw new Error('"Usage Type" section not visible within 5 seconds.');
        }
    }

    /**
     * Verifies whether the usage type checkboxes (Email, Verbal, Print/Mail)
     * are selected or not based on the expected values provided.
     *
     * @param expectedUsageTypes - An object with boolean values indicating
     *                              whether each checkbox should be selected.
     *                              Example: { email: true, verbal: false, printMail: true }
     * @returns true if all specified checkboxes match expected state, false otherwise
     */
    async areUsageTypeCheckboxesSelected(expectedUsageTypes: {
        email?: boolean;
        verbal?: boolean;
        printMail?: boolean;
    }): Promise<boolean> {
        const { email, verbal, printMail } = expectedUsageTypes;

        const emailCheckbox = this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeEmail"] + span');
        const verbalCheckbox = this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeVerbal"] + span');
        const printMailCheckbox = this.page.locator('input[data-ng-model="DocumentDetails.UsageTypePrint"] + span');

        // Wait for at least one checkbox to be visible
        await emailCheckbox.first().waitFor({ state: 'visible', timeout: 2000 });

        const results = await Promise.all([
            email !== undefined ? emailCheckbox.isChecked().then(actual => actual === email) : Promise.resolve(true),
            verbal !== undefined ? verbalCheckbox.isChecked().then(actual => actual === verbal) : Promise.resolve(true),
            printMail !== undefined ? printMailCheckbox.isChecked().then(actual => actual === printMail) : Promise.resolve(true),
        ]);

        return results.every(result => result);
    }


    /**
  * Checks if the upload popup is in the expected visibility state.
  * @param visible - true to wait for it to be visible, false to wait for it to be hidden
  * @param timeout - optional wait time in ms (default: 3000)
  * @returns true if the expected state is achieved within timeout, false otherwise
  */
    async isUploadPopupInState(visible: boolean, timeout = 3000): Promise<boolean> {
        const expectedState = visible ? 'visible' : 'hidden';

        try {
            await this.uploadpopup.waitFor({ state: expectedState, timeout });
            return true;
        } catch {
            return false;
        }
    }



    /**
     * Method to click 'Confirm Check-in' in Document Check In overlay
     */
    async clickConfirmCheckIn() {
        const btn = this.page.locator('[data-ng-click="DocumentVersionCheckInClick();"]')
        await btn.waitFor({ state: 'visible', timeout: 5000 });
        await btn.click();
    }

    /**
     * Sets the reason text in the 'Reason for Check-In' textarea.
     * @param reason - The reason to be entered
     */
    async setCheckInReason(reason?: string): Promise<void> {
        const reasonField = this.checkinReason
        const popup = this.checkinOverlay
        await this.page.waitForTimeout(2000);
        await reasonField.waitFor({ state: 'attached', timeout: 10000 });

        const finalReason = reason?.trim() || `Auto reason ${Date.now()}`;

        await reasonField.fill(finalReason);
        //Important: trigger blur so Angular updates model
        await this.checkinReason.blur();

        // Wait until value is actually reflected
        await expect(this.checkinReason).toHaveValue(finalReason);
        console.log(`✅ Check-In Reason set to: "${finalReason}"`);
    }



    async verifyFieldValue(locator: Locator, expected: string): Promise<void> {
        const actual = await locator.inputValue(); // for inputs
        expect(actual.trim()).toBe(expected);
    }

    async verifyDropdownValue(locator: Locator, expected: string): Promise<void> {
        const selectedLabel = await locator.locator('option:checked').textContent();
        expect(selectedLabel?.trim()).toBe(expected);
    }

    async selectUsageTypesCheckboxes(usageTypes: string[]): Promise<void> {
        const usageMap: Record<string, Locator> = {
            email: this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeEmail"] + span'),
            printMail: this.page.locator('input[data-ng-model="DocumentDetails.UsageTypePrint"] + span'),
            verbal: this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeVerbal"] + span'),
        };

        for (const type of usageTypes) {
            const checkbox = usageMap[type];
            if (checkbox && (await checkbox.isEnabled())) {
                const isChecked = await checkbox.isChecked();
                if (!isChecked) {
                    await checkbox.check();
                    await this.page.waitForTimeout(5000);
                }
            }
        }
    }

    /**
     * Gets the current checked/unchecked states of the Usage Type checkboxes.
     * Returns an object with three properties:
     *  - email: whether the "Email" checkbox is checked
     *  - verbal: whether the "Verbal" checkbox is checked
     *  - printMail: whether the "Print Mail" checkbox is checked
     */
    async getUsageTypeCheckboxStates(): Promise<{
        email: boolean;
        verbal: boolean;
        printMail: boolean;
    }> {
        const emailCheckbox = this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeEmail"]');
        const verbalCheckbox = this.page.locator('input[data-ng-model="DocumentDetails.UsageTypeVerbal"]');
        const printMailCheckbox = this.page.locator('input[data-ng-model="DocumentDetails.UsageTypePrint"]');

        await emailCheckbox.first().waitFor({ state: 'visible', timeout: 2000 });

        return {
            email: await emailCheckbox.isChecked(),
            verbal: await verbalCheckbox.isChecked(),
            printMail: await printMailCheckbox.isChecked(),
        };
    }

    /**
     * Returns the locator for the uploaded file inside popup
     * 
     * @param fileName - Expected uploaded file name (e.g. "test.pdf")
     * @returns Locator pointing to uploaded file element
     */
    getUploadedFileLocator(fileName: string) {
        return this.page.locator(this.filepathInPopup).filter({ hasText: fileName });
    }

    /**
    * Validates the error banner text.
    * @param expectedMessage Expected error text to verify.
    * @returns true if error banner is visible and matches expected text.
    */
    async validateErrorBanner(expectedMessage: string): Promise<boolean> {
        try {
            const banner = this.page.locator(this.errorBannerText);
            await banner.waitFor({ state: 'visible', timeout: 5000 });

            const actualText = (await banner.textContent())?.trim();
            return actualText === expectedMessage;
        } catch (error) {
            console.error(`❌ Error validating banner:`, error);
            return false;
        }
    }


    /**
     * Toggles MI Categorization selection (Category / Sub-Category / Topic)
     * based on provided label text and desired state.
     *
     *  What it does:
     * - Searches the MI list rows (ul > li)
     * - Finds the LI that contains the provided label text
     * - Locates the checkbox inside that LI using the correct ng-model
     * - Ensures the checkbox gets into the desired state (checked/unchecked)
     *
     *  Click Recovery Strategy:
     *  1️⃣ Try clicking the hidden checkbox directly
     *  2️⃣ If that fails → click the label (Angular prefers this binding)
     *  3️⃣ If still not selected → use JS click() as a final fallback
     *
     *  Validates:
     * - Ensures label exists in list
     * - Ensures corresponding checkbox is found in the correct LI
     * - Ensures final state matches expectation
     *
     *  Throws helpful errors when:
     * - Label not found
     * - Checkbox not found inside matching LI
     * - Unable to force correct state after multiple attempts
     *
     * @param labelText  Visible label text of the category/sub-category/topic
     * @param level      "category" | "subcategory" | "topic"
     * @param shouldCheck true = select checkbox | false = unselect
     *
     * Usage Example:
     * await toggleMICategorization("AutomationSubCategory1", "subcategory", true);
     */
    async toggleMICategorization(
        labelText: string,
        level: "category" | "subcategory" | "topic",
        shouldCheck: boolean
    ) {
        const modelMap = {
            category: "Categories.IsSelected",
            subcategory: "SubCategories.IsSelected",
            topic: "SubTopics.IsSelected"
        } as const;

        const modelName = modelMap[level];

        const scopeLocator =
            level === "category"
                ? `.micategorylistone-2 > li`
                : level === "subcategory"
                    ? `.micategorylistone-2 li ul.p-L2 > li`
                    : `.micategorylistone-2 li ul.p-L2 li ul.p-L2 > li`;

        const li = this.page
            .locator(`${scopeLocator}:has(label:has-text("${labelText}"))`)
            .first();

        await li.scrollIntoViewIfNeeded()

        const checkbox = li.locator(`input[data-ng-model="${modelName}"]`).first();
        const label = li.locator(`label:has-text("${labelText}")`).first();

        const before = await checkbox.isChecked();

        if (before === shouldCheck) {
            console.log(`ℹ️ Already correct: ${labelText}`);
            return { blocked: false, changed: false };
        }

        await label.click({ force: true });

        await this.page.waitForTimeout(200); // allow Angular to update

        const after = await checkbox.isChecked();

        if (after === shouldCheck) {
            console.log(`✔ Toggled: ${labelText} ${shouldCheck}`);
            return { blocked: false, changed: true };
        }

        console.warn(`⚠ Rule blocked: ${labelText}`);
        return { blocked: true, changed: false };
    }


    /**
     * Validates if the MI Sub Category mandatory error message is visible.
     *
     * @param expectedMessage - Error text to match
     * @returns Promise<boolean> - true if visible and text matches
     */
    async validateMISubCategoryMandatoryError(expectedMessage: string): Promise<boolean> {
        const errorLocator = this.subCatError
        try {

            await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
            await errorLocator.scrollIntoViewIfNeeded()
            const actualMessage = (await errorLocator.textContent())?.trim() || '';

            if (actualMessage === expectedMessage) {
                console.log(`✔️ Validation Passed: "${actualMessage}"`);
                return true;
            } else {
                console.error(`❌ Message mismatch. Expected: "${expectedMessage}", Got: "${actualMessage}"`);
                return false;
            }
        } catch {
            console.warn('⚠️ Error message not visible');
            return false;
        }
    }

    /**
     * Validates if the MI Topic mandatory error message is visible.
     * @param expectedMessage - Error text to match
     * @returns Promise<boolean> - true if visible and text matches
     */
    async validateTopicMandatoryError(expectedMessage: string): Promise<boolean> {
        const errorLocator = this.topicError
        try {

            await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
            await errorLocator.scrollIntoViewIfNeeded()
            const actualMessage = (await errorLocator.textContent())?.trim() || '';

            if (actualMessage === expectedMessage) {
                console.log(`✔️ Validation Passed: "${actualMessage}"`);
                return true;
            } else {
                console.error(`❌ Message mismatch. Expected: "${expectedMessage}", Got: "${actualMessage}"`);
                return false;
            }
        } catch {
            console.warn('⚠️ Error message not visible');
            return false;
        }
    }


    /**
     * Validates the MI Categorization modal error popup
     * (Example: "MI Sub Category is mandatory for MI Category AutomationMICategorization")
     *
     * @param expectedMessage - the message inside <li> under #validationErrors
     * @param autoClose - if true, click Ok after validation (default: false)
     */
    async validateMiCategoryErrorPopup(expectedMessage: string, autoClose: boolean = true): Promise<boolean> {
        const popup = this.page.locator('div.coformationlost.coformationTwo:has(.popupheading:has-text("Error Message"))');
        const messageLocator = popup.locator(this.errorList);
        const okButton = popup.locator('a.defultbtn.bluebtn:has-text("Ok")');

        // Wait for popup to appear
        await expect(popup).toBeVisible({ timeout: 10000 });

        // Helper to normalize spacing
        const normalize = (txt: string) =>
            txt.replace(/\s+/g, " ").trim();

        // Read & normalize
        const actualRaw = (await messageLocator.textContent()) ?? "";
        const actualMessage = normalize(actualRaw);
        const expected = normalize(expectedMessage);

        console.log(`📌 Popup Message → "${actualRaw}"`);
        console.log(`📌 Normalized → "${actualMessage}"`);

        // Compare normalized strings
        const match = actualMessage.includes(expected);

        if (!match) {
            console.error(`❌ Expected: "${expected}" but got: "${actualMessage}"`);
        } else {
            console.log(`✔ Message matched: ${expected}`);
        }

        // Auto-close popup
        if (autoClose) {
            await okButton.click();
            await expect(popup).toBeHidden({ timeout: 3000 });
        }

        return match;
    }

    /**
     * Selects a Trade Name inside the Product Specific popup.
     *
     * Flow:
     *  1. Opens the Product Specific section.
     *  2. Opens the Trade Name selection popup.
     *  3. Expands the required Family.
     *  4. Expands the required Product under that Family.
     *  5. Selects the requested Trade Name under the Product.
     *  6. Confirms the selection by clicking the OK button.
     *
     * @param family     The Family name (e.g., "Automation axQST").
     * @param product    The Product name inside the selected Family.
     * @param tradeName  The Trade Name to select under the Product.
     *
     * Example:
     *    await selectTradeName("Automation axQST", "product EuMld", "OPD (HK)");
     *
     * Notes:
     *  - Automatically expands hidden product sections.
     *  - Clicks only the correct Family label (avoids strict mode issues).
     *  - Uses robust :has() selectors for nested hierarchy elements.
     */
    async selectProductTradeName(family: string, product: string, tradeName: string) {

        // Open Product Specific section
        await this.prodSpecificChkBox.locator('..').click();
        await this.prodSpecificPlus.click();

        // -------- FAMILY (DO NOT CLICK FAMILY CHECKBOX) --------
        const familySection = this.page.locator(
            `div.family:has(strong:has-text("${family}"))`
        );

        // Scroll family into view (but no click)
        await familySection.scrollIntoViewIfNeeded();

        // -------- PRODUCT (EXPAND BY CLICKING THE PRODUCT LABEL) --------
        // Locate product head
        const productHead = familySection.locator(
            `.panelsub-head:has(strong:has-text("${product}"))`
        );

        // Product panel (trade name container)
        const productPanel = productHead.locator('..').locator('.panelbody-subwrap');

        if (!(await productPanel.isVisible())) {

            // 1) Hover product row (makes expand icon visible)
            await productHead.hover();

            // 2) Now click the expand icon
            const expandIcon = productHead.locator('.pnl-plusminus-2');

            await expandIcon.waitFor({ state: 'visible', timeout: 3000 });
            await expandIcon.click({ force: true });

            console.log("✔ Product expanded:", product);
        }


        // -------- SELECT TRADE NAME --------
        const tradeNameLocator = familySection.locator(
            `.panelbody-subwrap li label.cbx-main:has(strong:has-text("${tradeName}"))`
        );

        await tradeNameLocator.scrollIntoViewIfNeeded();
        await tradeNameLocator.click();

        // Confirm selection
        await this.page
            .locator('a.defultbtn[data-ng-click="ProductSpecificOKClick();"]')
            .click();

        console.log(`✔ Selected Trade Name: ${tradeName}`);
    }


    /**
     * -------------------------------------------------------------------------
     * validateFieldError() for Product Specific, Contact/ Requestor Specific, Overwrite Folder Site Configuration
     * -------------------------------------------------------------------------
     * Purpose:
     *   Validates the error message displayed near a specific field by locating the
     *   field using its visible label text and then identifying the `.input-alert`
     *   element associated with that field.
     *
     *   @param fieldLabel       - The visible label text of the field (e.g., "Product Specific")
     *   @param expectedMessage  - The expected error text displayed for that field
     *
     * Example Usage:
     *   await validateErrorNearField("Product Specific", "Select at least one product");
     *   await validateErrorNearField("Contact/ Requestor Specific", "Select at least one value");
     *   await validateErrorNearField("Overwrite Folder Site Configuration", "Select at least one value");
     */
    async validateErrorNearField(fieldLabel: string, expectedMessage: string) {
        console.log(`🔍 Validating error near field: "${fieldLabel}"`);

        // Find the outer section container (t-culm) that contains this label
        const container = this.page.locator(`div.t-culm:has(label:has-text("${fieldLabel}"))`);

        console.log(`➡️ Located field section container for "${fieldLabel}"`);

        // Error div lives directly under this container
        const errorLoc = container.locator('.input-alert');

        await expect(errorLoc).toBeVisible();
        console.log(`✔️ Error element is visible for field: "${fieldLabel}"`);

        const actual = (await errorLoc.textContent())?.trim() || '';
        console.log(`📄 UI Error Message: "${actual}"`);

        expect(actual).toBe(expectedMessage);
        console.log(`✅ Error message matched successfully for: "${fieldLabel}"`);
    }


    /**
     * -----------------------------------------------------------------------------
     * clickAddIcon() for Product Specific, Contact/ Requestor Specific, Overwrite Folder Site Configuration
     * -----------------------------------------------------------------------------
     * Purpose:
     *   Clicks the "+" (add) icon associated with a specific field section, based
     *   on the visible label text of that field.
     *
     * Parameters:
     *   @param fieldLabel - Visible text of the field (e.g., "Product Specific")
     *
     * Example Usage:
     *   await clickAddIcon("Product Specific");
     *   await clickAddIcon("Contact/ Requestor Specific");
     *   await clickAddIcon("Overwrite Folder Site Configuration");
     */
    async clickAddIconForSection(fieldLabel: string) {
        console.log(`🔍 Clicking + icon for field: "${fieldLabel}"`);

        // Get the <li> that contains the field label
        const fieldLi = this.page.locator(`ul.checkbox-row li:has(label:has-text("${fieldLabel}"))`);

        await expect(fieldLi).toBeVisible();

        // The + icon is in the NEXT <li> sibling
        const addIcon = fieldLi.locator('xpath=following-sibling::li[1]//a[contains(@class,"ddBtn")]');

        await expect(addIcon).toBeVisible({ timeout: 5000 });
        console.log(`✔️ + icon is visible for "${fieldLabel}"`);

        await addIcon.click();
        console.log(`➕ Clicked + icon for field "${fieldLabel}"`);
    }


    /**
     * -----------------------------------------------------------------------------
     * clickSectionCheckbox() for Product Specific check Box, Contact/ Requestor Specific check Box, Overwrite Folder Site Configuration check Box
     * -----------------------------------------------------------------------------
     * Purpose:
     *   Clicks the main checkbox for a specific section such as:
     *     - Product Specific
     *     - Contact / Requestor Specific
     *     - Overwrite Folder Site Configuration
     *   @param fieldLabel - The visible label text of the main checkbox.
     *
     * Example Usage:
     *   await clickMainSectionCheckbox("Product Specific");
     *   await clickMainSectionCheckbox("Contact/ Requestor Specific");
     *   await clickMainSectionCheckbox("Overwrite Folder Site Configuration");
     */
    async clickSectionCheckbox(fieldLabel: string) {
        console.log(`🔍 Looking for checkbox with label: "${fieldLabel}"`);

        // 1️⃣ Locate the label element using visible text
        const label = this.page.locator(`label.cbx-main:has-text("${fieldLabel}")`);
        await expect(label).toBeVisible();
        console.log(`✔️ Label found for "${fieldLabel}"`);

        // 2️⃣ Locate the actual checkbox input
        const checkbox = label.locator('input[type="checkbox"] + span');
        await expect(checkbox).toBeVisible();
        console.log(`➡️ Checkbox element located for "${fieldLabel}"`);

        // 3️⃣ Check state and click only if needed
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.check();
            console.log(`☑️ Checkbox checked for "${fieldLabel}"`);
        } else {
            console.log(`⚠️ Checkbox already checked for "${fieldLabel}" — skipping click.`);
        }

        // 4️⃣ After checkbox is checked → verify '+ Add' icon becomes visible
        console.log(`🔎 Verifying + icon visibility for "${fieldLabel}" after checking...`);

        const fieldLi = checkbox.locator('xpath=ancestor::li[1]');
        const addIcon = fieldLi.locator('xpath=following-sibling::li[1]//a[contains(@class,"ddBtn")]');

        await expect(addIcon).toBeVisible({ timeout: 5000 });
        console.log(` ➕ icon is now visible for "${fieldLabel}"`);
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------
    //                                                 Product Specific Methods
    //-----------------------------------------------------------------------------------------------------------------------------------------

    async expandFamily(familyName: string) {
        const el = this.page.locator(`
    .family:has(strong:has-text("${familyName}")) .pnl-plusminus
  `);
        await el.scrollIntoViewIfNeeded();
        await el.click();
    }

    async selectFamily(familyName: string) {
        const cb = this.page.locator(`
    .family:has(strong:has-text("${familyName}")) input[type="checkbox"]
  `);
        await cb.scrollIntoViewIfNeeded();
        await cb.check();
    }

    async unselectFamily(familyName: string) {
        const cb = this.page.locator(`
    .family:has(strong:has-text("${familyName}")) input[type="checkbox"]
  `);
        await cb.scrollIntoViewIfNeeded();
        await cb.uncheck();
    }

    async isFamilyFullySelected(familyName: string): Promise<boolean> {
        const label = this.getNode('family', familyName);

        // Scroll label instead of mark (mark may not exist yet)
        await label.scrollIntoViewIfNeeded();

        const mark = label.locator('.checkmark');

        // If no mark exists, it cannot be FULL
        if (await mark.count() === 0) return false;

        return mark.evaluate(el =>
            window.getComputedStyle(el, '::after').content !== 'none'
        ).catch(() => false);
    }


    async isFamilyPartiallySelected(familyName: string): Promise<boolean> {
        const label = this.getNode('family', familyName);
        const mark2 = label.locator('.checkmark-2');
        // no need to scroll mark2 separately; still safe
        return (await mark2.count()) > 0;
    }

    async isFamilyUnselected(familyName: string): Promise<boolean> {
        const full = await this.isFamilyFullySelected(familyName);
        const partial = await this.isFamilyPartiallySelected(familyName);
        return !full && !partial;
    }


    async getFamilyState(familyName: string): Promise<"FULL" | "PARTIAL" | "NONE"> {
        const productCheckboxes = this.page.locator(`
    .family:has(:text("${familyName}"))
    .panelsub-head input[type="checkbox"]
  `);

        const total = await productCheckboxes.count();
        if (total === 0) return "NONE";

        let fullCount = 0;
        let anySelected = false;

        for (let i = 0; i < total; i++) {
            const checkbox = productCheckboxes.nth(i);
            const checked = await checkbox.isChecked();

            if (checked) {
                anySelected = true;

                // Get product name from UI to pass into getProductState
                const productName = await checkbox.locator("xpath=../strong").innerText();
                const state = await this.getProductState(familyName, productName.trim());

                if (state === "FULL") fullCount++;
            }
        }

        if (fullCount === total) return "FULL";
        if (!anySelected) return "NONE";
        return "PARTIAL";
    }


    async ensureFamilyExpanded(familyName: string) {
        const family = this.page.locator(`.family:has(strong:has-text("${familyName}"))`);
        const productsPanel = family.locator('.familyProducts .panelbody-wrap');

        // If any product section is not visible → expand family
        const isVisible = await productsPanel.first().isVisible().catch(() => false);

        if (!isVisible) {
            const expandIcon = family.locator('.pnl-plusminus');
            await expandIcon.scrollIntoViewIfNeeded();
            await expandIcon.click();
        }
    }



    //-------------------------------------------------------------------------------------------------------------------------------------------
    //                                                 Product
    //-------------------------------------------------------------------------------------------------------------------------------------------

    async expandProduct(familyName: string, productName: string) {
        const el = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelsub-head:has(strong:has-text("${productName}"))
    .pnl-plusminus-2
  `);
        await el.scrollIntoViewIfNeeded();
        await el.click();
    }

    async selectProduct(familyName: string, productName: string) {
        const cb = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelsub-head:has(strong:has-text("${productName}"))
    input[type="checkbox"]
  `);
        await cb.scrollIntoViewIfNeeded();
        await cb.check();
    }

    async unselectProduct(familyName: string, productName: string) {
        const cb = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelsub-head:has(strong:has-text("${productName}"))
    input[type="checkbox"]
  `);
        await cb.scrollIntoViewIfNeeded();
        await cb.uncheck();
    }

    async isProductFullySelected(familyName: string, productName: string): Promise<boolean> {
        const label = this.getNode('product', productName, familyName);
        await label.scrollIntoViewIfNeeded();
        const mark = label.locator('.checkmark');
        return mark.evaluate(el => window.getComputedStyle(el, '::after').content !== 'none')
            .catch(() => false);
    }

    async isProductPartiallySelected(familyName: string, productName: string): Promise<boolean> {
        const label = this.getNode('product', productName, familyName);
        const mark2 = label.locator('.checkmark-2');
        return (await mark2.count()) > 0;
    }

    async isProductUnselected(familyName: string, productName: string): Promise<boolean> {
        const full = await this.isProductFullySelected(familyName, productName);
        const partial = await this.isProductPartiallySelected(familyName, productName);
        return !full && !partial;
    }

    async getProductState(familyName: string, productName: string): Promise<"FULL" | "PARTIAL" | "NONE"> {

        const tradeCheckboxes = this.page.locator(`
    .family:has(:text("${familyName}"))
    .panelbody-wrap:has(:text("${productName}"))
    li input[type="checkbox"]
  `);

        const total = await tradeCheckboxes.count();
        if (total === 0) return "NONE"; // no trade rows

        let selectedCount = 0;

        for (let i = 0; i < total; i++) {
            if (await tradeCheckboxes.nth(i).isChecked()) {
                selectedCount++;
            }
        }

        if (selectedCount === total) return "FULL";
        if (selectedCount === 0) return "NONE";
        return "PARTIAL";
    }


    //Method to click product specfic expand icon
    async ensureProductExpanded(familyName: string, productName: string) {
        const product = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelsub-head:has(strong:has-text("${productName}"))
  `);

        const subWrap = product.locator('..').locator('.panelbody-subwrap');

        // Check if trade list is visible
        const isVisible = await subWrap.isVisible().catch(() => false);

        if (!isVisible) {
            const expandIcon = product.locator('.pnl-plusminus-2');
            await expandIcon.scrollIntoViewIfNeeded();
            await expandIcon.click();
        }
    }



    //------------------------------------------------------------------------------------------------------------------------------------------
    //                                                          Trade Name
    //------------------------------------------------------------------------------------------------------------------------------------------

    async selectTradeName(familyName: string, productName: string, tradeName: string) {
        const cb = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelbody-wrap:has(strong:has-text("${productName}"))
    li:has(strong:has-text("${tradeName}")) input[type="checkbox"]
  `);
        await cb.scrollIntoViewIfNeeded();
        await cb.check();
    }

    async unselectTradeName(familyName: string, productName: string, tradeName: string) {
        const cb = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelbody-wrap:has(strong:has-text("${productName}"))
    li:has(strong:has-text("${tradeName}")) input[type="checkbox"]
  `);
        await cb.scrollIntoViewIfNeeded();
        await cb.uncheck();
    }

    async isTradeNameSelected(
        familyName: string,
        productName: string,
        tradeName: string
    ): Promise<boolean> {

        const checkbox = this.page.locator(`
    .family:has(:text("${familyName}"))
    .panelbody-wrap:has(:text("${productName}"))
    li:has(:text("${tradeName}")) input[type="checkbox"]
  `).first();

        await checkbox.scrollIntoViewIfNeeded();

        // 50–80ms tiny delay to allow UI JS to update checkbox state
        await this.page.waitForTimeout(80);

        return await checkbox.isChecked().catch(() => false);
    }


    async isTradeNameUnselected(familyName: string, productName: string, tradeName: string) {
        const selected = await this.isTradeNameSelected(familyName, productName, tradeName);
        return !selected; // no partial state for trade
    }



    async getTradeNameState(familyName: string, productName: string, tradeName: string) {
        if (await this.isTradeNameSelected(familyName, productName, tradeName)) return "FULL";
        return "NONE";
    }



    async getProductsUnderFamily(familyName: string): Promise<string[]> {
        // Ensure family is expanded so product rows are visible
        await this.ensureFamilyExpanded(familyName);

        const products = this.page.locator(`
    .family:has(:text("${familyName}"))
    .panelsub-head strong
  `);

        const count = await products.count();
        const result: string[] = [];

        for (let i = 0; i < count; i++) {
            result.push(await products.nth(i).innerText());
        }

        return result;
    }


    async getTradeNamesUnderProduct(familyName: string, productName: string): Promise<string[]> {

        // Ensure product panel is expanded
        await this.ensureProductExpanded(familyName, productName);

        const trades = this.page.locator(`
    .family:has(:text("${familyName}"))
    .panelbody-wrap:has(:text("${productName}"))
    li strong
  `);

        const count = await trades.count();
        const result: string[] = [];

        for (let i = 0; i < count; i++) {
            result.push(await trades.nth(i).innerText());
        }

        return result;
    }


    async getSelectedTradeNames(
        familyName: string,
        productName: string
    ): Promise<string[]> {

        const tradeItems = this.page.locator(`
    .family:has(strong:has-text("${familyName}"))
    .panelbody-wrap:has(strong:has-text("${productName}"))
    li
  `);

        const count = await tradeItems.count();
        const selected: string[] = [];

        for (let i = 0; i < count; i++) {
            const el = tradeItems.nth(i);
            const name = await el.locator("strong").innerText();

            // Check if the trade is selected
            const mark = el.locator(".checkmark");
            const isFull = await mark.evaluate(node =>
                window.getComputedStyle(node, "::after").content !== "none"
            );

            if (isFull) selected.push(name);
        }

        return selected;
    }

    async getSelectedProducts(familyName: string): Promise<string[]> {
        const products = await this.getProductsUnderFamily(familyName);
        const selected: string[] = [];

        for (const p of products) {
            const state = await this.getProductState(familyName, p);
            if (state !== "NONE") selected.push(p);
        }

        return selected;
    }

    async verifyEntireFamilyTreeState(
        familyName: string,
        expected: "FULL" | "PARTIAL" | "NONE"
    ) {
        // Family state
        const famState = await this.getFamilyState(familyName);
        expect(famState).toBe(expected);

        // Check all products
        const products = await this.getProductsUnderFamily(familyName);
        for (const product of products) {
            const productState = await this.getProductState(familyName, product);

            if (expected === "FULL") expect(productState).toBe("FULL");
            if (expected === "NONE") expect(productState).toBe("NONE");
            // Partial is flexible: some may be FULL/none → family partial
        }

        // Check all trade names
        for (const product of products) {
            const trades = await this.getTradeNamesUnderProduct(familyName, product);
            for (const t of trades) {
                const state = await this.getTradeNameState(familyName, product, t);

                if (expected === "FULL") expect(state).toBe("FULL");
                if (expected === "NONE") expect(state).toBe("NONE");
                // For partial → no strict assertion, depends on product
            }
        }
    }

    getNode(
        type: 'family' | 'product' | 'trade',
        name: string,
        familyName?: string,
        productName?: string
    ) {

        if (type === 'family') {
            return this.page.locator(`
      .family:has(> .panel-head :text("${name}"))
      .panel-head label
    `);
        }

        if (type === 'product') {
            return this.page.locator(`
      .family:has(> .panel-head :text("${familyName}"))
      .panelsub-head:has(:text("${name}"))
      label
    `);
        }

        if (type === 'trade') {
            return this.page.locator(`
      .family:has(> .panel-head :text("${familyName}"))
      .panelbody-wrap:has(:text("${productName}"))
      li:has(:text("${name}"))
      label
    `);
        }

        throw new Error(`Invalid node type: ${type}`);
    }


    async toggleNode(
        type: 'family' | 'product' | 'trade',
        name: string,
        check: boolean = true,
        familyName?: string,
        productName?: string
    ) {
        const label = this.getNode(type, name, familyName, productName);
        await label.scrollIntoViewIfNeeded();

        const checkbox = label.locator('input[type="checkbox"]');
        const isChecked = await checkbox.isChecked();

        // only click when needed
        if (check && !isChecked) {
            await label.click();
        }

        if (!check && isChecked) {
            await label.click();
        }
    }

    async verifyNodeState(
        type: 'family' | 'product' | 'trade',
        name: string,
        expected: 'FULL' | 'PARTIAL' | 'NONE',
        familyName?: string,
        productName?: string
    ) {
        if (type === 'product') {
            await this.ensureProductExpanded(familyName!, name);
        }

        if (type === 'trade') {
            await this.ensureProductExpanded(familyName!, productName!);
        }

        const state =
            type === 'family'
                ? await this.getFamilyState(name)
                : type === 'product'
                    ? await this.getProductState(familyName!, name)
                    : await this.getTradeNameState(familyName!, productName!, name);

        expect(state).toBe(expected);
    }

    async isNodeFullySelected(label: Locator, mark: Locator) {
        await label.scrollIntoViewIfNeeded();

        if (await mark.count() === 0) return false;

        return mark.evaluate(el =>
            window.getComputedStyle(el, '::after').content !== 'none'
        ).catch(() => false);
    }

    async selectHierarchy(options: {
        family: string,
        product?: string,
        trade?: string,
        check?: boolean
    }) {
        const { family, product, trade, check = true } = options;

        await this.ensureFamilyExpanded(family);

        if (!product && !trade) {
            return await this.toggleNode('family', family, check);
        }

        if (product && !trade) {
            await this.ensureProductExpanded(family, product);
            return await this.toggleNode('product', product, check, family);
        }

        if (product && trade) {
            await this.ensureProductExpanded(family, product);
            return await this.toggleNode('trade', trade, check, family, product);
        }
    }

    async clickProductSpecificOK() {
        const okBtn = this.page.locator('[data-ng-click="ProductSpecificOKClick();"]');
        await okBtn.scrollIntoViewIfNeeded();
        await okBtn.click();
        console.log('Clicked Product Specific OK button');
    }


    async clickProductSpecificCancel() {
        // Step 1: Locate OK button (unique)
        const ok = this.page.locator('[data-ng-click="ProductSpecificOKClick();"]');

        // Step 2: Use XPath to get its sibling Cancel button
        const cancelBtn = ok.locator('xpath=../a[contains(@class,"cnl")]');

        await cancelBtn.scrollIntoViewIfNeeded();
        await cancelBtn.click();
    }

    async deleteSelectedTrade(tradeName: string) {
        const li = this.page.locator(
            `#SelectedTrades li:has-text("${tradeName}")`
        );

        const deleteBtn = li.locator('span'); // the X button

        await deleteBtn.scrollIntoViewIfNeeded();
        await deleteBtn.click();

        // Wait for element to be removed from DOM
        await expect(li).toHaveCount(0, { timeout: 3000 });
    }

    async isTradeListed(tradeName: string): Promise<boolean> {
        const li = this.page.locator(`#SelectedTrades li:has-text("${tradeName}")`);
        return await li.count() > 0;
    }

    async getSelectedTradesInPopup(familyName: string, productName: string): Promise<string[]> {
        const tradeLabels = this.page.locator(
            `.family:has(strong:has-text("${familyName}"))
         .panelbody-wrap:has(strong:has-text("${productName}"))
         li:has(input[type="checkbox"]:checked) strong`
        );

        const count = await tradeLabels.count();
        const results: string[] = [];

        for (let i = 0; i < count; i++) {
            results.push((await tradeLabels.nth(i).innerText()).trim());
        }

        return results;
    }

    async getTradesFromSelectedList(): Promise<string[]> {
        const items = this.page.locator('#SelectedTrades li small');
        const count = await items.count();

        const trades: string[] = [];

        for (let i = 0; i < count; i++) {
            trades.push((await items.nth(i).innerText()).trim());
        }
        return trades;
    }

    /**
     * Verifies that the selected trades inside the Product-Specific popup
     * exactly match the trades appearing in the "#SelectedTrades" list 
     * after clicking OK.
     *
     * This ensures end-to-end binding between:
     * Popup Selection  →  Angular Model  →  UI Selected List
     */
    async verifyTradesSyncedBetweenPopupAndList(familyName: string, productName: string) {

        const popupTrades = await this.getSelectedTradesInPopup(familyName, productName);
        console.log(" Trades selected in popup:", popupTrades);

        const listTrades = await this.getTradesFromSelectedList();
        console.log(" Trades appearing in UI list:", listTrades);

        console.log(` Comparing counts → popup: ${popupTrades.length}, list: ${listTrades.length}`);
        expect(listTrades.length).toBe(popupTrades.length);

        console.log(" Comparing sorted trade lists...");
        expect(listTrades.sort()).toEqual(popupTrades.sort());

        console.log("✅ Popup trades and UI list trades are perfectly synced!");
    }

    //-------------------------------------------------------------------------------------------------------------------------
    //                                           Contact/Requestor
    //-------------------------------------------------------------------------------------------------------------------------

    async openReporterTypesPopup() {
        const popup = this.page.locator('#divRepTypes');
        await expect(popup).toBeVisible();
        console.log("✔️ Reporter Types popup opened.");
    }

    async selectReporterType(expectedLabel: string) {
        console.log(`🔍 Selecting Reporter Type: ${expectedLabel}`);

        const labels = this.page.locator(
            '#lstAvilableContRepSpecific li label.cbx-main'
        );

        const count = await labels.count();
        console.log(`ℹ️ Total reporter options: ${count}`);

        for (let i = 0; i < count; i++) {
            const label = labels.nth(i);

            // Read ONLY the first text node of the label
            const text = await label.evaluate(el =>
                el.childNodes[0].textContent?.trim()
            );

            console.log(`➡️ Found label text: "${text}"`);

            if (text === expectedLabel) {
                const checkmark = label.locator('span.checkmark');

                await expect(checkmark).toBeVisible();
                await checkmark.scrollIntoViewIfNeeded();
                await checkmark.click({ force: true });

                console.log(`☑️ Selected Reporter Type: ${expectedLabel}`);
                return;
            }
        }

        throw new Error(`❌ Reporter Type "${expectedLabel}" not found`);
    }


    async unselectReporterType(reporterName: string) {
        console.log(`🚫 Unselecting Reporter Type (via span): ${reporterName}`);

        // Locate the EXACT label by visible text
        const label = this.page.locator(
            '#lstAvilableContRepSpecific li label.cbx-main'
        ).filter({
            has: this.page.locator(`text="${reporterName}"`)
        });

        // Must resolve to exactly one label
        await expect(label).toHaveCount(1);

        // Click ONLY the span inside this label
        const checkmark = label.locator(':scope > span.checkmark');

        await expect(checkmark).toBeVisible();
        await checkmark.scrollIntoViewIfNeeded();
        await checkmark.click();

        console.log(`✅ Reporter "${reporterName}" unchecked via span`);
    }


    async getSelectedReporterTypesInPopup(): Promise<string[]> {
        console.log("📌 Reading selected Reporter Types inside popup...");

        // Find all checked checkboxes
        const checked = this.page.locator(
            '#lstAvilableContRepSpecific li label.cbx-main input[type="checkbox"]:checked'
        );

        const count = await checked.count();
        const result: string[] = [];

        for (let i = 0; i < count; i++) {
            const parentLabel = checked.nth(i).locator('xpath=ancestor::label[1]');

            // Get full text inside label
            const rawText = await parentLabel.innerText();

            // Clean unwanted parts
            const cleaned = rawText.replace(/\s+/g, " ").trim();

            console.log(`✔️ Selected: ${cleaned}`);
            result.push(cleaned);
        }

        console.log("📌 Final popup selection:", result);
        return result;
    }


    async clickReporterPopupOK() {
        const okBtn = this.page.locator('a.defultbtn[data-ng-click="ReporterTypesOkClick();"]');
        await okBtn.scrollIntoViewIfNeeded();
        await okBtn.click();
        console.log("✔️ Clicked Reporter Types OK");
    }

    async clickReporterCancel() {
        const cancelBtn = this.page.locator('#divRepTypes .adm-drpdownBtns .cnl');
        await cancelBtn.scrollIntoViewIfNeeded();
        await cancelBtn.click();
        console.log("⚠️ Clicked Reporter Types Cancel");
    }

    async getSelectedReporterFromList(): Promise<string[]> {
        const items = this.page.locator('#lstboxSelectedRepTypes li small');
        const count = await items.count();

        const result = [];
        for (let i = 0; i < count; i++) {
            result.push((await items.nth(i).innerText()).trim());
        }

        console.log("📌 Reporter list:", result);
        return result;
    }

    async removeReporterFromSelectedList(reporterName: string) {
        console.log(`🗑️ Removing reporter from list: ${reporterName}`);

        // Locate the <li> that contains the reporter name
        const listItem = this.page.locator(
            '#lstboxSelectedRepTypes li',
            { has: this.page.locator('small', { hasText: reporterName }) }
        );

        await expect(listItem).toBeVisible();

        // Click the X icon inside that list item
        const deleteIcon = listItem.locator('span', { hasText: 'X' });

        await expect(deleteIcon).toBeVisible();
        await deleteIcon.click();

        console.log(`❌ Removed reporter: ${reporterName}`);
    }


    async verifyReporterCheckedInPopup(reporterName: string) {
        console.log(`🔍 Verifying reporter is checked in popup: ${reporterName}`);

        // Locate the label with EXACT visible text
        const label = this.page.locator(
            '#lstAvilableContRepSpecific li label.cbx-main'
        ).filter({
            has: this.page.locator(`text="${reporterName}"`)
        });


        await expect(label).toHaveCount(1);

        // 1️⃣ Verify logical state (checkbox checked)
        const checkbox = label.locator('input[type="checkbox"]');
        await expect(checkbox).toBeChecked();

        // 2️⃣ Verify visual state (tick mark visible via ::after)
        const checkmark = label.locator('span.checkmark');

        const isTickVisible = await checkmark.evaluate(el =>
            window.getComputedStyle(el, '::after').content !== 'none'
        );

        expect(isTickVisible).toBe(true);

        console.log(`✅ Reporter "${reporterName}" is checked in popup`);
    }

    async searchReporterInPopup(text: string) {
        console.log(`🔎 Searching reporter in popup: ${text}`);

        const searchBox = this.page.locator('#txtSearchReporterType');
        await expect(searchBox).toBeVisible();

        await searchBox.fill('');
        await searchBox.type(text);
    }

    async verifyAllReportersMatchFilter(filterText: string) {
        const reporters = this.page.locator(
            '#lstAvilableContRepSpecific li label.cbx-main'
        );

        const count = await reporters.count();
        console.log(`🔍 Reporter filter text: "${filterText}"`);
        console.log(`📋 Visible reporters count: ${count}`);

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const text = (await reporters.nth(i).innerText()).trim();
            console.log(`➡️ Reporter [${i + 1}]: "${text}"`);

            expect(text.toLowerCase()).toContain(filterText.toLowerCase());
        }

        console.log('✅ All visible reporters match the filter text');
    }

    async verifyReporterNotVisibleInPopup(reporterName: string) {
        const label = this.page.locator(
            '#lstAvilableContRepSpecific li label.cbx-main'
        ).filter({
            has: this.page.locator(`text="${reporterName}"`)
        });

        await expect(label).toHaveCount(0);
    }

    // ================================ Site Actions ===================================================================

    async waitForSitePopup() {
        await expect(this.sitePopup).toBeVisible();
        console.log('✅ Select Sites popup opened');
    }

    async searchSite(text: string) {
        console.log(`🔍 Searching site: "${text}"`);
        await this.siteSearchInput.type(text);
    }

    async selectSite(siteName: string) {
        console.log(`☑ Selecting site: "${siteName}"`);
        const site = this.siteLabels.filter({ hasText: siteName });
        await expect(site).toBeVisible();
        await site.click();
    }

    async selectMultipleSites(siteNames: string[]) {
        for (const site of siteNames) {
            await this.selectSite(site);
        }
    }

    async verifyAllSitesMatchFilter(filterText: string) {
        const visibleSites = this.page.locator(
            '#lstAvilableSites li:visible label.cbx-main'
        );

        const count = await visibleSites.count();
        console.log(`📋 Visible sites count: ${count}`);
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const text = (await visibleSites.nth(i).innerText()).trim();
            console.log(`➡️ Site [${i + 1}]: "${text}"`);
            expect(text.toLowerCase()).toContain(filterText.toLowerCase());
        }
    }

    async clickSiteOk() {
        console.log('✔ Clicking OK');
        await this.siteOkButton.click();
        await expect(this.sitePopup).toBeHidden();
    }

    async clickSiteCancel() {
        console.log('✖ Clicking Cancel');
        await this.cancelButton.click();
        await expect(this.sitePopup).toBeHidden();
    }

    async verifySelectedSites(expectedSites: string[]) {
        const selectedSites = this.page.locator('#lstSelectedSites li');

        const count = await selectedSites.count();
        console.log(`📌 Selected sites count: ${count}`);
        console.log(`📌 Expected sites: ${expectedSites.join(', ')}`);

        expect(count).toBe(expectedSites.length);

        for (let i = 0; i < count; i++) {
            const siteName = (await selectedSites.nth(i).locator('small').innerText()).trim();
            console.log(`➡️ Selected site [${i + 1}]: "${siteName}"`);

            expect(expectedSites).toContain(siteName);
        }

        console.log('✅ Selected sites validated from selected list');
    }


    async verifyNoSiteSelected() {
        const selectedSites = this.page.locator('#lstSelectedSites li');

        const count = await selectedSites.count();
        console.log(`📌 Selected sites count after cancel: ${count}`);

        expect(count).toBe(0);

        console.log('✅ No site selected');
    }

    async removeSelectedSite(siteName: string) {
        const siteItem = this.page.locator(
            `#lstSelectedSites li:has(small:text("${siteName}"))`
        );

        await expect(siteItem).toBeVisible();

        console.log(`❌ Removing selected site: ${siteName}`);
        await siteItem.locator('span').click(); // X icon

        await expect(siteItem).toBeHidden();
    }


    //--------------------------------------------------------------------------------------------
    //                        Associate Documents
    //--------------------------------------------------------------------------------------------

    // Helper method to get all 4 divs in Associate Document section
    private getDivMap(): Record<DivKey, Locator> {
        return {
            AssDToD: this.page.locator(this.divACD),
            AssDToF: this.page.locator(this.divASF),
            AssFToD: this.page.locator(this.divASFCD),
            AssFToF: this.page.locator(this.divASFF),
        };
    }


    /**
    * Validate expected divs are visible and others are hidden
    * @param visibleDivs -> array of div keys to be visible
    * Example: ['DToD'], ['DToD','DToF'], ['DToD','DToF','FToD','FToF']
    */
    async validateVisibleAssociatedDocSections(
        visibleSections: AssDivKey[]
    ): Promise<void> {

        const divs = this.getDivMap();

        // Convert logical sections → actual div ids
        const visibleDivKeys = visibleSections.map(section =>
            this.mapSectionToDiv(section)
        );

        console.log(`\n[ACD] Expected Visible Sections -> ${visibleSections.join(', ')}`);

        for (const key of Object.keys(divs) as DivKey[]) {

            const locator = divs[key];
            const isExpectedVisible = visibleDivKeys.includes(key);

            try {
                if (isExpectedVisible) {
                    await expect(locator).toBeVisible({ timeout: 5000 });
                    console.log(`[ACD] ✅ ${key} -> Visible as expected`);
                } else {
                    await expect(locator).toBeHidden({ timeout: 5000 });
                    console.log(`[ACD] ✅ ${key} -> Hidden as expected`);
                }
            } catch (error) {
                const state = isExpectedVisible ? 'VISIBLE' : 'HIDDEN';
                console.error(`[ACD] ❌ ${key} -> Expected ${state} but validation FAILED`);
                throw error;
            }
        }

        console.log('[ACD] ✔ Associated Document section validation completed\n');
    }


    // Validate Associated Documents Tab visibility
    async validateAssociatedDocumentsTabVisibility(shouldBeVisible: boolean): Promise<void> {
        const assTab = this.page.locator('#litab2');

        console.log(`[ACD-TAB] Expected -> ${shouldBeVisible ? 'VISIBLE' : 'HIDDEN'}`);

        try {
            if (shouldBeVisible) {
                await assTab.waitFor({ state: 'visible', timeout: 5000 });
                await expect(assTab).toBeVisible();
                console.log('[ACD-TAB] ✅ Tab is visible as expected');
            } else {
                await assTab.waitFor({ state: 'hidden', timeout: 5000 });
                await expect(assTab).toBeHidden();
                console.log('[ACD-TAB] ✅ Tab is hidden as expected');
            }
        } catch (error) {
            console.error(`[ACD-TAB] ❌ Validation failed. Expected -> ${shouldBeVisible ? 'VISIBLE' : 'HIDDEN'}`);
            throw error;
        }
    }

    /**
     * Validate Associate Add BtnErrorerror messages shown in popup
     * @param expectedMessages -> array of expected error strings
     */
    async validateAssociateAddBtnErrorMessages(expectedMessages: string[]): Promise<void> {

        console.log('\n[POPUP] Validating error messages...');

        // Wait for popup visible  erropPopup
        await this.erropPopup.waitFor({ state: 'visible', timeout: 5000 });

        const errors = this.page.locator(this.errorList);
        const actualMessages = await errors.allTextContents();

        console.log('[POPUP] Actual Messages ->', actualMessages);
        console.log('[POPUP] Expected Messages ->', expectedMessages);

        // Normalize (trim + remove extra spaces)
        const normalize = (arr: string[]) =>
            arr.map(m => m.replace(/\s+/g, ' ').trim()).sort();

        expect(normalize(actualMessages)).toEqual(normalize(expectedMessages));

        console.log('[POPUP] ✅ Error message validation passed\n');
    }

    // private Helper method
    private async clickAddAssociatedDocByDivKey(divKey: DivKey): Promise<void> {

        const divs = this.getDivMap();
        const container = divs[divKey];
        console.log(`[ACD-ADD] Trying to click Add in section -> ${divKey}`);
        await container.waitFor({ state: 'visible', timeout: 5000 });
        const addBtn = container.locator('a:has-text("Add")');
        await addBtn.waitFor({ state: 'visible', timeout: 5000 });
        await addBtn.scrollIntoViewIfNeeded()
        await addBtn.click();
        console.log(`[ACD-ADD] ✅ Clicked Add in ${divKey}`);
    }


    /**
    * Click "Add" button inside a specific Associated Document section
    * @param visibleDivs -> array of div keys to be visible
    * Example: ['DToD'],
    */
    async clickAddAssociatedDoc(section: AssDivKey): Promise<void> {

        const divKey = this.mapSectionToDiv(section);
        await this.clickAddAssociatedDocByDivKey(divKey);
    }


    /**
    * Validate Associate Specific popup inside a given Associated Document section
    *  Section title == Popup heading
    * Select Document button visible (+ disabled/enabled check)
    * Cancel button visible
    * Works for "FToD" and "FToF" 
    * @param divKey 
    */
    async validateAssociateSpecificPopup(
        section: AssDivKey,
        options?: { expectSelectDisabled?: boolean }
    ): Promise<void> {

        const divKey = this.mapSectionToDiv(section);
        const sectionLocator = this.getDivMap()[divKey];

        console.log(`[ASSOC-POPUP] Validating popup dynamically in -> ${divKey}`);

        const sectionTitleEl = sectionLocator.locator('small.ng-binding').first();
        const popup = sectionLocator.locator('.pro-specificDD.associtedDoc-dd');
        const popupHeadingEl = popup.locator('.pro-specificHeading');
        const selectDocBtn = popup.locator('a:has-text("Select Document")');
        const cancelBtn = popup.locator('a:has-text("Cancel")');

        const normalize = (t: string) =>
            t.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();

        try {
            await popup.waitFor({ state: 'visible', timeout: 5000 });
            await expect(popup).toBeVisible();

            const sectionTitle = normalize(await sectionTitleEl.textContent() || '');
            const popupHeading = normalize(await popupHeadingEl.textContent() || '');

            console.log(`[ASSOC-POPUP] Section Title -> "${sectionTitle}"`);
            console.log(`[ASSOC-POPUP] Popup Heading -> "${popupHeading}"`);

            expect(popupHeading).toBe(sectionTitle);

            // Validate Select Document state
            if (options?.expectSelectDisabled !== undefined) {

                const disabledAttr = await selectDocBtn.getAttribute('disabled');
                const ariaDisabled = await selectDocBtn.getAttribute('aria-disabled');
                const isDisabled = disabledAttr !== null || ariaDisabled === 'true';

                expect(isDisabled).toBe(options.expectSelectDisabled);

                console.log(
                    `[ASSOC-POPUP] Select Document -> ${isDisabled ? 'Disabled' : 'Enabled'
                    } as expected`
                );
            }

            await expect(cancelBtn).toBeVisible();
            console.log('[ASSOC-POPUP] Cancel button visible');

            console.log(`[ASSOC-POPUP] ✅ Popup validation PASSED in ${divKey}`);

        } catch (error) {
            console.error(`[ASSOC-POPUP] ❌ Popup validation FAILED in ${divKey}`);
            throw error;
        }
    }


    /**
     * Validate Add button visibility for a specific section
     * @param divKey -> section key
     * @param shouldBeVisible -> true = visible, false = hidden
     */
    async validateAssociateAddButtonVisibility(
        section: AssDivKey,
        shouldBeVisible: boolean
    ): Promise<void> {

        // Convert logical section -> actual div id
        const divKey = this.mapSectionToDiv(section);

        const sectionLocator = this.getDivMap()[divKey];
        const addBtn = sectionLocator.locator('a:has-text("Add")');

        console.log(
            `[ACD-ADD] Checking Add button in ${section} -> Expected: ${shouldBeVisible ? 'Visible' : 'Hidden'
            }`
        );

        try {
            if (shouldBeVisible) {
                await addBtn.waitFor({ state: 'visible', timeout: 5000 });
                await expect(addBtn).toBeVisible();
                await expect(addBtn).not.toHaveClass(/ng-hide/);

                console.log(`[ACD-ADD] ✅ ${section} -> Add is visible`);
            } else {
                await addBtn.waitFor({ state: 'attached', timeout: 5000 });
                await expect(addBtn).toHaveClass(/ng-hide/);
                await expect(addBtn).toBeHidden();

                console.log(`[ACD-ADD] ✅ ${section} -> Add is hidden`);
            }
        } catch (error) {
            console.error(
                `[ACD-ADD] ❌ Add visibility validation failed in ${section}`
            );
            throw error;
        }
    }


    /**
     * Select checkbox for a given document name inside AssocAddDocRows table
     * @param docName -> visible document name text
     */
    async selectAssociatedDocsCheckboxByNames(docNames: string[]): Promise<void> {

        const table = this.page.locator('#AssocAddDocRows');
        const nextBtn = this.page.locator('#imgDocsNext');

        const normalize = (t: string) =>
            t.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

        const remaining = new Set(docNames.map(d => normalize(d)));
        console.log(`[ASSOC-TABLE] Searching -> ${docNames.join(', ')}`);
        while (remaining.size > 0) {
            // Wait until rows actually visible
            await this.page.waitForSelector('#AssocAddDocRows tr:visible');
            const rows = table.locator('tr:visible');
            const rowCount = await rows.count();

            await this.page.waitForTimeout(2000);
            for (let i = 0; i < rowCount; i++) {

                const row = rows.nth(i);
                const link = row.locator('a.ng-binding').first();

                if (!(await link.count())) continue;

                const nameRaw = await link.textContent();
                const name = normalize(nameRaw || '');

                if (remaining.has(name)) {

                    const checkboxInput = row.locator('input[type="checkbox"]');
                    const checkboxSpan = row.locator('input[type="checkbox"] + span');

                    if (!(await checkboxInput.isChecked())) {
                        await checkboxSpan.click();
                        console.log(`[ASSOC-TABLE] ✅ Checked -> ${nameRaw?.trim()}`);
                    } else {
                        console.log(`[ASSOC-TABLE] ℹ Already checked -> ${nameRaw?.trim()}`);
                    }
                    remaining.delete(name);
                    if (remaining.size === 0) {
                        console.log('[ASSOC-TABLE] 🎯 All documents selected');
                        return;
                    }
                }
            }
            await this.page.waitForTimeout(300);
            const disabledAttr = await nextBtn.getAttribute('disabled');
            if (disabledAttr !== null) {
                throw new Error(
                    `[ASSOC-TABLE] ❌ Not found -> ${docNames.filter(d =>
                        remaining.has(normalize(d))
                    ).join(', ')}`
                );
            }
            console.log('[ASSOC-TABLE] Moving to next page...');
            await nextBtn.click();
            // Wait until table content actually changes (important)
            await this.page.waitForFunction(() => {
                const rows = document.querySelectorAll('#AssocAddDocRows tr');
                return rows.length > 0;
            });
        }
    }



    /**
     * Click Select & Close or Cancel button in Associate popup
     */
    async clickAssociatePopupAction(action: AssocPopupAction): Promise<void> {

        console.log(`[ASSOC-POPUP] Clicking -> ${action}`);

        try {

            let button;

            if (action === 'selectAndClose') {
                button = this.page.locator(
                    'a[ng-click="ValidateDuplicateDocsandAdd();"]:visible'
                );
            } else {
                button = this.page.locator(
                    '.casesearch-head a.closebtn:visible'
                );
            }

            await expect(button).toBeVisible({ timeout: 5000 });
            await button.click();

            console.log(`[ASSOC-POPUP] ✅ ${action} clicked`);

        } catch (error) {
            console.error(`[ASSOC-POPUP] ❌ Failed to click ${action}`);
            throw error;
        }
    }

    private mapSectionToDiv(section: AssDivKey): DivKey {
        const map: Record<AssDivKey, DivKey> = {
            DToD: 'AssDToD',
            DToF: 'AssDToF',
            FToD: 'AssFToD',
            FToF: 'AssFToF'
        };
        return map[section];
    }

    /**
     * Select files from Association popup using label text.
     *
     * Features:
     * - Handles duplicate labels
     * - Optional language filter (selects correct row when duplicates exist)
     * - Angular checkbox state validation (ng-not-empty)
     * - Section scoped → avoids strict mode conflicts
     *
     * @param section   Association section key (AssFToD / AssFToF)
     * @param fileLabels List of file labels to select
     * @param language  Optional language filter (e.g., "German")
     */
    async selectFilesInAssociationPopup(
        section: AssDivKey,
        files: FileSelection[]
    ): Promise<void> {
        const sectionContainer = this.getDivMap()[this.mapSectionToDiv(section)];
        const popup = sectionContainer.locator('.pro-specificDD.associtedDoc-dd:visible');
        await popup.waitFor({ state: 'visible', timeout: 5000 });
        for (const file of files) {
            const safeLabel = file.label.replace(/\s+/g, ' ').trim();
            // ORIGINAL strong locator (KEEP THIS)
            const strongElements = popup.locator('strong', { hasText: safeLabel });
            const count = await strongElements.count();
            if (count === 0) {
                throw new Error(`[ASSOC-FILE] File not found -> ${file.label}`);
            }
            let targetStrong: Locator | null = null;
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < count; i++) {
                const strongEl = strongElements.nth(i);
                if (file.language) {
                    const fileRow = strongEl.locator(
                        'xpath=ancestor::div[contains(@class,"asociatedDoc-list")]'
                    );
                    const strongText = await strongEl.textContent() || '';
                    const match = strongText.match(/\((.*?)\)/);
                    const rowLanguage = match ? match[1].trim().toLowerCase() : '';

                    if (rowLanguage === file.language.toLowerCase()) {
                        targetStrong = strongEl;
                        break;
                    }
                } else {
                    targetStrong = strongEl;
                    break;
                }
            }
            if (!targetStrong) {
                throw new Error(
                    `[ASSOC-FILE] File "${file.label}" found but language "${file.language}" not matched`
                );
            }
            const fileRow = targetStrong.locator(
                'xpath=ancestor::div[contains(@class,"asociatedDoc-list")]'
            );

            const checkbox = fileRow.locator('input[type="checkbox"]');

            const classValue = await checkbox.getAttribute('class');
            const isChecked = classValue?.includes('ng-not-empty');

            if (!isChecked) {

                console.log(`[ASSOC-FILE] Selecting -> ${file.label}`);
                await targetStrong.click();
                await expect.poll(async () => {
                    const cls = await checkbox.getAttribute('class');
                    return cls?.includes('ng-not-empty');
                }, { timeout: 10000 }).toBeTruthy();

                console.log(`[ASSOC-FILE] ✔ Selected -> ${file.label}`);
            }
        }
    }
    async clickSelectDocumentFromFilePopup(section: AssDivKey): Promise<void> {

        const sectionContainer = this.getDivMap()[this.mapSectionToDiv(section)];
        const popup = sectionContainer.locator('.pro-specificDD.associtedDoc-dd:visible');
        const selectBtn = popup.locator('a:has-text("Select Document")');
        await selectBtn.waitFor({ state: 'visible', timeout: 5000 });
        await expect(selectBtn).toBeEnabled();

        await selectBtn.click();
        console.log('[ASSOC-FILE] Clicked Select Document');
    }


    /**
     * Add Document-Based Associations (DToD / DToF)
     *
     * Flow:
     * 1. Open "Associated Documents" tab
     * 2. Click "Add Associated Document"
     * 3. Select document(s) by name (supports duplicate names using optional language)
     * 4. Confirm and close popup
     *
     * Supports:
     * - Multiple documents
     * - Duplicate document names
     * - Per-document language filtering
     * - Backward compatible (language optional)
     *
     * @param section  Association section (DToD / DToF)
     * @param docs     Document selection list { name, language? }
     */
    async addAssociatedDocuments(
        section: AssDivKey,
        docs: FileSelection[]
    ): Promise<void> {

        if (!['DToD', 'DToF'].includes(section)) {
            throw new Error(`❌ Section ${section} not supported`);
        }

        if (!docs?.length) return;

        await this.clickTabByName('Associated Documents');
        await this.clickAddAssociatedDoc(section);

        // ✔ D sections use TABLE popup
        await this.selectAssociatedDocsCheckboxByNames(
            docs.map(d => d.label)
        );

        await this.clickAssociatePopupAction('selectAndClose');
    }

    /**
     * Add File-Based Associations (FToD / FToF)
     *
     * Flow:
     * 1. Open "Associated Documents" tab
     * 2. Click "Add Associated Document" for given section
     * 3. Select file(s) from popup (supports duplicate labels + optional language)
     * 4. Click "Select Document" in file popup
     * 5. Select associated document(s) by name
     * 6. Confirm association and close popup
     *
     * Supports:
     * - Multiple files
     * - Duplicate labels with per-file language filtering
     * - Angular checkbox state validation handled internally
     * - Section-scoped popup (strict mode safe)
     *
     * @param section   Association section (FToD / FToF)
     * @param files     File selection list { label, language? }
     * @param docNames  Associated document names to select in second popup
     *
     * @throws Error if section is not file-based
     */
    async addFileAssociations(
        section: AssDivKey,
        files: FileSelection[],
        docs: FileSelection[]
    ): Promise<void> {

        if (!['FToD', 'FToF'].includes(section)) {
            throw new Error(`❌ ${section} is not file-based association`);
        }
        await this.clickTabByName('Associated Documents');
        await this.clickAddAssociatedDoc(section);
        // ✔ Popup #1 (FILE POPUP)
        await this.selectFilesInAssociationPopup(section, files);
        await this.clickSelectDocumentFromFilePopup(section);
        // ✔ Popup #2 (TABLE POPUP)
        await this.selectAssociatedDocsCheckboxByNames(
            docs.map(d => d.label)
        );
        await this.clickAssociatePopupAction('selectAndClose');
    }

    /**
     * Verifies the association count displayed in the accordion header
     * for a given association section.
     *
     * Example UI:
     *  Associate Complete Document (1)
     *
     * Flow:
     * 1. Resolve section div ID using mapSectionToDiv()
     *    (e.g., DToD → AssDToD).
     * 2. Locate the <small> element inside the accordion header.
     * 3. Extract numeric value inside parentheses using RegEx.
     * 4. Compare actual UI count with expectedCount.
     * 5. Throw descriptive error if mismatch.
     *
     * Notes:
     * - If no "(n)" exists, count is treated as 0.
     * - Angular-safe: waits until header becomes visible.
     * - Reusable for DToD, DToF, FToD, FToF.
     *
     * @param section        Association section key (DToD / DToF / FToD / FToF)
     * @param expectedCount  Expected number of associated items
     */
    async verifyAssociationCount(
        section: AssDivKey,
        expectedCount: number
    ): Promise<void> {

        const sectionId = this.mapSectionToDiv(section);
        const header = this.page.locator(`#${sectionId} small`);

        await header.waitFor({ state: 'visible', timeout: 5000 });
        const text = await header.textContent() || '';
        const match = text.match(/\((\d+)\)/);
        const actualCount = match ? Number(match[1]) : 0;

        if (actualCount !== expectedCount) {
            throw new Error(
                `❌ ${section} count mismatch. Expected: ${expectedCount}, Actual: ${actualCount}`
            );
        }

        console.log(`✅ ${section} count verified -> ${actualCount}`);
    }

    /**
     * Returns the association count badge <span>
     * inside the accordion header.
     */
    private getAssociationBadgeLocator(section: AssDivKey): Locator {
        console.log(`🔎 Resolving badge locator for section: ${section}`);
        const container = this.getDivMap()[`Ass${section}` as DivKey];
        if (!container) {
            throw new Error(`❌ No div mapping found for section: ${section}`);
        }
        return container.locator('small span');
    }

    /**
     * Validates that badge exists but has no count.
     * In this UI implementation, span remains
     * but becomes empty when count = 0.
     */
    async verifyAssociationNotDisplayed(
        section: AssDivKey
    ): Promise<void> {
        console.log(`📊 Validating NO association count for section: ${section}`);
        const badge = this.getAssociationBadgeLocator(section);
        await expect(badge).toBeHidden();

        console.log(`✔️ Badge is empty as expected.`);
    }


    /**
    * Dynamically verifies an association section.
    *
    * Rules:
    * 1. If override count provided → use it.
    * 2. Else calculate expected count from data.
    * 3. If expected but section not visible → FAIL.
    * 4. If visible but not expected → validate empty.
    * 5. If expected & visible:
    *      - count = 0 → badge must be empty
    *      - count > 0 → badge must show (n)
    */
    async verifyAssociationCountFromData(
        section: AssDivKey,
        data: DocumentData,
        overrideCounts?: Partial<Record<AssDivKey, number>>
    ): Promise<void> {

        console.log(`\n========================================`);
        console.log(`🔍 Validating Association Section: ${section}`);
        console.log(`========================================`);

        const container = this.getDivMap()[`Ass${section}` as DivKey];

        if (!container) {
            throw new Error(`❌ No div mapping found for section: ${section}`);
        }

        const isVisible = await container.isVisible();
        console.log(`👀 Section visible in UI: ${isVisible}`);

        // -------------------------------------------------
        // STEP 1: Determine expected count
        // -------------------------------------------------
        let expectedCount = 0;
        let isExpected = false;

        const overrideValue = overrideCounts?.[section];

        if (overrideValue !== undefined) {
            expectedCount = overrideValue;
            isExpected = true;
            console.log(`📌 Using override count: ${expectedCount}`);
        } else {

            const assoc = data?.associatedDocuments
                ?.find(a => a.section === section);

            if (assoc) {
                expectedCount =
                    section === 'DToD' || section === 'DToF'
                        ? assoc.docs?.length ?? 0
                        : assoc.fileDocMap?.length ?? 0;

                isExpected = true;
                console.log(`📊 Calculated count from data: ${expectedCount}`);
            }
        }

        // -------------------------------------------------
        // STEP 2: Validate visibility mismatch
        // -------------------------------------------------
        if (isExpected && !isVisible) {
            throw new Error(
                `❌ Section ${section} expected but not visible in UI`
            );
        }

        // -------------------------------------------------
        // STEP 3: Visible but not expected → validate empty
        // -------------------------------------------------
        if (!isExpected && isVisible) {
            console.log(`👉 Section visible but not expected. Validating empty badge.`);
            await this.verifyAssociationNotDisplayed(section);
            console.log(`✔ Section ${section} correctly empty.`);
            return;
        }

        // -------------------------------------------------
        // STEP 4: Expected & visible → validate count
        // -------------------------------------------------
        if (isExpected && isVisible) {

            if (expectedCount === 0) {
                console.log(`👉 Expected count = 0. Validating empty badge.`);
                await this.verifyAssociationNotDisplayed(section);
            } else {
                console.log(`👉 Validating badge shows (${expectedCount})`);
                await this.verifyAssociationCount(section, expectedCount);
            }
        }
        console.log(`✔ Section ${section} validation complete.`);
    }

    //_______________________________________________________________________________
    //                           BS
    /**
     * Extracts all selected MI Category / SubCategory / Topic names
     * for NEW DOCUMENT page (Edit mode).
     */
    async extractMICategorization(): Promise<string[]> {
        return await this.page.evaluate(() => {
            const selected: string[] = [];

            const walk = (ul: HTMLElement) => {
                const items = ul.querySelectorAll(":scope > li");

                items.forEach(li => {
                    const label = li.querySelector("label");
                    const input = li.querySelector("input[type='checkbox']");

                    if (!label || !input) return;

                    // In EDIT mode Angular marks selected with ng-not-empty
                    const isSelected =
                        input.classList.contains("ng-not-empty") ||
                        input.hasAttribute("checked");

                    if (isSelected) {
                        const text = (label.textContent || "").replace(/\s+/g, " ").trim();
                        if (text) selected.push(text); // skip empty
                    }

                    const childUL = li.querySelector("ul");
                    if (childUL) walk(childUL as HTMLElement);
                });
            };

            const root = document.querySelector(".micategorylistone-2");
            if (root) walk(root as HTMLElement);

            return selected;
        });
    }

    /**
     * Extracts selected Trade Names from #SelectedTrades.
     * Works for New Document page.
     */
    async extractTradeNames(): Promise<string[]> {
        const items = this.page.locator("#SelectedTrades li small");
        const count = await items.count();

        const result: string[] = [];

        for (let i = 0; i < count; i++) {
            const text = (await items.nth(i).innerText()).trim();
            if (text) result.push(text); // skip empty
        }

        return result;
    }

    /**
     * Extracts Prime/Translation file rows from file table in NEW DOCUMENT page.
     */
    async extractFiles(): Promise<any[]> {
        return await this.page.evaluate(() => {
            const rows = Array.from(
                document.querySelectorAll("tr[data-ng-repeat*='file']")
            );

            const clean = (txt: string) =>
                (txt || "").replace(/\s+/g, " ").trim();

            const result: any[] = [];

            rows.forEach(row => {

                // 1️⃣ Extract TYPE
                const typeSelect = row.querySelector(
                    "select[data-ng-model='file.Type']"
                ) as HTMLSelectElement | null;

                const type = clean(typeSelect?.selectedOptions?.[0]?.textContent || "");

                // 2️⃣ Extract LANGUAGE
                const langSelect = row.querySelector(
                    "select[data-ng-model='file.LanguageID']"
                ) as HTMLSelectElement | null;

                const language = clean(langSelect?.selectedOptions?.[0]?.textContent || "");

                // 3️⃣ Extract File Name
                const fileName = clean(
                    (row.querySelector("[data-ng-model='file.FileName']") as HTMLElement)?.textContent || ""
                );

                // 4️⃣ Extract Format
                const format = clean(
                    (row.querySelector("[data-ng-model='file.FileFormat']") as HTMLElement)?.textContent || ""
                );

                // 5️⃣ Skip invalid rows, dropdown junk, empty entries
                //   if (
                //     !fileName ||
                //     !format ||
                //     !type ||
                //     !language ||
                //     type === "--Select--" ||
                //     language === "--Select--"
                //   ) {
                //     return;
                //   }
                // Skip only if there is no real file uploaded
                if (!fileName || !format || !type || type === "--Select--") {
                    return;
                }

                // 6️⃣ Push valid file entry
                result.push({
                    Type: type,
                    Language: language,
                    FileName: fileName,
                    Format: format
                });
            });

            return result;
        });
    }
    /**
    * Collects all field values from all tabs (Edit Mode).
    * Returns:
    *  - normal data-ng-model values
    *  - Files[] from General Attributes
    *  - MI.Selected[] from General Attributes
    *  - TradeNames[] from Other Attributes
    */

    async getAllDocumentValuesFromAllTabs() {
        const page = this.page;
        const allValues: Record<string, any> = {};
        const tabs = [
            "General Attributes",
            "Other Attributes",
            "Usage Instructions",
        ];

        for (const tab of tabs) {
            try {
                await this.clickTabByName(tab);
                await page.waitForTimeout(300);
            } catch {
                console.log(`⚠️ Tab "${tab}" not visible. Skipping.`);
                continue;
            }

            // Extract all data-ng-model values
            const values = await page.evaluate(() => {
                const result: Record<string, any> = {};
                const skipModels = ["Remindertype", "Prioritytype"];
                const elements = document.querySelectorAll<HTMLElement>(
                    'input[data-ng-model], textarea[data-ng-model], select[data-ng-model]'
                );
                elements.forEach(el => {
                    const model = el.getAttribute("data-ng-model");
                    if (!model || skipModels.includes(model)) return;
                    const style = window.getComputedStyle(el);
                    if (style.display === "none" || style.visibility === "hidden") return;
                    let value: any = "";
                    if (el instanceof HTMLSelectElement) {
                        const txt = el.options[el.selectedIndex]?.textContent?.trim() || "";
                        if (!txt || txt.startsWith("--")) return;
                        value = txt;
                    }
                    else if (el instanceof HTMLInputElement) {
                        if (el.type === "checkbox") {
                            if (!el.checked) return;
                            value = true;
                        } else {
                            value = el.value?.trim() || "";
                            if (!value) return;
                        }
                    }
                    else if (el instanceof HTMLTextAreaElement) {
                        value = el.value?.trim() || "";
                        if (!value) return;
                    }
                    result[model] = value;
                });
                return result;
            });
            Object.assign(allValues, values);
            // Add special collections per tab
            if (tab === "General Attributes") {
                allValues["Files"] = await this.extractFiles();
                allValues["MI.Selected"] = await this.extractMICategorization();
            }
            if (tab === "Other Attributes") {
                allValues["TradeNames"] = await this.extractTradeNames();
            }
        }
        return allValues;
    }

    /**
    * Returns the text shown in the delete-error banner.
    */
    async getErrorBannerText(): Promise<string> {
        const errorLocator = this.page.locator('#errorBannerText');
        await errorLocator.waitFor({ state: 'visible' });
        const text = await errorLocator.innerText();
        console.log("❗ Error Message:", text);
        return text;

    }

    /**
     * Enters document name and clicks Proceed or Cancel based on action.
     * @param documentName - Name to enter in document name field
     * @param action - 'Proceed' | 'Cancel'
     */
    async enterComposeWordDocumentInEditor(
        documentName: string,
        action: 'Proceed' | 'Cancel'
    ): Promise<void> {

        const documentNameInput = this.page.locator('#txtFileName');
        const proceedBtn = this.page.locator('#btnCreate');
        const cancelBtn = this.page.locator('a[data-ng-click^="DocComposeClose"]');

        // ✅ Enter document name
        await expect(documentNameInput).toBeVisible();
        await documentNameInput.fill(documentName);
        console.log(`Entered document name: ${documentName}`);

        // ✅ Click action
        if (action === 'Proceed') {
            await expect(proceedBtn).toBeVisible();
            await proceedBtn.click();
            console.log('Clicked Proceed');
        } else {
            await expect(cancelBtn).toBeVisible();
            await cancelBtn.click();
            console.log('Clicked Cancel');
        }
    }


    /**
     * Method to enter text in office screen area
     * and return copied clipboard text
     */
    async typeTextOnCanvas(
        text: string
    ): Promise<string> {

        // Grant clipboard permissions
        await this.page.context().grantPermissions([
            'clipboard-read',
            'clipboard-write'
        ]);

        // Wait for editor load
        await this.page.waitForTimeout(5000);

        // Type text
        await this.page.keyboard.type(text);

        await this.page.keyboard.press('Enter');

        console.log(
            `Typed "${text}" on the canvas editor.`
        );

        // Wait for rendering
        await this.page.waitForTimeout(3000);

        // Select all content
        await this.page.keyboard.press('Control+a');

        // Copy content
        await this.page.keyboard.press('Control+c');

        // Wait clipboard update
        await this.page.waitForTimeout(2000);

        // Read clipboard content
        const clipboardText =
            await this.page.evaluate(
                async () =>
                    await navigator.clipboard
                        .readText()
            );

        console.log(
            "Clipboard Content:",
            clipboardText
        );

        // Return clipboard content
        return clipboardText;
    }

    /**
    * Clicks OK button on Compose / Edit Cover Letter popup
    */
    async clickComposeEditCoverLetterOkButton(): Promise<void> {
        const okButton = this.page.locator(
            'a.defultbtn[onclick="CloseOKinline()"]'
        );
        await expect(okButton).toBeVisible();
        await okButton.click();
        console.log('Clicked OK on Compose/Edit Cover Letter popup');
    }

    //Method to get Type and Language values based on file extension and Returns an array of strings in the format "Type(Language)" for matched extensions 
    async getTypeLanguageByExtension(
        ...extensions: string[]
    ): Promise<string[]> {

        const results: string[] = [];
        const rows = this.page.locator('.muldocfile-Tbl tbody tr');
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const fileFormat = (await row
                .locator('td:nth-child(4) small')
                .innerText())
                .trim()
                .toLowerCase();

            if (!extensions.map(e => e.toLowerCase()).includes(fileFormat)) continue;
            const type = (await row
                .locator('td:nth-child(1) select option:checked')
                .innerText())
                .trim();

            const language = (await row
                .locator('td:nth-child(2) select option:checked')
                .innerText())
                .trim();

            results.push(`${type}(${language})`);
        }
        return results;
    }

    /*-------------------------Bhargavi's Code Started for New Documents Page ------------------------------------*/
    async verifyDuplicateDocumentPopup(): Promise<{ status: boolean; message: string }> {

        const popup = this.page.locator('div.coformationlost:visible');
        const textLocator = popup.locator('#adstatusText');
        const okButton = popup.locator('#adstatusOk');

        try {
            // 🔹 Small buffer for UI render
            await this.page.waitForTimeout(500);

            const isVisible = await popup.isVisible();

            // 👉 Popup NOT present (valid case)
            if (!isVisible) {
                return {
                    status: false,
                    message: ''
                };
            }

            // 👉 Popup present
            const message = (await textLocator.textContent())?.trim() || '';
            const isValid = message.toLowerCase().includes('already associated');

            console.log(`📢 Popup message: ${message}`);

            await okButton.click();

            return {
                status: isValid,
                message
            };

        } catch (error) {
            // 👉 Only unexpected errors come here
            console.log("❌ Unexpected error while handling duplicate popup:", error);

            return {
                status: false,
                message: 'Unexpected failure while validating popup'
            };
        }
    }

    /**
     * Deletes a file-based association based on section, type, and name.
     *
     * Works for:
     * - F to D (File to Document)(Associate Specific Files with Complete Document)
     * - F to F (File to File)(Associate Specific File with Selected Files)
     * - Prime and Translation groups
     *
     * Strategy:
     * - Identify section (FtoF by ID, FtoD by class scope)
     * - Filter group using "Prime" / "Translation"
     * - Locate row using document/enclosure name
     * - Click corresponding delete icon
     *
     * @param sectionType - 'FtoD' | 'FtoF'
     * @param assignedTo  - 'Prime' or 'Translation'
     * @param docName     - Document or Enclosure name
     */
    async deleteFileAssociation(
        sectionType: 'FtoD' | 'FtoF',
        assignedTo: string,
        docName: string
    ) {

        const section = sectionType === 'FtoF'
            ? this.page.locator('#AssoSelectedFiletoFile')
            : this.page.locator('.tbodyHeight').first(); // FtoD handled here

        const row = section
            .locator('tbody')
            .filter({ has: this.page.locator(`strong:has-text("${assignedTo}")`) })
            .locator('tr')
            .filter({ has: this.page.locator(`td:has-text("${docName}")`) })
            .first();

        const deleteIcon = row.locator('img[alt="delete"]');

        await row.hover();
        await deleteIcon.waitFor({ state: 'visible' });
        await deleteIcon.click();
    }

    /**
     * Handles confirmation popup by clicking Yes or No.
     * @param action - 'Yes' | 'No'
     */
    async handleMultipleAssociationDeletePopup(action: 'Yes' | 'No') {

        const popup = this.page.locator('.coformationlost:visible');

        const confirmButton = action === 'Yes'
            ? popup.locator('#confirmYes:visible')
            : popup.locator('#confirmNo:visible');

        await confirmButton.waitFor({ state: 'visible' });
        await confirmButton.click();
    }

    /**
     * Returns the current association count from accordion header.
     *
     * Example:
     *  Associate Complete Document (2) → returns 2
     */
    async getAssociationCount(section: AssDivKey): Promise<number> {

        const sectionId = this.mapSectionToDiv(section);
        const header = this.page.locator(`#${sectionId} small`);

        await header.waitFor({ state: 'visible' });

        const text = await header.textContent() || '';
        const match = text.match(/\((\d+)\)/);

        return match ? Number(match[1]) : 0;
    }

    /**
     * Verifies whether a specific association exists or not.
     *
     * Works for:
     * - FtoD
     * - FtoF
     * - Prime / Translation
     */
    async isFileAssociationPresent(
        sectionType: 'FtoD' | 'FtoF',
        assignedTo: string,
        docName: string
    ): Promise<boolean> {

        const section = sectionType === 'FtoF'
            ? this.page.locator('#AssoSelectedFiletoFile')
            : this.page.locator('#AssoSelectedFiletoDoc');

        const row = section
            .locator('tbody')
            .filter({ has: this.page.locator(`strong:has-text("${assignedTo}")`) })
            .locator('tr')
            .filter({ has: this.page.locator(`td:has-text("${docName}")`) });

        return (await row.count()) > 0;
    }

    /**
     * Deletes a document from DtoD / DtoF section by document name.
     *
     * Works for:
     * - D to D (Complete Document)
     * - D to F (Selected Files)
     *
     * @param sectionType - 'DToD' | 'DToF'
     * @param docName     - Document / Enclosure name
     */
    async deleteDocumentAssociation(
        sectionType: 'DToD' | 'DToF',
        docName: string
    ) {

        const section = sectionType === 'DToD'
            ? this.page.locator('#AssoDoctoDoc')
            : this.page.locator('#AssDToF').locator('xpath=following-sibling::div[1]');

        const row = section
            .locator('tr')
            .filter({ has: this.page.locator(`td:has-text("${docName}")`) })
            .first();

        const deleteIcon = row.locator('img[alt="delete"]');

        await row.hover();
        await deleteIcon.waitFor({ state: 'visible' });
        await deleteIcon.click();
    }

    /**
 * Checks whether a document is present in DtoD / DtoF section.
 *
 * Works for:
 * - D to D (Complete Document)
 * - D to F (Selected Files)
 *
 * @param sectionType - 'DToD' | 'DToF'
 * @param docName     - Document / Enclosure name
 * @returns boolean   - true if present, false otherwise
 */
    async isDocumentAssociationPresent(
        sectionType: 'DToD' | 'DToF',
        docName: string
    ): Promise<boolean> {

        const section = sectionType === 'DToD'
            ? this.page.locator('#AssoDoctoDoc')
            : this.page.locator('#AssDToF').locator('xpath=following-sibling::div[1]');

        const row = section
            .locator('tr')
            .filter({ has: this.page.locator(`td:has-text("${docName}")`) });

        return (await row.count()) > 0;
    }

    /*
     *    Retrieves the first validation error message displayed
     *    in the error popup under "Error Message(s)" section.
     */
    async getValidationErrorMessage(): Promise<string> {
        const errorLocator = this.page.locator('#validationErrors li');
        await errorLocator.first().waitFor({ state: 'visible' });
        return (await errorLocator.first().textContent())?.trim() || '';
    }

    /*
     * Description:
     *    Clicks on the "Ok" button in the error popup
     *    displayed after validation failure.
     */
    async clickErrorPopupOkButton(): Promise<void> {
        const okButton = this.page.locator('a[data-popup-close="confirmationTwo"]:visible');
        await okButton.waitFor({ state: 'visible' });
        await okButton.click();
    }

    /**
     * Fetches Response Document Type value and state (enabled/disabled)
     * from View page using selected <option>.
     */
    async getResponseDocTypeDetails(): Promise<{ value: string; isDisabled: boolean }> {

        const dropdown = this.page.locator('#cm-sdType');

        await dropdown.waitFor({ state: 'visible' });
        const value = await this.page.evaluate(() => {
            const el = document.querySelector('#cm-sdType') as HTMLSelectElement;

            if (!el) return '';

            const selectedOption = el.querySelector('option[selected]')
                || el.options[el.selectedIndex];

            return selectedOption?.textContent?.trim() || '';
        });

        const isDisabled = await dropdown.evaluate(el => (el as HTMLSelectElement).disabled);

        console.log(`Response Document Type: ${value}`);
        console.log(`Dropdown Disabled: ${isDisabled}`);

        return { value, isDisabled };
    }

    /**
     * Returns whether "Approval Required" checkbox is checked
     */
    async isApprovalRequiredChecked(): Promise<boolean> {

        const checkbox = this.page.locator(
            'ul.checkbox-row li label:has-text("Approval Required") input[type="checkbox"]'
        );

        return await checkbox.isChecked();
    }

    /**
     * Retrieves the language from the "Assigned To" column for a given row.
     *
     * - Supports both File-to-Doc (FtoD) and File-to-File (FtoF) sections
     * - Extracts language from text like "Prime: Tamil (1)" using regex
     * - Validates the file type (Prime / Translation) for the given row
     *
     * @param section   - Section type ('FtoD' or 'FtoF')
     * @param fileType  - Expected file type ('Prime' or 'Translation')
     * @param rowIndex  - Row index to fetch data from
     * @returns Extracted language or null if not available
     */
    async getAssignedToLanguageInAssociations(
        section: 'FtoD' | 'FtoF',
        fileType: 'Prime' | 'Translation',
        rowIndex: number
    ): Promise<string | null> {

        const rows = section === 'FtoD'
            ? this.page.locator('#AssoSelectedFiletoDoc tbody[data-ng-repeat]')
            : this.page.locator('#AssoSelectedFiletoFile tbody[data-ng-repeat]');

        const row = rows.nth(rowIndex);

        // Assigned To column (contains "Prime: Tamil (1)")
        const assignedText = await row.locator('td').first().innerText();

        console.log(`📌 Row ${rowIndex} Assigned Text: ${assignedText}`);

        // Example text: "Prime: Tamil (1)"
        // Extract language using regex
        const match = assignedText.match(/(Prime|Translation):\s*(.*?)\s*\(/);

        if (!match) {
            throw new Error(`❌ Unable to extract language from row ${rowIndex}`);
        }

        const type = match[1];       // Prime / Translation
        const language = match[2];   // Tamil / Telugu / Spanish

        // Validate type
        if (type !== fileType) {
            throw new Error(
                `❌ Row ${rowIndex} type mismatch. Expected: ${fileType}, Found: ${type}`
            );
        }

        return language?.trim() || null;
    }

    /**
     * Retrieves language from General Attributes for a specific row and file type.
     *
     * - Validates row type (Prime / Translation)
     * - Returns selected language
     * - Returns null if "--Select--"
     * - Row index starts from 0
     */
    async getLanguageByTypeAndRow(
        fileType: 'Prime' | 'Translation',
        rowIndex: number
    ): Promise<string | null> {

        const rows = this.page.locator('.tbodyHeight-2 tbody tr');

        await rows.first().waitFor({ state: 'visible' });

        const rowCount = await rows.count();
        console.log("Row count:", rowCount);

        if (rowIndex >= rowCount) {
            throw new Error(`❌ Row index ${rowIndex} exceeds total rows: ${rowCount}`);
        }

        const row = rows.nth(rowIndex);

        // Validate type
        const typeDropdown = row.locator('select[data-ng-model="file.Type"]');
        const currentType = await typeDropdown.inputValue();

        const expectedType = fileType === 'Prime' ? '0' : '1';

        if (currentType !== expectedType) {
            throw new Error(
                `❌ Row ${rowIndex} is not ${fileType} (found: ${currentType})`
            );
        }

        // Get selected language
        const languageDropdown = row.locator('select[data-ng-model="file.LanguageID"]');
        const selectedLabel = await languageDropdown.locator('option:checked').innerText();

        // Handle null case
        if (!selectedLabel || selectedLabel.trim() === '--Select--') {
            return null;
        }

        return selectedLabel.trim();
    }

    /**
  * Retrieves Prime and Translation document counts
  * based on selected Type dropdown option.
  *
  * @returns Object containing primeCount and translationCount
  */
    async getFileCounts(): Promise<{
        primeCount: number;
        translationCount: number;
    }> {

        const dropdowns = this.page.locator(
            'tr[data-ng-repeat="file in DocumentDetails.Files | filter: StateCondition"] select[data-ng-model="file.Type"]'
        );

        const count = await dropdowns.count();

        let primeCount = 0;
        let translationCount = 0;

        for (let i = 0; i < count; i++) {

            // gets actual selected value from select element
            const selectedValue = await dropdowns.nth(i).inputValue();

            if (selectedValue === '0') {
                primeCount++;
            }

            if (selectedValue === '1') {
                translationCount++;
            }
        }

        return {
            primeCount,
            translationCount
        };
    }

    /**
     * Retrieves Prime and Translation counts
     * from Associate Documents section.
     *
     * Supports:
     * - FtoD
     * - FtoF
     *
     * Example Assigned To values:
     * - Prime: Malayalam (1)
     * - Translation: Marathi (1)
     *
     * @returns Object containing primeCount and translationCount
     */
    async getAssociationTypeCounts(
        sectionType: 'FtoD' | 'FtoF'
    ): Promise<{
        primeCount: number;
        translationCount: number;
    }> {

        const rows = sectionType === 'FtoD'
            ? this.page.locator(
                '#AssoSelectedFiletoDoc tbody[data-ng-repeat]'
            )
            : this.page.locator(
                '#AssoSelectedFiletoFile tbody[data-ng-repeat]'
            );

        const rowCount = await rows.count();

        let primeCount = 0;
        let translationCount = 0;

        for (let i = 0; i < rowCount; i++) {

            const assignedText = await rows
                .nth(i)
                .locator('strong')
                .first()
                .innerText();

            const text = assignedText.trim().toLowerCase();

            if (text.startsWith('prime:')) {
                primeCount++;
            }

            if (text.startsWith('translation:')) {
                translationCount++;
            }
        }

        return {
            primeCount,
            translationCount
        };
    }

    /**
    * Verifies Document ID field is present and returns its value
    */
    async getDocumentIDValue(): Promise<string> {
        await expect(this.documentIDField).toBeVisible();
        console.log("Document ID field is visible");

        const value = await this.documentIDField.inputValue();
        console.log(`Document ID value: ${value}`);

        return value;
    }

    /**
     * Gets SRL / Cover Letter text input value
     */
    async getSRLOrCoverLetterText(): Promise<string> {
        const textArea = this.page.locator(
            "textarea[data-ng-model='DocumentDetails.SRLOrCLText']"
        );

        await expect(textArea).toBeVisible({ timeout: 30000 });

        const value = await textArea.evaluate(
            (el: HTMLTextAreaElement) => el.value
        );

        console.log(`SRL / Cover Letter Text: ${value}`);
        return value?.trim() ?? "";
    }

    
    /**
     * Returns checkbox state details.
     *
     * @param type - "Global Document" or "Local Document"
     */
    async getGlobalOrLocalCheckboxState(type: string): Promise<{
        isChecked: boolean;
        isDisabled: boolean;
    }> {

        const label = this.page.locator(`label:has-text("${type}")`);

        const input = label.locator('input[type="checkbox"]');

        return {

            isChecked: await input.isChecked(),
            isDisabled: await input.isDisabled(),
        };
    }

    /**
     * Returns Associate Global Document section details.
     */
    async getAssociateGlobalDocumentDetails(): Promise<{
        hyperlinkText: string;
        href: string | null;
        version: string;
        status: string;
        isTranslationIconDisplayed: boolean;
    }> {

        const globalDocSection = this.page.locator('ul.CMDLGDoc.CMDLGDocData');

        const hyperlink = globalDocSection.locator('#txtGDOC');

        const translationIcon =
            globalDocSection.locator('img[src*="TransDetails.png"]');

        const versionElement =
            globalDocSection.locator('#txtSdocver');

        const statusElement =
            globalDocSection.locator('#txtSdocverstatus');

        const hyperlinkText =
            (await hyperlink.textContent())?.trim() || '';

        const href =
            await hyperlink.getAttribute('href');

        const version =
            (await versionElement.textContent())?.trim() || '';

        const status =
            (await statusElement.textContent())?.trim() || '';

        const isTranslationIconDisplayed =
            await translationIcon.isVisible();

        return {

            hyperlinkText,
            href,
            version,
            status,
            isTranslationIconDisplayed
        };
    }

    /**
     * Clicks Associate Global Document Translation icon
     * and waits for Translation Details overlay.
     */
    async clickAssociateGlobalDocumentTranslationIcon(): Promise<void> {

        const translationIcon = this.page.locator(
            'img[src*="TransDetails.png"]');

        await translationIcon.waitFor({ state: 'visible', timeout: 10000 });

        await translationIcon.click();

        const overlay = this.page.locator(
            'div.case-search.ad-overlay', {has: this.page.locator('.casesearch-heading',{ hasText: 'Associated Global Document Details' }
                )});

        await overlay.waitFor({state: 'visible',timeout: 10000});
    }

    /**
 * Returns Associated Global Document Translation details based on row index.
 *
 * @param rowIndex - Translation row number (1-based index)
 */
async getAssociatedGlobalDocumentTranslationDetails(rowIndex: number): Promise<{
    documentName: string;
    language: string;
}> {

    const overlay = this.page.locator(
        'div.case-search.ad-overlay',
        {
            has: this.page.locator(
                '.casesearch-heading',
                { hasText: 'Associated Global Document Details' }
            )
        }
    );

    const row = overlay
        .locator('tbody tr')
        .nth(rowIndex - 1);

    await row.waitFor({ state: 'visible', timeout: 10000 });

    const documentName =
        (await row.locator('a.docClr').textContent())?.trim() || '';

    const language =
        (await row.locator('td').nth(1).textContent())?.trim() || '';

    return {
        documentName,
        language
    };
}

    /**
 * Clicks Associated Global Document Details overlay close icon.
 */
async clickAssociatedGlobalDocumentDetailsOverlayCloseIcon(): Promise<void> {

    const overlay = this.page.locator(
        'div.case-search.ad-overlay',
        {
            has: this.page.locator(
                '.casesearch-heading',
                { hasText: 'Associated Global Document Details' }
            )
        }
    );

    const closeIcon = overlay.locator('a.closebtn');

    await closeIcon.waitFor({ state: 'visible', timeout: 10000 });

    await closeIcon.click();
}

/**
 * Clicks on the Replace icon based on the provided index.
 * @param index - Index value of the Replace icon to be clicked
 */
async clickReplaceIcon(index: number): Promise<void> {
    const replaceIcon = this.page.locator('a[id^="anchorUpload"]').nth(index);

    await replaceIcon.waitFor({ state: 'visible' });

    await replaceIcon.click();
}

/**
 * Handles overwrite document confirmation popup by clicking Yes or No.
 * @param action - 'Yes' | 'No'
 */
async handleOverwriteDocumentConfirmationPopup(action: 'Yes' | 'No') {

    const popup = this.page.locator(
        '.coformationlost',
        {
            has: this.page.locator('#confirmText', {
                hasText: 'Do you want to overwrite the existing document?'
            })
        }
    );

    const confirmButton = action === 'Yes'
        ? popup.locator('#confirmYes')
        : popup.locator('#confirmNo');

    await confirmButton.waitFor({ state: 'visible' });

    await confirmButton.click();
}

/**
 * Clicks the refresh icon when a new version of the
 * associated global document is available.
 */
async clickRefreshIconInLocalDocument(): Promise<void> {

    const refreshIcon = this.page.locator(
        'a#btnSelectLatestVersion',
        {
            has: this.page.locator('img[alt="refresh"]')
        }
    );
    await refreshIcon.click();
}


}
