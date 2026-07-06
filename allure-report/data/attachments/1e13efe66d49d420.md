# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CM\SRModule.spec.ts >> Verify with creating a SR MOdule with mandatory data and publiching it through Search Criteria
- Location: Src\tests\CM\SRModule.spec.ts:9:5

# Error details

```
Error: locator.isChecked: Error: strict mode violation: locator('label.cbx-main').filter({ hasText: 'Dolo' }).locator('input[type="checkbox"]') resolved to 4 elements:
    1) <input type="checkbox" onclick="CheckUnCheckProduct(this)"/> aka getByRole('checkbox', { name: 'Product Dolo', exact: true })
    2) <input type="checkbox" onclick="CheckUnCheckApproval(this)" value="8CE63A89-0EF1-474A-B2BD-841E51827009"/> aka getByLabel('Dolo (AS)').first()
    3) <input type="checkbox" onclick="CheckUnCheckProduct(this)"/> aka getByRole('checkbox', { name: 'Product Dolo2' })
    4) <input type="checkbox" onclick="CheckUnCheckApproval(this)" value="DADE73DD-C86B-432F-A2CC-9E867A152176"/> aka getByLabel('Dolo (AS)').nth(1)

Call log:
  - waiting for locator('label.cbx-main').filter({ hasText: 'Dolo' }).locator('input[type="checkbox"]')

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
            - generic [ref=e14]: Friday, July 3, 2026
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
  - generic [ref=e147]:
    - generic [ref=e148]:
      - generic [ref=e149]: New SR Module
      - generic [ref=e150]:
        - list:
          - listitem [ref=e151]:
            - generic [ref=e152]: "Note: Date and Time are displayed in (UTC+05:30)"
          - listitem [ref=e153]:
            - link "Help" [ref=e154] [cursor=pointer]:
              - /url: "#"
              - img "Help" [ref=e155]
          - listitem [ref=e156]:
            - link "Save" [ref=e157] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e158]:
            - link "Save & Check-In" [ref=e159] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e160]:
            - generic [ref=e161]: Close/Cancel
    - generic [ref=e162]:
      - generic [ref=e164]:
        - generic [ref=e165]:
          - generic [ref=e166]: Module Name *
          - textbox [ref=e167]: Module6
        - generic [ref=e168]:
          - generic [ref=e169]: Module ID
          - textbox [ref=e170]: ID001
        - generic [ref=e171]:
          - generic [ref=e172]: Module Category
          - combobox [ref=e173]:
            - option "--Select--"
            - option "Auto 1" [selected]
            - option "Auto1768980250560"
            - option "Auto1768985208552"
            - option "Auto1769086970910"
            - option "Auto1769087172378"
            - option "Auto1769605275764"
            - option "Auto1769605631945"
            - option "Auto1770036197110"
            - option "Auto1770036219037"
            - option "Auto1770036238837"
            - option "Auto1770036259806"
            - option "Auto1770036280664"
            - option "Auto1770036360504"
            - option "Auto1770036377070"
            - option "Auto1770036395943"
            - option "Auto1770036417425"
            - option "Auto1770036436138"
            - option "Auto1770036476160"
            - option "Auto1770036512589"
            - option "Auto1770036536338"
            - option "Auto1770036564280"
            - option "Auto1770036593548"
            - option "Auto1770036628625"
            - option "Auto1770036656725"
            - option "Auto1770036680946"
            - option "Auto1773059361470"
            - option "Auto1774420769346"
            - option "Auto1774853983567"
            - option "Auto1774854012149"
            - option "Auto1774854042090"
            - option "Auto1774854108772"
            - option "Auto1774854199983"
            - option "Auto1775460065348"
            - option "Auto1775460105651"
            - option "Auto1775460144799"
            - option "Auto1775460212739"
            - option "Auto1775460279362"
            - option "Auto1775460299185"
            - option "Auto1775460320684"
            - option "Auto1775460343501"
            - option "Auto1775463436910"
            - option "Auto1775463488309"
            - option "Auto1776851069079"
            - option "Auto1776851094629"
            - option "Auto1776851129081"
            - option "Auto1776851184441"
            - option "Auto1776851209958"
            - option "Auto1776851245840"
            - option "Auto1776851363170"
            - option "Auto1776851434668"
            - option "Auto1776851479960"
            - option "Auto1776851550132"
            - option "Auto1776851578032"
            - option "Auto1776851724190"
            - option "Auto1776851750718"
            - option "Auto1776851838896"
            - option "Auto1776851882596"
            - option "Auto1776851914552"
            - option "Auto1776851940896"
            - option "Auto1776852011991"
            - option "Auto1776852082277"
            - option "Auto1776852595916"
            - option "Auto1776852648825"
            - option "Auto1776852858243"
            - option "Auto1776853088399"
            - option "Auto1776853338874"
            - option "Auto1776853427311"
            - option "Auto1776853468661"
            - option "Auto1776936606525"
            - option "module"
        - generic [ref=e175] [cursor=pointer]:
          - text: Approval Required
          - checkbox "Approval Required" [checked]
      - generic [ref=e177]:
        - list [ref=e178]:
          - listitem [ref=e179]:
            - link "General Attributes" [ref=e180] [cursor=pointer]:
              - /url: "#tab1"
        - generic [ref=e182]:
          - generic [ref=e183]:
            - generic [ref=e184]:
              - list [ref=e185]:
                - listitem [ref=e186]:
                  - generic [ref=e187]: "File:"
                - listitem [ref=e188]:
                  - link "Preview.pdf":
                    - /url: "#"
                    - generic [ref=e189] [cursor=pointer]: Preview.pdf
                - listitem [ref=e190]:
                  - link "download" [ref=e191] [cursor=pointer]:
                    - /url: "#"
                    - img "download" [ref=e192]
                - listitem [ref=e193]:
                  - link "Replace" [ref=e195] [cursor=pointer]:
                    - /url: "#"
                    - img "Replace" [ref=e196]
                - listitem [ref=e197]:
                  - link "Document Compose" [ref=e199] [cursor=pointer]:
                    - /url: "#"
                    - img "Document Compose" [ref=e200]
                  - text: "*"
                - text: "*"
                - listitem
              - generic [ref=e201]:
                - generic [ref=e202]: "File Format:"
                - generic [ref=e203]: pdf
            - list [ref=e204]:
              - listitem [ref=e205]:
                - generic [ref=e206] [cursor=pointer]:
                  - text: Auto Update and Publish all Response Documents when module is published
                  - checkbox "Auto Update and Publish all Response Documents when module is published" [checked]
            - list:
              - listitem [ref=e208]:
                - generic [ref=e209] [cursor=pointer]:
                  - text: Minor Version
                  - radio "Minor Version"
              - listitem [ref=e211]:
                - generic [ref=e212] [cursor=pointer]:
                  - text: Major Version
                  - radio "Major Version" [checked]
            - list [ref=e214]:
              - listitem [ref=e215]:
                - generic [ref=e216] [cursor=pointer]:
                  - text: Auto Update and Check-In all Response Documents when module is published
                  - checkbox "Auto Update and Check-In all Response Documents when module is published" [disabled]
            - list:
              - listitem [ref=e218]:
                - generic [ref=e219] [cursor=pointer]:
                  - text: Minor Version
                  - radio "Minor Version" [disabled]
              - listitem [ref=e221]:
                - generic [ref=e222] [cursor=pointer]:
                  - text: Major Version
                  - radio "Major Version" [disabled]
            - list [ref=e224]:
              - listitem [ref=e225]:
                - generic [ref=e226] [cursor=pointer]:
                  - text: Auto Expire and Archive all Response Documents when module is archived
                  - checkbox "Auto Expire and Archive all Response Documents when module is archived" [checked]
            - generic [ref=e228]:
              - generic [ref=e229]: Keywords
              - textbox [ref=e230]: Omega Keyword
          - generic [ref=e232]:
            - list [ref=e233]:
              - listitem [ref=e234]:
                - generic [ref=e235] [cursor=pointer]:
                  - text: Product Specific
                  - checkbox "Product Specific" [checked]
              - listitem [ref=e237]:
                - link "add" [active] [ref=e238] [cursor=pointer]:
                  - /url: "#"
                  - img "add" [ref=e239]
                - generic [ref=e240]:
                  - generic [ref=e241]: Select Products
                  - generic [ref=e242]:
                    - generic [ref=e243]:
                      - generic [ref=e246] [cursor=pointer]:
                        - checkbox "Family Automation axQST"
                        - strong [ref=e247]:
                          - img "Family" [ref=e248]
                          - text: Automation axQST
                      - generic [ref=e254] [cursor=pointer]:
                        - checkbox "Product product EuMld"
                        - strong [ref=e255]:
                          - img "Product" [ref=e256]
                          - text: product EuMld
                    - generic [ref=e258]:
                      - generic [ref=e261] [cursor=pointer]:
                        - checkbox "Family Automation hHTdv"
                        - strong [ref=e262]:
                          - img "Family" [ref=e263]
                          - text: Automation hHTdv
                      - generic [ref=e269] [cursor=pointer]:
                        - checkbox "Product product HUXDK"
                        - strong [ref=e270]:
                          - img "Product" [ref=e271]
                          - text: product HUXDK
                    - generic [ref=e273]:
                      - generic [ref=e276] [cursor=pointer]:
                        - checkbox "Family Automation IwpJn"
                        - strong [ref=e277]:
                          - img "Family" [ref=e278]
                          - text: Automation IwpJn
                      - generic [ref=e284] [cursor=pointer]:
                        - checkbox "Product product TbViq"
                        - strong [ref=e285]:
                          - img "Product" [ref=e286]
                          - text: product TbViq
                    - generic [ref=e288]:
                      - generic [ref=e291] [cursor=pointer]:
                        - checkbox "Family Automation mLbab"
                        - strong [ref=e292]:
                          - img "Family" [ref=e293]
                          - text: Automation mLbab
                      - generic [ref=e299] [cursor=pointer]:
                        - checkbox "Product product cgoGl"
                        - strong [ref=e300]:
                          - img "Product" [ref=e301]
                          - text: product cgoGl
                    - generic [ref=e303]:
                      - generic [ref=e306] [cursor=pointer]:
                        - checkbox "Family Automation uyEjp"
                        - strong [ref=e307]:
                          - img "Family" [ref=e308]
                          - text: Automation uyEjp
                      - generic [ref=e314] [cursor=pointer]:
                        - checkbox "Product product ncAxE"
                        - strong [ref=e315]:
                          - img "Product" [ref=e316]
                          - text: product ncAxE
                    - generic [ref=e318]:
                      - generic [ref=e321] [cursor=pointer]:
                        - checkbox "Family Automation xapda"
                        - strong [ref=e322]:
                          - img "Family" [ref=e323]
                          - text: Automation xapda
                      - generic [ref=e329] [cursor=pointer]:
                        - checkbox "Product UpdatedAutomation vLPTF"
                        - strong [ref=e330]:
                          - img "Product" [ref=e331]
                          - text: UpdatedAutomation vLPTF
                    - generic [ref=e333]:
                      - generic [ref=e336] [cursor=pointer]:
                        - checkbox "Family Automation zMfcm"
                        - strong [ref=e337]:
                          - img "Family" [ref=e338]
                          - text: Automation zMfcm
                      - generic [ref=e344] [cursor=pointer]:
                        - checkbox "Product PRD"
                        - strong [ref=e345]:
                          - img "Product" [ref=e346]
                          - text: PRD
                    - generic [ref=e348]:
                      - generic [ref=e351] [cursor=pointer]:
                        - checkbox "Family Azithro"
                        - strong [ref=e352]:
                          - img "Family" [ref=e353]
                          - text: Azithro
                      - generic [ref=e359] [cursor=pointer]:
                        - checkbox "Product Azithromycin"
                        - strong [ref=e360]:
                          - img "Product" [ref=e361]
                          - text: Azithromycin
                    - generic [ref=e363]:
                      - generic [ref=e366] [cursor=pointer]:
                        - checkbox "Family FamForAuto"
                        - strong [ref=e367]:
                          - img "Family" [ref=e368]
                          - text: FamForAuto
                      - generic [ref=e374] [cursor=pointer]:
                        - checkbox "Product ProAuto1"
                        - strong [ref=e375]:
                          - img "Product" [ref=e376]
                          - text: ProAuto1
                      - generic [ref=e382] [cursor=pointer]:
                        - checkbox "Product ProAuto2"
                        - strong [ref=e383]:
                          - img "Product" [ref=e384]
                          - text: ProAuto2
                    - generic [ref=e386]:
                      - generic [ref=e389] [cursor=pointer]:
                        - checkbox "Family Product1"
                        - strong [ref=e390]:
                          - img "Family" [ref=e391]
                          - text: Product1
                      - generic [ref=e397] [cursor=pointer]:
                        - checkbox "Product Dolo"
                        - strong [ref=e398]:
                          - img "Product" [ref=e399]
                          - text: Dolo
                      - generic [ref=e405] [cursor=pointer]:
                        - checkbox "Product Dolo2"
                        - strong [ref=e406]:
                          - img "Product" [ref=e407]
                          - text: Dolo2
                      - generic [ref=e413] [cursor=pointer]:
                        - checkbox "Product Product2"
                        - strong [ref=e414]:
                          - img "Product" [ref=e415]
                          - text: Product2
                  - generic [ref=e417]:
                    - link "Ok" [ref=e418] [cursor=pointer]:
                      - /url: "#"
                    - link "Cancel" [ref=e419] [cursor=pointer]:
                      - /url: "#"
            - generic [ref=e420]:
              - list
    - generic [ref=e422]:
      - generic [ref=e423]:
        - generic [ref=e424]: Setup New Review
        - generic [ref=e425]:
          - list:
            - listitem [ref=e426]:
              - link "Save & Close" [ref=e427] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e428]:
              - link "Cancel" [ref=e429] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e431]:
        - generic [ref=e432]:
          - generic [ref=e433]: Review Title *
          - combobox [ref=e434]
        - generic [ref=e435]:
          - generic [ref=e436]: Custom Title(if other)
          - textbox [ref=e437]
        - generic [ref=e438]:
          - generic [ref=e439]:
            - generic [ref=e440]: Planned End Date *
            - textbox [ref=e442]
          - link "Custom Email Message" [ref=e444] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e446] [cursor=pointer]:
          - text: Non Amendable Review
          - checkbox "Non Amendable Review"
        - generic [ref=e448]:
          - generic [ref=e449]: Review Description
          - textbox [ref=e450]
        - generic [ref=e451]:
          - generic [ref=e452]: Reviewers
          - list [ref=e453]
    - generic [ref=e455]:
      - generic [ref=e456]:
        - generic [ref=e457]: Edit Review
        - generic [ref=e458]:
          - list:
            - listitem [ref=e459]:
              - link "Save" [ref=e460] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e461]:
              - link "Cancel" [ref=e462] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e464]:
        - generic [ref=e465]:
          - generic [ref=e466]: Review Title *
          - combobox [ref=e467]:
            - option "Other" [selected]
        - generic [ref=e468]:
          - generic [ref=e469]: Custom Title(if other)
          - textbox [ref=e470]
        - generic [ref=e471]:
          - generic [ref=e472]:
            - generic [ref=e473]: Planned End Date *
            - textbox [ref=e474] [cursor=pointer]:
              - /placeholder: "-Select"
          - link "Custom Email Message" [ref=e476] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e478] [cursor=pointer]:
          - text: Non Amendable Review
          - checkbox "Non Amendable Review"
        - generic [ref=e480]:
          - generic [ref=e481]: Review Description
          - textbox [ref=e482]
        - generic [ref=e483]:
          - generic [ref=e484]: Reviewers
          - list [ref=e485]:
            - listitem [ref=e486]:
              - generic [ref=e487] [cursor=pointer]:
                - text: Robert P.
                - checkbox "Robert P." [checked]
            - listitem [ref=e489]:
              - generic [ref=e490] [cursor=pointer]:
                - text: Srini V.
                - checkbox "Srini V." [checked]
            - listitem [ref=e492]:
              - generic [ref=e493] [cursor=pointer]:
                - text: Kim R.
                - checkbox "Kim R."
            - listitem [ref=e495]:
              - generic [ref=e496] [cursor=pointer]:
                - text: Stacy Bark
                - checkbox "Stacy Bark"
    - generic [ref=e500]:
      - generic [ref=e501]: Change Owner
      - generic [ref=e502]:
        - list:
          - listitem [ref=e503]:
            - link "Confirm & Close" [ref=e504] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e505]:
            - link "Cancel" [ref=e506] [cursor=pointer]:
              - /url: "#"
      - generic [ref=e507]:
        - generic [ref=e508]:
          - generic [ref=e509]: Current Name
          - textbox [disabled] [ref=e510]
        - generic [ref=e511]:
          - generic [ref=e512]: New Owner *
          - combobox [ref=e513]
        - generic [ref=e514]:
          - generic [ref=e515]: Reason for Change Owner *
          - textbox [ref=e516]
    - generic [ref=e519]:
      - generic [ref=e520]: Review Details
      - generic [ref=e521]:
        - list:
          - listitem [ref=e522]:
            - link "Close" [ref=e523] [cursor=pointer]:
              - /url: "#"
      - generic [ref=e524]:
        - table [ref=e525]:
          - rowgroup [ref=e526]:
            - row "Reviewer Status Started On Completed On Comments" [ref=e527]:
              - columnheader "Reviewer" [ref=e528]
              - columnheader "Status" [ref=e529]
              - columnheader "Started On" [ref=e530]
              - columnheader "Completed On" [ref=e531]
              - columnheader "Comments" [ref=e532]
        - generic [ref=e533]:
          - table:
            - rowgroup
    - generic [ref=e535]:
      - generic [ref=e536]:
        - generic [ref=e537]: Preview
        - link "add" [ref=e538] [cursor=pointer]:
          - /url: "#"
          - img "add" [ref=e539]
      - iframe [ref=e541]:
        
    - generic [ref=e543]:
      - generic [ref=e544]:
        - generic [ref=e545]: Editing
        - generic [ref=e546]:
          - list:
            - listitem [ref=e547]:
              - link "Close" [ref=e548] [cursor=pointer]:
                - /url: "#"
      - iframe [ref=e550]:
        
    - generic [ref=e553]:
      - generic [ref=e554]: Review Document
      - generic [ref=e555]:
        - list:
          - listitem [ref=e556]:
            - link "OK" [ref=e557] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e558]:
            - link "Close" [ref=e559] [cursor=pointer]:
              - /url: "#"
    - generic [ref=e562]:
      - generic [ref=e563]:
        - generic [ref=e564]: Review
        - generic [ref=e565]:
          - list:
            - listitem [ref=e566]:
              - link "Close" [ref=e567] [cursor=pointer]:
                - /url: "#"
      - iframe [ref=e569]:
        
    - generic [ref=e571]:
      - generic [ref=e572]:
        - generic [ref=e573]: SR Module Check-In
        - generic [ref=e574]:
          - list:
            - listitem [ref=e575]:
              - link "Confirm Check-In" [ref=e576] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e577]:
        - list [ref=e578]:
          - listitem [ref=e579]: Check-In as
        - generic [ref=e580]:
          - generic [ref=e581]:
            - generic [ref=e582]: Author
            - combobox [ref=e583]:
              - option "--Select--" [selected]
              - option "1517"
              - option "AB"
              - option "BS"
              - option "Pooja"
              - option "Pooja.N"
              - option "SIRISHA"
              - option "Shiva"
              - option "Shiva.v"
              - option "THA"
              - option "Vamsi"
              - option "auto0009"
              - option "auto00101"
              - option "mi@scimaxisr.com"
              - option "monika"
              - option "tharun.rasakapuram@scimaxglobal.com"
              - option "vani"
          - generic [ref=e584]:
            - generic [ref=e585]: Reason for Check-In *
            - textbox [ref=e586]
```

