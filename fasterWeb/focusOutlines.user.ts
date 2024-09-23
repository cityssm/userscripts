// ==UserScript==
// @name         FASTER Web - Focus Outlines
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        GM_addStyle
// @version      1.3.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Increases accessibility by outlining actionable elements on hover and keyboard focus.
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/focusOutlines.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  GM_addStyle(`
    a:focus,
    a:hover,
    span[tabindex]:focus,
    span[tabindex]:hover,
    button:focus,
    button:hover {
      outline-color: black;
      outline-offset: 3px;                    
      outline-style: dashed !important;
      outline-width: 2px !important;
    }`)
})()
