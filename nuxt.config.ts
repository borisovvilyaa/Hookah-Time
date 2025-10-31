export default defineNuxtConfig({
  ssr: true,

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Astoria Motors | Premium Car Leasing & Financing in California | Best Deals',
      meta: [
        {
          name: 'description',
          content:
            'Astoria Motors offers premium car leasing and financing solutions across California. Lease luxury vehicles at unbeatable prices with fast, hassle-free service. Range Rover, Lexus & more. ☎️ +1 415-619-4812',
        },
        {
          name: 'keywords',
          content:
            'car leasing California, vehicle financing, luxury car lease, Range Rover lease, Lexus lease, automotive brokerage, car dealer California, vehicle sales, auto financing, car rental',
        },
        { name: 'author', content: 'Astoria Motors' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        {
          property: 'og:title',
          content: 'Astoria Motors | Premium Car Leasing & Financing in California',
        },
        {
          property: 'og:description',
          content:
            'Lease your dream car effortlessly with Astoria Motors. Premium vehicles, unbeatable prices, and flexible financing across California. Fast-track process saves you time.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://astoriamotors.com/' },
        {
          property: 'og:image',
          content: 'https://astoriamotors.com/images/hero-vehicle.webp',
        },
        {
          property: 'og:image:alt',
          content: 'Premium Car Leasing - Astoria Motors California',
        },
        { property: 'og:site_name', content: 'Astoria Motors' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Astoria Motors | Premium Car Leasing & Financing in California',
        },
        {
          name: 'twitter:description',
          content:
            'Lease luxury vehicles at unbeatable prices. Fast service, flexible terms, and expert negotiation. Your dream car delivered effortlessly.',
        },
        {
          name: 'twitter:image',
          content: 'https://astoriamotors.com/images/hero-vehicle.webp',
        },
        {
          name: 'twitter:image:alt',
          content: 'Astoria Motors - Premium Car Leasing',
        },

        // Local business
        { name: 'geo.region', content: 'US-CA' },
        { name: 'geo.placename', content: 'Los Angeles, California' },
      ],

      link: [
        { rel: 'canonical', href: 'https://astoriamotors.com/' },
        {
          rel: 'preload',
          href: 'https://astoriamotors.com/images/hero-vehicle.webp',
          as: 'image',
          type: 'image/webp',
        },
      ],

      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          defer: true,
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Astoria Motors",
            "description":
              "Premium automotive brokerage offering car leasing, financing, and vehicle sales across California. Expert negotiation for best deals on luxury vehicles.",
            "url": "https://astoriamotors.com/",
            "telephone": "+1-415-619-4812",
            "email": "info@cardeals.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Los Angeles",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "addressCountry": "US",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "34.0522",
              "longitude": "-118.2437",
            },
            "openingHours": "Mo-Fr 09:00-19:00, Sa 10:00-18:00",
            "priceRange": "$$$$",
            "image": "https://astoriamotors.com/images/hero-vehicle.webp",
            "sameAs": [
              "https://www.instagram.com/astoriamotors",
              "https://www.tiktok.com/astoriamotors",
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150",
            },
            "areaServed": {
              "@type": "State",
              "name": "California",
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Automotive Leasing and Sales Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Car Leasing & Financing",
                    "serviceType": "Automotive Financing",
                  },
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "New & Used Vehicle Sales",
                    "serviceType": "Automotive Sales",
                  },
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Auto Insurance Services",
                    "serviceType": "Insurance",
                  },
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Vehicle Tinting & Wrapping",
                    "serviceType": "Automotive Customization",
                  },
                },
              ],
            },
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