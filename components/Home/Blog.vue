<template>
  <section class="blog" aria-label="Blog and News">
    <div class="blog-container">
      <!-- Header -->
      <div class="blog-header" data-animate data-delay="0">
        <div class="section-label">
          <div class="label-line"></div>
          <span class="label-text">Our Stories</span>
        </div>
        
        <h2 class="blog-title">
          <span class="title-line">Latest News</span>
          <span class="title-line title-accent">& Updates</span>
        </h2>
        
        <p class="blog-subtitle">
          Stay updated with hookah culture, flavor reviews, events, and insider tips 
          from LA's Premium hookah lounge
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading articles...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <p class="error-text">Failed to load articles. Please try again later.</p>
      </div>

      <!-- Blog Grid -->
      <div v-else-if="blogPosts.length > 0" class="blog-grid">
        <NuxtLink 
          v-for="(post, index) in blogPosts" 
          :key="post.id" 
          :to="`/blog/${post.slug}`"
          class="blog-item"
          data-animate
          :data-delay="index * 100"
        >
          <div class="item-image">
            <img 
              :src="getImageUrl(post.FeaturedImage)" 
              :alt="post.title" 
              loading="lazy" 
            />
            <div class="image-gradient"></div>
          </div>
          
          <div class="item-overlay">
            <div class="overlay-content">
              <div class="post-category">{{ getCategory(post) }}</div>
              <div class="post-meta">
                <span class="meta-date">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  {{ formatDate(post.Time) }}
                </span>
                <span class="meta-divider">•</span>
                <span class="meta-read">{{ post.TimeReaded }}</span>
              </div>
            </div>
          </div>
          
          <div class="item-footer">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="read-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-container">
        <p class="empty-text">No articles available at the moment.</p>
      </div>

      <!-- Newsletter CTA -->
      <!-- <div class="newsletter-section" data-animate data-delay="500">
        <div class="newsletter-content">
          <div class="newsletter-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div class="newsletter-text">
            <h3 class="newsletter-title">Stay in the Loop</h3>
            <p class="newsletter-description">
              Subscribe to our newsletter for exclusive deals, flavor drops, and event invites
            </p>
          </div>
          
          <div class="newsletter-actions">
            <input 
              type="email" 
              class="newsletter-input" 
              placeholder="Enter your email"
              v-model="email"
            />
            <button @click="handleSubscribe" class="newsletter-button">
              <span>Subscribe</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const config = useRuntimeConfig();
const email = ref('');
let observer = null;

// Fetch blog posts from API
const { data: blogData, pending, error } = await useAsyncData(
  'blog-posts',
  async () => {
    try {
      const response = await $fetch(`${config.public.API_URL}/blogs`, {
        params: {
          'populate': '*'
        },
        headers: {
          Authorization: `Bearer ${config.public.API_TOKEN}`,
        }
      });
      
      // Return the data array from the response
      return response?.data || [];
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
      return [];
    }
  }
);

const blogPosts = computed(() => blogData.value || []);

// Helper function to get image URL
const getImageUrl = (featuredImage) => {
  if (!featuredImage) {
    return 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&q=80';
  }
  
  // Use small format if available, otherwise use original
  if (featuredImage.formats?.small?.url) {
    return featuredImage.formats.small.url;
  }
  
  return featuredImage.url || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&q=80';
};

// Helper function to get category (from keywords or default)
const getCategory = (post) => {
  if (post.KeyWords?.terms && post.KeyWords.terms.length > 0) {
    // Capitalize first keyword
    return post.KeyWords.terms[0]
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return 'Article';
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } catch {
    return 'Recently';
  }
};

const handleSubscribe = () => {
  if (email.value) {
    alert(`Thanks for subscribing! We'll send updates to ${email.value}`);
    email.value = '';
  }
};

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const delay = target.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          target.classList.add('animated');
        }, parseInt(delay));
        
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  padding: 120px 0;
  overflow: hidden;
}

.blog::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.08) 0%, transparent 70%);
  filter: blur(100px);
  pointer-events: none;
}

.blog-container {
  position: relative;
  width: 100%;
  z-index: 1;
}

[data-animate] {
  opacity: 0;
  transform: translateY(60px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-animate].animated {
  opacity: 1;
  transform: translateY(0);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(253, 185, 19, 0.1);
  border-top: 3px solid #FDB913;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
}

.error-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  text-align: center;
}

/* Empty State */
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
}

.empty-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  text-align: center;
}

/* Header */
.blog-header {
  text-align: center;
  margin-bottom: 80px;
  padding: 0 60px;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.label-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #FDB913 0%, transparent 100%);
}

