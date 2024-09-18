// ==UserScript==
// @name           FASTER Web - Image Button Fix
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Login/*
// @grant          none
// @version        1.0.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Moves images that appear to be part of buttons into the button elements to make the images clickable.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/imageButtonFix.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
(() => {
    function fixImages() {
        const imageElements = document.querySelectorAll('img:has(+a)');
        for (const imageElement of imageElements) {
            const clickableElement = imageElement.nextElementSibling;
            clickableElement.prepend(imageElement);
            imageElement.classList.add('userScript_img');
            imageElement.style.paddingRight = '0.5em';
        }
    }
    fixImages();
    const observer = new MutationObserver(fixImages);
    observer.observe(document, {
        subtree: true,
        childList: true
    });
})();
