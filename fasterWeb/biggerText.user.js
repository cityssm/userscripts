// ==UserScript==
// @name         FASTER Web - Increase Font Sizes
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Set the zoom level to 130%, making the text more readable.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/biggerText.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a;
    const htmlElement = document.querySelector('html');
    htmlElement.style.zoom = '1.3';
    (_a = window.TelerikCommonScripts) === null || _a === void 0 ? void 0 : _a.repaintChildren(document);
})();
