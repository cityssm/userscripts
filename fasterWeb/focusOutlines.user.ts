// ==UserScript==
// @name         FASTER Web - Focus Outlines
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/*
// @grant        none
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Increases accessibility by outlining actionable elements on hover and keyboard focus.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/focusOutlines.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      a:focus,
      a:hover {
        outline-color: black;
        outline-offset: 3px;                    
        outline-style: dashed !important;
        outline-width: 2px !important;
      } 
      </style>`
  )
})()
