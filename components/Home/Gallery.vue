<template>
    <section class="gallery" aria-label="Lounge Gallery" id="gallery">
      <div class="gallery-container">
        <!-- Header -->
        <div class="gallery-header" data-animate data-delay="0">
          <div class="section-label">
            <div class="label-line"></div>
            <span class="label-text">Our Space</span>
          </div>
          
          <h2 class="gallery-title">
            <span class="title-line">Experience</span>
            <span class="title-line title-accent">The Atmosphere</span>
          </h2>
          
          <p class="gallery-subtitle">
            Step inside LA's most vibrant hookah lounge. Every corner tells a story, 
            every moment is Instagram-worthy
          </p>
        </div>
  
        <!-- Gallery Grid -->
        <div class="gallery-grid">
          <div 
            v-for="(photo, index) in galleryPhotos" 
            :key="index" 
            :class="['gallery-item', `size-${photo.size}`]"
            data-animate
            :data-delay="index * 50"
            @click="openLightbox(index)"
          >
            <div class="item-image">
              <img :src="photo.image" :alt="photo.title" loading="lazy" />
              <div class="image-overlay"></div>
            </div>
            
            <div class="item-content">
              <div class="content-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3 class="content-title">{{ photo.title }}</h3>
              <p class="content-description">{{ photo.description }}</p>
            </div>
          </div>
        </div>
  
        <!-- CTA Section -->
        <div class="cta-section" data-animate data-delay="600">
          <div class="cta-content">
            <div class="cta-text">
              <h3 class="cta-title">Ready to Experience It Yourself?</h3>
              <p class="cta-description">
                Visit us today and become part of the story. Reserve your spot now for the ultimate hookah experience.
              </p>
            </div>
            
            <div class="cta-actions">
  <a href="tel:+14244240044" class="cta-button primary">
    <span>Book a Table</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
  <a href="https://www.instagram.com/hookahtime_la" target="_blank" rel="noopener noreferrer" class="cta-button secondary">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
      <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>View All Photos</span>
  </a>
