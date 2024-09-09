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
    GM_addStyle(`
    /* Action Menus */
    
    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink,
    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink:hover,
    #ctl00_RadPane_Menu .RadMenu_Outlook .rmText {
      background-image: none !important;
    }

    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink {
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
    }
    
    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink .rmText {
      padding-top: 5px;
      padding-bottom: 5px;
    }
      
    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink.rmFocused,
    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink:hover,
    #ctl00_RadPane_Menu .RadMenu_Outlook a.rmLink:focus {
      background-color: #ffd69a;
      border-color: black;
    }`);
})();
