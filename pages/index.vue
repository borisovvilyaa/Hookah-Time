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
    <Reviews />
    <ServicesSection />
    <AboutSection />
    <Blog />
    <Gallery />
    <CtaSection :formData="formData" :submitQuote="submitQuote" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRuntimeConfig, useHead, useSeoMeta } from '#imports';
import HeroSection from '~/components/Home/HeroSection.vue';
import CtaSection from '~/components/Home/CtaSection.vue';
import ServicesSection from '~/components/Home/ServicesSection.vue';
import Menu from '~/components/Home/Menu.vue';
import Blog from '~/components/Home/Blog.vue';
import Gallery from '~/components/Home/Gallery.vue';
import AboutSection from '~/components/Home/AboutSection.vue';
import Reviews from '~/components/Home/Reviews.vue';

const config = useRuntimeConfig();

const business = {
  name: 'Hookah Time Los Angeles',
  legalName: 'Hookah Time Los Angeles',
  url: 'https://hookahtimela.com',
  logo: 'https://hookahtimela.com/logo.png',
  image: 'https://hookahtimela.com/banner.jpg',
  telephone: '+14244240044',
  email: 'info@hookahtimela.com',
  priceRange: '$$',
  ratingValue: 4.9,
  reviewCount: 287,
  address: {
    streetAddress: '4716 Woodman Ave',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '91423',
    addressCountry: 'US',
  },
  geo: { latitude: '34.1689', longitude: '-118.4379' },
  openingHours: 'Mo-Su 14:00-02:00',
  sameAs: [
    'https://www.instagram.com/hookahtimela',
    'https://g.page/hookahtimela',
  ],
};

useHead({
  title: 'The Best Hookah Lounge in Valley Glen',
  link: [{ rel: 'canonical', href: business.url }],
});

useSeoMeta({
  description:
    'Best hookah lounge in Los Angeles! 400+ premium flavors, expert mixologists, indoor/outdoor seating. Open 2PM-2AM daily. 4716 Woodman Ave, Los Angeles  +1 424-424-0044',
  keywords:
    'hookah lounge los angeles, best hookah Los Angeles, hookah bar sherman oaks, shisha valley village, premium hookah flavors, late night hookah, outdoor hookah Los Angeles, woodman ave hookah',
  ogTitle: business.name + ' | Premium Hookah Lounge in Los Angeles',
  ogDescription: '400+ flavors, expert mixes, indoor & outdoor seating. Open till 2AM.',
  ogUrl: business.url,
  ogImage: business.image,
  ogType: 'website',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '@hookahtimela',
  twitterCreator: '@hookahtimela',
  robots: 'index, follow',
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NightClub',
        '@id': business.url + '#organization',
        name: business.name,
        legalName: business.legalName,
        description:
          "Los Angeles's top hookah lounge with 400+ premium flavors, expert mix masters, indoor & outdoor seating. Open daily 2PM-2AM.!",
        url: business.url,
        logo: business.logo,
        image: business.image,
        telephone: business.telephone,
        email: business.email,
        priceRange: business.priceRange,
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Credit Card',
        address: { '@type': 'PostalAddress', ...business.address },
        geo: { '@type': 'GeoCoordinates', ...business.geo },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '14:00',
          closes: '02:00',
        },
        sameAs: business.sameAs,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: business.ratingValue,
          reviewCount: business.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Indoor Seating', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Guest Parking', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
        ],
        servesCuisine: 'Hookah, Shisha, Lounge',
        hasMenu: {
          '@type': 'Menu',
          name: 'Hookah Menu',
          hasMenuSection: [
            {
              '@type': 'MenuSection',
              name: 'Premium Bowls',
              hasMenuItem: [
                {
                  '@type': 'MenuItem',
                  name: 'AL FAKHER Bowl',
                  description: 'Grape, Mint, Double Apple, Orange',
                  offers: { '@type': 'Offer', price: '38', priceCurrency: 'USD' },
                },
                {
                  '@type': 'MenuItem',
                  name: 'TANGIERS Bowl',
                  description: 'Cane Mint, Kashmir Peach',
                  offers: { '@type': 'Offer', price: '47', priceCurrency: 'USD' },
                },
              ],
            },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are your hours?',
            acceptedAnswer: { '@type': 'Answer', text: 'Open every day from 2:00 PM to 2:00 AM.' },
          },
          {
            '@type': 'Question',
            name: 'Do you have outdoor seating?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes! We offer both indoor and outdoor hookah seating.' },
          },
          {
            '@type': 'Question',
            name: 'Is parking available?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes, free guest parking is available on-site.' },
          },

          {
            '@type': 'Question',
            name: 'How many flavors do you have?',
            acceptedAnswer: { '@type': 'Answer', text: 'Over 400 premium flavors from AL FAKHER, TANGIERS, STARBUZZ, FUMARI and more.' },
          },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: business.url },
        ],
      }),
    },
  ],
});

const formData = ref({ name: '', phone: '', email: '' });

const submitQuote = async () => {
  try {
    const res = await fetch(`${config.public.API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.public.API_TOKEN}`,
      },
      body: JSON.stringify({ data: formData.value }),
    });

    if (!res.ok) throw new Error('Failed');

    formData.value = { name: '', phone: '', email: '' };
    alert('Quote request sent!');
  } catch (err) {
    alert('Error. Please try again.');
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