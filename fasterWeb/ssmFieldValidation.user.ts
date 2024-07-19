// ==UserScript==
// @name         FASTER Web - Sault Ste. Marie - Field Validation
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Enforces field validation as per Sault Ste. Marie's requirements.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/ssmFieldValidation.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const validationClass = 'ssmFieldValidation'

  const patternsToApply: Record<string, RegExp> = {
    'input#SymptomTextBox': /^[A-Z]{2}\.\d{2}\.\d{5}$/
  }

  const applyPatterns: MutationCallback = (mutationList, observer) => {
    
    for (const [selector, patternToApply] of Object.entries(patternsToApply)) {

      const elements = document.querySelectorAll(selector)

      for (const element of elements) {
        if (!element.classList.contains(validationClass)) {
          ;(element as HTMLInputElement).pattern = patternToApply.source
          element.classList.add(validationClass)
        }
      }
    }
  }

  const observer = new MutationObserver(applyPatterns)

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  })
})()