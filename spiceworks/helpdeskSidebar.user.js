// ==UserScript==
// @name         Spiceworks - Help Desk - Remove Unused Sidebar Tools
// @namespace    https://github.com/cityssm/userscripts
// @match        https://on.spiceworks.com/*
// @match        https://*.on.spiceworks.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @version      0.1.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds menu options to remove unused tools from the help desk sidebar.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/spiceworks/helpdeskSidebar.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    /*
     * Device / Software Inventory
     */
    var _a, _b, _c, _d;
    const hideInventoryStorageKey = 'spiceworks_hideInventory';
    const hideInventory = GM_getValue(hideInventoryStorageKey, false);
    if (hideInventory) {
        (_a = document
            .querySelector('.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/device-inventory"]')) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document
            .querySelector('.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/device-inventory/software"]')) === null || _b === void 0 ? void 0 : _b.remove();
    }
    else {
        GM_registerMenuCommand('Hide Device/Software Inventory', () => {
            GM_setValue(hideInventoryStorageKey, true);
            alert('The inventory sidebar items will be hidden on refresh.');
        });
    }
    /*
     * Contracts
     */
    const hideContractsStorageKey = 'spiceworks_hideContracts';
    const hideContracts = GM_getValue(hideContractsStorageKey, false);
    if (hideContracts) {
        (_c = document
            .querySelector('.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/contracts"]')) === null || _c === void 0 ? void 0 : _c.remove();
    }
    else {
        GM_registerMenuCommand('Hide Contracts', () => {
            GM_setValue(hideContractsStorageKey, true);
            alert('The contracts sidebar item will be hidden on refresh.');
        });
    }
    /*
     * Connectivity Dashboard
     */
    const hideConnectivityStorageKey = 'spiceworks_hideConnectivity';
    const hideConnectivity = GM_getValue(hideConnectivityStorageKey, false);
    if (hideConnectivity) {
        (_d = document
            .querySelector('.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/connectivity-dashboard"]')) === null || _d === void 0 ? void 0 : _d.remove();
    }
    else {
        GM_registerMenuCommand('Hide Connectivity Dashboard', () => {
            GM_setValue(hideConnectivityStorageKey, true);
            alert('The connectivity dashboard sidebar item will be hidden on refresh.');
        });
    }
    /*
     * Restore Hidden Tools
     */
    GM_registerMenuCommand('Restore Hidden Sidebar Items', () => {
        GM_deleteValue(hideContractsStorageKey);
        GM_deleteValue(hideConnectivityStorageKey);
        GM_deleteValue(hideInventoryStorageKey);
        alert('The hidden sidebar items will be restored on refresh.');
    });
})();
