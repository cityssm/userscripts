// ==UserScript==
// @name           FASTER Web - Maintenance - Quick Repair Codes
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/RepairAdd.aspx
// @grant          GM_getValue
// @grant          GM_setValue
// @version        0.1.0-dev
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Simplifies adding commonly used repair codes to direct charges.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/quickRepairCodes.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

interface RepairDescription {
  reason: string
  schedule: string
  isBillable: boolean
  action: string
  group: string
  component: string
}

;(() => {
  const selectors: Record<keyof RepairDescription, string> = {
    reason: 'CcgRepairControl_RepairReasonRadComboBox',
    schedule: 'CcgRepairControl_ScheduleRadComboBox',
    isBillable: 'CcgRepairControl_IsBillableCheckBox',
    action:
      'CcgRepairControl_GroupComponentActionRadGrid_ctl00_ctl02_ctl02_ActionDescRadComboBox',
    group:
      'CcgRepairControl_GroupComponentActionRadGrid_ctl00_ctl02_ctl02_GroupDescRadComboBox',
    component:
      'CcgRepairControl_GroupComponentActionRadGrid_ctl00_ctl02_ctl02_ComponentDescRadComboBox'
  }

  const quickRepairDescriptions: RepairDescription[] = [
    {
      reason: 'General Repair',
      schedule: 'Non Scheduled',
      isBillable: false,
      action: 'Parts Issue',
      group: 'Inventory Activity',
      component: 'System'
    }
  ]

  async function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 300))
  }

  async function populateComboBoxField(
    comboboxSelector: string,
    value: string,
    doPause = false
  ) {
    const comboboxControl = (window as any).unsafeWindow?.$find(
      comboboxSelector
    )

    comboboxControl.showDropDown()

    if (doPause) {
      await sleep()
      await sleep()
    }

    const comboboxItems = comboboxControl.get_items().toArray()

    if (comboboxItems.length > 0) {
      comboboxItems[0].select()
    }

    for (const comboboxItem of comboboxItems) {
      if (comboboxItem.get_text() === value) {
        comboboxItem.select()
        break
      }
    }

    comboboxControl.hideDropDown()
  }

  async function setRepairCodeFields(descriptionIndex: number = 0) {
    const repairDescription = quickRepairDescriptions[descriptionIndex]

    await populateComboBoxField(selectors.reason, repairDescription.reason)

    await sleep()

    await populateComboBoxField(
      selectors.schedule,
      repairDescription.schedule,
      true
    )

    await sleep()
    ;(
      document.querySelector('#' + selectors.isBillable) as HTMLInputElement
    ).checked = repairDescription.isBillable

    await populateComboBoxField(
      selectors.action,
      repairDescription.action,
      true
    )

    await sleep()
    await sleep()

    await populateComboBoxField(selectors.group, repairDescription.group, true)

    await sleep()

    await populateComboBoxField(
      selectors.component,
      repairDescription.component,
      true
    )
  }

  const buttonId = 'userScript_quickCodeButton'

  document
    .querySelector('#CancelTopLinkButton')
    ?.parentElement?.insertAdjacentHTML(
      'afterend',
      `<td class="ButtonSeparator">
        <button class="rfdSkinnedButton" id="${buttonId}" type="button">Set Quick Code</button>
        </td>`
    )

  document.querySelector(`#${buttonId}`)?.addEventListener('click', () => {
    void setRepairCodeFields()
  })
})()
