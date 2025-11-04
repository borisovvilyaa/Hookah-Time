<template>
  <div class="menu-wrapper">
    <!-- Overlay for mobile menu -->
    <div 
      class="menu-overlay" 
      :class="{ 'is-visible': mobileMenuOpen }" 
      @click="closeMobileMenu"
    ></div>

    <!-- Main Header -->
    <header 
      class="site-header" 
      :class="{ 
        'is-scrolled': hasScrolled, 
        'is-home': isHomePage 
      }"
    >
      <div class="header-inner">
        <!-- Logo -->
        <NuxtLink to="/" class="site-logo" @click="closeMobileMenu">
          <div class="logo-icon">
            <img src="/logo.png" alt="Hookah Time">
          </div>
          <div class="logo-text">
            <span class="logo-top">HOOKAH</span>
            <span class="logo-bottom">TIME</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop">
          <div class="nav-items">
            <NuxtLink to="/#menu" class="nav-item">
              <span class="nav-num">01</span>
              <span class="nav-label">Menu</span>
            </NuxtLink>
            <NuxtLink to="/#about" class="nav-item">
              <span class="nav-num">02</span>
              <span class="nav-label">About Us</span>
            </NuxtLink>
            <NuxtLink to="/#why" class="nav-item">
              <span class="nav-num">03</span>
              <span class="nav-label">Why Choose Us</span>
            </NuxtLink>
            <NuxtLink to="/#blog" class="nav-item">
              <span class="nav-num">04</span>
              <span class="nav-label">Blog</span>
            </NuxtLink>
            <NuxtLink to="/#gallery" class="nav-item">
              <span class="nav-num">05</span>
              <span class="nav-label">Gallery</span>
            </NuxtLink>
            <NuxtLink to="/#faq" class="nav-item">
              <span class="nav-num">06</span>
              <span class="nav-label">FAQ</span>
            </NuxtLink>
          </div>
          
          <a href="tel:+14244240044" class="btn-reserve">
            <span>Reserve</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </nav>

        <!-- Mobile Menu Button - FIXED POSITION -->
        <button 
          class="menu-btn" 
          :class="{ 'is-open': mobileMenuOpen }"
          @click="toggleMobileMenu" 
          aria-label="Toggle Menu"
        >
          <span class="menu-btn-line"></span>
          <span class="menu-btn-line"></span>
          <span class="menu-btn-line"></span>
        </button>
      </div>
    </header>

    <!-- Mobile Menu -->
    <aside class="nav-mobile" :class="{ 'is-open': mobileMenuOpen }">
      <div class="nav-mobile-content">
        <nav class="nav-mobile-items">
          <NuxtLink to="/#about" class="nav-mobile-item" @click="closeMobileMenu">
            <span class="nav-mobile-num">01</span>
            <span class="nav-mobile-label">About Us</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink to="/#menu" class="nav-mobile-item" @click="closeMobileMenu">
            <span class="nav-mobile-num">02</span>
            <span class="nav-mobile-label">Menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink to="/#why" class="nav-mobile-item" @click="closeMobileMenu">
            <span class="nav-mobile-num">03</span>
            <span class="nav-mobile-label">Why Choose Us</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink to="/#blog" class="nav-mobile-item" @click="closeMobileMenu">
            <span class="nav-mobile-num">04</span>
            <span class="nav-mobile-label">Blog</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink to="/#gallery" class="nav-mobile-item" @click="closeMobileMenu">
            <span class="nav-mobile-num">05</span>
            <span class="nav-mobile-label">Gallery</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink to="/#faq" class="nav-mobile-item" @click="closeMobileMenu">
            <span class="nav-mobile-num">06</span>
            <span class="nav-mobile-label">FAQ</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
          
          <a href="tel:+14244240044" class="btn-reserve-mobile" @click="closeMobileMenu">
            <span>Reserve Table</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </nav>
        
        <div class="nav-mobile-footer">
          <div class="mobile-contact-info">
            <span class="contact-title">Call Us</span>
            <a href="tel:+14244240044" class="contact-phone">+1 (424) 424-0044</a>
          </div>
          <div class="mobile-social-links">
            <a href="#" class="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61173 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';

const mobileMenuOpen = ref(false);
const hasScrolled = ref(false);
const route = useRoute();

const isHomePage = computed(() => route.path === '/');

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  
  // Prevent body scroll when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Main Wrapper */
.menu-wrapper {
  position: relative;
  width: 100%;
  z-index: 9999;
}

/* Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(253, 185, 19, 0.15);
  z-index: 9990;
}

/* Home page transparent header */
.site-header.is-home {
  background: transparent;
  backdrop-filter: none;
  border-bottom: 1px solid transparent;
}

.site-header.is-home.is-scrolled {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(253, 185, 19, 0.2);
}

.site-header.is-scrolled {
  padding: 16px 0;
}

.header-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.site-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  position: relative;
  z-index: 9995;
  transition: transform 0.3s ease;
}

.site-logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 12px rgba(253, 185, 19, 0.3));
  transition: filter 0.3s ease;
}

.site-logo:hover .logo-icon {
  filter: drop-shadow(0 0 20px rgba(253, 185, 19, 0.5));
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 2px;
}

.logo-top,
.logo-bottom {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 20px rgba(253, 185, 19, 0.2);
  transition: all 0.3s ease;
}

.logo-bottom {
  color: #FDB913;
  font-size: 1.15rem;
  text-shadow: 0 0 30px rgba(253, 185, 19, 0.4);
}

/* Desktop Navigation */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  position: relative;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.nav-num {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(253, 185, 19, 0.5);
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease;
}

