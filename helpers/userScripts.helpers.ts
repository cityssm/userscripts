;(() => {
  async function sleep(sleepMillis = 250): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, sleepMillis))
  }

  async function retryWhileNull<T>(
    retryFunction: () => T | null,
    maxWaitMillis = 60_000
  ): Promise<T | null> {
    const sleepMillis = 100
  
    const iterations = Math.ceil(maxWaitMillis / sleepMillis)
  
    for (let index = 0; index < iterations; index += 1) {
      try {
        const returnValue = retryFunction()
  
        if (returnValue !== null) {
          return returnValue
        }
      } catch {}
  
      await window.UserScriptHelpers.sleep(sleepMillis)
    }
  
    // eslint-disable-next-line unicorn/no-null
    return null
  }
  
  async function queryHtmlSelectorWait(
    htmlElementSelector: string,
    maxWaitMillis = 60_000
  ): Promise<HTMLElement | null> {
    return await retryWhileNull(() => {
      return document.querySelector(htmlElementSelector) as HTMLElement | null
    }, maxWaitMillis)
  }

  const UserScriptHelpers = {
    sleep,
    retryWhileNull,
    queryHtmlSelectorWait
  }

  window.UserScriptHelpers = UserScriptHelpers

  // eslint-disable-next-line sonarjs/different-types-comparison
  if (window.unsafeWindow !== undefined) {
    window.unsafeWindow.UserScriptHelpers = UserScriptHelpers
  }
})()
