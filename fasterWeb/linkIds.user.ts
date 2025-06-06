// ==UserScript==
// @name         FASTER Web - Show Link IDs
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Assets/Search/Default.aspx*
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/ManageTask/Search/Default.aspx*
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/ManageTask/TaskListView.aspx*
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartList/Default.aspx*
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/PartList/PartListMaster.aspx*
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/Default.aspx*
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Vendors/Search/Default.aspx*
// @grant        GM_addStyle
// @version      1.1.1
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Appends IDs to selected links in FASTER Web to make them easier to differentiate.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/linkIds.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  GM_addStyle(`
    h1[data-link-id]::after,
    a[data-link-id]::after {
      content: " [" attr(data-link-id) "]";
      color: gray;
    }`)

  const idExtractingRegularExpressions = [
    /plid=(\d+)/i,
    /rrid=(\d+)/i,
    /vid=(\d+)/i,
    /id=(\d+)/i
  ]

  function extractIdToDataId(linkElement: HTMLAnchorElement): void {
    for (const idExtractingRegularExpression of idExtractingRegularExpressions) {
      const match = linkElement.href.match(idExtractingRegularExpression)
      if (match !== null && match.length > 1) {
        const id = match[1]
        linkElement.dataset.linkId = id
        break
      }
    }

    // Mark the link as checked to avoid re-checking
    linkElement.dataset.linkIdChecked = 'true'
  }

  function updateLinks(): void {
    const linkElements = document.querySelectorAll(
      'a[href]:not([data-link-id-checked])'
    ) as NodeListOf<HTMLAnchorElement>

    for (const linkElement of linkElements) {
      extractIdToDataId(linkElement)
    }
  }

  function updateHeader(): boolean {
    const pageUrl = globalThis.location.href.toLowerCase()

    for (const idExtractingRegularExpression of idExtractingRegularExpressions) {
      const match = pageUrl.match(idExtractingRegularExpression)
      if (match !== null && match.length > 1) {
        const id = match[1]
        const headerElement = document.querySelector('h1')
        if (headerElement !== null) {
          headerElement.dataset.linkId = id
          return true
        }
      }
    }

    return false

  }

  const headerUpdated = updateHeader()

  if (!headerUpdated) {
    updateLinks()
    const observer = new MutationObserver(updateLinks)

    observer.observe(document, {
      childList: true,
      subtree: true
    })
  }
})()
