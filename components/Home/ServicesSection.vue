<template>
  <section class="about" aria-label="About Hookah Time" id="about">
    <div class="about-container">
      <!-- Main Content -->
      <div class="about-grid">
        <!-- Left: Main Description -->
        <div class="about-main" data-animate data-delay="0">
          <div class="section-label">
            <div class="label-line"></div>
            <span class="label-text">About Us</span>
          </div>
          
          <h2 class="about-title">
            <span class="title-line">The Ultimate</span>
            <span class="title-line title-accent">Hookah Experience</span>
          </h2>
          
          <div class="about-description">
            <p class="description-text">
              In the heart of LA, we're packing 100+ bowls every day from 2pm to 2am. 
              Legend says that before every battle, real samurai would cleanse their minds 
              right here — at our lounge.
            </p>
            <p class="description-text">
              Perfect mixes, right tastes, cloudy vibes. Whether you choose our cozy indoors 
              or relaxing outdoor patio, we guarantee big clouds and unforgettable moments.
            </p>
          </div>

          <div class="about-cta">
            <a href="https://www.youtube.com/@HookahTime_LA" class="about-link" target="_blank" rel="noopener">
              <span class="link-text">Watch Our Channel</span>
              <div class="link-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Right: Features Grid -->
        <div class="features-grid">
          <div class="feature-card" data-animate data-delay="100">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-title">400+ Flavors</h3>
            <p class="feature-text">Pick your favorite or ask our masters to mix a custom blend for you</p>
          </div>

          <div class="feature-card" data-animate data-delay="200">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="feature-title">100+ Bowls Daily</h3>
            <p class="feature-text">Working for you every day: 2pm-2am with perfect mixes and cloudy atmosphere</p>
          </div>

          <div class="feature-card" data-animate data-delay="300">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-title">Premium Service in LA</h3>
            <p class="feature-text">Highest attention to the smallest details — that's why we're the most popular place in LA</p>
          </div>

          <div class="feature-card" data-animate data-delay="400">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="feature-title">Outdoor Patio</h3>
            <p class="feature-text">Choose between cozy indoors or our relaxing outdoor patio. Guest parking available</p>
          </div>
        </div>
      </div>

      <!-- Highlights Marquee -->
      <div class="highlights-section" data-animate data-delay="500">
        <div class="highlights-marquee">
          <div class="marquee-content">
            <span class="highlight-item">CHOOSE YOUR FAVORITE FLAVORS AMONG HUGE VARIETY</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">PLAY YOUR FAVORITE GAMES</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">SPEND TIME WITH YOUR FRIENDS</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">HIGH END EQUIPMENT, PERFECT BOWLS</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">BIG CLOUDS GUARANTEED</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">WE WILL MAKE YOUR DAY EVEN BETTER</span>
            <span class="highlight-dot">•</span>
          </div>
          <div class="marquee-content" aria-hidden="true">
            <span class="highlight-item">CHOOSE YOUR FAVORITE FLAVORS AMONG HUGE VARIETY</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">PLAY YOUR FAVORITE GAMES</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">SPEND TIME WITH YOUR FRIENDS</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">HIGH END EQUIPMENT, PERFECT BOWLS</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">BIG CLOUDS GUARANTEED</span>
            <span class="highlight-dot">•</span>
            <span class="highlight-item">WE WILL MAKE YOUR DAY EVEN BETTER</span>
            <span class="highlight-dot">•</span>
          </div>
        </div>
      </div>

      <!-- Bottom Stats -->
      <div class="stats-grid" data-animate data-delay="600">
        <div class="stat-item">
          <div class="stat-number">400+</div>
          <div class="stat-label">Flavor Options</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">100+</div>
          <div class="stat-label">Bowls Daily</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">Premium</div>
          <div class="stat-label">Service in LA</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">12hrs</div>
          <div class="stat-label">Open Daily</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let observer = null

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

.about {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  padding: 120px 80px;
  overflow: hidden;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.08) 0%, transparent 70%);
  filter: blur(100px);
  transform: translateX(-50%);
  pointer-events: none;
}

.about-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
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

/* Main Grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 100px;
}

/* Left Side - Main Content */
.about-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 16px;
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

.about-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
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

.about-description {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description-text {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.01em;
}

.about-cta {
  margin-top: 16px;
}

.about-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: rgba(253, 185, 19, 0.08);
  border: 1px solid rgba(253, 185, 19, 0.3);
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.about-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(253, 185, 19, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.about-link:hover::before {
  transform: translateX(100%);
}

.about-link:hover {
  background: rgba(253, 185, 19, 0.15);
  border-color: #FDB913;
  transform: translateY(-2px);
}

.link-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FDB913;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-link:hover .link-arrow {
  transform: translate(4px, -4px);
}

/* Right Side - Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(253, 185, 19, 0.3);
  transform: translateY(-4px);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.2);
  color: #FDB913;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
}

.feature-text {
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

/* Highlights Marquee */
.highlights-section {
  margin-bottom: 60px;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.highlights-marquee {
  display: flex;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 40px;
  animation: marquee 40s linear infinite;
  white-space: nowrap;
}

.highlight-item {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.1em;
}

.highlight-dot {
  color: #FDB913;
  font-size: 1.2rem;
}


/* Stats Grid */
.stats-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FDB913 0%, #ffdd55 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
}

/* Animations */
@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .about {
    padding: 100px 60px;
  }
  
  .about-grid {
    gap: 60px;
    margin-bottom: 80px;
  }
}

@media (max-width: 968px) {
  .about {
    padding: 80px 40px;
  }
  
  .about-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    flex-wrap: wrap;
    gap: 32px;
  }
  
  .stat-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 60px 32px;
  }
  
  .about-grid {
    gap: 50px;
    margin-bottom: 60px;
  }
  
  .about-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .description-text {
    font-size: 1rem;
  }
  
  .feature-card {
    padding: 24px;
  }
  
  .offer-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px;
    gap: 24px;
  }
  
  .offer-icon {
    align-self: flex-end;
  }
  
  .highlight-item {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .about {
    padding: 50px 24px;
  }
  
  .about-main {
    gap: 24px;
  }
  
  .about-title {
    font-size: clamp(1.75rem, 10vw, 2.5rem);
  }
  
  .description-text {
    font-size: 0.95rem;
  }
  
  .about-link {
    padding: 14px 24px;
    font-size: 0.9rem;
  }
  
  .feature-card {
    padding: 20px;
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
  }
  
  .feature-title {
    font-size: 1.1rem;
  }
  
  .offer-content {
    padding: 24px;
  }
  
  .offer-title {
    font-size: 1.25rem;
  }
  
  .offer-description {
    font-size: 0.9rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
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
  
  .marquee-content {
    animation: none;
  }
  
  .about-link::before {
    display: none;
  }
}
</style>