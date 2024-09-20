export {};
declare global {
    interface Window {
        UserScriptHelpers: {
            sleep: (sleepMillis?: number) => Promise<void>;
            retryWhileNull: <T>(retryFunction: () => T | null, maxWaitMillis?: number) => Promise<T | null>;
            queryHtmlSelectorWait: (htmlElementSelector: string, maxWaitMillis?: number) => Promise<HTMLElement | null>;
        };
    }
}
