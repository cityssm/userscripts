;
(() => {
    async function sleep(sleepMillis = 250) {
        await new Promise((resolve) => setTimeout(resolve, sleepMillis));
    }
    async function retryWhileNull(retryFunction, maxWaitMillis = 60000) {
        const sleepMillis = 100;
        const iterations = Math.ceil(maxWaitMillis / sleepMillis);
        for (let index = 0; index < iterations; index += 1) {
            try {
                const returnValue = retryFunction();
                if (returnValue !== null) {
                    return returnValue;
                }
            }
            catch (_a) { }
            await window.UserScriptHelpers.sleep(sleepMillis);
        }
        // eslint-disable-next-line unicorn/no-null
        return null;
    }
    async function queryHtmlSelectorWait(htmlElementSelector, maxWaitMillis = 60000) {
        return await retryWhileNull(() => {
            return document.querySelector(htmlElementSelector);
        }, maxWaitMillis);
    }
    const UserScriptHelpers = {
        sleep,
        retryWhileNull,
        queryHtmlSelectorWait
    };
    window.UserScriptHelpers = UserScriptHelpers;
    // eslint-disable-next-line sonarjs/different-types-comparison
    if (window.unsafeWindow !== undefined) {
        window.unsafeWindow.UserScriptHelpers = UserScriptHelpers;
    }
})();
