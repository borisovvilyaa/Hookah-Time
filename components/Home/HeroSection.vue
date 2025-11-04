<template>
  <section class="hero" aria-label="Hero section">
    <div class="hero-background">
      <iframe 
        class="hero-video"
        src=""
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <div class="video-overlay"></div>
      <div class="grain"></div>
    </div>
    
    <div class="hero-content">
      <div class="content-grid">
        <div class="left-side" data-animate data-delay="0">
          <div class="logo-container">
            <div class="logo-glow"></div>
            <h1 class="brand-name">
              <span class="brand-line">HOOKAH</span>
              <span class="brand-line brand-line-accent">TIME</span>
            </h1>
          </div>
          
          <div class="tagline">
            <div class="line"></div>
            <p class="tagline-text">Where moments become memories</p>
          </div>
        </div>

        <div class="right-side">
          <div class="cta-group" data-animate data-delay="200">
            <NuxtLink to="/#menu" class="cta-link">
              <div class="cta-number">01</div>
              <div class="cta-content">
                <span class="cta-label">Our Selection</span>
                <span class="cta-title">Browse Menu</span>
              </div>
              <div class="cta-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16H24M24 16L16 8M24 16L16 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </NuxtLink>

            <a href="tel:+13234567890" class="cta-link cta-link-featured">
              <div class="cta-number">02</div>
              <div class="cta-content">
                <span class="cta-label">Reserve Now</span>
                <span class="cta-title">Book a Table</span>
              </div>
              <div class="cta-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16H24M24 16L16 8M24 16L16 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </a>
          </div>

          <div class="social-links" data-animate data-delay="400">
            <a href="https://www.instagram.com/hookahtime_la" class="social-link" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@HookahTime_LA" class="social-link" aria-label="YouTube">
              <i class="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.yelp.com/biz/hookah-time-sherman-oaks-4" class="social-link" aria-label="YouTube">
              <i class="fa-brands fa-yelp"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="bottom-bar" data-animate data-delay="600">
        <div class="info-item">
          <span class="info-label">Location</span>
          <span class="info-value">4716 Woodman Ave, Los Angeles</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-label">Hours</span>
          <span class="info-value">2pm – 2am Daily</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-label">Contact</span>
          <span class="info-value">+1 424-424-0044</span>
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

.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000000;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%) scale(1.02);
  object-fit: cover;
  pointer-events: none;
}

@media (max-aspect-ratio: 16/9) {
  .hero-video {
    width: 100%;
    height: auto;
  }
}

@media (min-aspect-ratio: 16/9) {
  .hero-video {
    width: auto;
    height: 100%;
  }
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 2;
}

.grain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  z-index: 2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 80px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  flex: 1;
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 40px;
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

.logo-container {
  position: relative;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: -20px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  animation: pulse-glow 4s ease-in-out infinite;
}

.brand-name {
  font-size: clamp(5rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.brand-line {
  display: block;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
}

.brand-line-accent {
  background: linear-gradient(135deg, #FDB913 0%, #ffdd55 50%, #FDB913 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite;
  position: relative;
}

.tagline {
  display: flex;
  align-items: center;
  gap: 20px;
}

.line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #FDB913 0%, transparent 100%);
}

.tagline-text {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.right-side {
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: flex-end;
}

.cta-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
}

.cta-link {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 36px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  text-decoration: none;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.cta-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: #FDB913;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-link:hover::before {
  transform: scaleY(1);
  transform-origin: top;
}

.cta-link:hover {
  background: rgba(253, 185, 19, 0.08);
  border-color: rgba(253, 185, 19, 0.3);
  transform: translateX(-8px);
}

.cta-link-featured {
  background: rgba(253, 185, 19, 0.08);
  border: 1px solid rgba(253, 185, 19, 0.3);
}

.cta-link-featured:hover {
  background: rgba(253, 185, 19, 0.15);
  border-color: #FDB913;
}

.cta-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(253, 185, 19, 0.6);
  font-family: monospace;
  min-width: 40px;
}

.cta-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.cta-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.cta-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
}

.cta-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FDB913;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-link:hover .cta-arrow {
  transform: translateX(8px);
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(10px);
}

