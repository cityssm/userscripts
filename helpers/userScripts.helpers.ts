;(() => {
  async function sleep(sleepMillis = 250): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, sleepMillis))
  }

  window.UserScriptHelpers = {
    sleep
  }
})()
