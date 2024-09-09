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
;
(() => {
    var _a, _b, _c, _d, _e, _f;
    const lowerCasePathName = window.location.pathname.toLowerCase();
    if (lowerCasePathName.includes('/domains/assets/')) {
        (_a = document
            .querySelector('#ctl00_Navigation_RadMenuActions ul')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Assets/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Asset Search</span>
          </a>
          </li>`);
    }
    else if (lowerCasePathName.includes('/domains/parts/')) {
        (_b = document
            .querySelector('#ctl00_Navigation_RadMenuInventoryActions ul')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterbegin', `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Parts/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Inventory Search</span>
          </a>
          </li>`);
    }
    else if (lowerCasePathName.includes('/domains/maintenance/')) {
        (_c = document
            .querySelector('#ctl00_Navigation_RadMenuActions ul')) === null || _c === void 0 ? void 0 : _c.insertAdjacentHTML('afterbegin', `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Maintenance/WorkOrder/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Work Order Search</span>
          </a>
          </li>
          <li style="width:100%;" class="rmItem">
            <a class="rmLink rmRootLink" href="/FASTER/Domains/Maintenance/DirectCharge/Search/Default.aspx?str=" style="font-size:9pt;">
              <span class="rmText">🔍 Direct Charge Search</span>
            </a>
          </li>`);
    }
    else if (lowerCasePathName.includes('/domains/fuel/')) {
        (_d = document
            .querySelector('#ctl00_Navigation_RadMenuActions ul')) === null || _d === void 0 ? void 0 : _d.insertAdjacentHTML('afterbegin', `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Fuel/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Fuel Search</span>
          </a>
          </li>`);
    }
    else if (lowerCasePathName.includes('/domains/accounting/')) {
        (_e = document
            .querySelector('#ctl00_Navigation_RadMenuActions ul')) === null || _e === void 0 ? void 0 : _e.insertAdjacentHTML('afterbegin', `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Accounting/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Accounting Search</span>
          </a>
          </li>`);
    }
    else if (lowerCasePathName.includes('/domains/vendors/')) {
        (_f = document
            .querySelector('#ctl00_Navigation_RadMenuActions ul')) === null || _f === void 0 ? void 0 : _f.insertAdjacentHTML('afterbegin', `<li style="width:100%;" class="rmItem">
          <a class="rmLink rmRootLink" href="/FASTER/Domains/Vendors/Search/Default.aspx?str=" style="font-size:9pt;">
            <span class="rmText">🔍 Vendor Search</span>
          </a>
          </li>`);
    }
})();
