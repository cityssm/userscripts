// ==UserScript==
// @name         FASTER Web - Set Viewport
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        GM_addElement
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Attempts to reduce the amount of zooming required on smaller screens.
// @run-at       document-body
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/setViewport.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  GM_addElement('meta', {
    name: 'viewport',
    content: 'width=1100'
  })
})()
