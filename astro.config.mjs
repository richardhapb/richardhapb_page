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
            API_URL: {
                envField: envField.string({ context: 'server', access: 'secret' })
            },
        }
    },
});