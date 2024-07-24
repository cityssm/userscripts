// ==UserScript==
// @name         FASTER Web - Asset Number Autocomplete
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Assets/SelectAsset/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/DirectChargeAdd.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/Default.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Parts/Search/PartIssueSearch.aspx
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds autocomplete suggestions to asset number input fields. Define "assetNumbers.json" URL in options.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/assetNumberAutocomplete.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  /*
   * Load Asset Numbers
   */

  const assetNumbersJsonPathStorageKey = 'fasterWeb_assetNumbersJsonPath'
  const assetNumbersDatalistId = 'ssmAssetNumbersDatalist'

  let assetNumbersJsonPath = GM_getValue(
    assetNumbersJsonPathStorageKey,
    'https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/data/assetNumbers.json'
  ) as string

  function loadAssetNumbers(): void {
    GM_xmlhttpRequest({
      method: 'GET',
      responseType: 'json',
      url: assetNumbersJsonPath,
      onload: (response) => {
        const assetNumbers: string[] =
          (response?.response as { assetNumbers: string[] } | undefined)
            ?.assetNumbers ?? []

        const dataListElement = document.createElement('datalist')
        dataListElement.id = assetNumbersDatalistId

        for (const assetNumber of assetNumbers) {
          const optionElement = document.createElement('option')
          optionElement.value = assetNumber
          dataListElement.append(optionElement)
        }

        document.body.append(dataListElement)
      }
    })
  }

  loadAssetNumbers()

  /*
   * Set List Attribute
   */

  const inputElementSelectors = [
    'input#ctl00_ContentPlaceHolder_Content_SelectAssetRadDock_C_AssetSearchTextBox',
    'input#ctl00_ContentPlaceHolder_Content_SearchRadDock_C_AssetNumberRadTextBox',
    'input#ctl00_ContentPlaceHolder_Content_WoAssetNumberRadTextBox',
    'input#AssetNumberRadTextBox'
  ]

  function addListAttribute(): void {
    for (const inputElementSelector of inputElementSelectors) {
      const elements = document.querySelectorAll(
        inputElementSelector
      ) as NodeListOf<HTMLInputElement>

      for (const element of elements) {
        if ((element.getAttribute('list') ?? '') === '') {
          element.setAttribute('list', assetNumbersDatalistId)
        }
      }
    }
  }

  const observer = new MutationObserver(addListAttribute)

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  })

  /*
   * Set Config Menu Option
   */

  GM_registerMenuCommand('Set "assetNumbers.json" path', () => {
    const newJsonPath = prompt('URL to assetNumbers.json', assetNumbersJsonPath)

    if (newJsonPath !== null) {
      assetNumbersJsonPath = newJsonPath
      GM_setValue(assetNumbersJsonPathStorageKey, assetNumbersJsonPath)

      alert('New URL will be used after next page load.')
    }
  })
})()
