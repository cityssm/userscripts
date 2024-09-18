// ==UserScript==
// @name           FASTER Web - Assets - Create Asset Width Fix
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Assets/CreateAsset/Default.aspx
// @grant          none
// @version        1.0.1
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Reduces width of the "Create Incoming Asset from Template" button to fix the form on touchscreens.
// @run-at         document-idle
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/createAssetWidthFix.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const appliedClass = 'userScript_createAssetWidthFix'

  const containerElementSelector =
    '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_panebottom'

  const buttonSelector = `#ctl00_ContentPlaceHolder_Content_CreateAssetFromAcquisitionPlanRadDock_C_CreateIncomingAssetButton:not(.${appliedClass})`

  function fixButton(): void {
    const buttonElement = document.querySelector(
      buttonSelector
    ) as HTMLInputElement | null

    if (buttonElement !== null) {
      console.log('Apply changes')
      buttonElement.value = 'Create Incoming Asset'
      buttonElement.style.width = 'auto'
      buttonElement.classList.add(appliedClass)
    }
  }

  fixButton()

  const observerElement = document.querySelector(containerElementSelector)

  if (observerElement !== null) {
    const observer = new MutationObserver(fixButton)

    observer.observe(document, {
      subtree: true,
      childList: true
    })
  }
})()
