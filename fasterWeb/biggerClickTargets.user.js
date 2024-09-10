// ==UserScript==
// @name         FASTER Web - Bigger Click Targets
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        GM_addStyle
// @version      0.1.0-dev
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Increases the size of some click targets, increasing usability on smaller screens.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/biggerClickTargets.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const selectedYellow = '#ffd69a';
    GM_addStyle(`  
    .RadMenu_Outlook .rmLink,
    .RadMenu_Outlook .rmLink:hover,
    .RadMenu_Outlook .rmText {
      background-image: none !important;
    }

    .RadMenu_Outlook .rmLink {
      border: 1px solid transparent;
    }

    #ctl00_RadPane_Menu .RadMenu_Outlook .rmLink {
      border-width: 1px 0;
    }
    
    .RadMenu_Outlook .rmText,
    .RadMenu_Outlook .rmHorizontal .rmText {
      padding-top: 5px !important;
      padding-bottom: 5px !important;
    }
      
    .RadMenu_Outlook .rmLink.rmFocused,
    .RadMenu_Outlook .rmLink:hover,
    .RadMenu_Outlook .rmLink:focus {
      background-color: ${selectedYellow};
      border-color: black;
    }`);
    /*
     * Remove inline height styles
     */
    const selectors = ['#RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Top', '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_MiddleRadPane'];
    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element !== null) {
            ;
            element.style.height = 'auto';
        }
    }
})();
