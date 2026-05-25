export default defineNuxtConfig({
  compatibilityDate: '2026-04-24',
  app: {
    head: {
      script: [
        {
          innerHTML: `
            var _paq = window._paq = window._paq || [];
            _paq.push(['requireConsent']);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//stats.melvinvmegen.com/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '3']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
        },
      ],
    },
  },
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