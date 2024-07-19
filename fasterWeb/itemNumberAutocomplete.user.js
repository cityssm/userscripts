// ==UserScript==
// @name         FASTER Web - Item Number Autocomplete
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/PartsIssueAdd.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/PartsIssueAdd.aspx
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds autocomplete suggestions to item number input fields. Define "itemNumbers.json" URL in options.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/itemNumberAutocomplete.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    /*
     * Load Item Numbers
     */
    const itemNumbersJsonPathStorageKey = 'fasterWeb_itemNumbersJsonPath';
    const itemNumbersDatalistId = 'ssmItemNumbersDatalist';
    let itemNumbersJsonPath = GM_getValue(itemNumbersJsonPathStorageKey, 'https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/data/itemNumbers.json');
    function loadItemNumbers() {
        GM_xmlhttpRequest({
            method: 'GET',
            responseType: 'json',
            url: itemNumbersJsonPath,
            onload: (response) => {
                var _a, _b;
                const itemNumbers = (_b = (_a = response === null || response === void 0 ? void 0 : response.response) === null || _a === void 0 ? void 0 : _a.itemNumbers) !== null && _b !== void 0 ? _b : [];
                const dataListElement = document.createElement('datalist');
                dataListElement.id = itemNumbersDatalistId;
                for (const itemNumber of itemNumbers) {
                    const optionElement = document.createElement('option');
                    optionElement.value = itemNumber;
                    dataListElement.append(optionElement);
                }
                document.body.append(dataListElement);
            }
        });
    }
    loadItemNumbers();
    /*
     * Set List Attribute
     */
    const inputElementSelectors = ['input#PartNumberRadTextBox'];
    function addListAttribute() {
        var _a;
        for (const inputElementSelector of inputElementSelectors) {
            const elements = document.querySelectorAll(inputElementSelector);
            for (const element of elements) {
                if (((_a = element.getAttribute('list')) !== null && _a !== void 0 ? _a : '') === '') {
                    element.setAttribute('list', itemNumbersDatalistId);
                }
            }
        }
    }
    const observer = new MutationObserver(addListAttribute);
    observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });
    /*
     * Set Config Menu Option
     */
    GM_registerMenuCommand('Set "itemNumbers.json" path', () => {
        const newJsonPath = prompt('URL to itemNumbers.json', itemNumbersJsonPath);
        if (newJsonPath !== null) {
            itemNumbersJsonPath = newJsonPath;
            GM_setValue(itemNumbersJsonPathStorageKey, itemNumbersJsonPath);
            alert('New URL will be used after next page load.');
        }
    });
})();
