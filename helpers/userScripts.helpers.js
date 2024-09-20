;
(() => {
    async function sleep(sleepMillis = 250) {
        await new Promise((resolve) => setTimeout(resolve, sleepMillis));
    }
    window.UserScriptHelpers = {
        sleep
    };
})();
