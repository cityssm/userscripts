// ==UserScript==
// @name           FASTER Web - Sault Ste. Marie - Field Validation
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Login/*
// @grant          none
// @version        1.2.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Enforces field validation as per Sault Ste. Marie's requirements.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/ssmFieldValidation.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

interface Validators {
  minLength?: number
  maxLength?: number
  pattern?: RegExp
}

;(() => {
  const validationClass = 'ssmFieldValidation'

  const patternsToApply: Record<string, Validators> = {
    'input#SymptomTextBox': {
      minLength: 11,
      maxLength: 11,
      pattern: /^[A-Z]{2}\.\d{2}\.\d{5}$/
    },
    'input#PartNumberRadTextBox': {
      minLength: 13,
      maxLength: 13,
      pattern: /^\d{2}-\d{4}-\d{5}$/
    }
  }

  const applyPatterns: MutationCallback = (mutationList, observer) => {
    for (const [selector, validators] of Object.entries(patternsToApply)) {
      const elements = document.querySelectorAll(selector)

      for (const element of elements) {
        if (!element.classList.contains(validationClass)) {

          if (validators.minLength !== undefined) {
            ;(element as HTMLInputElement).minLength = validators.minLength
          }

          if (validators.maxLength !== undefined) {
            ;(element as HTMLInputElement).maxLength = validators.maxLength
          }

          if (validators.pattern !== undefined) {
            ;(element as HTMLInputElement).pattern = validators.pattern.source
          }

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
