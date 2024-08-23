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

;(() => {
  const tenant = window.location.hostname.split('.')[0]

  const orderNumber =
    document.querySelector('#ctl00_ContentPlaceHolder_Content_HiddenLabel')
      ?.textContent ?? ''
  if (orderNumber === '') {
    return
  }

  const fasterWebHelperUrlStorageKey = 'fasterWeb_fasterWebHelperUrl'
  let fasterWebHelperUrl = GM_getValue(
    fasterWebHelperUrlStorageKey,
    ''
  ) as string

  const userKeyGuidStorageKey = 'fasterWeb_userKeyGuid'
  let userKeyGuid = GM_getValue(userKeyGuidStorageKey, '') as string

  function fixLayout(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(window as any).unsafeWindow?.TelerikCommonScripts?.repaintChildren(
      document
    )
  }

  let sidebarElement: HTMLElement

  function createSidebar(): void {
    /*
     * Move the main form into the layout container
     */

    const mainForm = document.querySelector(
      '#aspnetForm'
    ) as HTMLFormElement | null

    if (mainForm === null || document.querySelector('#ssmLayout') !== null) {
      return
    }

    mainForm.style.opacity = '0'

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
      }`)

    /*
     * Add the layout container
     */

    const layoutContainerElement = document.createElement('div')
    layoutContainerElement.id = 'ssmLayout'

    document.body.append(layoutContainerElement)

    layoutContainerElement.append(mainForm)

    fixLayout()

    /*
     * Build the sidebar
     */

    sidebarElement = document.createElement('aside')

    sidebarElement.innerHTML = '<h2>Purchase Order Approval</h2>'

    layoutContainerElement.append(sidebarElement)

    fixLayout()

    mainForm.style.opacity = '1'
  }

  function getNewFasterWebHelperUrl(): void {
    const newFasterWebHelperUrl = window.prompt(
      'FASTER Web Helper Root URL',
      fasterWebHelperUrl
    )

    if (newFasterWebHelperUrl !== null) {
      fasterWebHelperUrl = newFasterWebHelperUrl.trim()
      GM_setValue(fasterWebHelperUrlStorageKey, fasterWebHelperUrl)
      window.location.reload()
    }
  }

  function initializeMissingFasterWebHelperUrl(): void {
    sidebarElement.insertAdjacentHTML(
      'beforeend',
      `<h3>FASTER Web Helper Configuration</h3>
        <p>
          To get started, you need the root URL for a FASTER Web Helper application.<br />
          ex. "http://serverNameOrIp:9000"
        </p>
        <p>
          <button type="button">
          Add your FASTER Web Helper Root URL
          </button>
        </p>`
    )

    sidebarElement
      .querySelector('button')
      ?.addEventListener('click', getNewFasterWebHelperUrl)
  }

  function initializeMissingUserKeyGuid(): void {
    sidebarElement.insertAdjacentHTML(
      'beforeend',
      `<h3>Log into the Approval System</h3>
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
        </form>`
    )

    sidebarElement
      .querySelector('form')
      ?.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault()

        const formElement = submitEvent.currentTarget as HTMLFormElement

        const urlSearchParameters = new URLSearchParams()
        urlSearchParameters.set(
          'userName',
          (
            formElement.querySelector(
              'input[name="userName"]'
            ) as HTMLInputElement
          ).value
        )
        urlSearchParameters.set(
          'password',
          (
            formElement.querySelector(
              'input[name="password"]'
            ) as HTMLInputElement
          ).value
        )

        GM_xmlhttpRequest({
          url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doLogin`,
          method: 'POST',
          responseType: 'json',
          data: urlSearchParameters,
          onload(response) {
            const loginResponse = response.response as
              | {
                  isLoggedIn: false
                }
              | {
                  isLoggedIn: true
                  userName: string
                  userKeyGuid: string
                }

            if (loginResponse.isLoggedIn) {
              userKeyGuid = loginResponse.userKeyGuid
              GM_setValue(userKeyGuidStorageKey, userKeyGuid)

              alert('User key saved successfully.')

              window.location.reload()
            } else {
              alert('Login failed. Please try again.')
            }
          }
        })
      })
  }

  function initializeApprovalView(): void {
    GM_xmlhttpRequest({
      url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doGetPurchaseOrder`,
      method: 'POST',
      responseType: 'json',
      data: new URLSearchParams({
        tenant,
        orderNumber
      }),
      onload(response) {
        const purchaseOrderResponse = response.response as
          | { isLoggedIn: false }
          | { isLoggedIn: true; purchaseOrder?: object }

        if (!purchaseOrderResponse.isLoggedIn) {
          userKeyGuid = ''
          GM_setValue(userKeyGuidStorageKey, userKeyGuid)
          window.location.reload()
          return
        }

        if (purchaseOrderResponse.purchaseOrder === undefined) {
          sidebarElement.insertAdjacentHTML(
            'beforeend',
            'No approval currently tracked'
          )
        } else {
          sidebarElement.insertAdjacentHTML(
            'beforeend',
            'Show current approvals'
          )
        }
      }
    })
  }

  function validateUserKeyGuid(): void {
    GM_xmlhttpRequest({
      url: `${fasterWebHelperUrl}/purchaseOrderApprovals/doValidateUserKeyGuid`,
      method: 'POST',
      responseType: 'json',
      data: new URLSearchParams({ userKeyGuid }),
      onload(response) {
        const loginResponse = response.response as
          | {
              isLoggedIn: false
            }
          | {
              isLoggedIn: true
              userName: string
              userKeyGuid: string
            }

        if (loginResponse.isLoggedIn) {
          initializeApprovalView()
        } else {
          userKeyGuid = ''
          GM_setValue(userKeyGuidStorageKey, userKeyGuid)
          initializeMissingUserKeyGuid()
        }
      }
    })
  }

  /*
   * Initialize
   */

  createSidebar()

  if (fasterWebHelperUrl === '') {
    initializeMissingFasterWebHelperUrl()
  } else if (userKeyGuid === '') {
    initializeMissingUserKeyGuid()
  } else {
    validateUserKeyGuid()
  }
})()
