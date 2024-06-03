// ==UserScript==
// @name         Spiceworks - Knowledge Base - Remove "New Article" Button for Managers
// @namespace    https://github.com/cityssm/userscripts
// @match        https://on.spiceworks.com/*
// @match        https://*.on.spiceworks.com/*
// @version      0.1.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Removes the "New Article" button for manager users, since it's not supported anyways.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/spiceworks/knowledgeBaseAdd.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  let maxRetryCount = 20
  const retryMillis = 250

  let observer: MutationObserver | undefined

  function lookForButton(): void {
    let buttonRemoved = false

    const buttonElements = document.querySelectorAll('button')

    for (const buttonElement of buttonElements) {
      if (
        (buttonElement.textContent ?? '').toLowerCase().includes('new article')
      ) {
        buttonElement.remove()
        buttonRemoved = true
        break
      }
    }

    if (buttonRemoved) {
      const mainElement = document.querySelector('main')

      if (mainElement !== null) {
        observer = new MutationObserver(resetAndRetry)
        observer.observe(mainElement, {
          attributes: true,
          childList: true,
          subtree: true
        })
      }
    } else {
      maxRetryCount -= 1
      if (maxRetryCount > 0) {
        setTimeout(lookForButton, retryMillis)
      }
    }
  }

  function resetAndRetry(): void {
    maxRetryCount = 20

    if (observer !== undefined) {
      observer.disconnect()
    }

    lookForButton()
  }

  if (CURRENT_USER.role === 'manager') {
    addEventListener('popstate', resetAndRetry)
    resetAndRetry()
  }
})()
