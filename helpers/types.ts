export {}

declare global {
  interface Window {
    UserScriptHelpers: {
      sleep: (sleepMillis?: number) => Promise<void>
    }
  }
}