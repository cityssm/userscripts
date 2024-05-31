// ==UserScript==
// @name         Spiceworks - Help Desk - Remove Unused Sidebar Tools
// @namespace    https://github.com/cityssm/userscripts
// @match        https://on.spiceworks.com/*
// @match        https://*.on.spiceworks.com/*
// @match        https://apps.spiceworks.com/tools/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @version      0.1.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Detects unused tools (after first click), and removes them from the help desk sidebar.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/spiceworks/helpdeskSidebar.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    /*
     * Contracts
     */
    var _a, _b, _c, _d;
    const hideContractsStorageKey = 'spiceworks_hideContracts';
    const hideContracts = GM_getValue(hideContractsStorageKey);
    if (hideContracts !== undefined && hideContracts) {
        (_a = document
            .querySelector('.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/contracts"]')) === null || _a === void 0 ? void 0 : _a.remove();
    }
    else if (hideContracts === undefined &&
        window.location.href ===
            'https://apps.spiceworks.com/tools/contracts/registration') {
        GM_setValue(hideContractsStorageKey, true);
    }
    /*
     * Connectivity Dashboard
     */
    const hideConnectivityStorageKey = 'spiceworks_hideConnectivity';
    const hideConnectivity = GM_getValue(hideConnectivityStorageKey);
    if (hideConnectivity !== undefined && hideConnectivity) {
        (_b = document
            .querySelector('.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/connectivity-dashboard"]')) === null || _b === void 0 ? void 0 : _b.remove();
    }
    else if (hideConnectivity === undefined &&
        window.location.href ===
            'https://apps.spiceworks.com/tools/connectivity-dashboard/registration') {
        GM_setValue(hideConnectivityStorageKey, true);
    }
    /*
     * Settings (Restore Hidden)
     */
    function clearHideSettings() {
        GM_deleteValue(hideContractsStorageKey);
        GM_deleteValue(hideConnectivityStorageKey);
        alert('The hidden sidebar items will be restored on refresh.');
    }
    if (window.location.href.includes('spiceworks.com/settings/my-settings')) {
        (_c = document
            .querySelector('.settings-app-section .tw-divide-dotted')) === null || _c === void 0 ? void 0 : _c.insertAdjacentHTML('beforeend', `<div class="row tw-flex tw-items-center tw-px-3 no-gutters">
          <div class="tw-w-5/12"></div>
          <div class="tw-w-7/12">
            <button id="cityssm_restoreSidebar" class="chd-btn-dusk tw-flex dark:tw-bg-dusk-200 dark:tw-text-earl-900">
              <span class="tw-ml-2 tw-hidden tw-whitespace-nowrap lg:tw-block">Restore Hidden Sidebar Items</span>
            </button>
          </div>
          </div>`);
        (_d = document
            .querySelector('#cityssm_restoreSidebar')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', clearHideSettings);
    }
})();
