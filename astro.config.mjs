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

  integrations: [
    sitemap({
      filter: (page) =>
        // Exclude redirect-only pages from sitemap
        ![
          'https://www.skilltreq.com/',
          'https://www.skilltreq.com/privacy/',
          'https://www.skilltreq.com/terms/',
          'https://www.skilltreq.com/blog/',
        ].includes(page),
    }),
    vue(),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['skilltreq-landing.home.lan'],
    },
  },
});
