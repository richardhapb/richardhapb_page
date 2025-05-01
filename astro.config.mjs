import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    output: 'server',
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),
    env: {
        schema: {
            MAIL_API_KEY: envField.string({ context: 'server', access: 'secret' }),
            MAIL_ENDPOINT: envField.string({ context: 'server', access: 'secret' }),
            PERSONAL_EMAIL: envField.string({ context: 'server', access: 'secret' }),
        }
    }
});