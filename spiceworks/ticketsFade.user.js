// ==UserScript==
// @name         Spiceworks - Tickets - Fade Ticket List
// @namespace    https://github.com/cityssm/userscripts
// @match        https://on.spiceworks.com/tickets
// @match        https://on.spiceworks.com/tickets/*
// @match        https://*.on.spiceworks.com/tickets
// @match        https://*.on.spiceworks.com/tickets/*
// @grant        none
// @version      1.0.1
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Reduces the visiblity of the ticket list when viewing a ticket.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/spiceworks/ticketsFade.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    document.head.insertAdjacentHTML('beforeend', `<style>
      #firstPanelDivticketsResizablePanels:has(+ #resize-handleticketsResizablePanels) {
        opacity: 0.4;
      }
      </style>`);
})();