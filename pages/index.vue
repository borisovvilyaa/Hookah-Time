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
    <Menu />
    <ServicesSection />
    <AboutSection />
    <Blog />
    <Gallery />
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
import Menu from '~/components/Home/Menu.vue';
import Blog from '~/components/Home/Blog.vue';
import Gallery from '~/components/Home/Gallery.vue';

import AboutSection from '~/components/Home/AboutSection.vue';


// SEO Meta Tags
useHead({
  title: 'Hookah Time LA |  Premium Hookah Lounge in Los Angeles | 400+ Flavors',
  meta: [
    {
      name: 'description',
      content: 'Experience LA\'s best hookah lounge at Hookah Time! 400+ premium flavors, expert mix masters, indoor & outdoor seating. Open 2PM-2AM daily. Ladies Night every day! Located at 4716 Woodman Ave. ☎️ +1 424-424-0044',
    },
    {
      name: 'keywords',
      content: 'hookah lounge Los Angeles, best hookah LA, hookah bar LA, shisha lounge, hookah flavors, premium hookah, late night hookah, ladies night hookah, outdoor hookah lounge, Woodman Ave hookah, Valley Village hookah, Sherman Oaks hookah',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: 'Hookah Time LA |  Premium Hookah Lounge in Los Angeles',
    },
    {
      property: 'og:description',
      content: '400+ premium flavors, expert mix masters, indoor & outdoor seating. Open 2PM-2AM daily. Ladies get FREE refills after 6PM! Reserve your table now.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://hookahtimela.com/',
    },
    // Twitter Card Tags
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Hookah Time LA |  Premium Hookah Lounge in Los Angeles',
    },
    {
      name: 'twitter:description',
      content: '400+ premium flavors, massive clouds guaranteed. Open late 2PM-2AM. Ladies Night every day with free refills!',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://hookahtimela.com/',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NightClub",
        "name": "Hookah Time LA",
        "description": "LA's premier hookah lounge featuring 400+ premium flavors, expert mix masters, and both indoor & outdoor seating. Open 2PM-2AM daily with special Ladies Night promotions.",
        "url": "https://hookahtimela.com/",
        "telephone": "+1-424-424-0044",
        "email": "info@hookahtimela.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4716 Woodman Ave",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "91423",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "34.1689",
          "longitude": "-118.4379"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "14:00",
          "closes": "02:00"
        },
        "priceRange": "$$",
        "sameAs": [
          "https://www.instagram.com/hookahtimela",
          "https://www.tiktok.com/@hookahtimela"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "287",
          "bestRating": "5",
          "worstRating": "1"
        },
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "USD",
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "Outdoor Seating",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Guest Parking",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Indoor Seating",
            "value": true
          }
        ],
        "servesCuisine": "Hookah Lounge",
        "hasMenu": {
          "@type": "Menu",
          "name": "Hookah Menu",
          "description": "Premium hookah flavors including AL FAKHER, FUMARI, STARBUZZ, TANGIERS, DARKSIDE, BLACKBURN, and more",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Hookah Bowls",
              "description": "400+ premium flavors from top brands",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "AL FAKHER Hookah Bowl",
                  "description": "Premium shisha flavors including Grape, Orange, Gum Mint, Double Apple",
                  "offers": {
                    "@type": "Offer",
                    "price": "38",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "MenuItem",
                  "name": "TANGIERS Hookah Bowl",
                  "description": "Premium flavors including Peach Ice Tea, Cane Mint, Kashmir Peach",
                  "offers": {
                    "@type": "Offer",
                    "price": "47",
                    "priceCurrency": "USD"
                  }
                }
              ]
            }
          ]
        },
        "event": {
          "@type": "Event",
          "name": "Ladies Night",
          "description": "Ladies get free refills after 6PM every day",
          "startDate": "2025-01-01",
          "endDate": "2025-12-31",
          "eventSchedule": {
            "@type": "Schedule",
            "byDay": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "startTime": "18:00",
            "endTime": "02:00"
          },
          "location": {
            "@type": "Place",
            "name": "Hookah Time LA",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "4716 Woodman Ave",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "postalCode": "91423"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free refills for ladies"
          }
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are your opening hours?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We're open every day from 2:00 PM to 2:00 AM. Whether you want an afternoon session or late-night vibes, we're here for you 12 hours daily!"
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer custom flavor mixes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! With 400+ premium flavors, our expert mix masters can create any custom blend you desire. Just tell us what you like and we'll make it perfect."
            }
          },
          {
            "@type": "Question",
            "name": "Is there parking available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We offer convenient guest parking for all our visitors. You'll never have trouble finding a spot when you visit Hookah Time LA."
            }
          },
          {
            "@type": "Question",
            "name": "What's the Ladies Night special?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every single day is Ladies Night at Hookah Time! Ladies get FREE refills after 6:00 PM. Bring your crew and enjoy unlimited refills all night long."
            }
          },
          {
            "@type": "Question",
            "name": "What brands of tobacco do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We carry premium brands including AL FAKHER, FUMARI, STARBUZZ, TANGIERS, BANGER, DARKSIDE, BLACKBURN, MUSTHAVE, and STARLINE - over 400 different flavors to choose from!"
            }
          }
        ]
      })
    }
  ]
});

// Additional SEO meta using useSeoMeta
useSeoMeta({
  title: 'Hookah Time LA |  Premium Hookah Lounge in Los Angeles | 400+ Flavors',
  description: 'Experience LA\'s best hookah lounge at Hookah Time! 400+ premium flavors, expert mix masters, indoor & outdoor seating. Open 2PM-2AM daily. Ladies Night every day! ☎️ +1 424-424-0044',
  ogTitle: 'Hookah Time LA |  Premium Hookah Lounge in Los Angeles',
  ogDescription: '400+ premium flavors, expert mix masters, indoor & outdoor seating. Open 2PM-2AM daily. Ladies get FREE refills after 6PM!',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Hookah Time LA |  Premium Hookah Lounge in Los Angeles',
  twitterDescription: '400+ premium flavors, massive clouds guaranteed. Open late 2PM-2AM. Ladies Night every day!',
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