// ==UserScript==
// @name         FASTER Web - Floating Action Buttons
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/*
// @grant        GM_addStyle
// @require      https://raw.githubusercontent.com/cityssm/userscripts/main/lib/fontawesome-free-6.6.0-web/js/solid.min.js
// @require      https://raw.githubusercontent.com/cityssm/userscripts/main/lib/fontawesome-free-6.6.0-web/js/fontawesome.min.js
// @version      0.1.2-dev
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Include easy-to-tap, big buttons for the main page action in the bottom-right corner.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/floatingActionButtons.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

interface FloatingButtonOptions {
  faClass?: string
  buttonTitle: string
  buttonAction: `/FASTER/Domains/${string}` | `#${string}` | (() => void)
}

type LowerCasePage = `/faster/domains/${string}`
;(() => {
  const floatingButtonOptionsByPage: Record<
    LowerCasePage,
    FloatingButtonOptions
  > = {
    /*
     * Direct Charge
     */

    '/faster/domains/maintenance/directcharge/partsissuedetail.aspx': {
      faClass: 'plus',
      buttonTitle: 'Issue Part',
      buttonAction:
        '#ctl00_ContentPlaceHolder_Content_PartsIssueListRadDock_C_PartsIssueListRadGrid_ctl00_ctl02_ctl00_AddNewPartsIssueLinkButton'
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
      buttonAction:
        '#ctl00_ContentPlaceHolder_Content_PartsIssueListRadDock_C_PartsIssueListRadGrid_ctl00_ctl02_ctl00_AddNewPartsIssueLinkButton'
    },
    '/faster/domains/maintenance/workorder/search/default.aspx': {
      faClass: 'plus',
      buttonTitle: 'Create a Work Order',
      buttonAction: '/FASTER/Domains/Maintenance/WorkOrder/Default.aspx'
    }
  }

  const floatingContainerClassName = 'userScript_floatingActionContainer'

  function createFloatingActionButton(options: FloatingButtonOptions): void {
    GM_addStyle(`
      #RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Content,
      #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_panebottom {
        padding-bottom: 150px;
      }

      .${floatingContainerClassName} {
        position: fixed;
        right: 20px;
        bottom: 20px;
      }
        
      .${floatingContainerClassName} a,
      .${floatingContainerClassName} button {
        box-sizing: content-box;
        display: inline-block;
        padding: 5px;
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
      }`)

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="${floatingContainerClassName}">
      </div>`
    )

    if (
      typeof options.buttonAction === 'function' ||
      options.buttonAction.startsWith('#')
    ) {
      document
        .querySelector(`.${floatingContainerClassName}`)
        ?.insertAdjacentHTML(
          'afterbegin',
          `<button type="button" title="${options.buttonTitle}">
            <span class="fa-solid fa-${options.faClass ?? 'plus'}"></span>
            </button>`
        )

      document
        .querySelector(`.${floatingContainerClassName} button`)
        ?.addEventListener(
          'click',
          typeof options.buttonAction === 'function'
            ? options.buttonAction
            : () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                ;(
                  document.querySelector(
                    options.buttonAction as string
                  ) as HTMLElement | null
                )?.click()
              }
        )
    } else {
      document
        .querySelector(`.${floatingContainerClassName}`)
        ?.insertAdjacentHTML(
          'afterbegin',
          `<a title="${options.buttonTitle}" href="${options.buttonAction}">
            <span class="fa-solid fa-${options.faClass ?? 'plus'}"></span>
            </a>`
        )
    }
  }

  const currentPageLowerClass =
    window.location.pathname.toLowerCase() as LowerCasePage

  if (floatingButtonOptionsByPage[currentPageLowerClass] !== undefined) {
    createFloatingActionButton(
      floatingButtonOptionsByPage[currentPageLowerClass]
    )
  }
})()
