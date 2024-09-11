// ==UserScript==
// @name         FASTER Web - Set Viewport
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        GM_addElement
// @version      0.4.0-dev
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Attempts to reduce the amount of zooming required on smaller screens.
// @run-at       document-body
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/setViewport.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const defaultViewportWidth = 800
  const specialViewportWidth = 1100

  const specialPages = [
    '/domains/accounting/billingadjustment/default.aspx',
    '/domains/accounting/closeoutprocess/default.aspx',
    '/domains/accounting/creditcard/default.aspx',
    '/domains/accounting/managepayables/search.aspx',
    '/domains/accounting/vendorcredit/search.aspx',
    '/domains/assets/search/default.aspx',
    '/domains/fuel/search/default.aspx',
    '/domains/maintenance/directcharge/search/default.aspx',
    '/domains/maintenance/workorder/search/default.aspx'
  ]

  if (document.querySelector('meta[name="viewport"]') === null) {
    const currentPage = window.location.pathname.toLowerCase()

    let viewportWidth = defaultViewportWidth

    for (const specialPage of specialPages) {
      if (currentPage.includes(specialPage)) {
        viewportWidth = specialViewportWidth
        break
      }
    }

    GM_addElement('meta', {
      name: 'viewport',
      content: `width=${viewportWidth}`
    })
  }
})()
