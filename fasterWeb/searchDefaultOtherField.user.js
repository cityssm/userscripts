// ==UserScript==
// @name           FASTER Web - Other Field Default
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Accounting/Search/Default.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Assets/Search/Default.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Fuel/Search/Default.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/Search/Default.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/Search/Default.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartOrder/Search.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartReceive/PartOrderSeach.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartReceive/Search.aspx
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/Default.aspx
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.0.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Remembers the last used "Other" field in search filters.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/searchDefaultOtherField.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a, _b;
    const page = window.location.pathname;
    const storageKey = `fasterWeb_otherField_${page}`;
    const otherIndex = GM_getValue(storageKey, 0);
    const otherSelectorIdPrefixes = [
        '#ctl00_ContentPlaceHolder_Content_RadDockSearch_C_OtherRadComboBox_',
        '#ctl00_ContentPlaceHolder_Content_SearchRadDock_C_OtherRadComboBox_',
        '#ctl00_ContentPlaceHolder_Content_RadDockSearchCriteria_C_OtherRadComboBox_',
        '#ctl00_ContentPlaceHolder_Content_PartOrderSearchRadDock_C_OtherRadComboBox_'
    ];
    let otherSelectorsFound = false;
    let otherInputSelector = '';
    let otherDropdownSelector = '';
    for (const otherSelectorIdPrefix of otherSelectorIdPrefixes) {
        otherInputSelector = otherSelectorIdPrefix + 'Input';
        otherDropdownSelector = otherSelectorIdPrefix + 'DropDown';
        if (document.querySelector(otherInputSelector) !== null &&
            document.querySelector(otherDropdownSelector) !== null) {
            otherSelectorsFound = true;
            break;
        }
    }
    if (!otherSelectorsFound) {
        console.log('Selectors not found.');
        return;
    }
    if (otherIndex !== 0) {
        ;
        document.querySelector(otherInputSelector).focus();
        (_b = (_a = document
            .querySelector(otherDropdownSelector)) === null || _a === void 0 ? void 0 : _a.querySelectorAll('li').item(otherIndex)) === null || _b === void 0 ? void 0 : _b.click();
        document.querySelector(otherInputSelector).blur();
    }
    function saveIndex(clickEvent) {
        var _a;
        const index = Number.parseInt((_a = clickEvent.currentTarget.dataset.index) !== null && _a !== void 0 ? _a : '0', 10);
        GM_setValue(storageKey, index);
    }
    for (const [index, liElement] of document.querySelector(otherDropdownSelector)
        .querySelectorAll('li')
        .entries()) {
        liElement.dataset.index = index.toString();
        liElement.addEventListener('click', saveIndex);
    }
})();
