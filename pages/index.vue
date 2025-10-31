<template>
  <div class="home">
    <!-- Hero Section with SEO image -->
    <div class="hero-wrapper">
      <img 
        :src="heroImage" 
        alt="Bespoke CPA Services for Entertainment in Burbank, CA - X Digit"
        class="hero-background-image"
        loading="eager"
        width="1920"
        height="1080"
      />
      <HeroSection />
    </div>
    <ServicesSection />
    <CarsList />
    <AboutSection />

    <CtaSection :formData="formData" :submitQuote="submitQuote" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useHead, useSeoMeta } from '@unhead/vue';
import HeroSection from '~/components/Home/HeroSection.vue';
import CtaSection from '~/components/Home/CtaSection.vue';
import ServicesSection from '~/components/Home/ServicesSection.vue';
import CarsList from '~/components/Home/CarsList.vue';
import AboutSection from '~/components/Home/AboutSection.vue';


// SEO Meta Tags
useHead({
  title: 'Astoria Motors | Premium Car Leasing & Financing in California | Best Deals',
  meta: [
    {
      name: 'description',
      content: 'Astoria Motors offers premium car leasing and financing solutions across California. Lease luxury vehicles at unbeatable prices with fast, hassle-free service. Range Rover, Lexus & more. ☎️ +1 415-619-4812',
    },
    {
      name: 'keywords',
      content: 'car leasing California, vehicle financing, luxury car lease, Range Rover lease, Lexus lease, automotive brokerage, car dealer California, vehicle sales, auto financing, car rental',
    },
    {
      name: 'author',
      content: 'Astoria Motors',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: 'Astoria Motors | Premium Car Leasing & Financing in California',
    },
    {
      property: 'og:description',
      content: 'Lease your dream car effortlessly with Astoria Motors. Premium vehicles, unbeatable prices, and flexible financing across California. Fast-track process saves you time.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://astoriamotors.com/',
    },
    {
      property: 'og:image',
      content: 'https://astoriamotors.com/images/hero-vehicle.webp',
    },
    {
      property: 'og:image:alt',
      content: 'Premium Car Leasing - Astoria Motors California',
    },
    {
      property: 'og:site_name',
      content: 'Astoria Motors',
    },
    {
      property: 'og:locale',
      content: 'en_US',
    },
    // Twitter Card Tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Astoria Motors | Premium Car Leasing & Financing in California',
    },
    {
      name: 'twitter:description',
      content: 'Lease luxury vehicles at unbeatable prices. Fast service, flexible terms, and expert negotiation. Your dream car delivered effortlessly.',
    },
    {
      name: 'twitter:image',
      content: 'https://astoriamotors.com/images/hero-vehicle.webp',
    },
    {
      name: 'twitter:image:alt',
      content: 'Astoria Motors - Premium Car Leasing',
    },
    // Local Business Schema
    {
      name: 'geo.region',
      content: 'US-CA',
    },
    {
      name: 'geo.placename',
      content: 'Los Angeles, California',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://astoriamotors.com/',
    },
    {
      rel: 'preload',
      href: 'https://astoriamotors.com/images/hero-vehicle.webp',
      as: 'image',
      type: 'image/webp',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Astoria Motors",
        "description": "Premium automotive brokerage offering car leasing, financing, and vehicle sales across California. Expert negotiation for best deals on luxury vehicles.",
        "url": "https://astoriamotors.com/",
        "telephone": "+1-415-619-4812",
        "email": "info@cardeals.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Los Angeles",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "34.0522",
          "longitude": "-118.2437"
        },
        "openingHours": "Mo-Fr 09:00-19:00, Sa 10:00-18:00",
        "priceRange": "$$$$",
        "image": "https://astoriamotors.com/images/hero-vehicle.webp",
        "sameAs": [
          "https://www.instagram.com/astoriamotors",
          "https://www.tiktok.com/astoriamotors"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        },
        "areaServed": {
          "@type": "State",
          "name": "California"
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
                "serviceType": "Automotive Financing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "New & Used Vehicle Sales",
                "serviceType": "Automotive Sales"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Auto Insurance Services",
                "serviceType": "Insurance"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vehicle Tinting & Wrapping",
                "serviceType": "Automotive Customization"
              }
            }
          ]
        }
      })
    }
  ]
});

// Additional SEO meta using useSeoMeta
useSeoMeta({
  title: 'Astoria Motors | Premium Car Leasing & Financing in California | Best Deals',
  description: 'Astoria Motors offers premium car leasing and financing solutions across California. Lease luxury vehicles at unbeatable prices with fast, hassle-free service. ☎️ +1 415-619-4812',
  ogTitle: 'Astoria Motors | Premium Car Leasing & Financing in California',
  ogDescription: 'Lease your dream car effortlessly with Astoria Motors. Premium vehicles, unbeatable prices, and flexible financing across California.',
  twitterCard: 'summary_large_image',
});


// Component state
const formData = ref({
  name: '',
  phone: '',
  email: '',
});

// Define hero image
const heroImage = 'https://www.xdigit.us/_nuxt/hero.BK7PjjLv.webp';

// Methods
const getImageUrl = (url) => {
  return url;
};

const formatPrice = (price, categories) => {
  const isEntertainmentService =
    categories &&
    categories.some((cat) => cat.title && cat.title.toLowerCase().includes('entertainment'));
  return isEntertainmentService ? `Starting at $${price.toFixed(2)}` : `$${price.toFixed(2)}`;
};

const submitQuote = async () => {
  try {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.shopApiUrl}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.public.shopApiToken}`,
      },
      body: JSON.stringify({
        data: {
          name: formData.value.name,
          phone: formData.value.phone,
          email: formData.value.email,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // On success, reset the form
    formData.value = {
      name: '',
      phone: '',
      email: '',
    };
    alert('Your quote request has been submitted successfully!');
  } catch (error) {
    console.error('Error submitting quote:', error);
    alert('There was an error submitting your quote. Please try again.');
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f8f8f8;
}

.hero-wrapper {
  position: relative;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
}

.hero-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
  opacity: 0.9;
}

/* Media queries for responsive image */
@media (max-width: 768px) {
  .hero-wrapper {
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .hero-wrapper {
    min-height: 300px;
  }
}
</style>