.social-link:hover {
  border-color: #FDB913;
  color: #FDB913;
  background: rgba(253, 185, 19, 0.05);
  transform: translateY(-4px);
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.info-value {
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
}

.info-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    padding: 60px 60px;
  }
  
  .content-grid {
    gap: 60px;
  }
  
  .brand-name {
    font-size: clamp(4rem, 9vw, 7rem);
  }
}

@media (max-width: 968px) {
  .hero-content {
    padding: 100px 40px 32px;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .left-side {
    gap: 24px;
  }
  
  .brand-name {
    font-size: clamp(3rem, 11vw, 5rem);
  }
  
  .right-side {
    align-items: stretch;
    gap: 32px;
  }
  
  .cta-group {
    max-width: 100%;
    flex-direction: row;
    gap: 12px;
  }
  
  .cta-link {
    flex: 1;
    padding: 20px 16px;
    gap: 12px;
  }
  
  .cta-number {
    font-size: 1rem;
    min-width: 32px;
  }
  
  .cta-label {
    font-size: 0.65rem;
  }
  
  .cta-title {
    font-size: 1rem;
  }
  
  .cta-arrow svg {
    width: 24px;
    height: 24px;
  }
  
  .social-links {
    justify-content: flex-start;
  }
  
  .bottom-bar {
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px 0 0;
  }
  
  .info-divider {
    display: none;
  }
  
  .info-value {
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 90px 32px 28px;
  }
  
  .content-grid {
    gap: 32px;
  }
  
  .left-side {
    gap: 20px;
  }
  
  .brand-name {
    font-size: clamp(2.5rem, 12vw, 4rem);
  }
  
  .tagline {
    gap: 12px;
  }
  
  .line {
    width: 40px;
  }
  
  .tagline-text {
    font-size: 0.8rem;
  }
  
  .right-side {
    gap: 24px;
  }
  
  .cta-group {
    gap: 10px;
  }
  
  .cta-link {
    padding: 18px 14px;
  }
  
  .cta-title {
    font-size: 0.95rem;
  }
  
  .social-link {
    width: 44px;
    height: 44px;
  }
  
  .bottom-bar {
    gap: 12px;
    padding: 12px 0 0;
  }
  
  .info-label {
    font-size: 0.65rem;
  }
  
  .info-value {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 85px 20px 24px;
  }
  
  .content-grid {
    gap: 28px;
  }
  
  .left-side {
    gap: 16px;
  }
  
  .brand-name {
    font-size: clamp(2.2rem, 13vw, 3.5rem);
  }
  
  .tagline-text {
    font-size: 0.7rem;
  }
  
  .right-side {
    gap: 20px;
  }
  
  .cta-group {
    gap: 8px;
  }
  
  .cta-link {
    padding: 16px 12px;
    gap: 8px;
  }
  
  .cta-number {
    font-size: 0.9rem;
    min-width: 28px;
  }
  
  .cta-label {
    font-size: 0.6rem;
  }
  
  .cta-title {
    font-size: 0.9rem;
  }
  
  .cta-arrow svg {
    width: 20px;
    height: 20px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
  }
  
  .bottom-bar {
    gap: 10px;
    padding: 10px 0 0;
  }
  
  .info-label {
    font-size: 0.6rem;
  }
  
  .info-value {
    font-size: 0.75rem;
  }
}

@media (max-width: 380px) {
  .hero-content {
    padding: 80px 16px 20px;
  }
  
  .cta-group {
    flex-direction: column;
    gap: 8px;
  }
  
  .cta-link {
    padding: 16px 16px;
  }
}

@media (max-height: 700px) and (min-width: 769px) {
  .hero-content {
    padding: 40px 60px;
  }
  
  .content-grid {
    gap: 40px;
  }
  
  .left-side {
    gap: 24px;
  }
  
  .right-side {
    gap: 30px;
  }
}

@media (max-height: 650px) and (max-width: 968px) {
  .hero-content {
    padding: 80px 32px 20px;
  }
  
  .content-grid {
    gap: 24px;
  }
  
  .left-side {
    gap: 16px;
  }
  
  .brand-name {
    font-size: clamp(2rem, 10vw, 3.5rem);
  }
  
  .right-side {
    gap: 20px;
  }
  
  .cta-link {
    padding: 14px 12px;
  }
  
  .bottom-bar {
    padding: 10px 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .logo-glow,
  .brand-line-accent {
    animation: none;
  }
  
  .cta-link:hover {
    transform: none;
  }
  
  .social-link:hover {
    transform: none;
  }
}
</style>