</div>
          </div>
        </div>
      </div>
      
      <!-- Lightbox -->
      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <button class="lightbox-nav prev" @click.stop="prevPhoto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="lightbox-content" @click.stop>
          <img :src="galleryPhotos[currentPhoto].image" :alt="galleryPhotos[currentPhoto].title" />
          <div class="lightbox-info">
            <h3>{{ galleryPhotos[currentPhoto].title }}</h3>
            <p>{{ galleryPhotos[currentPhoto].description }}</p>
          </div>
        </div>
        
        <button class="lightbox-nav next" @click.stop="nextPhoto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="lightbox-counter">
          {{ currentPhoto + 1 }} / {{ galleryPhotos.length }}
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const lightboxOpen = ref(false);
  const currentPhoto = ref(0);
  let observer = null;
  
  const galleryPhotos = [
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/Liberty+Lounge.webp',
    title: 'Liberty Lounge',
    description: 'Luxurious main hall with elegant ambiance',
    size: 'large'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/GoldenTable.webp',
    title: 'Golden Table',
    description: 'Premium seating with golden accents',
    size: 'medium'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/HookahStation.webp',
    title: 'Hookah Station',
    description: 'Expert preparation area with premium equipment',
    size: 'medium'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/VelvetCorner.webp',
    title: 'Velvet Corner',
    description: 'Cozy velvet seating for intimate moments',
    size: 'small'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/BarGlow.webp',
    title: 'Bar Glow',
    description: 'Sophisticated bar area with ambient lighting',
    size: 'small'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/HookahGallery.webp',
    title: 'Hookah Gallery',
    description: 'Showcase of our premium hookah collection',
    size: 'medium'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/CaesarsDen.webp',
    title: 'Caesars Den',
    description: 'VIP area with exclusive atmosphere',
    size: 'small'
  },
  {
    image: 'https://hookahtimela.s3.us-west-1.amazonaws.com/HTL/gallery/FlavorVault.webp',
    title: 'Flavor Vault',
    description: 'Our extensive selection of premium flavors',
    size: 'large'
  }
];
  
  const openLightbox = (index) => {
    currentPhoto.value = index;
    lightboxOpen.value = true;
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    lightboxOpen.value = false;
    document.body.style.overflow = '';
  };
  
  const nextPhoto = () => {
    currentPhoto.value = (currentPhoto.value + 1) % galleryPhotos.length;
  };
  
  const prevPhoto = () => {
    currentPhoto.value = (currentPhoto.value - 1 + galleryPhotos.length) % galleryPhotos.length;
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
    
    // Keyboard navigation for lightbox
    const handleKeyPress = (e) => {
      if (!lightboxOpen.value) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
    document.body.style.overflow = '';
  });
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .gallery {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #000000;
    padding: 120px 0;
    overflow: hidden;
  }
  
  .gallery::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(253, 185, 19, 0.08) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    transform: translateY(-50%);
  }
  
  .gallery-container {
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
  
  /* Header */
  .gallery-header {
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
  
  .gallery-title {
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
  
  .gallery-subtitle {
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    max-width: 700px;
    margin: 0 auto;
  }
  
  /* Gallery Grid */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin-bottom: 100px;
  }
  
  .gallery-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .gallery-item.size-large {
    grid-column: span 2;
    grid-row: span 2;
    height: 600px;
  }
  
  .gallery-item.size-medium {
    grid-column: span 2;
    height: 300px;
  }
  
  .gallery-item.size-small {
    grid-column: span 1;
    height: 300px;
  }
  
  .item-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .gallery-item:hover .item-image img {
    transform: scale(1.1);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    opacity: 0.6;
    transition: opacity 0.4s ease;
  }
  
  .gallery-item:hover .image-overlay {
    opacity: 0.85;
  }
  
  .item-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 32px;
    z-index: 2;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .gallery-item:hover .item-content {
    transform: translateY(0);
    opacity: 1;
  }
  
  .content-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(253, 185, 19, 0.1);
    border: 1px solid rgba(253, 185, 19, 0.3);
    color: #FDB913;
    margin-bottom: 16px;
  }
  
  .content-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }
  
  .content-description {
    font-size: 0.95rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
  
  /* CTA Section */
  .cta-section {
    position: relative;
    background: linear-gradient(135deg, rgba(253, 185, 19, 0.1) 0%, rgba(253, 185, 19, 0.05) 100%);
    border: 1px solid rgba(253, 185, 19, 0.3);
    padding: 80px 60px;
    margin: 0 60px;
    backdrop-filter: blur(20px);
    overflow: hidden;
  }
  
  .cta-section::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #FDB913 0%, #ffdd55 100%);
  }
  
  .cta-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
  }
  
  .cta-text {
    flex: 1;
  }
  
  .cta-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  
  .cta-description {
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .cta-actions {
    display: flex;
    gap: 16px;
    flex-shrink: 0;
  }
  
  .cta-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 36px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    border: none;
    text-decoration: none;
  }
  
  .cta-button.primary {
    background: #FDB913;
    color: #000000;
  }
  
  .cta-button.primary::before {
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
  
  .cta-button.primary:hover::before {
    transform: translateX(100%);
  }
  
  .cta-button.primary:hover {
    background: #ffdd55;
    transform: translateY(-2px);
  }
  
  .cta-button.secondary {
    background: transparent;
    color: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .cta-button.secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: #FDB913;
    color: #FDB913;
    transform: translateY(-2px);
  }
  
  .cta-button:active {
    transform: translateY(0);
  }
  
  /* Lightbox */
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .lightbox-close {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10001;
  }
  
  .lightbox-close:hover {
    background: rgba(253, 185, 19, 0.2);
    border-color: #FDB913;
    color: #FDB913;
  }
  
  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10001;
  }
  
  .lightbox-nav:hover {
    background: rgba(253, 185, 19, 0.2);
    border-color: #FDB913;
    color: #FDB913;
  }
  
  .lightbox-nav.prev {
    left: 32px;
  }
  
  .lightbox-nav.next {
    right: 32px;
  }
  
  .lightbox-content {
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .lightbox-content img {
    max-width: 100%;
    max-height: calc(90vh - 120px);
    object-fit: contain;
    border: 1px solid rgba(253, 185, 19, 0.3);
  }
  
  .lightbox-info {
    text-align: center;
  }
  
  .lightbox-info h3 {
    font-size: 1.75rem;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 8px;
  }
  
  .lightbox-info p {
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .lightbox-counter {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(253, 185, 19, 0.3);
    color: #FDB913;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
  
  /* Animations */
  @keyframes shimmer {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
  }
  
  /* Responsive Design */
  @media (max-width: 1200px) {
    .gallery {
      padding: 100px 0;
    }
    
    .gallery-header {
      padding: 0 40px;
    }
    
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .gallery-item.size-large {
      grid-column: span 3;
      height: 500px;
    }
    
    .gallery-item.size-medium {
      grid-column: span 2;
    }
    
    .cta-section {
      margin: 0 40px;
      padding: 60px 40px;
    }
  }
  
  @media (max-width: 968px) {
    .gallery {
      padding: 80px 0;
    }
    
    .gallery-header {
      padding: 0 32px;
    }
    
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .gallery-item.size-large {
      grid-column: span 2;
      height: 400px;
    }
    
    .gallery-item.size-medium {
      grid-column: span 2;
      height: 300px;
    }
    
    .gallery-item.size-small {
      grid-column: span 1;
      height: 250px;
    }
    
    .item-content {
      padding: 24px;
    }
    
    .content-title {
      font-size: 1.25rem;
    }
    
    .cta-section {
      margin: 0 32px;
      padding: 50px 32px;
    }
    
    .cta-content {
      flex-direction: column;
      gap: 32px;
    }
    
    .cta-actions {
      width: 100%;
      flex-direction: column;
    }
    
    .cta-button {
      width: 100%;
      justify-content: center;
    }
  }
  
  @media (max-width: 768px) {
    .gallery {
      padding: 60px 0;
    }
    
    .gallery-header {
      margin-bottom: 60px;
      padding: 0 24px;
    }
    
    .gallery-title {
      font-size: clamp(2rem, 8vw, 3rem);
    }
    
    .gallery-subtitle {
      font-size: 1rem;
    }
    
    .gallery-grid {
      grid-template-columns: 1fr;
    }
    
    .gallery-item.size-large,
    .gallery-item.size-medium,
    .gallery-item.size-small {
      grid-column: span 1;
      height: 350px;
    }
    
    .cta-section {
      margin: 0 24px;
      padding: 40px 24px;
    }
    
    .cta-title {
      font-size: 2rem;
    }
    
    .lightbox {
      padding: 20px;
    }
    
    .lightbox-close,
    .lightbox-nav {
      width: 48px;
      height: 48px;
    }
    
    .lightbox-close {
      top: 20px;
      right: 20px;
    }
    
    .lightbox-nav.prev {
      left: 20px;
    }
    
    .lightbox-nav.next {
      right: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .gallery {
      padding: 50px 0;
    }
    
    .gallery-header {
      padding: 0 20px;
    }
    
    .gallery-item {
      height: 300px;
    }
    
    .item-content {
      padding: 20px;
    }
    
    .content-badge {
      width: 40px;
      height: 40px;
      margin-bottom: 12px;
    }
    
    .content-badge svg {
      width: 16px;
      height: 16px;
    }
    
    .content-title {
      font-size: 1.1rem;
    }
    
    .content-description {
      font-size: 0.9rem;
    }
    
    .cta-section {
      margin: 0 20px;
      padding: 32px 20px;
    }
    
    .cta-title {
      font-size: 1.5rem;
    }
    
    .cta-description {
      font-size: 1rem;
    }
    
    .cta-button {
      padding: 16px 28px;
      font-size: 0.9rem;
    }
    
    .lightbox-nav {
      width: 40px;
      height: 40px;
    }
    
    .lightbox-nav svg {
      width: 20px;
      height: 20px;
    }
    
    .lightbox-info h3 {
      font-size: 1.25rem;
    }
    
    .lightbox-info p {
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
    
    .cta-button.primary::before {
      display: none;
    }
    
}
</style>