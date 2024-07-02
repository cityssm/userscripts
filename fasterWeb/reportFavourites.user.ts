// ==UserScript==
// @name         FASTER Web - Reports - Highlight Favourites
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Reports/Default.aspx
// @grant        GM_getValue
// @grant        GM_setValue
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Makes favourite reports easier to find.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/reportFavourites.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const favouriteReportsStorageKey = 'fasterWeb_favouriteReports'
  const toggleButtonClassName = 'userscript_fasterWeb_favouriteReportsButton'

  /*
   * Load favourites from storage
   */

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  const favourteReportsArray: string[] = JSON.parse(GM_getValue(favouriteReportsStorageKey, '[]'))

  const favouriteReports = new Set(favourteReportsArray)

  /*
   * Toggle function
   */

  function toggleFavourite(clickEvent: Event): void {
    clickEvent.preventDefault()

    const toggleElement = clickEvent.currentTarget as HTMLAnchorElement

    const reportName = toggleElement.dataset.reportName ?? ''

    if (favouriteReports.has(reportName)) {
      // Remove favourite status
      toggleElement.ariaChecked = 'false'
      favouriteReports.delete(reportName)
    
    } else {
      // Add favourite status
      toggleElement.ariaChecked = 'true'
      favouriteReports.add(reportName)
    }

    GM_setValue(favouriteReportsStorageKey, JSON.stringify([...favouriteReports]))
  }

  /*
   * Add styles to head
   */

  document.head.insertAdjacentHTML('beforeend', `<style>
    .${toggleButtonClassName} {
      margin-right: 0.5em;
      font-size: 1.5em;
      text-decoration: none
    }

    .${toggleButtonClassName}[aria-checked='false'] {
      opacity: 0.2
    }

    contenttemplate:has(.${toggleButtonClassName}[aria-checked='true']) {
      background-color: yellow;
    }
    </style>`)

  /*
   * Initialize toggle buttons
   */

  const reportLinkElements = document.querySelectorAll('#ctl00_RadPane_Content a[id$="_ReportLinkButton"]')

  for (const reportLinkElement of reportLinkElements) {
    const reportName = reportLinkElement.textContent

    if (reportName === null) {
      continue
    }

    const toggleElement = document.createElement('a')
    toggleElement.className = toggleButtonClassName
    toggleElement.title = 'Toggle Favourite'
    toggleElement.href = '#'
    toggleElement.dataset.reportName = reportName
    toggleElement.innerHTML = '★'

    const reportIsFavourite = favouriteReports.has(reportName)

    toggleElement.ariaChecked = reportIsFavourite ? 'true' : 'false';

    toggleElement.addEventListener('click', toggleFavourite)

    reportLinkElement.before(toggleElement)
  }
})()