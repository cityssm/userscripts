// ==UserScript==
// @name           FASTER Web - Maintenance - Quick Repair Codes
// @namespace      https://github.com/cityssm/userscripts
// @match          https://*.fasterwebcloud.com/FASTER/Domains/Maintenance/DirectCharge/RepairAdd.aspx
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_unregisterMenuCommand
// @grant          GM_notification
// @require        https://raw.githubusercontent.com/cityssm/userscripts/main/helpers/userScripts.helpers.js?_=1
// @version        0.6.0-dev
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Simplifies adding commonly used repair codes to direct charges.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/quickRepairCodes.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==

// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

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
      GM_notification({
        title: 'Quick Repair Codes Userscript',
        text: '❌ Please ensure all five repair code fields (Reason, Schedule, Action, Group, and Component) are populated.',
        image: 'https://cityssm.github.io/userscripts/assets/ssmUserscript.png'
      })

      return
    }

    quickRepairDescriptions = [currentQuickRepairDescription]

    GM_setValue(quickRepairDescriptionsKey, quickRepairDescriptions)

    GM_notification({
      title: 'Quick Repair Codes Userscript',
      text: '✔️ Quick Code updated successfully.',
      image: 'https://cityssm.github.io/userscripts/assets/ssmUserscript.png',
      silent: true
    })
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

  async function populateComboBoxField(
    comboboxSelector: string,
    value: string,
    doPause = false
  ): Promise<void> {
    await window.UserScriptHelpers.queryHtmlSelectorWait(`#${comboboxSelector}`)

    const comboboxControl = window.unsafeWindow?.$find(comboboxSelector)

    comboboxControl.showDropDown()

    if (doPause) {
      await window.UserScriptHelpers.sleep(1_000)
    }

    const comboboxItems =
      (
        await window.UserScriptHelpers.retryWhileNull(() => {
          const element = window.unsafeWindow?.$find(comboboxSelector)

          element.showDropDown()

          const items = element.get_items()

          if (items !== null && items?.toArray().length > 0) {
            return items
          }

          // eslint-disable-next-line unicorn/no-null
          return null
        })
      )?.toArray() ?? []

    if (comboboxItems.length > 0) {
      comboboxItems[0].select()
    }

    for (const comboboxItem of comboboxItems) {
      if (comboboxItem.get_text() === value) {
        comboboxItem.select()
        break
      }
    }

    try {
      comboboxControl.hideDropDown()
    } catch {}
  }

  async function setRepairCodeFields(descriptionIndex = 0): Promise<void> {
    const repairDescription = quickRepairDescriptions[descriptionIndex]

    await populateComboBoxField(selectors.reason, repairDescription.reason)

    await populateComboBoxField(selectors.schedule, repairDescription.schedule)

    await window.UserScriptHelpers.sleep()
    ;(
      document.querySelector('#' + selectors.isBillable) as HTMLInputElement
    ).checked = repairDescription.isBillable

    await populateComboBoxField(
      selectors.action,
      repairDescription.action,
      true
    )

    await populateComboBoxField(selectors.group, repairDescription.group, true)

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
