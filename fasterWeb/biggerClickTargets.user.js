// ==UserScript==
// @name         FASTER Web - Bigger Click Targets
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        GM_addStyle
// @version      0.4.0-dev
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
    .RadMenu_Outlook .rmHorizontal .rmLeftImage,
    .RadMenu_Outlook .rmHorizontal .rmText {
      padding-top: 5px !important;
      padding-bottom: 5px !important;
    }
      
    .RadMenu_Outlook a.rmLink.rmFocused,
    .RadMenu_Outlook a.rmLink:hover,
    .RadMenu_Outlook a.rmLink:focus {
      background-color: ${selectedYellow};
      border-color: black;
    }`);
    /*
     * Remove inline height styles
     */
    const observerSelectors = [
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_TopRadPane'
    ];
    const selectors = [
        ...observerSelectors,
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_ActivateOrganizationTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_AssetOverrideTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_BillingTypeTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_ChargeTypeandElementTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_ContactDetailTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_DepartmentOverrideTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_GenerateCycleTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_MiddleRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_panetop',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_PartOrderSearchTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_ReorderPartTopRadPane',
        '#RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Top'
    ];
    function removeHeights(observerOnly = false) {
        for (const selector of observerOnly ? observerSelectors : selectors) {
            const element = document.querySelector(selector);
            if (element !== null) {
                ;
                element.style.height = 'auto';
            }
        }
    }
    removeHeights(false);
    /*
     * Set up observer
     */
    const observerElement = document.querySelector(observerSelectors.join(', '));
    if (observerElement !== null) {
        const observer = new MutationObserver(() => {
            removeHeights(true);
        });
        observer.observe(document, {
            attributes: true,
            attributeFilter: ['style'],
            subtree: true
        });
    }
})();
