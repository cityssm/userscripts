// ==UserScript==
// @name         FASTER Web - Domain Tabs
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        none
// @version      1.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Updates domain tabs to default to more useful pages.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/domainLinks.user.js
// @supportURL   https://github.com/cityssm/userscripts/tree/main/fasterWeb
// @homepageURL  https://github.com/cityssm/userscripts
// ==/UserScript==

;(() => {
  const assetsDomainLink = document.querySelector(
    '#ctl00_DomainMenu_RadMenuDomain a[href$="/Assets/Default.aspx"]'
  ) as HTMLAnchorElement | null
  if (assetsDomainLink) {
    assetsDomainLink.href =
      assetsDomainLink.href.slice(0, -12) + 'SelectAsset/Default.aspx'
  }

  const inventoryDomainLink = document.querySelector(
    '#ctl00_DomainMenu_RadMenuDomain a[href$="/Parts/Default.aspx"]'
  ) as HTMLAnchorElement | null
  if (inventoryDomainLink) {
    inventoryDomainLink.href =
      inventoryDomainLink.href.slice(0, -12) + 'PartList/Default.aspx'
  }

  const accountingDomainLink = document.querySelector(
    '#ctl00_DomainMenu_RadMenuDomain a[href$="/Accounting/Default.aspx"]'
  ) as HTMLAnchorElement | null
  if (accountingDomainLink) {
    accountingDomainLink.href =
      accountingDomainLink.href.slice(0, -12) + 'Search/Default.aspx'
  }
})()
