// ==UserScript==
// @name         FASTER Web - Reports - Remove "Basic Print"
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Reports/ReportViewer.aspx
// @grant        none
// @version      1.0.1
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Removes the unsupported "Basic Print" button.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/reportHideBasicPrint.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a;
    const printButtonContainerElement = (_a = document.querySelector('#PrintRadButton')) === null || _a === void 0 ? void 0 : _a.parentElement;
    if (printButtonContainerElement !== null &&
        printButtonContainerElement !== undefined) {
        printButtonContainerElement.style.display = 'none';
    }
})();
