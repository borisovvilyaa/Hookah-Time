<template>
  <article class="blog-post" aria-label="Blog Article">
    <!-- Loading State -->
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading article...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="error-container">
      <p class="error-text">Failed to load article. Please try again later.</p>
      <NuxtLink to="/blog" class="back-button">Back to Blog</NuxtLink>
    </div>

    <!-- Main Content -->
    <div v-else class="blog-post-container">
      <!-- Hero Section -->
      <div class="hero-section" data-animate data-delay="0">
        <div class="hero-overlay"></div>
        <img 
          :src="getHeroImage(post)" 
          :alt="post.title"
          class="hero-image"
        />
        
        <div class="hero-content">
          <div class="breadcrumbs">
            <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
            <span class="breadcrumb-separator">/</span>
            <NuxtLink to="/blog" class="breadcrumb-link">Blog</NuxtLink>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ getCategoryName(post) }}</span>
          </div>
          
          <h1 class="hero-title">
            {{ post.title }}
          </h1>
          
          <div class="hero-meta">
            <div class="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ formatDate(post.Time) }}</span>
            </div>
            <div class="meta-divider">•</div>
            <div class="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ getCategoryName(post) }}</span>
            </div>
            <div class="meta-divider">•</div>
            <div class="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>{{ post.TimeReaded }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="content-wrapper">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content" data-animate data-delay="100">
            <div class="rich-text-content">
              <!-- Render Rich Text Content -->
              <template v-if="post.Content && post.Content.length > 0">
                <div v-for="(block, index) in post.Content" :key="index">
                  <!-- Paragraph -->
                  <p 
                    v-if="block.type === 'paragraph' && hasText(block)" 
                    v-html="renderChildren(block.children)"
                    :class="{'lead-text': index === 0}"
                  ></p>
                  
                  <!-- Heading Level 2 -->
                  <h2 v-else-if="block.type === 'heading' && block.level === 2">
                    {{ getTextFromChildren(block.children) }}
                  </h2>
                  
                  <!-- Heading Level 3 -->
                  <h3 v-else-if="block.type === 'heading' && block.level === 3">
                    {{ getTextFromChildren(block.children) }}
                  </h3>
                  
                  <!-- Unordered List -->
                  <ul v-else-if="block.type === 'list' && block.format === 'unordered'">
                    <li v-for="(item, idx) in block.children" :key="idx">
                      {{ getTextFromChildren(item.children) }}
                    </li>
                  </ul>

                  <!-- Ordered List -->
                  <ol v-else-if="block.type === 'list' && block.format === 'ordered'">
                    <li v-for="(item, idx) in block.children" :key="idx">
                      {{ getTextFromChildren(item.children) }}
                    </li>
                  </ol>
                </div>
              </template>

              <!-- Share Section -->
              <div class="share-section">
                <h3>Share This Article</h3>
                <div class="share-buttons">
                  <button @click="shareOnFacebook" class="share-btn facebook" aria-label="Share on Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button @click="shareOnTwitter" class="share-btn twitter" aria-label="Share on Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button @click="shareOnLinkedIn" class="share-btn linkedin" aria-label="Share on LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button @click="copyLink" class="share-btn copy" aria-label="Copy link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="related-posts" data-animate data-delay="300">
        <h2 class="related-title">Related Articles</h2>
        <div class="related-grid">
          <NuxtLink 
            v-for="relatedPost in relatedPosts.slice(0, 3)" 
            :key="relatedPost.id"
            :to="`/blog/${relatedPost.slug}`" 
            class="related-card"
          >
            <div class="card-image">
              <img :src="getImageUrl(relatedPost.FeaturedImage)" :alt="relatedPost.title" />
            </div>
            <div class="card-content">
              <span class="card-category">{{ getCategoryName(relatedPost) }}</span>
              <h3>{{ relatedPost.title }}</h3>
              <p>{{ getExcerpt(relatedPost) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug

let observer = null

// Fetch blog post by slug
const { data: blogData, pending, error } = await useAsyncData(
  `blog-post-${slug}`,
  async () => {
    try {
      const response = await $fetch(`${config.public.API_URL}/blogs`, {
        params: {
          'filters[slug][$eq]': slug,
          'populate': '*'
        },
        headers: {
          Authorization: `Bearer ${config.public.API_TOKEN}`,
        }
      })
      
      return response?.data?.[0] || null
    } catch (err) {
      console.error('Failed to fetch blog post:', err)
      return null
    }
  }
)

const post = computed(() => blogData.value)

// Fetch related posts
const { data: relatedData } = await useAsyncData(
  'related-posts',
  async () => {
    try {
      const response = await $fetch(`${config.public.API_URL}/blogs`, {
        params: {
          'filters[slug][$ne]': slug,
          'populate': '*',
          'pagination[limit]': 3
        },
        headers: {
          Authorization: `Bearer ${config.public.API_TOKEN}`,
        }
      })
      
      return response?.data || []
    } catch (err) {
      console.error('Failed to fetch related posts:', err)
      return []
    }
  }
)

const relatedPosts = computed(() => relatedData.value || [])

// Helper function to get hero image
const getHeroImage = (post) => {
  if (!post?.FeaturedImage) {
    return 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&q=80'
  }
  
  if (post.FeaturedImage.formats?.large?.url) {
    return post.FeaturedImage.formats.large.url
  }
  
  return post.FeaturedImage.url || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&q=80'
}

// Helper function to get image URL
const getImageUrl = (featuredImage) => {
  if (!featuredImage) {
    return 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80'
  }
  
  if (featuredImage.formats?.small?.url) {
    return featuredImage.formats.small.url
  }
  
  return featuredImage.url || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80'
}

// Helper function to get category name
const getCategoryName = (post) => {
  if (post?.KeyWords?.terms && post.KeyWords.terms.length > 0) {
    return post.KeyWords.terms[0]
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return 'Article'
}

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Recently'
  
  try {
    const date = new Date(dateString)
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  } catch {
    return 'Recently'
  }
}

// Helper function to get text from children
const getTextFromChildren = (children) => {
  if (!children) return ''
  return children.map(child => child.text || '').join('')
}

// Helper function to get excerpt
const getExcerpt = (post) => {
  if (!post?.Content || post.Content.length === 0) return ''
  
  const firstParagraph = post.Content.find(block => 
    block.type === 'paragraph' && block.children && block.children.length > 0
  )
  
  if (firstParagraph) {
    const text = getTextFromChildren(firstParagraph.children)
    return text.length > 160 ? text.substring(0, 160) + '...' : text
  }
  
  return ''
}

// Helper function to check if block has text
const hasText = (block) => {
  if (!block.children || block.children.length === 0) return false
  return block.children.some(child => child.text && child.text.trim() !== '')
}

// Helper function to render children with formatting
const renderChildren = (children) => {
  if (!children) return ''
  
  return children.map(child => {
    let text = child.text || ''
    
    if (child.bold) {
      text = `<strong>${text}</strong>`
    }
    if (child.italic) {
      text = `<em>${text}</em>`
    }
    if (child.underline) {
      text = `<u>${text}</u>`
    }
    if (child.code) {
      text = `<code>${text}</code>`
    }
    
    return text
  }).join('')
}

// Share functions
const shareOnFacebook = () => {
  const url = window.location.href
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const shareOnTwitter = () => {
  const url = window.location.href
  const text = post.value?.title || 'Check out this article'
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = window.location.href
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link:', err)
    alert('Failed to copy link')
  }
}

// SEO Meta Tags
useHead(() => ({
  title: post.value ? `${post.value.title}` : 'Blog',
  meta: post.value ? [
    {
      name: 'description',
      content: getExcerpt(post.value) || post.value.title
    },
    {
      name: 'keywords',
      content: post.value.KeyWords?.terms?.join(', ') || ''
    },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: getExcerpt(post.value) || post.value.title },
    { property: 'og:image', content: getHeroImage(post.value) },
    { property: 'og:url', content: `https://hookahtimela.com/blog/${slug}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] : [],
  link: [{ rel: 'canonical', href: `https://hookahtimela.com/blog/${slug}` }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value?.title,
      description: getExcerpt(post.value),
      image: getHeroImage(post.value),
      datePublished: post.value?.Time,
      dateModified: post.value?.updatedAt || post.value?.Time,
      author: { '@type': 'Organization', name: 'Hookah Time LA' },
      publisher: { '@type': 'Organization', name: 'Hookah Time LA' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://hookahtimela.com/blog/${slug}` },
    })
  }]
}))

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target
        const delay = target.getAttribute('data-delay') || 0
        
        setTimeout(() => {
          target.classList.add('animated')
        }, parseInt(delay))
        
        observer.unobserve(target)
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll('[data-animate]')
  animatedElements.forEach(el => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog-post {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  overflow: hidden;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 20px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 20px;
  text-align: center;
}

.error-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.back-button {
  padding: 14px 28px;
  background: #FDB913;
  color: #000000;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 50px;
  transition: all 0.4s ease;
}

.back-button:hover {
  background: #ffdd55;
  transform: translateY(-2px);
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

/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.8) 70%,
    rgba(0, 0, 0, 0.95) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 80px 80px;
  z-index: 2;
  width: 100%;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #FDB913;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.4);
}

