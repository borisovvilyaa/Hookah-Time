export default defineNuxtConfig({
  ssr: true,

  // Настройка для статической генерации на AWS Amplify
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Hookah Time LA | #1 Premium Hookah Lounge in Los Angeles',
      meta: [
        {
          name: 'description',
          content:
            'Experience LA\'s best hookah lounge at Hookah Time! 400+ premium flavors, expert mix masters, indoor & outdoor seating. Open 2PM-2AM daily. Ladies Night every day! ☎️ +1 424-424-0044',
        },
        {
          name: 'keywords',
          content:
            'hookah lounge Los Angeles, best hookah LA, hookah bar LA, shisha lounge, hookah flavors, premium hookah, late night hookah, ladies night hookah, outdoor hookah lounge, Woodman Ave hookah',
        },
        { name: 'author', content: 'Hookah Time LA' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph (Facebook, LinkedIn, WhatsApp)
        {
          property: 'og:title',
          content: 'Hookah Time LA | #1 Premium Hookah Lounge in Los Angeles',
        },
        {
          property: 'og:description',
          content:
            '400+ premium flavors, expert mix masters, indoor & outdoor seating. Open 2PM-2AM daily. Ladies get FREE refills after 6PM! Reserve your table now.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://hookahtimela.com/' },
        {
          property: 'og:image',
          content: 'https://hookahtimela.com/banner.jpg',
        },
        {
          property: 'og:image:secure_url',
          content: 'https://hookahtimela.com/banner.jpg',
        },
        {
          property: 'og:image:type',
          content: 'image/jpeg',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:image:alt',
          content: 'Hookah Time LA - Premium Hookah Lounge Interior',
        },
        { property: 'og:site_name', content: 'Hookah Time LA' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Hookah Time LA | #1 Premium Hookah Lounge in Los Angeles',
        },
        {
          name: 'twitter:description',
          content:
            '400+ premium flavors, massive clouds guaranteed. Open late 2PM-2AM. Ladies Night every day with free refills!',
        },
        {
          name: 'twitter:image',
          content: 'https://hookahtimela.com/banner.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'Hookah Time LA - Premium Hookah Lounge',
        },

        // Local business SEO
        { name: 'geo.region', content: 'US-CA' },
        { name: 'geo.placename', content: 'Los Angeles, California' },
        { name: 'geo.position', content: '34.1689;-118.4379' },
        
        // PWA & Mobile
        { name: 'theme-color', content: '#1a1a1a' },
        { name: 'msapplication-TileColor', content: '#1a1a1a' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'apple-mobile-web-app-title', content: 'Hookah Time LA' },
      ],

      link: [
        { rel: 'canonical', href: 'https://hookahtimela.com/' },
        {
          rel: 'preload',
          href: '/banner.jpg',
          as: 'image',
          type: 'image/jpeg',
        },
        
        // Favicons
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { 
          rel: 'icon', 
          type: 'image/png', 
          sizes: '192x192', 
          href: '/android-chrome-192x192.png' 
        },
        { 
          rel: 'icon', 
          type: 'image/png', 
          sizes: '512x512', 
          href: '/android-chrome-512x512.png' 
        },
        { 
          rel: 'apple-touch-icon', 
          sizes: '180x180', 
          href: '/apple-touch-icon.png' 
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],

      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          defer: true,
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NightClub',
            name: 'Hookah Time LA',
            description:
              "LA's premier hookah lounge featuring 400+ premium flavors, expert mix masters, and both indoor & outdoor seating. Open 2PM-2AM daily with special Ladies Night promotions.",
            url: 'https://hookahtimela.com/',
            telephone: '+1-424-424-0044',
            email: 'info@hookahtimela.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '4716 Woodman Ave',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              postalCode: '91423',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '34.1689',
              longitude: '-118.4379',
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '14:00',
              closes: '02:00',
            },
            priceRange: '$$',
            image: 'https://hookahtimela.com/banner.jpg',
            logo: 'https://hookahtimela.com/banner.jpg',
            sameAs: [
              'https://www.instagram.com/hookahtime_la',
              'https://www.youtube.com/@HookahTime_LA',
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '287',
              bestRating: '5',
              worstRating: '1',
            },
            paymentAccepted: 'Cash, Credit Card',
            currenciesAccepted: 'USD',
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Outdoor Seating',
                value: true,
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Guest Parking',
                value: true,
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Indoor Seating',
                value: true,
              },
            ],
            servesCuisine: 'Hookah Lounge',
          }),
        },
      ],
    },

    pageTransition: { name: 'page', mode: 'out-in' },
  },

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/image'],

  build: {
    transpile: ['gsap'],
  },

  experimental: {
    payloadExtraction: false,
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      API_TOKEN: process.env.NUXT_API_TOKEN,
    },
  },

  compatibilityDate: '2025-04-20',
});