// ==UserScript==
// @name         FASTER Web - Advanced Search Results
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/CreditCard/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/VendorCredit/Search.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/BillingAdjustment/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/Receivable/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Accounting/ManagePayables/Search.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Assets/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Assets/WarrantyClaim/Search/ClaimSearch.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Assets/WarrantyClaim/Search/PotentialRepairSearch.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Fuel/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartList/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartOrder/Search.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartReceive/PartOrderSeach.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartReceive/Search.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartReceive/SearchInvoice.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/PartIssueSearch.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/TransferInventory/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/TransferInventory/PartTransfer-In.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/VendorReturn/SearchReturns.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartRequest/PartsRequest.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Vendors/Search/Default.aspx
// @grant        none
// @version      1.1.4
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Loads search results immediately on Advanced Search and other search pages.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/advancedSearchResults.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const isPost = document.referrer === window.location.href;
    if (!isPost) {
        document.body.style.opacity = '0';
        const submitButtonSelectors = [
            'a.rfdSkinnedButton input[type="submit"]:not(#ctl00_ContentPlaceHolder_Content_AddNewTransfersButton)',
            'input.rbDecorated[type="submit"]',
            '#ctl00_ContentPlaceHolder_Content_RadDockSearch_C_SearchButton',
            '#ctl00_ContentPlaceHolder_Content_SearchCriteriaRadDock_C_SearchButton',
            '#ctl00_ContentPlaceHolder_Content_BillingAdjustmentSearchRadDock_C_SearchButton'
        ];
        try {
            ;
            document.querySelector(submitButtonSelectors.join(', ')).click();
        }
        catch (_a) {
        }
        finally {
            document.body.style.opacity = '1';
        }
    }
})();
