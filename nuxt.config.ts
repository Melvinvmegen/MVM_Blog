import vuetify from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["vuetify/styles"], // vuetify ships precompiled css, no need to import sass
  vite: {
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  modules: [
    // this adds the vuetify vite plugin
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // Produces type errors in the current beta release
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
    "@intlify/nuxt3", // i18n
    "@nuxt/content",
    "@funken-studio/sitemap-nuxt-3",
    "@nuxtjs/robots",
    "nuxt-purgecss",
    "nuxt-icon"
  ],
  content: {
    highlight: {
      theme: "dark-plus",
    },
  },
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
    },
  },
  sitemap: {
    hostname: "https://blog.melvinvmegen.com",
    exclude: ["terms", "privacy-policy"],
    routes: [
      "/posts/javascript",
      "/posts/javascript/javascript_dos_and_donts",
      "/snippets/debounce",
      "/snippets/random",
      "/snippets/range",
    ],
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
      "node_modules/vuetify/src/**/*.ts",
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
  nuxtIcon: {
    size: '24px' // default <Icon> size applied
  }
});
