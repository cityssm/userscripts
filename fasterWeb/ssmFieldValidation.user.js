// ==UserScript==
// @name           FASTER Web - Sault Ste. Marie - Field Validation
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Login/*
// @grant          none
// @version        1.3.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Enforces field validation as per Sault Ste. Marie's requirements.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/ssmFieldValidation.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    const validationClass = 'ssmFieldValidation';
    const patternsToApply = {
        'input#SymptomTextBox': {
            minLength: 11,
            maxLength: 11,
            pattern: /^[A-Z]{2}\.\d{2}\.\d{5}$/,
            placeholder: 'Work Order Number (ex. PW.12.34567)'
        },
        'input#PartNumberRadTextBox': {
            minLength: 13,
            maxLength: 13,
            pattern: /^\d{2}-\d{4}-\d{5}$/
        }
    };
    const applyPatterns = () => {
        for (const [selector, validators] of Object.entries(patternsToApply)) {
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                if (!element.classList.contains(validationClass)) {
                    if (validators.minLength !== undefined) {
                        element.minLength = validators.minLength;
                    }
                    if (validators.maxLength !== undefined) {
                        element.maxLength = validators.maxLength;
                    }
                    if (validators.pattern !== undefined) {
                        element.pattern = validators.pattern.source;
                    }
                    if (validators.placeholder !== undefined) {
                        element.placeholder = validators.placeholder;
                    }
                    element.classList.add(validationClass);
                }
            }
        }
    };
    const observer = new MutationObserver(applyPatterns);
    observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });
})();
