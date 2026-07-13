# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModuleSearch.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModuleSearch.spec.ts:11:5

# Error details

```
Error: locator.waitFor: Error: strict mode violation: locator('.smoothSrcollbar .inputrow-80 label') resolved to 13 elements:
    1) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Module Name')
    2) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Latest Version')
    3) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Status')
    4) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('CI/CO')
    5) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('CO User')
    6) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('System Module ID')
    7) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Module Category')
    8) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Created Date')
    9) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Last Modified Date')
    10) <label class="cbx-main pull-left ng-binding">…</label> aka locator('#columns-available').getByText('Approved Date')
    ...

Call log:
  - waiting for locator('.smoothSrcollbar .inputrow-80 label') to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
              - generic [ref=e14]: Friday, July 10, 2026
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
              - link "Notifications&Reminders" [ref=e34] [cursor=pointer]:
                - /url: "#"
                - img [ref=e35]
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
      - generic [ref=e72]: Notifications & Reminders
      - generic [ref=e73]:
        - list:
          - listitem [ref=e74]:
            - link "Cancel" [ref=e75] [cursor=pointer]:
              - /url: "#"
      - generic [ref=e76]:
        - list [ref=e77]:
          - listitem [ref=e78]:
            - link [ref=e79] [cursor=pointer]:
              - /url: "#tabinr1"
          - listitem [ref=e80]:
            - link [ref=e81] [cursor=pointer]:
              - /url: "#tabinr2"
        - generic [ref=e85]:
          - list:
            - listitem
    - generic [ref=e88]:
      - generic [ref=e89]: Notification
      - generic [ref=e90]:
        - list:
          - listitem [ref=e91]:
            - link "Dismiss" [ref=e92] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e93]:
            - link "Cancel" [ref=e94] [cursor=pointer]:
              - /url: "#"
      - generic [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e97]:
            - strong [ref=e99]: "ID :"
            - generic:
              - link:
                - /url: "#"
          - strong [ref=e102]: "Date & Time :"
          - strong [ref=e105]: "Organization :"
          - strong [ref=e108]: "Site :"
          - generic [ref=e109]:
            - strong
        - generic [ref=e110]:
          - generic [ref=e111]: Message
          - textbox [ref=e112]
    - generic [ref=e115]:
      - generic [ref=e116]: Reminders
      - generic [ref=e117]:
        - list:
          - listitem
          - listitem
          - listitem [ref=e118]:
            - link "Clear" [ref=e119] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e120]:
            - link "Cancel" [ref=e121] [cursor=pointer]:
              - /url: "#"
      - generic [ref=e122]:
        - generic [ref=e124]:
          - strong [ref=e127]: "Organization :"
          - strong [ref=e130]: "Site :"
          - strong [ref=e133]: "Category :"
          - strong [ref=e136]: "Scheduled On :"
          - strong [ref=e139]: "Status :"
          - strong [ref=e142]: "Overdue :"
        - generic [ref=e143]:
          - strong [ref=e145]: Message
          - textbox [ref=e146]
    - generic [ref=e148]:
      - generic [ref=e149]:
        - generic [ref=e150]:
          - link "CM Console >" [ref=e151] [cursor=pointer]:
            - /url: CMHome.aspx
          - text: SR Module Library
        - generic [ref=e152]:
          - list:
            - listitem [ref=e153]:
              - link "Create SR Module" [ref=e154] [cursor=pointer]:
                - /url: SRModule.aspx?ID=&Mode=N
      - generic [ref=e155]:
        - generic [ref=e157]:
          - generic "Expand" [ref=e158] [cursor=pointer]
          - generic [ref=e159]: Search Criteria
          - generic [ref=e160]:
            - list:
              - listitem [ref=e161]:
                - link "Search" [ref=e162] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e163]:
                - link "Clear" [ref=e164] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e165]:
                - link "View All" [ref=e166] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e167]:
                - link "Save" [ref=e168] [cursor=pointer]:
                  - /url: "#"
        - textbox [ref=e169]
        - generic [ref=e170]:
          - generic [ref=e171]:
            - generic [ref=e172]: "Displaying: 1-7 of 7 Items"
            - generic [ref=e173]:
              - list:
                - listitem
                - listitem [ref=e174]:
                  - img "maximize" [ref=e176]
                - listitem [ref=e177]:
                  - img "maximize" [ref=e179]
                - listitem [ref=e180]:
                  - combobox [ref=e182]:
                    - option "Sort By" [selected]
                    - option "Created Date"
                    - option "Last Modified Date"
                    - option "Approved Date"
                    - option "Published Date"
                    - option "Archived Date"
                    - option "Module Name"
                    - option "Module ID"
                    - option "System ID"
                    - option "Version"
                - listitem [ref=e183] [cursor=pointer]:
                  - img "img" [ref=e184]
                  - img "img" [ref=e185]
                - listitem
          - generic [ref=e186]:
            - table [ref=e187]:
              - rowgroup [ref=e188]:
                - row "Module Name Latest Version Status CI/CO CO User System Module ID Module Category Created Date Last Modified Date Approved Date Published Date Archived Date Module ID" [ref=e189]:
                  - columnheader [ref=e190]:
                    - generic [ref=e191] [cursor=pointer]:
                      - generic:
                        - checkbox
                  - columnheader "Module Name" [ref=e193]
                  - columnheader "Latest Version" [ref=e194]
                  - columnheader "Status" [ref=e195]
                  - columnheader "CI/CO" [ref=e196]
                  - columnheader "CO User" [ref=e197]
                  - columnheader "System Module ID" [ref=e198]
                  - columnheader "Module Category" [ref=e199]
                  - columnheader "Created Date" [ref=e200]
                  - columnheader "Last Modified Date" [ref=e201]
                  - columnheader "Approved Date" [ref=e202]
                  - columnheader "Published Date" [ref=e203]
                  - columnheader "Archived Date" [ref=e204]
                  - columnheader "Module ID" [ref=e205]
                  - columnheader [ref=e206]
            - table [ref=e208]:
              - rowgroup [ref=e209]:
                - row "25-5-26-Module for global document 1.1 Published CI att-00009 25-May-2026 25-May-2026 25-May-2026" [ref=e210]:
                  - cell [ref=e211]:
                    - generic [ref=e212] [cursor=pointer]:
                      - checkbox
                  - cell "25-5-26-Module for global document" [ref=e214]
                  - cell "1.1" [ref=e215]
                  - cell "Published" [ref=e216]
                  - cell "CI" [ref=e217]
                  - cell [ref=e218]
                  - cell "att-00009" [ref=e219]
                  - cell [ref=e220]
                  - cell "25-May-2026" [ref=e221]
                  - cell "25-May-2026" [ref=e222]
                  - cell [ref=e223]
                  - cell "25-May-2026" [ref=e224]
                  - cell [ref=e225]
                  - cell [ref=e226]
                  - cell [ref=e227]:
                    - list
                - row "27-10-25-Sr Module 1 1.1 Published CI att-00003 26-Oct-2025 25-May-2026 25-May-2026" [ref=e228]:
                  - cell [ref=e229]:
                    - generic [ref=e230] [cursor=pointer]:
                      - checkbox
                  - cell "27-10-25-Sr Module 1" [ref=e232]
                  - cell "1.1" [ref=e233]
                  - cell "Published" [ref=e234]
                  - cell "CI" [ref=e235]
                  - cell [ref=e236]
                  - cell "att-00003" [ref=e237]
                  - cell [ref=e238]
                  - cell "26-Oct-2025" [ref=e239]
                  - cell "25-May-2026" [ref=e240]
                  - cell [ref=e241]
                  - cell "25-May-2026" [ref=e242]
                  - cell [ref=e243]
                  - cell [ref=e244]
                  - cell [ref=e245]:
                    - list
                - row "27-10-25-Sr Module 2 1.0 Published CI att-00004 26-Oct-2025 26-Oct-2025 26-Oct-2025" [ref=e246]:
                  - cell [ref=e247]:
                    - generic [ref=e248] [cursor=pointer]:
                      - checkbox
                  - cell "27-10-25-Sr Module 2" [ref=e250]
                  - cell "1.0" [ref=e251]
                  - cell "Published" [ref=e252]
                  - cell "CI" [ref=e253]
                  - cell [ref=e254]
                  - cell "att-00004" [ref=e255]
                  - cell [ref=e256]
                  - cell "26-Oct-2025" [ref=e257]
                  - cell "26-Oct-2025" [ref=e258]
                  - cell [ref=e259]
                  - cell "26-Oct-2025" [ref=e260]
                  - cell [ref=e261]
                  - cell [ref=e262]
                  - cell [ref=e263]:
                    - list
                - row "ObEBt 1.0 Pending CI att-00002 06-Jan-2025 06-Jan-2025" [ref=e264]:
                  - cell [ref=e265]:
                    - generic [ref=e266] [cursor=pointer]:
                      - checkbox
                  - cell "ObEBt" [ref=e268]
                  - cell "1.0" [ref=e269]
                  - cell "Pending" [ref=e270]
                  - cell "CI" [ref=e271]
                  - cell [ref=e272]
                  - cell "att-00002" [ref=e273]
                  - cell [ref=e274]
                  - cell "06-Jan-2025" [ref=e275]
                  - cell "06-Jan-2025" [ref=e276]
                  - cell [ref=e277]
                  - cell [ref=e278]
                  - cell [ref=e279]
                  - cell [ref=e280]
                  - cell [ref=e281]:
                    - list
                - row "ObEBtfghjm, 1.0 Pending CI att-00005 17-Dec-2025 17-Dec-2025" [ref=e282]:
                  - cell [ref=e283]:
                    - generic [ref=e284] [cursor=pointer]:
                      - checkbox
                  - cell "ObEBtfghjm," [ref=e286]
                  - cell "1.0" [ref=e287]
                  - cell "Pending" [ref=e288]
                  - cell "CI" [ref=e289]
                  - cell [ref=e290]
                  - cell "att-00005" [ref=e291]
                  - cell [ref=e292]
                  - cell "17-Dec-2025" [ref=e293]
                  - cell "17-Dec-2025" [ref=e294]
                  - cell [ref=e295]
                  - cell [ref=e296]
                  - cell [ref=e297]
                  - cell [ref=e298]
                  - cell [ref=e299]:
                    - list
                - row "SR Module 1.0 Pending CI att-00007 module 22-Jan-2026 22-Jan-2026" [ref=e300]:
                  - cell [ref=e301]:
                    - generic [ref=e302] [cursor=pointer]:
                      - checkbox
                  - cell "SR Module" [ref=e304]
                  - cell "1.0" [ref=e305]
                  - cell "Pending" [ref=e306]
                  - cell "CI" [ref=e307]
                  - cell [ref=e308]
                  - cell "att-00007" [ref=e309]
                  - cell "module" [ref=e310]
                  - cell "22-Jan-2026" [ref=e311]
                  - cell "22-Jan-2026" [ref=e312]
                  - cell [ref=e313]
                  - cell [ref=e314]
                  - cell [ref=e315]
                  - cell [ref=e316]
                  - cell [ref=e317]:
                    - list
                - row "SR Module Review 1 1.0 Pending CI att-00008 module 14-May-2026 14-May-2026" [ref=e318]:
                  - cell [ref=e319]:
                    - generic [ref=e320] [cursor=pointer]:
                      - checkbox
                  - cell "SR Module Review 1" [ref=e322]
                  - cell "1.0" [ref=e323]
                  - cell "Pending" [ref=e324]
                  - cell "CI" [ref=e325]
                  - cell [ref=e326]
                  - cell "att-00008" [ref=e327]
                  - cell "module" [ref=e328]
                  - cell "14-May-2026" [ref=e329]
                  - cell "14-May-2026" [ref=e330]
                  - cell [ref=e331]
                  - cell [ref=e332]
                  - cell [ref=e333]
                  - cell [ref=e334]
                  - cell [ref=e335]:
                    - list
      - generic [ref=e337]:
        - generic [ref=e338]:
          - generic [ref=e339]: Customize Table
          - generic [ref=e340]:
            - list:
              - listitem [ref=e341]:
                - link "Reset to Default" [ref=e342] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e343]:
                - link "Save & Close" [ref=e344] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e345]:
                - link "Cancel" [ref=e346] [cursor=pointer]:
                  - /url: "#"
        - generic [ref=e347]:
          - generic [ref=e348]: Selected Table Columns
          - link "Choose Columns" [active] [ref=e349] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e350]:
          - generic [ref=e351]:
            - generic [ref=e353] [cursor=pointer]: Module Name
            - generic [ref=e354]:
              - link "Move to Bottom" [ref=e355] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e356]
              - link:
                - /url: "#"
              - link "Move Down" [ref=e357] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e358]
              - link:
                - /url: "#"
          - generic [ref=e359]:
            - generic [ref=e361] [cursor=pointer]: Latest Version
            - generic [ref=e362]:
              - link "Move to Bottom" [ref=e363] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e364]
              - link "Move to Top" [ref=e365] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e366]
              - link "Move Down" [ref=e367] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e368]
              - link "Move Up" [ref=e369] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e370]
          - generic [ref=e371]:
            - generic [ref=e373] [cursor=pointer]: Status
            - generic [ref=e374]:
              - link "Move to Bottom" [ref=e375] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e376]
              - link "Move to Top" [ref=e377] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e378]
              - link "Move Down" [ref=e379] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e380]
              - link "Move Up" [ref=e381] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e382]
          - generic [ref=e383]:
            - generic [ref=e385] [cursor=pointer]: CI/CO
            - generic [ref=e386]:
              - link "Move to Bottom" [ref=e387] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e388]
              - link "Move to Top" [ref=e389] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e390]
              - link "Move Down" [ref=e391] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e392]
              - link "Move Up" [ref=e393] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e394]
          - generic [ref=e395]:
            - generic [ref=e397] [cursor=pointer]: CO User
            - generic [ref=e398]:
              - link "Move to Bottom" [ref=e399] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e400]
              - link "Move to Top" [ref=e401] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e402]
              - link "Move Down" [ref=e403] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e404]
              - link "Move Up" [ref=e405] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e406]
          - generic [ref=e407]:
            - generic [ref=e409] [cursor=pointer]: System Module ID
            - generic [ref=e410]:
              - link "Move to Bottom" [ref=e411] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e412]
              - link "Move to Top" [ref=e413] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e414]
              - link "Move Down" [ref=e415] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e416]
              - link "Move Up" [ref=e417] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e418]
          - generic [ref=e419]:
            - generic [ref=e421] [cursor=pointer]: Module Category
            - generic [ref=e422]:
              - link "Move to Bottom" [ref=e423] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e424]
              - link "Move to Top" [ref=e425] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e426]
              - link "Move Down" [ref=e427] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e428]
              - link "Move Up" [ref=e429] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e430]
          - generic [ref=e431]:
            - generic [ref=e433] [cursor=pointer]: Created Date
            - generic [ref=e434]:
              - link "Move to Bottom" [ref=e435] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e436]
              - link "Move to Top" [ref=e437] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e438]
              - link "Move Down" [ref=e439] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e440]
              - link "Move Up" [ref=e441] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e442]
          - generic [ref=e443]:
            - generic [ref=e445] [cursor=pointer]: Last Modified Date
            - generic [ref=e446]:
              - link "Move to Bottom" [ref=e447] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e448]
              - link "Move to Top" [ref=e449] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e450]
              - link "Move Down" [ref=e451] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e452]
              - link "Move Up" [ref=e453] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e454]
          - generic [ref=e455]:
            - generic [ref=e457] [cursor=pointer]: Approved Date
            - generic [ref=e458]:
              - link "Move to Bottom" [ref=e459] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e460]
              - link "Move to Top" [ref=e461] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e462]
              - link "Move Down" [ref=e463] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e464]
              - link "Move Up" [ref=e465] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e466]
          - generic [ref=e467]:
            - generic [ref=e469] [cursor=pointer]: Published Date
            - generic [ref=e470]:
              - link "Move to Bottom" [ref=e471] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e472]
              - link "Move to Top" [ref=e473] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e474]
              - link "Move Down" [ref=e475] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e476]
              - link "Move Up" [ref=e477] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e478]
          - generic [ref=e479]:
            - generic [ref=e481] [cursor=pointer]: Archived Date
            - generic [ref=e482]:
              - link "Move to Bottom" [ref=e483] [cursor=pointer]:
                - /url: "#"
                - img "Move to Bottom" [ref=e484]
              - link "Move to Top" [ref=e485] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e486]
              - link "Move Down" [ref=e487] [cursor=pointer]:
                - /url: "#"
                - img "Move Down" [ref=e488]
              - link "Move Up" [ref=e489] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e490]
          - generic [ref=e491]:
            - generic [ref=e493] [cursor=pointer]: Module ID
            - generic [ref=e494]:
              - link [ref=e495] [cursor=pointer]:
                - /url: "#"
              - link "Move to Top" [ref=e496] [cursor=pointer]:
                - /url: "#"
                - img "Move to Top" [ref=e497]
              - link [ref=e498] [cursor=pointer]:
                - /url: "#"
              - link "Move Up" [ref=e499] [cursor=pointer]:
                - /url: "#"
                - img "Move Up" [ref=e500]
      - generic [ref=e502]:
        - generic [ref=e503]:
          - generic [ref=e504]: Choose Columns
          - generic [ref=e505]:
            - list:
              - listitem [ref=e506]:
                - link "Proceed" [ref=e507] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e508]:
                - link "Cancel" [ref=e509] [cursor=pointer]:
                  - /url: "#"
        - generic [ref=e510]: Clicking on Proceed after selecting/unselecting any check boxes will reflect the same order in the Selected Table Columns list.
        - generic [ref=e512] [cursor=pointer]:
          - text: Select All
          - checkbox "Select All" [checked]
        - generic [ref=e514]:
          - generic [ref=e517] [cursor=pointer]:
            - text: Module Name
            - checkbox "Module Name" [checked]
          - generic [ref=e521] [cursor=pointer]:
            - text: Latest Version
            - checkbox "Latest Version" [checked]
          - generic [ref=e525] [cursor=pointer]:
            - text: Status
            - checkbox "Status" [checked]
          - generic [ref=e529] [cursor=pointer]:
            - text: CI/CO
            - checkbox "CI/CO" [checked]
          - generic [ref=e533] [cursor=pointer]:
            - text: CO User
            - checkbox "CO User" [checked]
          - generic [ref=e537] [cursor=pointer]:
            - text: System Module ID
            - checkbox "System Module ID" [checked]
          - generic [ref=e541] [cursor=pointer]:
            - text: Module Category
            - checkbox "Module Category" [checked]
          - generic [ref=e545] [cursor=pointer]:
            - text: Created Date
            - checkbox "Created Date" [checked]
          - generic [ref=e549] [cursor=pointer]:
            - text: Last Modified Date
            - checkbox "Last Modified Date" [checked]
          - generic [ref=e553] [cursor=pointer]:
            - text: Approved Date
            - checkbox "Approved Date" [checked]
          - generic [ref=e557] [cursor=pointer]:
            - text: Published Date
            - checkbox "Published Date" [checked]
          - generic [ref=e561] [cursor=pointer]:
            - text: Archived Date
            - checkbox "Archived Date" [checked]
          - generic [ref=e565] [cursor=pointer]:
            - text: Module ID
            - checkbox "Module ID" [checked]
      - generic [ref=e569]:
        - generic [ref=e570]: Archive Module
        - generic [ref=e571]:
          - list:
            - listitem [ref=e572]:
              - link "Confirm" [ref=e573] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e574]:
              - link "Cancel" [ref=e575] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e576]:
          - generic [ref=e577]:
            - generic [ref=e578]:
              - generic [ref=e579]: User Id
              - textbox [disabled] [ref=e580]
            - generic [ref=e581]:
              - generic [ref=e582]: Password
              - textbox [ref=e583]
          - generic [ref=e584]:
            - generic [ref=e585]: Reason for Archiving Module
            - textbox [ref=e586]
      - generic [ref=e589]:
        - generic [ref=e590]: Approved For Use
        - generic [ref=e591]:
          - list:
            - listitem [ref=e592]:
              - link "Confirm" [ref=e593] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e594]:
              - link "Cancel" [ref=e595] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e596]:
          - generic [ref=e597]:
            - generic [ref=e598]:
              - generic [ref=e599]: User Id
              - textbox [disabled] [ref=e600]
            - generic [ref=e601]:
              - generic [ref=e602]: Password
              - textbox [ref=e603]
          - generic [ref=e604]:
            - generic [ref=e605]: Reason for Approving Module
            - textbox [ref=e606]
      - generic [ref=e609]:
        - generic [ref=e610]: Delete Module
        - generic [ref=e611]:
          - list:
            - listitem [ref=e612]:
              - link "Confirm" [ref=e613] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e614]:
              - link "Cancel" [ref=e615] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e616]:
          - generic [ref=e617]:
            - generic [ref=e618]:
              - generic [ref=e619]: User Id
              - textbox [disabled] [ref=e620]
            - generic [ref=e621]:
              - generic [ref=e622]: Password
              - textbox [ref=e623]
          - generic [ref=e624]:
            - generic [ref=e625]: Reason for Deleting Module
            - textbox [ref=e626]
      - generic [ref=e629]:
        - generic [ref=e630]: Published For Use
        - generic [ref=e631]:
          - list:
            - listitem [ref=e632]:
              - link "Confirm" [ref=e633] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e634]:
              - link "Cancel" [ref=e635] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e636]:
          - generic [ref=e637]:
            - generic [ref=e638]:
              - generic [ref=e639]: User Id
              - textbox [disabled] [ref=e640]
            - generic [ref=e641]:
              - generic [ref=e642]: Password
              - textbox [ref=e643]
          - generic [ref=e644]:
            - generic [ref=e645]:
              - generic [ref=e646]: System Version
              - textbox [disabled] [ref=e647]
            - generic [ref=e648]:
              - generic [ref=e649]: Org Version
              - textbox [ref=e650]
          - generic [ref=e651]:
            - generic [ref=e652]: Reason for Publishing Module
            - textbox [ref=e653]
      - generic [ref=e656]:
        - generic [ref=e657]: Check-Out Module(s)
        - generic [ref=e658]:
          - list:
            - listitem [ref=e659]:
              - link "Confirm" [ref=e660] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e661]:
              - link "Cancel" [ref=e662] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e663]:
          - generic [ref=e665]: Module(s) will be checked–out to the selected user.
          - generic [ref=e666]:
            - generic [ref=e667]:
              - generic [ref=e668]: Select User *
              - combobox [ref=e669]:
                - option [selected]
                - option "--Select--"
            - generic [ref=e670]:
              - generic [ref=e671]: Reason for Check-Out
              - textbox [ref=e672]
  - status [ref=e673]
```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test"
  2  | 
  3  | // 1. Date Fields Selection Function
  4  | 
  5  | export async function DateSelection(year: string, month: string, date: string, page: Page) {
  6  |     await page.locator('.ui-datepicker-year').selectOption({ label: year });
  7  |     await page.locator('.ui-datepicker-month').selectOption({ label: month });
  8  | 
  9  |     const allCells: Locator[] = await page.locator('.ui-datepicker-calendar tbody td a').all();
  10 |     let dateFound = false;
  11 | 
  12 |     for (const cell of allCells) {
  13 |         const cellText = (await cell.innerText()).trim();
  14 |         if (cellText === date) {
  15 |             await cell.click();
  16 |             dateFound = true;
  17 |             break;
  18 |         }
  19 |     }
  20 | 
  21 |     if (!dateFound) {
  22 |         throw new Error(`DateSelection: Date "${date}" not found in calendar for ${month} ${year}.`);
  23 |     }
  24 | 
  25 | }
  26 | 
  27 | // 2. Dropdown fields selection function
  28 | 
  29 | export async function Dprowdown(field: Locator, lab: string) {
  30 |     await field.selectOption({ label: lab });
  31 | }
  32 | 
  33 | //3. Country field selection function from Push Head(Only top 100 values can be selected)
  34 | 
  35 | export async function Country(field: Locator, list: Locator, lab: string) {
  36 |     await field.dblclick();
  37 |     await list.getByText(lab).click();
  38 | }
  39 | 
  40 | //4. Trade Name selection function from Product Search Overlay
  41 | 
  42 | export async function TradeNameSelection(field: Locator, name: string,
  43 |     slct: Locator, list: Locator) {
  44 | 
  45 |     await field.click();
  46 |     await list.getByText(name, { exact: true }).click();
  47 |     await slct.click();
  48 | 
  49 | }
  50 | 
  51 | 
  52 | //5. For Processing wait Times
  53 | 
  54 | export async function visible40(ele:Locator) {
> 55 |     await ele.waitFor({state:"visible", timeout:40000})
     |               ^ Error: locator.waitFor: Error: strict mode violation: locator('.smoothSrcollbar .inputrow-80 label') resolved to 13 elements:
  56 | }
  57 | 
  58 | export async function visible60(ele:Locator) {
  59 |     await ele.waitFor({state:"visible", timeout:60000})
  60 | }
  61 | 
  62 | export async function waitForProcessingToFinish(page: Page) {
  63 |     //const processing = page.getByText('Processing...');
  64 |     // Wait until none of the matched elements are visible
  65 |     await page.waitForFunction(() => {
  66 |         const els = Array.from(document.querySelectorAll('span'))
  67 |             .filter(el => el.textContent?.trim() === 'Processing...');
  68 |         return els.every(el => {
  69 |             const style = window.getComputedStyle(el);
  70 |             return style.display === 'none' || style.visibility === 'hidden' || el.offsetParent === null;
  71 |         });
  72 |     }, { timeout: 60000 });
  73 | }
  74 | 
```