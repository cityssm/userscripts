interface GM_xmlhttpRequest_response {
    status: number;
    statusText: string;
    readyState: number;
    responseHeaders: string;
    response: string | Blob | ArrayBuffer | Document | object | null;
    responseText: string | undefined;
    responseXML: Document | null;
    lengthComputable: boolean;
    loaded: number;
    total: number;
    finalUrl: string;
    context: any;
}
export {};
declare global {
    function GM_getValue(key: string, defaultValue?: any): any;
    function GM_setValue(key: string, value: any): void;
    function GM_deleteValue(key: string): void;
    function GM_registerMenuCommand(caption: string, onClick: (event: Event) => void, options?: {
        id?: string;
        title?: string;
        autoClose?: boolean;
    }): string;
    function GM_xmlhttpRequest(details: {
        url: string;
        method?: 'GET' | 'POST' | 'PUT';
        user?: string;
        password?: string;
        overrideMimeType?: string;
        headers?: object;
        responseType?: 'text' | 'json' | 'blob' | 'arraybuffer' | 'document';
        timeout?: number;
        data?: string | ArrayBuffer | Blob | DataView | FormData | ReadableStream | any[] | URLSearchParams;
        binary?: boolean;
        context?: any;
        anonymous?: boolean;
        onabort?: (response: GM_xmlhttpRequest_response) => void;
        onerror?: (response: GM_xmlhttpRequest_response) => void;
        onload?: (response: GM_xmlhttpRequest_response) => void;
        onloadend?: (response: GM_xmlhttpRequest_response) => void;
        onloadstart?: (response: GM_xmlhttpRequest_response) => void;
        onprogress?: (response: GM_xmlhttpRequest_response) => void;
        onreadystatechange?: (response: GM_xmlhttpRequest_response) => void;
        ontimeout?: (response: GM_xmlhttpRequest_response) => void;
    }): {
        abort: () => void;
    };
    const CURRENT_USER: {
        account_id: number;
        alpha_tickets_view: boolean;
        color_theme: string;
        email: string;
        id: number;
        is_org_restricted: boolean;
        restricted_organization_ids: null | unknown;
        role: 'admin' | 'manager' | 'tech';
        selected_date_display_format: string;
        spiceworks_user_id: number;
        wants_browser_notifications: boolean;
        wants_live_updates: boolean;
        wants_relative_dates: boolean;
    };
}
