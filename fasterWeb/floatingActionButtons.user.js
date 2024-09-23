// ==UserScript==
// @name         FASTER Web - Floating Action Buttons
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/*
// @grant        GM_addStyle
// @require      https://raw.githubusercontent.com/cityssm/userscripts/main/lib/fontawesome-free-6.6.0-web/js/solid.min.js
// @require      https://raw.githubusercontent.com/cityssm/userscripts/main/lib/fontawesome-free-6.6.0-web/js/fontawesome.min.js
// @version      0.1.0-dev
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Include easy-to-tap, big buttons for the main page action in the bottom-right corner.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/floatingActionButtons.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
(() => {
    const floatingButtonOptionsByPage = {
        /*
         * Direct Charge
         */
        '/faster/domains/maintenance/directcharge/partsissuedetail.aspx': {
            faClass: 'plus',
            buttonTitle: 'Issue Part',
            buttonAction: '#ctl00_ContentPlaceHolder_Content_PartsIssueListRadDock_C_PartsIssueListRadGrid_ctl00_ctl02_ctl00_AddNewPartsIssueLinkButton'
        },
        '/faster/domains/maintenance/directcharge/search/default.aspx': {
            faClass: 'plus',
            buttonTitle: 'Create a Direct Charge',
            buttonAction: '/FASTER/Domains/Maintenance/DirectCharge/Default.aspx'
        },
        /*
         * Work Order
         */
        '/faster/domains/maintenance/workorder/partsissuedetail.aspx': {
            faClass: 'plus',
            buttonTitle: 'Issue Part',
            buttonAction: '#ctl00_ContentPlaceHolder_Content_PartsIssueListRadDock_C_PartsIssueListRadGrid_ctl00_ctl02_ctl00_AddNewPartsIssueLinkButton'
        },
        '/faster/domains/maintenance/workorder/search/default.aspx': {
            faClass: 'plus',
            buttonTitle: 'Create a Work Order',
            buttonAction: '/FASTER/Domains/Maintenance/WorkOrder/Default.aspx'
        }
    };
    const floatingContainerClassName = 'userScript_floatingActionContainer';
    function createFloatingActionButton(options) {
        var _a, _b, _c, _d, _e;
        GM_addStyle(`
      .${floatingContainerClassName} {
        position: fixed;
        right: 20px;
        bottom: 20px;
      }
        
      .${floatingContainerClassName} a,
      .${floatingContainerClassName} button {
        display: inline-block;
        padding: 0 10px;
        min-width: 74px;
        height: 74px;
        line-height: 74px;
        cursor: pointer;

        font-size: 64px;
        font-weight: bold;

        background-color: rgb(0, 209, 178);
        color: #fff;
        text-decoration: none;
        text-align: center;
        border: 0;

        border-radius: 64px;
      }`);
        document.body.insertAdjacentHTML('beforeend', `<div class="${floatingContainerClassName}">
      </div>`);
        if (typeof options.buttonAction === 'function' ||
            options.buttonAction.startsWith('#')) {
            (_a = document
                .querySelector(`.${floatingContainerClassName}`)) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', `<button type="button" title="${options.buttonTitle}">
            <span class="fa-solid fa-${(_b = options.faClass) !== null && _b !== void 0 ? _b : 'plus'}"></span>
            </button>`);
            (_c = document
                .querySelector(`.${floatingContainerClassName} button`)) === null || _c === void 0 ? void 0 : _c.addEventListener('click', typeof options.buttonAction === 'function'
                ? options.buttonAction
                : () => {
                    var _a;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    ;
                    (_a = document.querySelector(options.buttonAction)) === null || _a === void 0 ? void 0 : _a.click();
                });
        }
        else {
            (_d = document
                .querySelector(`.${floatingContainerClassName}`)) === null || _d === void 0 ? void 0 : _d.insertAdjacentHTML('afterbegin', `<a title="${options.buttonTitle}" href="${options.buttonAction}">
            <span class="fa-solid fa-${(_e = options.faClass) !== null && _e !== void 0 ? _e : 'plus'}"></span>
            </a>`);
        }
    }
    const currentPageLowerClass = window.location.pathname.toLowerCase();
    if (floatingButtonOptionsByPage[currentPageLowerClass] !== undefined) {
        createFloatingActionButton(floatingButtonOptionsByPage[currentPageLowerClass]);
    }
})();
