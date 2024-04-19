// ==UserScript==
// @name         FASTER Web - Domain Tabs
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Updates domain tabs to default to more useful pages.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/domainLinks.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const domainLinksToUpdate = [
    [
      '#ctl00_DomainMenu_RadMenuDomain a[href$="/Assets/Default.aspx"]',
      'SelectAsset/Default.aspx'
    ],
    [
      '#ctl00_DomainMenu_RadMenuDomain a[href$="/Parts/Default.aspx"]',
      'PartList/Default.aspx'
    ],
    [
      '#ctl00_DomainMenu_RadMenuDomain a[href$="/Accounting/Default.aspx"]',
      'Search/Default.aspx'
    ]
  ]

  for (const domainLinkToUpdate of domainLinksToUpdate) {
    const domainLink = document.querySelector(
      domainLinkToUpdate[0]
    ) as HTMLAnchorElement | null
    if (domainLink !== null) {
      domainLink.href = domainLink.href.slice(0, -12) + domainLinkToUpdate[1]
    }
  }
})()
