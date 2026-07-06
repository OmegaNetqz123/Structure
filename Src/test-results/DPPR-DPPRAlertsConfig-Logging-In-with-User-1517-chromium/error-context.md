# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DPPR\DPPRAlertsConfig.spec.ts >> Logging In with User 1517
- Location: tests\DPPR\DPPRAlertsConfig.spec.ts:4:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#M_H')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#M_H')

```

```yaml
- heading "logo" [level=1]:
  - img "logo"
- strong: "1517"
- textbox "Password": Admin@123
- list:
  - listitem
  - listitem:
    - link "Login":
      - /url: "#"
    - link "Back":
      - /url: "#"
- strong: Version 25R1
- text: © SciMax Global LLC. All Rights Reserved.
- link "Privacy Policy":
  - /url: " https://scimaxglobal.com/application-privacy-notice/"
- text: Confirmation
- img "leftarrow"
- text: A session is active with the same User ID. Would you like to continue the same session?
- link "No":
  - /url: "#"
- link "Yes":
  - /url: "#"
```

# Test source

```ts
  1  | import {test, expect, Locator, Page} from "@playwright/test"
  2  | 
  3  |  export class Login {
  4  |     readonly page:Page;
  5  |     readonly UserID: Locator;
  6  |     readonly PWD: Locator;
  7  |     readonly nxtBtn: Locator;
  8  |     readonly LogInBtn: Locator;
  9  |     readonly HomePg:Locator;
  10 | 
  11 |     constructor(page:Page){
  12 |         this.page= page;
  13 |         this.UserID= page.locator("#txtLoginUserID") ;
  14 |         this.PWD = page.locator("#txtLoginPassword") ;
  15 |         this.nxtBtn = page.locator(".pull-right a#btnLoginNext") ;
  16 |         this.LogInBtn = page.getByRole("link", { name: "Login" });
  17 |         this.HomePg=page.locator("#M_H");
  18 | 
  19 |     }
  20 | 
  21 |     async gotoLogInPage(){
  22 | 
  23 |         await this.page.goto("https://poc-web.scimaxmi.com/",
  24 |             {
  25 |             waitUntil: 'domcontentloaded',
  26 |             timeout: 60000
  27 |         }
  28 |         );
  29 |     }
  30 | 
  31 |     async LogIntoApplication(UserID:string, pwd:string){
  32 |         await this.UserID.fill(UserID);
  33 |         await this.nxtBtn.click();
  34 |         await this.PWD.fill(pwd);
  35 |         await this.LogInBtn.click();
  36 |         console.log("User Succesfully Logged In...")
  37 |     }
  38 | 
  39 |     async ValidateUserLoggedIn(){
> 40 |         await expect(this.HomePg).toBeVisible();
     |                                   ^ Error: expect(locator).toBeVisible() failed
  41 |     }
  42 | 
  43 | }
```