# Test source

```ts
  84  |         this.ModuleCategoryDD = this.page.locator('#ddlModCatagory');
  85  |         this.ApprovalCheck = this.page.locator('#spnchkApprovalRequired');
  86  |         this.composeON = this.page.locator('[title="Compose"]');
  87  |         this.AutoUP_PuRSPCheck = this.page.locator('#spnchkAutoUpdate');
  88  |         this.AutoUP_PuRSPMinorRadio = this.page.locator('#rdMinor');
  89  |         this.AutoUP_PuRSPMajorRadio = this.page.locator('#spnrdMajor');
  90  |         this.AutoUP_CIRESPCheck = this.page.locator('#spnchkAutoUpdatecheckin');
  91  |         this.AutoUP_CIRESPMinorRadio = this.page.locator('#rdMinorcheckin');
  92  |         this.AutoUP_CIRESPMajorRadio = this.page.locator('#spnrdMajorcheckin');
  93  |         this.AutoExp_ArcRSPCheck = this.page.locator('#spnchkAutoExpire');
  94  |         this.KeywordTxt = this.page.locator('#txtSearch');
  95  |         this.SaveBtn = this.page.locator('#btnSave');
  96  |         this.Close_CancelBtn = this.page.locator('#btnCancel');
  97  | 
  98  |         //Product Specific Locators
  99  |         this.ProdCheck = this.page.locator('#spnchkProdSpecific');
  100 |         this.ProdExpIcon = this.page.locator('#imgPInfoProductSearch');
  101 |         this.SlctProductOkBtn = this.page.locator('.pro-specificDD .defultbtn:nth-child(1)');
  102 |         this.SlctProductCancelBtn = this.page.locator('.pro-specificDD .defultbtn:nth-child(2)');
  103 |         this.FamilyItems = this.page.locator(".family strong:has-text(`${this.row.itemName}`)");
  104 |     }
  105 |     /**
  106 |      * Reads all rows from datadriven.csv and creates one SR Module per row.
  107 |      * Matches the original method signature (no params) - CSV is read internally.
  108 |      */
  109 | 
  110 |     async SRModuleCreation() {
  111 |         SRgrid = new SRModuleGrid(this.page);
  112 |         DP = new Testdatacalls();
  113 |         const rows = DP.CSVreader<SRModuleRow>("datadriven.csv");
  114 |         await SRgrid.SRModuleCreation();
  115 | 
  116 |         for (const row of rows) {
  117 |             await this.createOneModule(row);
  118 |         }
  119 |     }
  120 | 
  121 |     // This Private method was called in above method with CSV data value as paramenter
  122 |     private async createOneModule(row: SRModuleRow) {
  123 | 
  124 |         await this.NewSRModuleBtn.click();
  125 |         await visible40(this.NewSRHeading);
  126 |         await this.MNametxt.fill(row.ModuleName ?? data.SRModule.Name);
  127 | 
  128 |         if (row.ModuleID) { await this.ModuleIDtxt.fill(row.ModuleID); }
  129 |         if (row.ModuleCategory) { await Dprowdown(this.ModuleCategoryDD, row.ModuleCategory); }
  130 |         if (row.Approval?.toLowerCase() === "yes") { await this.ApprovalCheck.check(); }
  131 | 
  132 |         //File uploading related
  133 |         await this.fileUploadImg.click();
  134 |         const filePath = path.join(__dirname, '..', 'test-data', row.FileName ?? `${row.FileName}`);
  135 |         await this.browseUploadImg.setInputFiles(filePath);
  136 |         await this.GoUploadBtn.click();
  137 | await waitForProcessingToFinish(this.page);
  138 | 
  139 |         //File Formate realted
  140 |         // Auto-update on Publish response
  141 |         if (row.AutoUP_PuRSPCheck?.toLowerCase() === "yes") {
  142 |             await visible40(this.AutoUP_PuRSPCheck);
  143 |             await this.AutoUP_PuRSPCheck.check();
  144 |             await expect(this.AutoUP_PuRSPMinorRadio).toBeChecked();
  145 |             await this.AutoUP_PuRSPMajorRadio.check();
  146 |             //await expect(this.AutoUP_PuRSPMinorRadio).toBeDisabled();
  147 |         }
  148 | 
  149 |         // Auto-update on Check-in response
  150 |         if (row.AutoUP_CIRESPCheck?.toLowerCase() === "yes") {
  151 |             await visible40(this.AutoUP_CIRESPCheck);
  152 |             await this.AutoUP_CIRESPCheck.check();
  153 |             await expect(this.AutoUP_CIRESPMinorRadio).toBeChecked();
  154 |             await this.AutoUP_CIRESPMajorRadio.check();
  155 |             //await expect(this.AutoUP_CIRESPCheck).toBeDisabled();
  156 |         }
  157 | 
  158 |         if (row.AutoExp_ArcRSPCheck) {
  159 |             await visible40(this.AutoExp_ArcRSPCheck);
  160 |             await this.AutoExp_ArcRSPCheck.check();
  161 |         }
  162 | 
  163 |         if (row.Keywords) {
  164 |             await visible40(this.KeywordTxt);
  165 |             await this.KeywordTxt.fill(row.Keywords);
  166 |         }
  167 | 
  168 |         //Product Specific Configuration
  169 | 
  170 |         if (row.ProductSpecific?.toLowerCase() === "yes") {
  171 |             await visible40(this.ProdCheck);
  172 |             await this.ProdCheck.check();
  173 |             await this.ProdExpIcon.click();
  174 |             console.log('DEBUG itemName:', JSON.stringify(row.itemName)); //Added
  175 |             if (row.itemName) {
  176 |                 const itemsToSelect = row.itemName.split(',').map(s => s.trim());
  177 |                 for (const itemName of itemsToSelect) {
  178 |                     const familyRow = this.page
  179 |                         .locator('label.cbx-main')
  180 |                         .filter({ hasText: itemName });
  181 | 
  182 |                     const checkbox = familyRow.locator('input[type="checkbox"]');
  183 | 
> 184 |                     if (!(await checkbox.isChecked())) {
      |                                          ^ Error: locator.isChecked: Error: strict mode violation: locator('label.cbx-main').filter({ hasText: 'Dolo' }).locator('input[type="checkbox"]') resolved to 4 elements:
  185 |                         await familyRow.locator('.checkmark').click();
  186 |                     }
  187 |                 }
  188 |             }
  189 | 
  190 |             await this.SlctProductOkBtn.click();
  191 |         }
  192 | 
  193 |         // Save & Check-In action
  194 |         await visible40(this.Save_CheckINBtn);
  195 |         await waitForProcessingToFinish(this.page)
  196 |         await this.Save_CheckINBtn.click();
  197 |         await waitForProcessingToFinish(this.page)
  198 |         await visible40(this.SRCheckInHeading);
  199 |         await waitForProcessingToFinish(this.page)
  200 |         await this.ReasonforCheckIntxt.fill("Created & Saved SR Module with Mandatory data");
  201 |         await visible40(this.CfrmCheckInBtn);
  202 |         await waitForProcessingToFinish(this.page)
  203 |         await this.CfrmCheckInBtn.click();
  204 |     }
  205 | 
  206 | 
  207 | }
  208 | 
```