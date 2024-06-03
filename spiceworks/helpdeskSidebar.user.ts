// ==UserScript==
// @name         Spiceworks - Help Desk - Remove Unused Sidebar Tools
// @namespace    https://github.com/cityssm/userscripts
// @match        https://on.spiceworks.com/*
// @match        https://*.on.spiceworks.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @version      0.1.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds menu options to remove unused tools from the help desk sidebar.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/spiceworks/helpdeskSidebar.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  /*
   * Device / Software Inventory
   */

  const hideInventoryStorageKey = 'spiceworks_hideInventory'

  const hideInventory = GM_getValue(hideInventoryStorageKey, false) as boolean

  if (hideInventory) {
    document
      .querySelector(
        '.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/device-inventory"]'
      )
      ?.remove()

    document
      .querySelector(
        '.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/device-inventory/software"]'
      )
      ?.remove()
  } else {
    GM_registerMenuCommand('Hide Device/Software Inventory', () => {
      GM_setValue(hideInventoryStorageKey, true)
      alert('The inventory sidebar items will be hidden on refresh.')
    })
  }

  /*
   * Contracts
   */

  const hideContractsStorageKey = 'spiceworks_hideContracts'

  const hideContracts = GM_getValue(hideContractsStorageKey, false) as boolean

  if (hideContracts) {
    document
      .querySelector(
        '.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/contracts"]'
      )
      ?.remove()
  } else {
    GM_registerMenuCommand('Hide Contracts', () => {
      GM_setValue(hideContractsStorageKey, true)
      alert('The contracts sidebar item will be hidden on refresh.')
    })
  }

  /*
   * Connectivity Dashboard
   */

  const hideConnectivityStorageKey = 'spiceworks_hideConnectivity'

  const hideConnectivity = GM_getValue(
    hideConnectivityStorageKey,
    false
  ) as boolean

  if (hideConnectivity) {
    document
      .querySelector(
        '.chd-tools-nav-container a[href^="https://apps.spiceworks.com/tools/connectivity-dashboard"]'
      )
      ?.remove()
  } else {
    GM_registerMenuCommand('Hide Connectivity Dashboard', () => {
      GM_setValue(hideConnectivityStorageKey, true)
      alert(
        'The connectivity dashboard sidebar item will be hidden on refresh.'
      )
    })
  }

  /*
   * Restore Hidden Tools
   */

  GM_registerMenuCommand('Restore Hidden Sidebar Items', () => {
    GM_deleteValue(hideContractsStorageKey)
    GM_deleteValue(hideConnectivityStorageKey)
    GM_deleteValue(hideInventoryStorageKey)

    alert('The hidden sidebar items will be restored on refresh.')
  })
})()
