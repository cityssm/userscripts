// ==UserScript==
// @name         FASTER Web - Reports - Remove "Basic Print"
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Reports/ReportViewer.aspx
// @grant        none
// @version      1.2.0
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
    const printButtonElement = document.querySelector('#PrintRadButton');
    if (printButtonElement !== null &&
        printButtonElement !== undefined) {
        printButtonElement.style.opacity = '0';
        printButtonElement.style.width = '0px';
        printButtonElement.style.display = 'none';
    }
})();
