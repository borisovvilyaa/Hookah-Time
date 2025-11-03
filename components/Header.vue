<template>
  <div class="menu-container" :class="{ 'menu-scrolled': hasScrolled, 'home-page': isHomePage }">
    <!-- Overlay for mobile menu -->
    <div class="overlay" :class="{ 'active': mobileMenuOpen }" @click="closeMobileMenu"></div>

    <header class="main-header">
      <div class="header-container">
        <!-- Logo -->
        <NuxtLink to="/" class="logo" @click="closeMobileMenu">
          <div class="logo-image">
            <img src="/logo.png" alt="Hookah Time">
          </div>
          <div class="logo-wrapper">
            <span class="logo-line">HOOKAH</span>
            <span class="logo-line logo-accent">TIME</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <div class="nav-links">
            <NuxtLink to="/#menu" class="nav-link">
              <span class="nav-number">01</span>
              <span class="nav-text">Menu</span>
            </NuxtLink>
            <NuxtLink to="/#about" class="nav-link">
              <span class="nav-number">02</span>
              <span class="nav-text">About</span>
            </NuxtLink>
            <NuxtLink to="/#gallery" class="nav-link">
              <span class="nav-number">03</span>
              <span class="nav-text">Gallery</span>
            </NuxtLink>
            <NuxtLink to="/#contact" class="nav-link">
              <span class="nav-number">04</span>
              <span class="nav-text">Contact</span>
            </NuxtLink>
          </div>
          
          <a href="tel:+13234567890" class="book-btn">
            <span class="btn-text">Reserve</span>
            <svg class="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Menu">
          <div class="hamburger" :class="{ 'open': mobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
      <nav class="mobile-nav">
        <NuxtLink to="/#menu" class="mobile-link" @click="closeMobileMenu">
          <span class="mobile-number">01</span>
          <span class="mobile-text">Menu</span>
          <svg class="mobile-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        
        <NuxtLink to="/#about" class="mobile-link" @click="closeMobileMenu">
          <span class="mobile-number">02</span>
          <span class="mobile-text">About</span>
          <svg class="mobile-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        
        <NuxtLink to="/#gallery" class="mobile-link" @click="closeMobileMenu">
          <span class="mobile-number">03</span>
          <span class="mobile-text">Gallery</span>
          <svg class="mobile-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        
        <NuxtLink to="/#contact" class="mobile-link" @click="closeMobileMenu">
          <span class="mobile-number">04</span>
          <span class="mobile-text">Contact</span>
          <svg class="mobile-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        
        <a href="tel:+13234567890" class="mobile-book" @click="closeMobileMenu">
          <span>Reserve Table</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </nav>
      
      <div class="mobile-footer">
        <div class="mobile-contact">
          <span class="contact-label">Call Us</span>
          <a href="tel:+13234567890" class="contact-value">+1 (323) 456-7890</a>
        </div>
        <div class="mobile-social">
          <a href="#" class="social-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" class="social-icon" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#" class="social-icon" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.95718 14.8821 3.28445C14.0247 3.61173 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
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
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleScroll = () => {
  hasScrolled.value = window.scrollY > 20;
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.menu-container {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
}

.main-header {
  background: rgba(0, 0, 0, 1);
  backdrop-filter: blur(20px);
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid rgba(253, 185, 19, 0.15);
}

.home-page {
  position: fixed !important;
}

.home-page .main-header {
  background: transparent;
  backdrop-filter: none;
  border-bottom: 1px solid transparent;
}

.home-page.menu-scrolled .main-header {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(253, 185, 19, 0.2);
}

.menu-scrolled .main-header {
  padding: 16px 0;
}

.header-container {
  margin: 0 auto;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  position: relative;
  z-index: 1010;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.logo-image {
  width: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 0 12px rgba(253, 185, 19, 0.3));
}

.logo-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo:hover .logo-image {
  transform: scale(1.08) rotate(3deg);
  filter: drop-shadow(0 0 20px rgba(253, 185, 19, 0.5));
}

.logo:hover .logo-image img {
  filter: brightness(1.1);
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 2px;
}

.logo-line {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  text-shadow: 0 0 20px rgba(253, 185, 19, 0.2);
}

.logo-accent {
  color: #FDB913;
  font-size: 1.15rem;
  text-shadow: 0 0 30px rgba(253, 185, 19, 0.4);
}

.logo:hover .logo-line {
  letter-spacing: 0.16em;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 60px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 48px;
}

.nav-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.nav-number {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(253, 185, 19, 0.5);
  font-family: monospace;
  transition: all 0.3s ease;
}

.nav-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 1px;
  background: #FDB913;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover .nav-number {
  color: #FDB913;
}

