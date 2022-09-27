import vuetify from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
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
      UserAgent: '*',
      Disallow: ['/terms', '/privacy-policy'],
      sitemap: "https://blog.melvinvmegen.com/sitemap.xml"
    }
  },
});
