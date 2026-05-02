export default defineNuxtConfig({
  devtools: true,
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/content",
    '@nuxt/image',
    "@nuxt/icon",
    "@nuxtjs/seo",
  ],
  css: ['~/assets/css/main.css'],
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
  image: {
    format: ['webp'],
    domains: ['melvinvmegen.com'],
    provider: 'cloudinary',
    cloudinary: {
      baseURL: `https://res.cloudinary.com/dhpgnuli7/image/upload/blog`,
      modifiers: {
        effect: 'sharpen:100',
        quality: 'auto:best',
      }
    },
    presets: {
      cover: {
        modifiers: {
          format: 'webp',
        }
      }
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

  experimental: {
    componentIslands: true,
  }
});