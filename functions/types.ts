import type { KVNamespace } from '@cloudflare/workers-types';
export interface Env {
	MAIL_API_KEY: string;
	PERSONAL_EMAIL: string;
	MAIL_NS: KVNamespace,
	AUTH_TOKEN: string,
	ASSETS: {
		fetch(request: Request): Promise<Response>;
	};
}

export interface ConfigPayload {
	mailEnabled: boolean
}

