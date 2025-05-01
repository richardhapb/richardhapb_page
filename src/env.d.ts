/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly MAIL_API_KEY: string;
    readonly MAIL_ENDPOINT: string;
    readonly PERSONAL_EMAIL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
