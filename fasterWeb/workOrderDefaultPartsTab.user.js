// ==UserScript==
// @name         FASTER Web - Maintenance - Work Order / Direct Charge Default Parts Tab
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/DirectChargeMaster.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/WorkOrderMaster.aspx
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Changes the default tab to "Parts" when opening a work order or direct charge, helping storeroom staff save a click.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/workOrderDefaultPartsTab.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const referrer = document.referrer;
    const searchParameters = new URL(window.location.toString()).searchParams;
    if (searchParameters.has('directChargeID') &&
        !referrer.includes(`directChargeID=${searchParameters.get('directChargeID')}`)) {
        window.location.href = `/FASTER/Domains/Maintenance/DirectCharge/PartsIssueDetail.aspx?directChargeID=${searchParameters.get('directChargeID')}`;
    }
    else if (searchParameters.has('id') &&
        !referrer.includes(`directChargeID=${searchParameters.get('id')}`)) {
        window.location.href = `/FASTER/Domains/Maintenance/DirectCharge/PartsIssueDetail.aspx?directChargeID=${searchParameters.get('id')}`;
    }
    else if (searchParameters.has('workOrderID') &&
        !referrer.includes(`workOrderID=${searchParameters.get('workOrderID')}`)) {
        window.location.href = `/FASTER/Domains/Maintenance/WorkOrder/PartsIssuedetail.aspx?workOrderID=${searchParameters.get('workOrderID')}`;
    }
})();