.nav-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #FDB913;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item:hover .nav-num,
.nav-item:hover .nav-label {
  color: #FDB913;
}

/* Reserve Button */
.btn-reserve {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #000000;
  background: #FDB913;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: 2px solid #FDB913;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-reserve::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-reserve:hover::before {
  left: 100%;
}

.btn-reserve:hover {
  background: #ffcc33;
  border-color: #ffcc33;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(253, 185, 19, 0.4);
}

.btn-reserve svg {
  transition: transform 0.3s ease;
}

.btn-reserve:hover svg {
  transform: translateX(4px);
}

/* Mobile Menu Button - CRITICAL FIX */
.menu-btn {
  display: none;
  position: fixed;
  right: 40px;
  top: 28px;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10000; /* Higher than everything */
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.menu-btn-line {
  display: block;
  width: 28px;
  height: 2px;
  background: #FDB913;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.menu-btn.is-open .menu-btn-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-btn.is-open .menu-btn-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.menu-btn.is-open .menu-btn-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 9980;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  pointer-events: none;
}

.menu-overlay.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* Mobile Menu */
.nav-mobile {
  position: fixed;
  right: -100%;
  top: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background: #000000;
  border-left: 1px solid rgba(253, 185, 19, 0.2);
  z-index: 9985;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.nav-mobile.is-open {
  right: 0;
}

.nav-mobile-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-mobile-items {
  display: flex;
  flex-direction: column;
  padding: 120px 40px 40px;
  flex: 1;
}

.nav-mobile-item {
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  transition: all 0.3s ease;
}

.nav-mobile-item::before {
  content: '';
  position: absolute;
  left: -40px;
  top: 0;
  width: 3px;
  height: 100%;
  background: #FDB913;
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-mobile-item:hover::before {
  transform: scaleY(1);
}

.nav-mobile-num {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(253, 185, 19, 0.5);
  font-family: 'Courier New', monospace;
  min-width: 32px;
  transition: color 0.3s ease;
}

.nav-mobile-label {
  flex: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.nav-mobile-item svg {
  color: rgba(253, 185, 19, 0.5);
  transition: all 0.3s ease;
}

.nav-mobile-item:hover .nav-mobile-num,
.nav-mobile-item:hover .nav-mobile-label,
.nav-mobile-item:hover svg {
  color: #FDB913;
}

.nav-mobile-item:hover svg {
  transform: translateX(4px);
}

.btn-reserve-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-decoration: none;
  color: #000000;
  background: #FDB913;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 20px 28px;
  margin-top: 32px;
  transition: all 0.3s ease;
}

.btn-reserve-mobile:hover {
  background: #ffcc33;
}

.btn-reserve-mobile svg {
  transition: transform 0.3s ease;
}

.btn-reserve-mobile:hover svg {
  transform: translateX(4px);
}

.nav-mobile-footer {
  padding: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.mobile-contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-phone {
  font-size: 1.1rem;
  font-weight: 500;
  color: #FDB913;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.contact-phone:hover {
  opacity: 0.8;
}

.mobile-social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: #FDB913;
  color: #FDB913;
  background: rgba(253, 185, 19, 0.05);
}

/* Responsive Breakpoints */
@media (max-width: 1400px) {
  .nav-items {
    gap: 24px;
  }
  
  .nav-label {
    font-size: 0.85rem;
  }
  
  .nav-desktop {
    gap: 32px;
  }
}

@media (max-width: 1200px) {
  .header-inner {
    padding: 0 60px;
  }
  
  .nav-items {
    gap: 20px;
  }
  
  .nav-label {
    font-size: 0.8rem;
  }
  
  .nav-desktop {
    gap: 24px;
  }
  
  .btn-reserve {
    padding: 12px 20px;
    font-size: 0.85rem;
  }
}

@media (max-width: 968px) {
  .nav-desktop {
    display: none;
  }

  .menu-btn {
    display: flex;
  }
  
  .header-inner {
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 32px;
  }

  .logo-icon {
    width: 44px;
    height: 44px;
  }

  .logo-top {
    font-size: 0.95rem;
  }

  .logo-bottom {
    font-size: 1rem;
  }
  
  .menu-btn {
    right: 32px;
    top: 24px;
  }
  
  .nav-mobile {
    max-width: 100%;
  }
  
  .nav-mobile-items {
    padding: 100px 32px 32px;
  }
  
  .nav-mobile-item {
    padding: 20px 0;
  }
  
  .nav-mobile-item::before {
    left: -32px;
  }
  
  .nav-mobile-label {
    font-size: 1.25rem;
  }
  
  .nav-mobile-footer {
    padding: 32px;
  }
}

@media (max-width: 480px) {
  .header-inner {
    padding: 0 24px;
  }

  .site-logo {
    gap: 12px;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .logo-top {
    font-size: 0.85rem;
  }

  .logo-bottom {
    font-size: 0.9rem;
  }
  
  .menu-btn {
    right: 24px;
    top: 22px;
    width: 40px;
    height: 40px;
  }
  
  .menu-btn-line {
    width: 24px;
  }
  
  .nav-mobile-items {
    padding: 90px 24px 24px;
  }
  
  .nav-mobile-item {
    padding: 18px 0;
    gap: 16px;
  }
  
  .nav-mobile-item::before {
    left: -24px;
  }
  
  .nav-mobile-num {
    font-size: 0.8rem;
    min-width: 28px;
  }
  
  .nav-mobile-label {
    font-size: 1.15rem;
  }
  
  .btn-reserve-mobile {
    padding: 18px 24px;
    font-size: 1rem;
  }
  
  .nav-mobile-footer {
    padding: 24px;
    gap: 24px;
  }
  
  .contact-phone {
    font-size: 1rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>