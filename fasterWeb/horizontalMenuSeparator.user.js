// ==UserScript==
// @name           FASTER Web - Horizontal Menu Separators
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Login/*
// @grant          none
// @version        1.1.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Replaces the thick block separator with a thin black line.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/horizontalMenuSeparator.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const menuSeparatorElements = document.querySelectorAll('.RadMenu .rmHorizontal .rmItem.rmSeparator');
    for (const menuSeparatorElement of menuSeparatorElements) {
        menuSeparatorElement.role = 'presentation';
        menuSeparatorElement.textContent = '|';
        menuSeparatorElement.style.padding = '0 5px';
        menuSeparatorElement.classList.remove('rmSeparator');
    }
})();
