// ==UserScript==
// @name           FASTER Web - Exact Match Default
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Login/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Reports/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Domains/Setup/*
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.0.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Remembers the last used "Exact Match" checkbox setting by domain in the menu search.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/exactMatch.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const exactMatchCheckboxElement = document.querySelector('input#ctl00_Navigation_ExactMatchCheckBox');
    if (exactMatchCheckboxElement === null) {
        return;
    }
    const fasterPathPieces = window.location.pathname.split('/');
    let fasterDomain = '';
    for (const [index, fasterPathPiece] of fasterPathPieces.entries()) {
        if (fasterPathPiece === 'Domains') {
            fasterDomain = fasterPathPieces[index + 1];
            break;
        }
    }
    const exactMatchStorageKey = `fasterWeb_exactMatch_${(fasterDomain !== null && fasterDomain !== void 0 ? fasterDomain : '').toLowerCase()}`;
    const exactMatchSetting = GM_getValue(exactMatchStorageKey, true);
    console.log(exactMatchSetting);
    exactMatchCheckboxElement.checked = exactMatchSetting;
    exactMatchCheckboxElement.addEventListener('change', () => {
        GM_setValue(exactMatchStorageKey, exactMatchCheckboxElement.checked);
    });
})();
