// ==UserScript==
// @name         FASTER Web - Advanced Search Results
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Assets/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Fuel/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Vendors/Search/Default.aspx
// @grant        none
// @version      1.0.1
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Loads search results immediately on Advanced Search pages.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/advancedSearchResults.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const isPost = document.referrer === window.location.href

  if (!isPost) {
    document.body.style.opacity = '0'

    try {
      ;(
        document.querySelector(
          'a.rfdSkinnedButton input[type="submit"]'
        ) as HTMLInputElement
      ).click()
    } catch {
      document.body.style.opacity = '1'
    }
  }
})()
