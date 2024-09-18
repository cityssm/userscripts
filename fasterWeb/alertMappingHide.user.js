// ==UserScript==
// @name           FASTER Web - Maintenance - Hide "Alert Mapping & Filtering" Action
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/*
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/PartIssueSearch.aspx
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/Search/Default.aspx
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/Search/Default.aspx
// @grant          none
// @version        1.0.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    For users that don't have the "Alerts Mapping Add-on", the link is unnecessary.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/alertMappingHide.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a, _b;
    (_b = (_a = document
        .querySelector('#ctl00_RadPane_Menu a.rmLink[href$="AlertLookup.aspx"]')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
})();
