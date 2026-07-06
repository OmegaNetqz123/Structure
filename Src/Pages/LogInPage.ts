import { Locator, Page } from "@playwright/test"

export class Login {

    readonly page: Page;
    readonly UserID: Locator;
    readonly PWD: Locator;
    readonly nxtBtn: Locator;
    readonly LogInBtn: Locator;
    readonly HomePg: Locator;
    readonly Cnfm: Locator;
    readonly CYesBtn: Locator;
    readonly SignoutImg: Locator;
    readonly SignOutBtn: Locator;
    readonly SuccessfulSignout: Locator;


    constructor(page: Page) {
        this.page = page;
        this.UserID = page.getByPlaceholder('User ID');
        this.PWD = page.locator("#txtLoginPassword");
        this.nxtBtn = page.locator(".pull-right a#btnLoginNext");
        this.LogInBtn = page.getByRole("link", { name: "Login" });
        this.HomePg = page.locator("#M_H");
        this.Cnfm = page.locator("#divConfirm .coformationlost");
        this.CYesBtn = this.Cnfm.locator('a[onclick="ConfirmationPopupYesSelect()"]');
        this.SignoutImg = page.getByTitle('Sign Out');
        this.SignOutBtn = page.getByRole('link', { name: 'Yes' });
        this.SuccessfulSignout = page.locator('#spStatusMsg');

    }



    async gotoLogInPage() {

        await this.page.goto("https://mi-webtest.scimaxmi.com:1022/",
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
    }

    async LogIntoApplication(UserID: string, pwd: string) {

        await this.UserID.fill(UserID);
        await this.nxtBtn.click();
        await this.PWD.fill(pwd);
        await this.LogInBtn.click();
        try {

            await this.CYesBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.CYesBtn.click();
            console.log("User was already Logged In.......")


        }
        catch {
            console.log("User was Logged In Successfully.......")
        }
    }

    async Homepg() {
        await this.page.waitForLoadState();

    }

    async Signingout() {
        await this.SignoutImg.waitFor({ state: 'visible', timeout: 30000 });
        await this.SignoutImg.click();

        await this.SignOutBtn.waitFor({ state: 'visible', timeout: 30000 });
        await this.SignOutBtn.click();

        await this.SuccessfulSignout.waitFor({ state: 'visible', timeout: 40000 })
    }

}