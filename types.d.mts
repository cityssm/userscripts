declare global {
    function GM_getValue(key: string, defaultValue?: any): any;
    function GM_setValue(key: string, value: any): void;
    function GM_deleteValue(key: string): void;
    function GM_registerMenuCommand(caption: string, onClick: (event: Event) => void, options?: {
        id?: string;
        title?: string;
        autoClose?: boolean;
    }): string;
}
export {};
