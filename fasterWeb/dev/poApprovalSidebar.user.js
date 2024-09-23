// ==UserScript==
// @name         FASTER Web - Inventory - Purchase Order Approvals
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartOrder/OrderLineItems.aspx
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @version      1.0.0-dev
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds a purchase order approval process to purchase orders.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/poApprovalSidebar.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a, _b, _c, _d, _e, _f;
    const orderDetails = {
        tenant: window.location.hostname.split('.')[0],
        orderNumber: (_b = (_a = document.querySelector('#ctl00_ContentPlaceHolder_Content_HiddenLabel')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '',
        orderStatus: (_d = (_c = document.querySelector('#ctl00_ContentPlaceHolder_Content_OrderDetailRadDock_C_OrderDetailDetailMenu_OrderStatusValueLabel')) === null || _c === void 0 ? void 0 : _c.textContent) !== null && _d !== void 0 ? _d : '',
        orderTotal: Number.parseFloat((_f = (_e = document.querySelector('#ctl00_ContentPlaceHolder_Content_OrderLineItemsRadDock_C_OrderTotalValueLabel')) === null || _e === void 0 ? void 0 : _e.textContent) !== null && _f !== void 0 ? _f : '0')
    };
    if (orderDetails.orderNumber === '') {
        return;
    }
    const fasterWebHelperUrlStorageKey = 'fasterWeb_fasterWebHelperUrl';
    let fasterWebHelperUrl = GM_getValue(fasterWebHelperUrlStorageKey, '');
    const userKeyGuidStorageKey = 'fasterWeb_userKeyGuid';
    let userKeyGuid = GM_getValue(userKeyGuidStorageKey, '');
    function fixLayout() {
        var _a, _b;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        ;
        (_b = (_a = window.unsafeWindow) === null || _a === void 0 ? void 0 : _a.TelerikCommonScripts) === null || _b === void 0 ? void 0 : _b.repaintChildren(document);
    }
    let sidebarElement;
    function createSidebar() {
        /*
         * Move the main form into the layout container
         */
        const mainForm = document.querySelector('#aspnetForm');
        if (mainForm === null || document.querySelector('#ssmLayout') !== null) {
            return;
        }
        mainForm.style.opacity = '0';
        /*
         * Apply the styles
         */
        GM_addStyle(`
      #ssmLayout {
        display: flex;
        flex-direction: row;
        max-width: 100vw;
        height: 100vh;
      }
  
      #aspnetForm {
        width: 80vw;
      }
  
      #ssmLayout > * {
        display: block;
      }
  
      #ctl00_RadSplitter_Master,
      #RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Top,
      #RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Bottom,
      #ctl00_RadSplitter_Bottom,
      #RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Content,
      #ctl00_ContentPlaceHolder_Content_MainRadSplitter,
      #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_BottomRadPane {
        max-width: 100% !important;
      }
  
      aside {
        width: 20vw;
        box-sizing: border-box;
        padding: 10px;
        border-left: 4px solid #d6e6f4;
      }`);
        /*
         * Add the layout container
         */
        const layoutContainerElement = document.createElement('div');
        layoutContainerElement.id = 'ssmLayout';
        document.body.append(layoutContainerElement);
        layoutContainerElement.append(mainForm);
        fixLayout();
        /*
         * Build the sidebar
         */
        sidebarElement = document.createElement('aside');
        sidebarElement.innerHTML = '<h2>Purchase Order Approval</h2>';
        layoutContainerElement.append(sidebarElement);
        fixLayout();
        mainForm.style.opacity = '1';
    }
    function getNewFasterWebHelperUrl() {
        const newFasterWebHelperUrl = window.prompt('FASTER Web Helper Root URL', fasterWebHelperUrl);
        if (newFasterWebHelperUrl !== null) {
            fasterWebHelperUrl = newFasterWebHelperUrl.trim();
            GM_setValue(fasterWebHelperUrlStorageKey, fasterWebHelperUrl);
            window.location.reload();
        }
    }
    function initializeMissingFasterWebHelperUrl() {
        var _a;
        sidebarElement.insertAdjacentHTML('beforeend', `<h3>FASTER Web Helper Configuration</h3>
        <p>
          To get started, you need the root URL for a FASTER Web Helper application.<br />
          ex. "http://serverNameOrIp:9000"
        </p>
        <p>
          <button type="button">
          Add your FASTER Web Helper Root URL
          </button>
        </p>`);
        (_a = sidebarElement
            .querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', getNewFasterWebHelperUrl);
    }
    function initializeMissingUserKeyGuid() {
        var _a;
        sidebarElement.insertAdjacentHTML('beforeend', `<h3>Log into the Approval System</h3>
        <p>
          To trigger the approval process, and properly track approvals,
          you need to log in with your domain credentials.
        </p>
        <form>
          <p>
            <label for="poApprovalSidebar_userName">Domain User Name</label><br />
            <input id="poApprovalSidebar_userName" name="userName" type="text" required />
          </p>
          <p>
            <label for="poApprovalSidebar_password">Password</label><br />
            <input id="poApprovalSidebar_password" name="password" type="password" required />
          </p>
          <p>
            <button type="submit">
              Log In
            </button>
          </p>
        </form>`);
        (_a = sidebarElement
            .querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (submitEvent) => {
            submitEvent.preventDefault();
            const formElement = submitEvent.currentTarget;
            const urlSearchParameters = new URLSearchParams();
            urlSearchParameters.set('userName', formElement.querySelector('input[name="userName"]').value);
            urlSearchParameters.set('password', formElement.querySelector('input[name="password"]').value);
            GM_xmlhttpRequest({
                url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doLogin`,
                method: 'POST',
                responseType: 'json',
                data: urlSearchParameters,
                onload(response) {
                    const loginResponse = response.response;
                    if (loginResponse.isLoggedIn) {
                        userKeyGuid = loginResponse.userKeyGuid;
                        GM_setValue(userKeyGuidStorageKey, userKeyGuid);
                        alert('User key saved successfully.');
                        window.location.reload();
                    }
                    else {
                        alert('Login failed. Please try again.');
                    }
                },
                onerror(response) {
                    alert('FASTER Web Helper currently unavailable.');
                }
            });
        });
    }
    function initializeApprovalView() {
        GM_xmlhttpRequest({
            url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doGetPurchaseOrder`,
            method: 'POST',
            responseType: 'json',
            data: new URLSearchParams({
                tenant: orderDetails.tenant,
                orderNumber: orderDetails.orderNumber
            }),
            onload(response) {
                var _a, _b;
                const purchaseOrderResponse = response.response;
                if (!purchaseOrderResponse.isLoggedIn) {
                    userKeyGuid = '';
                    GM_setValue(userKeyGuidStorageKey, userKeyGuid);
                    window.location.reload();
                    return;
                }
                if (purchaseOrderResponse.purchaseOrder === undefined) {
                    sidebarElement.insertAdjacentHTML('beforeend', '<p>No approval currently tracked.</p>');
                    if (orderDetails.orderStatus === 'Open' &&
                        orderDetails.orderTotal > 0) {
                        sidebarElement.insertAdjacentHTML('beforeend', `<p>
                <button type="button">Start Approval</button>
                </p>`);
                        (_a = sidebarElement
                            .querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                            GM_xmlhttpRequest({
                                url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doCreatePurchaseOrder`,
                                method: 'POST',
                                responseType: 'json',
                                data: new URLSearchParams({
                                    tenant: orderDetails.tenant,
                                    orderNumber: orderDetails.orderNumber,
                                    orderTotal: orderDetails.orderTotal.toString()
                                }),
                                onload(response) {
                                    const createResponse = response.response;
                                    if (!createResponse.isLoggedIn) {
                                        alert('Approval session expired. Refreshing...');
                                        window.location.reload();
                                    }
                                    else if (createResponse.success) {
                                        window.location.reload();
                                    }
                                    else {
                                        alert(createResponse.message);
                                    }
                                }
                            });
                        });
                    }
                }
                else {
                    sidebarElement.insertAdjacentHTML('beforeend', `<table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Approver</th>
                  <th style="text-align:right">Approval Amount</th>
                </tr>
              </thead>
              <tbody></tbody>
              </table>`);
                    for (const approval of purchaseOrderResponse.purchaseOrder
                        .approvals) {
                        (_b = sidebarElement.querySelector('tbody')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('beforeend', `<tr>
                <td>
                ${approval.isApproved ? '✔️' : '❌'}
                </td>
                <td>${approval.userName}</td>
                <td style="text-align:right">
                  $${approval.approvalAmount.toFixed(2)}
                </td>
                </tr>`);
                    }
                }
            }
        });
    }
    function validateUserKeyGuid() {
        GM_xmlhttpRequest({
            url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doValidateUserKeyGuid`,
            method: 'POST',
            responseType: 'json',
            data: new URLSearchParams({ userKeyGuid }),
            onload(response) {
                const loginResponse = response.response;
                if (loginResponse.isLoggedIn) {
                    initializeApprovalView();
                }
                else {
                    userKeyGuid = '';
                    GM_setValue(userKeyGuidStorageKey, userKeyGuid);
                    initializeMissingUserKeyGuid();
                }
            },
            onerror(response) {
                sidebarElement.insertAdjacentHTML('beforeend', `<p><strong>FASTER Web Helper currently unavailable.</strong></p>`);
            }
        });
    }
    /*
     * Initialize
     */
    createSidebar();
    if (fasterWebHelperUrl === '') {
        initializeMissingFasterWebHelperUrl();
    }
    else if (userKeyGuid === '') {
        initializeMissingUserKeyGuid();
    }
    else {
        validateUserKeyGuid();
    }
})();
