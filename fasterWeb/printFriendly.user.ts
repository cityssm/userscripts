// ==UserScript==
// @name           FASTER Web - Print Friendly
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/*
// @exclude-match  https://*.fasterwebcloud.com/FASTER/Login/*
// @grant          none
// @version        1.1.0
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Improves print-friendliness by only printing the content area.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/printFriendly.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  const mainContentAreaId = 'RAD_SPLITTER_PANE_CONTENT_ctl00_RadPane_Content'

  const contentAreaElement = document.querySelector(`#${mainContentAreaId}`)

  if (contentAreaElement !== null) {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
        @media print {
          body {
            visibility: hidden;
          }

          #${mainContentAreaId} {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
          }
          
          #${mainContentAreaId},
          
          #ctl00_ContentPlaceHolder_Content_MainRadSplitter,
          #ctl00_ContentPlaceHolder_Content_SplitterMain,
          #ctl00_ContentPlaceHolder_Content_splitterMain,
          #ctl00_ContentPlaceHolder_Content_MaintLaborDetailRadSplliter,
          #ctl00_ContentPlaceHolder_Content_PartsIssueRadSplitter,
          #ctl00_ContentPlaceHolder_Content_SubletDetailRadSplitter,
          #ctl00_ContentPlaceHolder_Content_OtherCostMasterRadSplitter,
          #ctl00_ContentPlaceHolder_Content_MaintNoteDetailsSplitter,
          #ctl00_ContentPlaceHolder_Content_AttachmentRadGrid,
          #ctl00_ContentPlaceHolder_Content_ContactDetailMainRadSplitter,
          
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_SplitterMain,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_splitterMain,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_MainRadSplitter,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_MaintLaborDetailRadSplliter,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_PartsIssueRadSplitter,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_SubletDetailRadSplitter,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_OtherCostMasterRadSplitter,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_MaintNoteDetailsSplitter,
          #RAD_SPLITTER_ctl00_ContentPlaceHolder_Content_ContactDetailMainRadSplitter,
          
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_panetop,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_panebottom,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_TopRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_MiddleRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_BottomRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_WorkOrderRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_RepairRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_PartsIssueRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_NotesRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_DowntimeRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_ContactDetailTopRadPane,
          #RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder_Content_ContactDetailBottomRadPane {
            overflow: visible !important;
            width: 100% !important;
            height: auto !important;
          }

          tr.rgCommandRow {
            display: none;
          }
        }
      </style>`
    )
  }
})()
