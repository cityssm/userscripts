// ==UserScript==
// @name           FASTER Web - Advanced Search Action Links
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Home/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Setup/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Reports/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Integrations/*
// @grant          none
// @version        1.0.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Includes easier-to-click links to the advanced search pages in the Actions menus.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/advancedSearchActions.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const lowerCasePathName = window.location.pathname.toLowerCase()

  if (lowerCasePathName.includes('/domains/assets/')) {
    document
      .querySelector('#ctl00_Navigation_RadMenuActions ul')
      ?.insertAdjacentHTML(
        'afterbegin',
        `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Assets/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Asset Search</span>
          </a>
          </li>`
      )
  } else if (lowerCasePathName.includes('/domains/parts/')) {
    document
      .querySelector('#ctl00_Navigation_RadMenuInventoryActions ul')
      ?.insertAdjacentHTML(
        'afterbegin',
        `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Parts/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Inventory Search</span>
          </a>
          </li>`
      )
  } else if (lowerCasePathName.includes('/domains/maintenance/')) {
    document
      .querySelector('#ctl00_Navigation_RadMenuActions ul')
      ?.insertAdjacentHTML(
        'afterbegin',
        `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Maintenance/WorkOrder/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Work Order Search</span>
          </a>
          </li>
          <li style="width:100%;" class="rmItem">
            <a class="rmLink rmRootLink" href="/FASTER/Domains/Maintenance/DirectCharge/Search/Default.aspx?str=" style="font-size:9pt;">
              <span class="rmText">🔍 Direct Charge Search</span>
            </a>
          </li>`
      )
  } else if (lowerCasePathName.includes('/domains/fuel/')) {
    document
      .querySelector('#ctl00_Navigation_RadMenuActions ul')
      ?.insertAdjacentHTML(
        'afterbegin',
        `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Fuel/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Fuel Search</span>
          </a>
          </li>`
      )
  } else if (lowerCasePathName.includes('/domains/accounting/')) {
    document
      .querySelector('#ctl00_Navigation_RadMenuActions ul')
      ?.insertAdjacentHTML(
        'afterbegin',
        `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Accounting/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Accounting Search</span>
          </a>
          </li>`
      )
  } else if (lowerCasePathName.includes('/domains/vendors/')) {
    document
      .querySelector('#ctl00_Navigation_RadMenuActions ul')
      ?.insertAdjacentHTML(
        'afterbegin',
        `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Vendors/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Vendor Search</span>
          </a>
          </li>`
      )
  }
})()
