import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://www.skilltreq.com',
  output: 'static',

  i18n: {
    locales: ['en', 'sk', 'cs'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [sitemap(), vue()],

  vite: {
    plugins: [tailwindcss()],
  },
});
