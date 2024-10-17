import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',

  env: {
    schema: {
      API_URL: {
         envField: envField.string({context: 'server', access: 'secret'})
      },
    }
  },

  adapter: cloudflare()
});