// ==UserScript==
// @name         FASTER Web - Item Number Autocomplete
// @namespace    https://github.com/cityssm/userscripts
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/PartsIssueAdd.aspx
// @match        https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/WorkOrder/PartsIssueAdd.aspx
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @version      1.0.0
// @author       The Corporation of the City of Sault Ste. Marie
// @description  Adds autocomplete suggestions to item number input fields. Define "itemNumbers.json" URL in options.
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/itemNumberAutocomplete.user.js
// @supportURL   https://github.com/cityssm/userscripts/issues
// @homepageURL  https://cityssm.github.io/userscripts/
// @icon         https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

;(() => {
  /*
   * Load Item Numbers
   */

  const itemNumbersJsonPathStorageKey = 'fasterWeb_itemNumbersJsonPath'
  const itemNumbersDatalistId = 'ssmItemNumbersDatalist'

  let itemNumbersJsonPath = GM_getValue(
    itemNumbersJsonPathStorageKey,
    'https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/data/itemNumbers.json'
  ) as string

  function loadItemNumbers(): void {
    GM_xmlhttpRequest({
      method: 'GET',
      responseType: 'json',
      url: itemNumbersJsonPath,
      onload: (response) => {
        const itemNumbers: string[] =
          (response?.response as { itemNumbers: string[] } | undefined)
            ?.itemNumbers ?? []

        const dataListElement = document.createElement('datalist')
        dataListElement.id = itemNumbersDatalistId

        for (const itemNumber of itemNumbers) {
          const optionElement = document.createElement('option')
          optionElement.value = itemNumber
          dataListElement.append(optionElement)
        }

        document.body.append(dataListElement)
      }
    })
  }

  loadItemNumbers()

  /*
   * Set List Attribute
   */

  const inputElementSelectors = ['input#PartNumberRadTextBox']

  function addListAttribute(): void {
    for (const inputElementSelector of inputElementSelectors) {
      const elements = document.querySelectorAll(
        inputElementSelector
      ) as NodeListOf<HTMLInputElement>

      for (const element of elements) {
        if ((element.getAttribute('list') ?? '') === '') {
          element.setAttribute('list', itemNumbersDatalistId)
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

  GM_registerMenuCommand('Set "itemNumbers.json" path', () => {
    const newJsonPath = prompt('URL to itemNumbers.json', itemNumbersJsonPath)

    if (newJsonPath !== null) {
      itemNumbersJsonPath = newJsonPath
      GM_setValue(itemNumbersJsonPathStorageKey, itemNumbersJsonPath)

      alert('New URL will be used after next page load.')
    }
  })
})()
