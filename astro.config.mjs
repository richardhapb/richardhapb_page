import { defineConfig, envField } from 'astro/config';

export default defineConfig({
  output: 'server',
  env: {
    schema: {
      API_URL: {
         envField: envField.string({context: 'server', access: 'secret'})
      },
    }
  }
});