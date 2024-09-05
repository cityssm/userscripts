// ==UserScript==
// @name           FASTER Web - Remove Tab Index
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @grant          none
// @version        1.0.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Removes overridden tab-key ordering, which makes it difficult to track the cursor when using the keyboard for navigation.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/tabIndexRemove.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const focusableElementTagNames = [
    'A',
    'BUTTON',
    'INPUT',
    'SELECT',
    'TEXTAREA'
  ]

  const removeTabIndex: MutationCallback = () => {
    const elements = document.querySelectorAll(
      '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])'
    )

    for (const element of elements) {
      console.log(element)

      if (focusableElementTagNames.includes(element.tagName)) {
        element.removeAttribute('tabindex')
      } else {
        element.setAttribute('tabindex', '0')
      }
    }
  }

  const observer = new MutationObserver(removeTabIndex)

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  })

  removeTabIndex([], observer)
})()