.label-text {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(253, 185, 19, 0.8);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.blog-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.title-line {
  display: block;
  color: rgba(255, 255, 255, 0.95);
}

.title-accent {
  background: linear-gradient(135deg, #FDB913 0%, #ffdd55 50%, #FDB913 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite;
}

.blog-subtitle {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-bottom: 100px;
}

.blog-item {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.item-image {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-item:hover .item-image img {
  transform: scale(1.1);
}

.image-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  transition: background 0.6s ease;
}

.blog-item:hover .image-gradient {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  align-items: flex-end;
  padding: 32px;
  z-index: 2;
}

.overlay-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-category {
  display: inline-block;
  align-self: flex-start;
  padding: 6px 16px;
  background: rgba(253, 185, 19, 0.9);
  color: #000000;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.4s ease;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.meta-date {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-divider {
  color: #FDB913;
}

/* Footer Section */
.item-footer {
  position: relative;
  width: 100%;
  height: 140px;
  background: rgba(0, 0, 0, 0.95);
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  z-index: 3;
  border-top: 1px solid rgba(253, 185, 19, 0.2);
}

.post-title {
  flex: 1;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.01em;
  transition: color 0.4s ease;
}

.blog-item:hover .post-title {
  color: #FDB913;
}

.read-arrow {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.3);
  color: #FDB913;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-item:hover .read-arrow {
  background: rgba(253, 185, 19, 0.2);
  border-color: #FDB913;
  transform: translateX(4px);
}

/* Newsletter Section */
.newsletter-section {
  position: relative;
  background: rgba(253, 185, 19, 0.05);
  border: 1px solid rgba(253, 185, 19, 0.3);
  padding: 60px;
  margin: 0 60px;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #FDB913 0%, #ffdd55 100%);
}

.newsletter-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.newsletter-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.3);
  border-radius: 50%;
  color: #FDB913;
}

.newsletter-text {
  flex: 1;
}

.newsletter-title {
  font-size: 2rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.newsletter-description {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-actions {
  display: flex;
  gap: 12px;
  min-width: 400px;
}

.newsletter-input {
  flex: 1;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.newsletter-input:focus {
  border-color: #FDB913;
  background: rgba(0, 0, 0, 0.5);
}

.newsletter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: #FDB913;
  border: none;
  color: #000000;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.newsletter-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.newsletter-button:hover::before {
  transform: translateX(100%);
}

.newsletter-button:hover {
  background: #ffdd55;
  transform: translateY(-2px);
}

.newsletter-button:active {
  transform: translateY(0);
}

/* Animations */
@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .blog {
    padding: 100px 0;
  }
  
  .blog-header {
    padding: 0 40px;
  }
  
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .newsletter-section {
    margin: 0 40px;
  }
  
  .newsletter-actions {
    min-width: 350px;
  }
}

@media (max-width: 968px) {
  .blog {
    padding: 80px 0;
  }
  
  .blog-header {
    padding: 0 32px;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-item {
    height: 550px;
  }
  
  .item-footer {
    height: 160px;
    padding: 28px 32px;
  }
  
  .post-title {
    font-size: 1.4rem;
  }
  
  .newsletter-section {
    margin: 0 32px;
  }
  
  .newsletter-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
  
  .newsletter-actions {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 768px) {
  .blog {
    padding: 60px 0;
  }
  
  .blog-header {
    margin-bottom: 60px;
    padding: 0 24px;
  }
  
  .blog-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .blog-subtitle {
    font-size: 1rem;
  }
  
  .blog-item {
    height: 500px;
  }
  
  .item-overlay {
    padding: 24px;
  }
  
  .item-footer {
    height: 140px;
    padding: 24px;
  }
  
  .post-title {
    font-size: 1.25rem;
  }
  
  .newsletter-section {
    padding: 40px 32px;
    margin: 0 24px;
  }
  
  .newsletter-title {
    font-size: 1.75rem;
  }
  
  .newsletter-actions {
    flex-direction: column;
  }
  
  .newsletter-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .blog {
    padding: 50px 0;
  }
  
  .blog-header {
    padding: 0 20px;
  }
  
  .blog-item {
    height: 450px;
  }
  
  .item-overlay {
    padding: 20px;
  }
  
  .item-footer {
    height: 120px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .post-category {
    padding: 5px 12px;
    font-size: 0.65rem;
  }
  
  .post-title {
    font-size: 1.1rem;
  }
  
  .read-arrow {
    width: 40px;
    height: 40px;
    align-self: flex-end;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  
  .newsletter-section {
    padding: 32px 24px;
    margin: 0 20px;
  }
  
  .newsletter-icon {
    width: 64px;
    height: 64px;
  }
  
  .newsletter-icon svg {
    width: 32px;
    height: 32px;
  }
  
  .newsletter-title {
    font-size: 1.5rem;
  }
  
  .newsletter-description {
    font-size: 0.95rem;
  }
  
  .newsletter-input,
  .newsletter-button {
    padding: 14px 20px;
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .title-accent {
    animation: none;
  }
  
  .newsletter-button::before {
    display: none;
  }
  
  .blog-item:hover .item-image img {
    transform: none;
  }
}
</style>