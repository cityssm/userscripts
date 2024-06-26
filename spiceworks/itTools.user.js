// ==UserScript==
// @name         Spiceworks - IT Tools Menu Links
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.spiceworks.com/*
// @grant        none
// @version      1.1.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Replaces the "IT Tools" marketing links with links to the actual tools.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/spiceworks/itTools.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const navbarElementSelector = '.lean-navbar, header.d-header';
    let maxRetryCount = 10;
    const retryMillis = 1000;
    let observer;
    function applyMenuChanges(navbarElement) {
        const cloudHelpDeskElement = navbarElement.querySelector('a[href*="spiceworks.com/free-cloud-help-desk"]');
        if (cloudHelpDeskElement !== null) {
            ;
            cloudHelpDeskElement.href =
                'https://on.spiceworks.com/tickets/';
        }
        const inventoryElement = navbarElement.querySelector('a[href*="spiceworks.com/free-pc-network-inventory"]');
        if (inventoryElement !== null) {
            ;
            inventoryElement.href =
                'https://apps.spiceworks.com/tools/device-inventory/';
        }
        const connectivityElement = navbarElement.querySelector('a[href*="spiceworks.com/free-network-troubleshooting"]');
        if (connectivityElement !== null) {
            ;
            connectivityElement.href =
                'https://apps.spiceworks.com/tools/connectivity-dashboard/';
        }
    }
    function lookForMenu() {
        const navbarElement = document.querySelector(navbarElementSelector);
        if (navbarElement === null) {
            maxRetryCount -= 1;
            if (maxRetryCount > 0) {
                setTimeout(lookForMenu, retryMillis);
            }
        }
        else {
            applyMenuChanges(navbarElement);
            observer = new MutationObserver(resetAndRetry);
            observer.observe(navbarElement, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }
    }
    function resetAndRetry() {
        maxRetryCount = 10;
        if (observer !== undefined) {
            observer.disconnect();
        }
        lookForMenu();
    }
    addEventListener('popstate', resetAndRetry);
    lookForMenu();
})();
