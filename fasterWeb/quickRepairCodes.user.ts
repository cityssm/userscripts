// ==UserScript==
// @name           FASTER Web - Maintenance - Quick Repair Codes
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/RepairAdd.aspx
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_unregisterMenuCommand
// @version        0.4.0-dev
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

  const quickRepairDescriptionsKey = 'fasterWeb_quickRepairDescriptions'

  let quickRepairDescriptions = GM_getValue(quickRepairDescriptionsKey, [
    {
      reason: 'General Repair',
      schedule: 'Non-Scheduled',
      isBillable: false,
      action: 'Parts Issue',
      group: 'Indirect Labor',
      component: 'Meeting Time'
    }
  ]) as RepairDescription[]

  function saveQuickRepairDescription(): void {
    const currentQuickRepairDescription: RepairDescription = {
      reason:
        (
          document.querySelector(
            `#${selectors.reason}`
          ) as HTMLInputElement | null
        )?.value ?? '',
      schedule:
        (
          document.querySelector(
            `#${selectors.schedule}`
          ) as HTMLInputElement | null
        )?.value ?? '',
      isBillable:
        (
          document.querySelector(
            `#${selectors.isBillable}`
          ) as HTMLInputElement | null
        )?.checked ?? false,
      action:
        (
          document.querySelector(
            `#${selectors.action}`
          ) as HTMLInputElement | null
        )?.value ?? '',
      group:
        (
          document.querySelector(
            `#${selectors.group}`
          ) as HTMLInputElement | null
        )?.value ?? '',
      component:
        (
          document.querySelector(
            `#${selectors.component}`
          ) as HTMLInputElement | null
        )?.value ?? ''
    }

    if (
      currentQuickRepairDescription.reason === '' ||
      currentQuickRepairDescription.schedule === '' ||
      currentQuickRepairDescription.action === '' ||
      currentQuickRepairDescription.group === '' ||
      currentQuickRepairDescription.component === ''
    ) {
      alert(
        'Please ensure all five repair code fields (Reason, Schedule, Action, Group, and Component) are populated.'
      )
      return
    }

    quickRepairDescriptions = [currentQuickRepairDescription]

    GM_setValue(quickRepairDescriptionsKey, quickRepairDescriptions)

    alert('Quick Code updated successfully.')
  }

  const updateQuickCodeButtonId = 'userScript_updateQuickCodeButton'

  document
    .querySelector('#CancelTopLinkButton')
    ?.parentElement?.insertAdjacentHTML(
      'afterend',
      `<td class="ButtonSeparator">
        <button class="rfdSkinnedButton" id="${updateQuickCodeButtonId}" type="button">Update Quick Code</button>
        </td>`
    )

  document
    .querySelector(`#${updateQuickCodeButtonId}`)
    ?.addEventListener('click', saveQuickRepairDescription)

  async function sleep(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  async function populateComboBoxField(
    comboboxSelector: string,
    value: string,
    doPause = false
  ): Promise<void> {
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

  async function setRepairCodeFields(descriptionIndex = 0): Promise<void> {
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

  /*
   * Add menu item
   */

  const runOnOpenKey = 'fasterWeb_runOnOpen'

  let runOnOpenToggleId = -1

  let runOnOpen = GM_getValue(runOnOpenKey, false)

  function registerMenuCommand(): void {
    runOnOpenToggleId = GM_registerMenuCommand(
      runOnOpen ? 'Disable Run on Open' : 'Enable Run on Open',
      () => {
        runOnOpen = !runOnOpen
        GM_setValue(runOnOpenKey, runOnOpen)

        GM_unregisterMenuCommand(runOnOpenToggleId)
        registerMenuCommand()
      }
    )
  }

  registerMenuCommand()

  /*
   * Add button or run on open
   */

  if (runOnOpen) {
    void setRepairCodeFields()
  } else {
    const buttonId = 'userScript_setQuickCodeButton'

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
  }
})()
