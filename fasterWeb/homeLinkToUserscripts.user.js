// ==UserScript==
// @name         FASTER Web - Home - Link to Userscripts
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Home/Default.aspx
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds a link to the City's Userscripts page to the Actions menu.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/homeLinkToUserscripts.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a;
    const linkHTML = `<li style="width:100%;" class="rmItem">
    <a class="rmLink rmRootLink" href="https://cityssm.github.io/userscripts/#userscripts-for-faster-web" target="_blank" style="font-size:9pt;">
      <span class="rmText">Add Userscripts</span>
    </a>
    </li>`;
    (_a = document
        .querySelector('#ctl00_Navigation_RadMenuHomeNavigation ul')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', linkHTML);
})();
