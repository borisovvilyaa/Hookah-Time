export default defineNuxtConfig({
  ssr: true,

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  runtimeConfig: {
    public: {
      shopApiUrl: process.env.NUXT_API,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Bespoke CPA Services for Entertainment in Burbank, CA | X Digit',
      meta: [
        {
          name: 'description',
          content:
            'X Digit offers specialized CPA and financial management services for the entertainment industry in Burbank, CA. From tax management to wealth planning for Film, TV, Music, and Gaming professionals. Call Us: +1 (833) 210-2010',
        },
        {
          name: 'keywords',
          content:
            'CPA services, financial management, entertainment industry, tax management, wealth planning, Burbank CA, film professionals, TV professionals, music professionals, gaming professionals, X Digit',
        },
        {
          name: 'language',
          content: 'English',
        },
        {
          name: 'author',
          content: 'X Digit',
        },
        {
          name: 'google',
          content: 'notranslate',
        },
        {
          property: 'og:title',
          content: 'Bespoke CPA Services for Entertainment in Burbank, CA | X Digit',
        },
        {
          property: 'og:description',
          content:
            'Specialized CPA and financial management for Film, TV, Music, and Gaming professionals in Burbank, CA. Contact X Digit at +1 (833) 210-2010.',
        },
        {
          property: 'og:image',
          content: 'https://www.xdigit.us/_nuxt/hero.BK7PjjLv.webp',
        },
        {
          property: 'og:url',
          content: 'https://www.xdigit.us/',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: 'X Digit',
        },
        {
          property: 'og:locale',
          content: 'en_US',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Bespoke CPA Services for Entertainment in Burbank, CA | X Digit',
        },
        {
          name: 'twitter:description',
          content:
            'X Digit provides expert CPA services for entertainment professionals in Burbank, CA. Call us at +1 (833) 210-2010.',
        },
        {
          name: 'twitter:image',
          content: 'https://www.xdigit.us/_nuxt/hero.BK7PjjLv.webp',
        },
        {
          name: 'twitter:site',
          content: '@XDigitUS',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.xdigit.us/',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          defer: true,
        },
      ],
    },
    
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
  },

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/image'],

  build: {
    transpile: ['gsap']
  },

  experimental: {
    payloadExtraction: false
  },

  compatibilityDate: '2025-04-20',
});