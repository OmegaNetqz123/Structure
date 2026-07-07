import { Locator, Page } from "@playwright/test"

// 1. Date Fields Selection Function

export async function DateSelection(year: string, month: string, date: string, page: Page) {
    await page.locator('.ui-datepicker-year').selectOption({ label: year });
    await page.locator('.ui-datepicker-month').selectOption({ label: month });

    const allCells: Locator[] = await page.locator('.ui-datepicker-calendar tbody td a').all();
    let dateFound = false;

    for (const cell of allCells) {
        const cellText = (await cell.innerText()).trim();
        if (cellText === date) {
            await cell.click();
            dateFound = true;
            break;
        }
    }

    if (!dateFound) {
        throw new Error(`DateSelection: Date "${date}" not found in calendar for ${month} ${year}.`);
    }

}

// 2. Dropdown fields selection function

export async function Dprowdown(field: Locator, lab: string) {
    await field.selectOption({ label: lab });
}

//3. Country field selection function from Push Head(Only top 100 values can be selected)

export async function Country(field: Locator, list: Locator, lab: string) {
    await field.dblclick();
    await list.getByText(lab).click();
}

//4. Trade Name selection function from Product Search Overlay

export async function TradeNameSelection(field: Locator, name: string,
    slct: Locator, list: Locator) {

    await field.click();
    await list.getByText(name, { exact: true }).click();
    await slct.click();

}


//5. For Processing wait Times

export async function visible40(ele:Locator) {
    await ele.waitFor({state:"visible", timeout:40000})
}

export async function visible60(ele:Locator) {
    await ele.waitFor({state:"visible", timeout:60000})
}

export async function waitForProcessingToFinish(page: Page) {
    //const processing = page.getByText('Processing...');
    // Wait until none of the matched elements are visible
    await page.waitForFunction(() => {
        const els = Array.from(document.querySelectorAll('span'))
            .filter(el => el.textContent?.trim() === 'Processing...');
        return els.every(el => {
            const style = window.getComputedStyle(el);
            return style.display === 'none' || style.visibility === 'hidden' || el.offsetParent === null;
        });
    }, { timeout: 60000 });
}