.breadcrumb-current {
  color: #FDB913;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.02em;
  margin-bottom: 32px;
  max-width: 900px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.meta-item svg {
  color: #FDB913;
}

.meta-divider {
  color: rgba(253, 185, 19, 0.5);
  font-size: 1.2rem;
}

/* Content Wrapper */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 80px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

/* Main Content */
.main-content {
  min-width: 0;
  max-width: 900px;
  margin: 0 auto;
}

.rich-text-content {
  width: 100%;
}

.rich-text-content > div {
  margin-bottom: 24px;
}

.lead-text {
  font-size: 1.4rem !important;
  font-weight: 400 !important;
  line-height: 1.8 !important;
  color: rgba(255, 255, 255, 0.9) !important;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 48px !important;
}

.rich-text-content h2 {
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.95);
  margin: 48px 0 24px 0;
  letter-spacing: -0.01em;
}

.rich-text-content h3 {
  font-size: 1.8rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin: 32px 0 16px;
}

.rich-text-content h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #FDB913;
  margin-bottom: 12px;
}

.rich-text-content p {
  font-size: 1.1rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20px;
  font-weight: 300;
}

.rich-text-content strong {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
}

.rich-text-content em {
  font-style: italic;
}

.rich-text-content u {
  text-decoration: underline;
}

