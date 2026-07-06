# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModule.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModule.spec.ts:10:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: Promise {}
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - textbox [ref=e4]
  - banner [ref=e5]:
    - generic [ref=e6]:
      - heading [level=1] [ref=e7]:
        - generic [ref=e8]:
          - img [ref=e10]
          - img [ref=e11]
      - generic [ref=e12]:
        - list:
          - listitem [ref=e13]:
            - generic [ref=e14]: Monday, July 6, 2026
          - listitem [ref=e15]:
            - list:
              - listitem [ref=e16] [cursor=pointer]:
                - img "manuser" [ref=e18]
                - link "Vani sai Tejaswi" [ref=e19]:
                  - /url: "#"
                  - text: Vani sai Tejaswi
          - listitem [ref=e21]:
            - list:
              - listitem [ref=e22] [cursor=pointer]:
                - link "Organization autotest" [ref=e23]:
                  - /url: "#"
                  - text: Organization
                  - strong [ref=e24]: autotest
          - listitem [ref=e25]:
            - list:
              - listitem [ref=e26] [cursor=pointer]:
                - link "Primary Site Redx" [ref=e27]:
                  - /url: "#"
                  - text: Primary Site
                  - strong [ref=e28]: Redx
          - listitem [ref=e29]:
            - list:
              - listitem [ref=e30] [cursor=pointer]:
                - link "Setup" [ref=e31]:
                  - /url: "#"
                  - img [ref=e32]
          - listitem [ref=e33]:
            - link "0" [ref=e34] [cursor=pointer]:
              - /url: "#"
              - img [ref=e35]
              - generic [ref=e36]: "0"
          - listitem [ref=e37]:
            - link "Help" [ref=e38] [cursor=pointer]:
              - /url: "#"
              - img [ref=e39]
          - listitem [ref=e40]:
            - list:
              - listitem [ref=e41] [cursor=pointer]:
                - link "Sign Out" [ref=e42]:
                  - /url: "#"
                  - img [ref=e43]
    - navigation [ref=e44]:
      - list [ref=e45]:
        - listitem [ref=e46]:
          - link [ref=e47] [cursor=pointer]:
            - /url: Home.aspx
            - img [ref=e48]
        - listitem [ref=e49]:
          - link "Inbox" [ref=e50] [cursor=pointer]:
            - /url: MyInbox.aspx
        - listitem [ref=e51]:
          - link "Case Management" [ref=e52] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e53]:
          - link "Case Query" [ref=e54] [cursor=pointer]:
            - /url: CaseQuery.aspx
        - listitem [ref=e55]:
          - link "Utilities" [ref=e56] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e57]:
          - link "Transmissions" [ref=e58] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e59]:
          - link "Browse Content" [ref=e60] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e61]:
          - link "QA" [ref=e62] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e63]:
          - link "Analytics" [ref=e64] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e65]:
        - link "Recent Cases" [ref=e67] [cursor=pointer]:
          - /url: "#"
        - generic [ref=e68]: + New Case
  - text: "* * *"
  - generic [ref=e71]:
    - generic [ref=e72]: Notifications & Reminders (0)
    - generic [ref=e73]:
      - list:
        - listitem [ref=e74]:
          - link "Cancel" [ref=e75] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e76]:
      - list [ref=e77]:
        - listitem [ref=e78]:
          - link "Notifications (0)" [ref=e79] [cursor=pointer]:
            - /url: "#tabinr1"
            - generic [ref=e80]: Notifications (0)
        - listitem [ref=e81]:
          - link "Reminders (0)" [ref=e82] [cursor=pointer]:
            - /url: "#tabinr2"
            - generic [ref=e83]: Reminders (0)
      - generic [ref=e87]:
        - list:
          - listitem
  - generic [ref=e90]:
    - generic [ref=e91]: Notification
    - generic [ref=e92]:
      - list:
        - listitem [ref=e93]:
          - link "Dismiss" [ref=e94] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e95]:
          - link "Cancel" [ref=e96] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e97]:
      - generic [ref=e98]:
        - generic [ref=e99]:
          - strong [ref=e101]: "ID :"
          - generic:
            - link:
              - /url: "#"
        - strong [ref=e104]: "Date & Time :"
        - strong [ref=e107]: "Organization :"
        - strong [ref=e110]: "Site :"
        - generic [ref=e111]:
          - strong
      - generic [ref=e112]:
        - generic [ref=e113]: Message
        - textbox [ref=e114]
  - generic [ref=e117]:
    - generic [ref=e118]: Reminders
    - generic [ref=e119]:
      - list:
        - listitem
        - listitem
        - listitem [ref=e120]:
          - link "Clear" [ref=e121] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e122]:
          - link "Cancel" [ref=e123] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e124]:
      - generic [ref=e126]:
        - strong [ref=e129]: "Organization :"
        - strong [ref=e132]: "Site :"
        - strong [ref=e135]: "Category :"
        - strong [ref=e138]: "Scheduled On :"
        - strong [ref=e141]: "Status :"
        - strong [ref=e144]: "Overdue :"
      - generic [ref=e145]:
        - strong [ref=e147]: Message
        - textbox [ref=e148]
  - generic [ref=e150]:
    - generic [ref=e151]:
      - generic [ref=e153]:
        - generic [ref=e154]:
          - generic [ref=e155]:
            - img "manuser" [ref=e156]
            - text: My Cases
          - generic [ref=e157]: Received in Last 7 Days
        - generic [ref=e158]: Total:0
      - generic [ref=e162]:
        - generic [ref=e164]:
          - img "manuser" [ref=e165]
          - generic [ref=e166]: Unprocessed Emails/Inbox
        - generic [ref=e168]: Total:19023
      - generic [ref=e172]:
        - generic [ref=e174]:
          - img "manuser" [ref=e175]
          - text: My Open AE/PC
        - generic [ref=e177]: Total:0
      - generic [ref=e181]:
        - generic [ref=e183]:
          - img "manuser" [ref=e184]
          - text: Unassigned Cases
        - generic [ref=e186]: Total:36
      - generic [ref=e189]:
        - generic [ref=e192]:
          - img "manuser" [ref=e193]
          - text: My Open Reviewer Tasks
        - generic [ref=e194]:
          - combobox [ref=e196]:
            - option "2 Days" [selected]
            - option "4 Days"
            - option "6 Days"
            - option "Overdue"
          - combobox [ref=e198]:
            - option "Any" [selected]
            - option "autotest"
          - generic [ref=e199]: Total:0
      - generic [ref=e202]:
        - generic [ref=e205]:
          - img "manuser" [ref=e206]
          - text: My Open Review Owner Tasks
        - generic [ref=e207]:
          - combobox [ref=e209]:
            - option "2 Days" [selected]
            - option "4 Days"
            - option "6 Days"
            - option "Overdue"
          - combobox [ref=e211]:
            - option "Any" [selected]
            - option "autotest"
          - generic [ref=e212]: Total:0
      - generic [ref=e215]:
        - generic [ref=e218]:
          - img "home" [ref=e219]
          - generic [ref=e220]: Documents/FAQs Nearing Expiry
        - generic [ref=e221]: Total:0
      - generic [ref=e224]:
        - generic [ref=e227]:
          - img "manuser" [ref=e228]
          - text: My Checkouts
        - generic [ref=e229]:
          - generic [ref=e230]: Total:0
          - combobox [ref=e232]:
            - option "Any" [selected]
            - option "autotest"
    - generic [ref=e235]:
      - generic [ref=e237]:
        - strong [ref=e240]: Notifications (0)
        - generic [ref=e241]:
          - list:
            - listitem
      - generic [ref=e243]:
        - strong [ref=e246]: Reminders (0)
        - generic [ref=e247]:
          - list:
            - listitem
```

# Test source

```ts
  1  | import { test, expect, Page } from "@playwright/test";
  2  | import { srModules } from "../../Pages/SRModule";
  3  | import { SRModuleGrid } from "../../Pages/SRModuleGrid";
  4  | import { Login } from "../../Pages/LogInPage";
  5  | import * as data from "../../test-data/Credentials.json";
  6  | 
  7  | 
  8  | let page: Page;
  9  | 
  10 | test('Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria', async ({ browser }) => {
  11 |     page = await browser.newPage();
  12 |     const LoggingIn = new Login(page);
  13 |     await LoggingIn.gotoLogInPage();
  14 |     await LoggingIn.LogIntoApplication(data["Credentials 1"].UserID, data["Credentials 1"].Password);
  15 |     const SRM = new srModules(page);
  16 |     //await SRM.SRModuleCreation();
  17 |     const SRG = new SRModuleGrid(page);
  18 |     const availableModules = SRG.SearchModules();
> 19 |     expect(availableModules).toBe(3);
     |                              ^ Error: expect(received).toBe(expected) // Object.is equality
  20 |     await LoggingIn.Signingout();
  21 | 
  22 | })
```