.nav-link:hover .nav-text {
  color: #FDB913;
}

.nav-link:hover::after {
  width: 100%;
}

.book-btn {
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
  border-radius: 0;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.book-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.book-btn:hover::before {
  left: 100%;
}

.book-btn:hover {
  background: #ffcc33;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(253, 185, 19, 0.4);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.book-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  z-index: 1010;
}

.hamburger {
  width: 28px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #FDB913;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  right: -100%;
  top: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: #000000;
  border-left: 1px solid rgba(253, 185, 19, 0.2);
  z-index: 1005;
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-menu.open {
  right: 0;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 120px 40px 40px;
  flex: 1;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  position: relative;
}

.mobile-link::before {
  content: '';
  position: absolute;
  left: -40px;
  top: 0;
  width: 3px;
  height: 100%;
  background: #FDB913;
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-link:hover::before {
  transform: scaleY(1);
}

.mobile-number {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(253, 185, 19, 0.5);
  font-family: monospace;
  min-width: 32px;
  transition: color 0.3s ease;
}

.mobile-text {
  flex: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.mobile-arrow {
  color: rgba(253, 185, 19, 0.5);
  transition: all 0.3s ease;
}

.mobile-link:hover .mobile-number,
.mobile-link:hover .mobile-text,
.mobile-link:hover .mobile-arrow {
  color: #FDB913;
}

.mobile-link:hover .mobile-arrow {
  transform: translateX(4px);
}

.mobile-book {
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
  border-radius: 0;
  margin-top: 32px;
  transition: all 0.3s ease;
}

.mobile-book:hover {
  background: #ffcc33;
}

.mobile-book svg {
  transition: transform 0.3s ease;
}

.mobile-book:hover svg {
  transform: translateX(4px);
}

.mobile-footer {
  padding: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.mobile-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #FDB913;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.contact-value:hover {
  opacity: 0.8;
}

.mobile-social {
  display: flex;
  gap: 16px;
}

.social-icon {
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

.social-icon:hover {
  border-color: #FDB913;
  color: #FDB913;
  background: rgba(253, 185, 19, 0.05);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  pointer-events: none;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/* Responsive */
@media (max-width: 1200px) {
  .header-container {
    padding: 0 60px;
  }
  
  .nav-links {
    gap: 36px;
  }
  
  .desktop-nav {
    gap: 48px;
  }
}

@media (max-width: 968px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }
  
  .header-container {
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 32px;
  }

  .logo-image {
    width: 48px;
    height: 48px;
  }

  .logo-line {
    font-size: 0.95rem;
  }

  .logo-accent {
    font-size: 1rem;
  }
  
  .mobile-menu {
    max-width: 100%;
  }
  
  .mobile-nav {
    padding: 100px 32px 32px;
  }
  
  .mobile-link {
    padding: 20px 0;
  }
  
  .mobile-link::before {
    left: -32px;
  }
  
  .mobile-text {
    font-size: 1.25rem;
  }
  
  .mobile-footer {
    padding: 32px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 24px;
  }

  .logo {
    gap: 12px;
  }

  .logo-image {
    width: 42px;
    height: 42px;
  }

  .logo-line {
    font-size: 0.85rem;
  }

  .logo-accent {
    font-size: 0.9rem;
  }
  
  .mobile-nav {
    padding: 90px 24px 24px;
  }
  
  .mobile-link {
    padding: 18px 0;
    gap: 16px;
  }
  
  .mobile-link::before {
    left: -24px;
  }
  
  .mobile-number {
    font-size: 0.8rem;
    min-width: 28px;
  }
  
  .mobile-text {
    font-size: 1.15rem;
  }
  
  .mobile-book {
    padding: 18px 24px;
    font-size: 1rem;
  }
  
  .mobile-footer {
    padding: 24px;
    gap: 24px;
  }
  
  .contact-value {
    font-size: 1rem;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>