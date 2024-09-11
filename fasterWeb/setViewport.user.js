// ==UserScript==
// @name         FASTER Web - Set Viewport
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        none
// @version      0.3.1-dev
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Attempts to reduce the amount of zooming required on smaller screens.
// @run-at       document-body
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/setViewport.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const defaultViewportWidth = 800;
    const specialViewportWidth = 1100;
    const specialPages = [
        '/domains/assets/search/default.aspx',
        '/domains/fuel/search/default.aspx',
        '/domains/maintenance/directcharge/search/default.aspx',
        '/domains/maintenance/workorder/search/default.aspx'
    ];
    if (document.querySelector('meta[name="viewport"]') === null) {
        const currentPage = window.location.pathname.toLowerCase();
        let viewportWidth = defaultViewportWidth;
        for (const specialPage of specialPages) {
            console.log(specialPage);
            if (currentPage.includes(specialPage)) {
                console.log('special: ' + specialPage);
                viewportWidth = specialViewportWidth;
                break;
            }
        }
        document.head.insertAdjacentHTML('beforeend', `<meta name="viewport" content="width=${viewportWidth}" />`);
    }
})();
