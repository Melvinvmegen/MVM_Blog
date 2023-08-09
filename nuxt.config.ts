
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: true,
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "nuxt-purgecss",
    "nuxt-icon"
  ],
  extends: [
    "nuxt-seo-kit",
  ],
  content: {
    highlight: {
      theme: "dark-plus",
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    legacy: false,
    lazy: true,
    langDir: 'locales',
    locale: 'en',
    defaultLocale: 'en',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/rss.xml'],
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://blog.melvinvmegen.com/sitemap.xml',
      siteName: 'MVM Blog for JS developers',
      siteDescription: 'Friendly tutorials for developers. Focus on Js, Vue, Node, and more!',
      language: 'en-US',
    }
  },
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: ["/terms", "/privacy-policy"],
      sitemap: "https://blog.melvinvmegen.com/sitemap.xml",
    },
  },
  purgecss: {
    content: [
      'index.html',
      "components/**/*.vue",
      "layouts/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
    ],
    enabled: true, // Always enable purgecss
    keyframes: true,
    safelist: {
      standard: [
        "body",
        "html",
        "nuxt-progress",
        /v-application-*/,
        /v-table*/,
        /td*/,
        /v-container-*/,
        /v-row-*/,
        /v-col-*/,
        /v-icon*/,
        /v-list-*/,
        /v-btn*/,
        /v-toolbar*/,
        /v-chip*/,
        /v-card*/,
        /v-breadcrumbs*/,
        /grow-*/,
        /v-navigation*/,
        /mdi*/,
        "pre",
        "a",
        "ul",
        "ol",
        "code",
        "line",
        "my" ],
      },
  },
});