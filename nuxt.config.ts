export default defineNuxtConfig({
  compatibilityDate: '2026-04-24',
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/content",
    '@nuxt/image',
    "@nuxt/icon",
    "@nuxtjs/seo",
    '@nuxt/ui',
    '@nuxt/eslint'
  ],
  css: ['~/assets/css/main.css'],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "dark-plus",
        },
      },
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    langDir: 'locales',
    defaultLocale: 'en',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/rss.xml'],
      failOnError: false,
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
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://blog.melvinvmegen.com',
    name: 'MVM Blog for JS developers',
    description: 'Friendly tutorials for developers. Focus on Js, Vue, Node, and more!',
    defaultLocale: 'en',
  },
  runtimeConfig: {
    public: {
      language: 'en-US',
    }
  },
  robots: {
    disallow: ["/terms", "/privacy-policy"],
    sitemap: (process.env.NUXT_PUBLIC_SITE_URL || 'https://blog.melvinvmegen.com') + '/sitemap.xml',
  },
  experimental: {
    componentIslands: true,
  }
});