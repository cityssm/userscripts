// ==UserScript==
// @name         FASTER Web - Drag Disable
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/*
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Disables certain drag-and-drop features, like rearranging windows, to improve usability on touchscreens.
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/dragDisable.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const draggableElements = document.querySelectorAll(
    '.rdTitleBar'
  ) as NodeListOf<HTMLElement>

  for (const draggableElement of draggableElements) {
    // Changing the cursor appears sufficient enough to disable dragging.
    draggableElement.style.cursor = 'auto'
  }
})()
