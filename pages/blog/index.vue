<template>
    <div class="blog-page" aria-label="Blog Page">
      <!-- Hero Section -->
      <div class="blog-hero" data-animate data-delay="0">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="breadcrumbs">
            <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">Blog</span>
          </div>
          
          <h1 class="hero-title">
            <span class="title-line">Hookah Culture</span>
            <span class="title-line title-accent">Stories & Tips</span>
          </h1>
          
          <p class="hero-subtitle">
            Explore the world of hookah with our latest articles, flavor reviews, 
            and insider tips from LA's premium lounge
          </p>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="blog-content">
        <div class="content-container">
          <!-- Filters Section -->
          <div class="filters-section" data-animate data-delay="100">
            <div class="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search articles..."
                class="search-input"
                @input="handleSearch"
              />
            </div>
  
            <div class="filter-buttons">
              <button 
                :class="['filter-btn', { active: selectedCategory === 'all' }]"
                @click="filterByCategory('all')"
              >
                All Articles
              </button>
              <button 
                v-for="category in categories" 
                :key="category"
                :class="['filter-btn', { active: selectedCategory === category }]"
                @click="filterByCategory(category)"
              >
                {{ category }}
              </button>
            </div>
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
          <div v-else-if="paginatedPosts.length > 0" class="blog-grid" data-animate data-delay="200">
            <NuxtLink 
              v-for="(post, index) in paginatedPosts" 
              :key="post.id" 
              :to="`/blog/${post.slug}`"
              class="blog-card"
            >
              <div class="card-image">
                <img 
                  :src="getImageUrl(post.FeaturedImage)" 
                  :alt="post.title" 
                  loading="lazy" 
                />
                <div class="image-overlay"></div>
                <div class="card-category">{{ getCategory(post) }}</div>
              </div>
              
              <div class="card-content">
                <div class="card-meta">
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
                
                <h3 class="card-title">{{ post.title }}</h3>
                
                <p class="card-excerpt">{{ getExcerpt(post) }}</p>
                
                <div class="card-footer">
                  <span class="read-more">
                    Read More
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
  
          <!-- Empty State -->
          <div v-else class="empty-container">
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="empty-text">No articles found</p>
            <p class="empty-subtext">Try adjusting your search or filter criteria</p>
            <button @click="resetFilters" class="reset-button">Reset Filters</button>
          </div>
  
          <!-- Pagination -->
          <div v-if="totalPages > 1 && paginatedPosts.length > 0" class="pagination" data-animate data-delay="300">
            <button 
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Previous
            </button>
  
            <div class="pagination-numbers">
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="changePage(page)"
                :class="['page-btn', { active: currentPage === page }]"
              >
                {{ page }}
              </button>
            </div>
  
            <button 
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              Next
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
  
  const config = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()
  
  let observer = null
  
  // State
  const searchQuery = ref('')
  const selectedCategory = ref('all')
  const currentPage = ref(1)
  const postsPerPage = 9
  
  // Fetch blog posts
  const { data: blogData, pending, error } = await useAsyncData(
    'blog-posts-all',
    async () => {
      try {
        const response = await $fetch(`${config.public.API_URL}/blogs`, {
          params: { 'populate': '*' },
          headers: { Authorization: `Bearer ${config.public.API_TOKEN}` }
        })
        return response?.data || []
      } catch (err) {
        console.error('Failed to fetch blog posts:', err)
        return []
      }
    }
  )
  
  const allPosts = computed(() => blogData.value || [])
  
  // Get unique categories
  const categories = computed(() => {
    const cats = new Set()
    allPosts.value.forEach(post => {
      if (post.KeyWords?.terms?.[0]) {
        const category = post.KeyWords.terms[0]
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
        cats.add(category)
      }
    })
    return Array.from(cats).sort()
  })
  
  // Filter posts
  const filteredPosts = computed(() => {
    let posts = allPosts.value
  
    // Filter by category
    if (selectedCategory.value !== 'all') {
      posts = posts.filter(post => {
        const category = getCategory(post)
        return category === selectedCategory.value
      })
    }
  
    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      posts = posts.filter(post => {
        const title = post.title?.toLowerCase() || ''
        const excerpt = getExcerpt(post).toLowerCase()
        const category = getCategory(post).toLowerCase()
        return title.includes(query) || excerpt.includes(query) || category.includes(query)
      })
    }
  
    return posts
  })
  
  // Pagination
  const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage
    const end = start + postsPerPage
    return filteredPosts.value.slice(start, end)
  })
  
  const displayedPages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i)
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...', total)
      } else if (current >= total - 3) {
        pages.push(1, '...')
        for (let i = total - 4; i <= total; i++) pages.push(i)
      } else {
        pages.push(1, '...')
        for (let i = current - 1; i <= current + 1; i++) pages.push(i)
        pages.push('...', total)
      }
    }
    
    return pages
  })
  
  // Helper functions
  const getImageUrl = (featuredImage) => {
    if (!featuredImage) return 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80'
    return featuredImage.formats?.medium?.url || featuredImage.url || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80'
  }
  
  const getCategory = (post) => {
    if (post.KeyWords?.terms?.[0]) {
      return post.KeyWords.terms[0]
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    }
    return 'Article'
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently'
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return 'Recently'
    }
  }
  
  const getExcerpt = (post) => {
    if (!post?.Content?.length) return 'Read this article to learn more...'
    const firstParagraph = post.Content.find(b => b.type === 'paragraph' && b.children?.length)
    if (firstParagraph) {
      const text = firstParagraph.children.map(c => c.text || '').join('')
      return text.length > 150 ? text.substring(0, 150) + '...' : text
    }
    return 'Read this article to learn more...'
  }
  
  const filterByCategory = (category) => {
    selectedCategory.value = category
    currentPage.value = 1
    updateURL()
  }
  
  const handleSearch = () => {
    currentPage.value = 1
    updateURL()
  }
  
  const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
    updateURL()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    currentPage.value = 1
    updateURL()
  }
  
  const updateURL = () => {
    const query = {}
    if (selectedCategory.value !== 'all') query.category = selectedCategory.value
    if (searchQuery.value.trim()) query.search = searchQuery.value
    if (currentPage.value > 1) query.page = currentPage.value
    router.push({ query })
  }
  
  // SEO
  useHead({
    title: 'Blog ',
    meta: [
      { name: 'description', content: 'Explore hookah culture, flavor reviews, and expert tips from LA\'s premium hookah lounge. Stay updated with the latest trends and stories.' },
      { name: 'keywords', content: 'hookah blog, hookah culture, flavor reviews, hookah tips, Los Angeles hookah' },
      { property: 'og:title', content: 'Blog ' },
      { property: 'og:description', content: 'Explore hookah culture, flavor reviews, and expert tips from LA\'s premium hookah lounge.' },
      { property: 'og:url', content: 'https://hookahtimela.com/blog' },
      { property: 'og:type', content: 'website' },
    ],
    link: [{ rel: 'canonical', href: 'https://hookahtimela.com/blog' }]
  })
  
  // Initialize from URL
  onMounted(() => {
    if (route.query.category) selectedCategory.value = route.query.category
    if (route.query.search) searchQuery.value = route.query.search
    if (route.query.page) currentPage.value = parseInt(route.query.page)
  
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 }
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0
          setTimeout(() => entry.target.classList.add('animated'), parseInt(delay))
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
  })
  
  onUnmounted(() => observer?.disconnect())
  
  // Reset page when filters change
  watch([selectedCategory, searchQuery], () => {
    currentPage.value = 1
  })
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .blog-page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #000000;
    overflow: hidden;
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
  .blog-hero {
    position: relative;
    width: 100%;
    height: 50vh;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  }
  
  .blog-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(253, 185, 19, 0.15) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 80px;
    text-align: center;
    z-index: 2;
  }
  
  .breadcrumbs {
    display: inline-flex;
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
  
  @keyframes shimmer {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    max-width: 700px;
    margin: 0 auto;
  }
  
  /* Content */
  .blog-content {
    position: relative;
    width: 100%;
    padding: 100px 0;
  }
  
  .content-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 80px;
  }
  
  /* Filters */
  .filters-section {
    display: flex;
    gap: 24px;
    margin-bottom: 60px;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .search-box {
    position: relative;
    flex: 1;
    min-width: 300px;
    max-width: 400px;
  }
  
  .search-box svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
  }
  
  .search-input {
    width: 100%;
    padding: 16px 20px 16px 52px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.95);
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  .search-input:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: #FDB913;
  }
  
  .filter-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .filter-btn {
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
  }
  
  .filter-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(253, 185, 19, 0.3);
    color: rgba(255, 255, 255, 0.9);
  }
  
  .filter-btn.active {
    background: #FDB913;
    border-color: #FDB913;
    color: #000000;
  }
  
  /* Loading */
  .loading-container,
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-text,
  .error-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }
  
  /* Blog Grid */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 80px;
  }
  
  .blog-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    text-decoration: none;
    transition: all 0.4s ease;
  }
  
  .blog-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(253, 185, 19, 0.3);
    transform: translateY(-8px);
  }
  
  .card-image {
    position: relative;
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
  
  .blog-card:hover .card-image img {
    transform: scale(1.1);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
  
  .card-category {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 6px 14px;
    background: rgba(253, 185, 19, 0.9);
    color: #000000;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    z-index: 2;
  }
  
  .card-content {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }
  
  .card-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .meta-date {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .meta-divider {
    color: #FDB913;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.95);
    transition: color 0.3s ease;
  }
  
  .blog-card:hover .card-title {
    color: #FDB913;
  }
  
  .card-excerpt {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.65);
    flex: 1;
  }
  
  .card-footer {
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #FDB913;
    font-size: 0.95rem;
    font-weight: 700;
    transition: all 0.3s ease;
  }
  
  .blog-card:hover .read-more {
    gap: 12px;
  }
  
  /* Empty State */
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
    text-align: center;
  }
  
  .empty-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(253, 185, 19, 0.1);
    border: 1px solid rgba(253, 185, 19, 0.3);
    border-radius: 50%;
    color: #FDB913;
    margin-bottom: 24px;
  }
  
  .empty-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 8px;
  }
  
  .empty-subtext {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 32px;
  }
  
  .reset-button {
    padding: 14px 28px;
    background: #FDB913;
    border: none;
    color: #000000;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.4s ease;
  }
  
  .reset-button:hover {
    background: #ffdd55;
    transform: translateY(-2px);
  }
  
  /* Pagination */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  
  .pagination-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .pagination-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    border-color: #FDB913;
    color: #FDB913;
  }
  
  .pagination-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .pagination-numbers {
    display: flex;
    gap: 8px;
  }
  
  .page-btn {
    min-width: 44px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .page-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: #FDB913;
    color: #FDB913;
  }
  
  .page-btn.active {
    background: #FDB913;
    border-color: #FDB913;
    color: #000000;
  }
  
  /* Responsive */
  @media (max-width: 1200px) {
    .content-container {
      padding: 0 60px;
    }
    
    .blog-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 968px) {
    .hero-content {
      padding: 0 40px;
    }
    
    .content-container {
      padding: 0 40px;
    }
    
    .filters-section {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-box {
      max-width: 100%;
    }
    
    .blog-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
  
  @media (max-width: 768px) {
    .blog-content {
      padding: 60px 0;
    }
    
    .hero-content {
      padding: 0 32px;
    }
    
    .content-container {
      padding: 0 32px;
    }
    
    .filters-section {
      margin-bottom: 40px;
    }
    
    .filter-btn {
      font-size: 0.85rem;
      padding: 10px 18px;
    }
    
    .card-content {
      padding: 24px;
    }
    
    .card-title {
      font-size: 1.3rem;
    }
    
    .pagination {
      flex-wrap: wrap;
    }
    
    .pagination-btn,
    .page-btn {
      font-size: 0.9rem;
      padding: 10px 14px;
      min-width: 40px;
    }
  }
  
  @media (max-width: 480px) {
    .blog-hero {
      height: 40vh;
      min-height: 350px;
    }
    
    .hero-content {
      padding: 0 24px;
    }
    
    .hero-title {
      font-size: clamp(2rem, 8vw, 3rem);
    }
    
    .hero-subtitle {
      font-size: 1rem;
    }
    
    .content-container {
      padding: 0 24px;
    }
    
    .search-input {
      padding: 14px 18px 14px 48px;
      font-size: 0.95rem;
    }
    
    .filter-buttons {
      gap: 8px;
    }
    
    .filter-btn {
      font-size: 0.8rem;
      padding: 8px 16px;
    }
    
    .card-image {
      height: 200px;
    }
    
    .card-category {
      font-size: 0.65rem;
      padding: 5px 12px;
    }
    
    .card-content {
      padding: 20px;
      gap: 12px;
    }
    
    .card-title {
      font-size: 1.2rem;
    }
    
    .card-excerpt {
      font-size: 0.95rem;
    }
    
    .pagination-numbers {
      gap: 4px;
    }
    
    .page-btn {
      min-width: 36px;
      padding: 8px 12px;
      font-size: 0.85rem;
    }
    
    .pagination-btn {
      padding: 8px 14px;
      font-size: 0.85rem;
    }
    
    .pagination-btn span {
      display: none;
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
    
    .blog-card:hover {
      transform: none;
    }
    
    .blog-card:hover .card-image img {
      transform: none;
    }
  }
  </style>