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
// @version        0.6.1-dev
// @author         The Corporation of the City of Sault Ste. Marie
// @description    Simplifies adding commonly used repair codes to direct charges.
// @run-at         document-end
// @downloadURL    https://raw.githubusercontent.com/cityssm/userscripts/main/fasterWeb/quickRepairCodes.user.js
// @supportURL     https://github.com/cityssm/userscripts/issues
// @homepageURL    https://cityssm.github.io/userscripts/
// @icon           https://cityssm.github.io/img/header-cityssm.png
// ==/UserScript==
;
(() => {
    var _a, _b, _c, _d, _e, _f;
    const selectors = {
        reason: 'CcgRepairControl_RepairReasonRadComboBox',
        schedule: 'CcgRepairControl_ScheduleRadComboBox',
        isBillable: 'CcgRepairControl_IsBillableCheckBox',
        action: 'CcgRepairControl_GroupComponentActionRadGrid_ctl00_ctl02_ctl02_ActionDescRadComboBox',
        group: 'CcgRepairControl_GroupComponentActionRadGrid_ctl00_ctl02_ctl02_GroupDescRadComboBox',
        component: 'CcgRepairControl_GroupComponentActionRadGrid_ctl00_ctl02_ctl02_ComponentDescRadComboBox'
    };
    const quickRepairDescriptionsKey = 'fasterWeb_quickRepairDescriptions';
    let quickRepairDescriptions = GM_getValue(quickRepairDescriptionsKey, [
        {
            reason: 'General Repair',
            schedule: 'Non-Scheduled',
            isBillable: false,
            action: 'Parts Issue',
            group: 'Indirect Labor',
            component: 'Meeting Time'
        }
    ]);
    function saveQuickRepairDescription() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const currentQuickRepairDescription = {
            reason: (_b = (_a = document.querySelector(`#${selectors.reason}`)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
            schedule: (_d = (_c = document.querySelector(`#${selectors.schedule}`)) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '',
            isBillable: (_f = (_e = document.querySelector(`#${selectors.isBillable}`)) === null || _e === void 0 ? void 0 : _e.checked) !== null && _f !== void 0 ? _f : false,
            action: (_h = (_g = document.querySelector(`#${selectors.action}`)) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '',
            group: (_k = (_j = document.querySelector(`#${selectors.group}`)) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : '',
            component: (_m = (_l = document.querySelector(`#${selectors.component}`)) === null || _l === void 0 ? void 0 : _l.value) !== null && _m !== void 0 ? _m : ''
        };
        if (currentQuickRepairDescription.reason === '' ||
            currentQuickRepairDescription.schedule === '' ||
            currentQuickRepairDescription.action === '' ||
            currentQuickRepairDescription.group === '' ||
            currentQuickRepairDescription.component === '') {
            GM_notification({
                title: 'Quick Repair Codes Userscript',
                text: '❌ Please ensure all five repair code fields (Reason, Schedule, Action, Group, and Component) are populated.',
                image: 'https://cityssm.github.io/userscripts/assets/ssmUserscript.png'
            });
            return;
        }
        quickRepairDescriptions = [currentQuickRepairDescription];
        GM_setValue(quickRepairDescriptionsKey, quickRepairDescriptions);
        GM_notification({
            title: 'Quick Repair Codes Userscript',
            text: '✔️ Quick Code updated successfully.',
            image: 'https://cityssm.github.io/userscripts/assets/ssmUserscript.png',
            silent: true
        });
    }
    const updateQuickCodeButtonId = 'userScript_updateQuickCodeButton';
    (_b = (_a = document
        .querySelector('#CancelTopLinkButton')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterend', `<td class="ButtonSeparator">
        <button class="rfdSkinnedButton" id="${updateQuickCodeButtonId}" type="button">Update Quick Code</button>
        </td>`);
    (_c = document
        .querySelector(`#${updateQuickCodeButtonId}`)) === null || _c === void 0 ? void 0 : _c.addEventListener('click', saveQuickRepairDescription);
    async function populateComboBoxField(comboboxSelector, value, doPause = false) {
        var _a, _b, _c;
        await window.UserScriptHelpers.queryHtmlSelectorWait(`#${comboboxSelector}`);
        const comboboxControl = (_a = window.unsafeWindow) === null || _a === void 0 ? void 0 : _a.$find(comboboxSelector);
        comboboxControl.showDropDown();
        if (doPause) {
            await window.UserScriptHelpers.sleep(1000);
        }
        const comboboxItems = (_c = (_b = (await window.UserScriptHelpers.retryWhileNull(() => {
            var _a;
            const element = (_a = window.unsafeWindow) === null || _a === void 0 ? void 0 : _a.$find(comboboxSelector);
            element.showDropDown();
            const items = element.get_items();
            if (items !== null && (items === null || items === void 0 ? void 0 : items.toArray().length) > 0) {
                return items;
            }
            // eslint-disable-next-line unicorn/no-null
            return null;
        }))) === null || _b === void 0 ? void 0 : _b.toArray()) !== null && _c !== void 0 ? _c : [];
        if (comboboxItems.length > 0) {
            comboboxItems[0].select();
        }
        for (const comboboxItem of comboboxItems) {
            if (comboboxItem.get_text() === value) {
                comboboxItem.select();
                break;
            }
        }
        try {
            comboboxControl.hideDropDown();
        }
        catch (_d) { }
    }
    async function setRepairCodeFields(descriptionIndex = 0) {
        const repairDescription = quickRepairDescriptions[descriptionIndex];
        await populateComboBoxField(selectors.reason, repairDescription.reason);
        await populateComboBoxField(selectors.schedule, repairDescription.schedule);
        await window.UserScriptHelpers.sleep();
        document.querySelector(`#${selectors.isBillable}`).checked = repairDescription.isBillable;
        await populateComboBoxField(selectors.action, repairDescription.action, true);
        await populateComboBoxField(selectors.group, repairDescription.group, true);
        await populateComboBoxField(selectors.component, repairDescription.component, true);
    }
    /*
     * Add menu item
     */
    const runOnOpenKey = 'fasterWeb_runOnOpen';
    let runOnOpenToggleId = -1;
    let runOnOpen = GM_getValue(runOnOpenKey, false);
    function registerMenuCommand() {
        runOnOpenToggleId = GM_registerMenuCommand(runOnOpen ? 'Disable Run on Open' : 'Enable Run on Open', () => {
            runOnOpen = !runOnOpen;
            GM_setValue(runOnOpenKey, runOnOpen);
            GM_unregisterMenuCommand(runOnOpenToggleId);
            registerMenuCommand();
        });
    }
    registerMenuCommand();
    /*
     * Add button or run on open
     */
    if (runOnOpen) {
        void setRepairCodeFields();
    }
    else {
        const buttonId = 'userScript_setQuickCodeButton';
        (_e = (_d = document
            .querySelector('#CancelTopLinkButton')) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.insertAdjacentHTML('afterend', `<td class="ButtonSeparator">
          <button class="rfdSkinnedButton" id="${buttonId}" type="button">Set Quick Code</button>
          </td>`);
        (_f = document.querySelector(`#${buttonId}`)) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
            void setRepairCodeFields();
        });
    }
})();