.rich-text-content code {
  padding: 2px 6px;
  background: rgba(253, 185, 19, 0.1);
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.95em;
}

.rich-text-content ul,
.rich-text-content ol {
  padding: 0;
  margin: 24px 0;
}

.rich-text-content ul {
  list-style: none;
}

.rich-text-content ol {
  list-style: decimal;
  padding-left: 32px;
}

.rich-text-content ul li {
  position: relative;
  padding-left: 32px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
}

.rich-text-content ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  width: 8px;
  height: 8px;
  background: #FDB913;
  border-radius: 50%;
}

.rich-text-content ol li {
  margin-bottom: 12px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
}

/* Share Section */
.share-section {
  padding: 48px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 48px;
}

.share-section h3 {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 24px;
}

.share-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .share-btn {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .share-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #FDB913;
    color: #FDB913;
    transform: translateY(-2px);
  }
  
  .share-btn.facebook:hover {
    background: #1877F2;
    border-color: #1877F2;
    color: white;
  }
  
  .share-btn.twitter:hover {
    background: #1DA1F2;
    border-color: #1DA1F2;
    color: white;
  }
  
  .share-btn.linkedin:hover {
    background: #0A66C2;
    border-color: #0A66C2;
    color: white;
  }
  
  /* Sidebar */
  .sidebar {
    position: sticky;
    top: 100px;
    align-self: flex-start;
  }
  
  .sidebar-widget {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 32px;
    margin-bottom: 32px;
    backdrop-filter: blur(20px);
  }
  
  .widget-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Table of Contents */
  .toc-widget {
    border-left: 3px solid #FDB913;
  }
  
  .toc-nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .toc-link {
    padding: 12px 16px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    border-left: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .toc-link:hover,
  .toc-link.active {
    color: #FDB913;
    background: rgba(253, 185, 19, 0.05);
    border-left-color: #FDB913;
  }
  
  /* Popular Posts */
  .popular-posts {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .popular-post {
    display: flex;
    gap: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .popular-post:hover {
    transform: translateX(4px);
  }
  
  .post-thumb {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .post-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .popular-post:hover .post-thumb img {
    transform: scale(1.1);
  }
  
  .post-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .post-info h4 {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.4;
    margin: 0;
  }
  
  .post-date {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }
  
  /* CTA Widget */
  .cta-widget {
    background: rgba(253, 185, 19, 0.08);
    border-color: rgba(253, 185, 19, 0.3);
    text-align: center;
  }
  
  .cta-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    background: rgba(253, 185, 19, 0.15);
    border: 1px solid rgba(253, 185, 19, 0.3);
    border-radius: 50%;
    color: #FDB913;
  }
  
  .cta-widget h3 {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 12px;
  }
  
  .cta-widget p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 24px;
  }
  
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: #FDB913;
    color: #000000;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-radius: 50px;
    transition: all 0.4s ease;
  }
  
  .cta-button:hover {
    background: #ffdd55;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(253, 185, 19, 0.3);
  }
  
  /* Related Posts */
  .related-posts {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 80px 100px;
  }
  
  .related-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 48px;
    text-align: center;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
  
  .related-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    text-decoration: none;
    transition: all 0.4s ease;
  }
  
  .related-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(253, 185, 19, 0.3);
    transform: translateY(-8px);
  }
  
  .card-image {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  .related-card:hover .card-image img {
    transform: scale(1.1);
  }
  
  .card-content {
    padding: 32px;
  }
  
  .card-category {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(253, 185, 19, 0.15);
    color: #FDB913;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  
  .card-content h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 12px;
    line-height: 1.3;
  }
  
  .card-content p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    margin: 0;
  }
  
  /* Responsive Design */
  @media (max-width: 1400px) {
    .content-wrapper,
    .related-posts {
      padding-left: 60px;
      padding-right: 60px;
    }
    
    .hero-content {
      padding-left: 60px;
      padding-right: 60px;
    }
  }
  
  @media (max-width: 1200px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }
    
    .sidebar {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
    
    .sidebar-widget {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 968px) {
    .content-wrapper,
    .related-posts {
      padding-left: 40px;
      padding-right: 40px;
    }
    
    .hero-content {
      padding: 0 40px 60px;
    }
    
    .hero-section {
      height: 60vh;
      min-height: 500px;
    }
    
    .hero-title {
      font-size: clamp(2rem, 6vw, 3.5rem);
    }
    
    .related-grid {
      grid-template-columns: 1fr;
    }
    
    .info-cards {
      grid-template-columns: 1fr;
    }
    
    .sidebar {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .content-wrapper,
    .related-posts {
      padding-left: 32px;
      padding-right: 32px;
      padding-top: 60px;
      padding-bottom: 60px;
    }
    
    .hero-content {
      padding: 0 32px 50px;
    }
    
    .content-block h2 {
      font-size: 2rem;
    }
    
    .content-block h3 {
      font-size: 1.5rem;
    }
    
    .lead-text {
      font-size: 1.2rem;
    }
    
    .content-block p {
      font-size: 1rem;
    }
    
    .related-title {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    .content-wrapper,
    .related-posts {
      padding-left: 24px;
      padding-right: 24px;
      padding-top: 50px;
      padding-bottom: 50px;
    }
    
    .hero-content {
      padding: 0 24px 40px;
    }
    
    .hero-section {
      height: 50vh;
      min-height: 400px;
    }
    
    .hero-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    .meta-divider {
      display: none;
    }
    
    .content-block h2 {
      font-size: 1.75rem;
    }
    
    .sidebar-widget,
    .highlight-box,
    .info-card,
    .feature-item,
    .tip-box {
      padding: 24px;
    }
    
    .card-content {
      padding: 24px;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    [data-animate] {
      opacity: 1;
      transform: none;
      transition: none;
    }
    
    .related-card:hover,
    .info-card:hover {
      transform: none;
    }
  }
  </style>