// ==UserScript==
// @name         FASTER Web - Drag Disable
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/*
// @grant        none
// @version      1.1.2
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Disables certain drag-and-drop features, like rearranging windows, to improve usability on touchscreens.
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/dragDisable.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const appliedClassName = 'userScript_mouseEventApplied'
  const mouseEvents = [
    'mousedown',
    'mouseover',
    'mousemove',
    'mouseout',
    'touchmove',
    'touchstart'
  ]

  const draggableElementSelectors = [`.rdTitleBar`, `th.rgHeader`]

  function stopImmediatePropagation(event?: Event): void {
    event?.stopImmediatePropagation()
  }

  function removeDrag(): void {
    const draggableElements = document.querySelectorAll(
      draggableElementSelectors.join(', ')
    ) as NodeListOf<HTMLElement>

    for (const draggableElement of draggableElements) {
      // Changing the cursor appears sufficient enough to disable dragging on windows.
      draggableElement.style.cursor = 'auto'

      if (!draggableElement.classList.contains(appliedClassName)) {
        for (const mouseEvent of mouseEvents) {
          draggableElement.addEventListener(
            mouseEvent,
            stopImmediatePropagation,
            { capture: true }
          )
        }

        draggableElement.classList.add(appliedClassName)
      }
    }
  }

  removeDrag()

  /*
  function debounce(function_, timeout = 300) {
    let timer
    return (...arguments_) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        function_.apply(this, arguments_)
      }, timeout)
    }
  }

  const removeDragDebounce = debounce(() => {
    removeDrag()
  })

  const observer = new MutationObserver(removeDragDebounce)

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  })
  */
})()
