// ==UserScript==
// @name         FASTER Web - Maintenance - Work Order Header Height
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder*/*
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Stops the header from changing sizes between work order tabs.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/workOrderHeaderHeight.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  /*
   * Validate that the page is a work order page
   */

  const validPathNames = [
    'workordermaster.aspx',
    'repairdetail.aspx',
    'labordetail.aspx',
    'partsissuedetail.aspx',
    'subletdetail.aspx',
    'othercostmaster.aspx',
    'maintnotedetail.aspx',
    'attachments.aspx',
    'workorderdowntime.aspx'
  ]

  const currentPathName = window.location.pathname
    .slice(window.location.pathname.lastIndexOf('/') + 1)
    .toLowerCase()

  let isValidPathName = false

  for (const validPathName of validPathNames) {
    if (currentPathName === validPathName) {
      isValidPathName = true
      break
    }
  }

  if (!isValidPathName) {
    return
  }

  /*
   * Remove height from header containers.
   */

  const elementSelectorsWithHeight = [
    '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_TopRadPane',
    '#RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_panetop'
  ]

  for (const elementSelectorWithHeight of elementSelectorsWithHeight) {
    const heightElement = document.querySelector(
      elementSelectorWithHeight
    ) as HTMLElement | null

    if (heightElement !== null) {
      heightElement.style.height = ''
    }
  }

  /*
   * Remove empty elements taking up space.
   */

  const emptyPaddingElement = document.querySelector(
    '#ctl00_RadPane_Content .workOrderHeader'
  )
  if (
    emptyPaddingElement !== null &&
    (emptyPaddingElement.textContent ?? '').trim() === ''
  ) {
    emptyPaddingElement.remove()
  }

  /*
   * Ensure padding is consistent.
   */

  const cellPaddingElement = document.querySelector(
    '#ctl00_ContentPlaceHolder_Content_DetailMenu_WorkOrderDetailMenuPanel'
  )?.parentElement

  if (cellPaddingElement !== null && cellPaddingElement !== undefined) {
    cellPaddingElement.style.paddingTop = '5px'
  }
})()
