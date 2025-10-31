<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Footer Navigation -->
      <div class="footer-nav" data-animate data-delay="0">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="nav-link"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
      
      <div class="footer-main">
        <!-- Contact Info -->
        <div class="footer-contact" data-animate data-delay="100">
          <h3 class="footer-heading">CONTACT US</h3>
          <div class="contact-info">
            <div class="contact-item">
              <svg
                class="contact-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div class="contact-address">
                <p class="address-line">Los Angeles, California</p>
                <p class="address-line">Best Hookah in LA</p>
              </div>
            </div>

            <div class="contact-item">
              <svg
                class="contact-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href="tel:+13233334343" class="contact-link">(323) 333-4343</a>
            </div>

            <div class="contact-item">
              <svg
                class="contact-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div class="contact-address">
                <p class="address-line">Open Daily</p>
                <p class="address-line">2:00 PM - 2:00 AM</p>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="social-links">
            <h4 class="social-heading">FOLLOW US</h4>
            <div class="social-icons">
              <a href="https://www.instagram.com/hookahtime_la" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.youtube.com/@HookahTime_LA" class="social-link" aria-label="YouTube" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@hookahtime_la" class="social-link" aria-label="TikTok" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="footer-features" data-animate data-delay="200">
          <h3 class="footer-heading">WHY CHOOSE US</h3>
          <ul class="features-list">
            <li class="feature-item">400+ Premium Flavors</li>
            <li class="feature-item">100+ Bowls Daily</li>
            <li class="feature-item">Expert Mix Masters</li>
            <li class="feature-item">Indoor & Outdoor Seating</li>
            <li class="feature-item">Guest Parking Available</li>
            <li class="feature-item">Ladies Night Every Day</li>
          </ul>
        </div>

        <!-- Working Hours -->
        <div class="footer-hours" data-animate data-delay="300">
          <h3 class="footer-heading">WORKING HOURS</h3>
          <div class="hours-list">
            <div class="hours-item">
              <span class="day">Every Day</span>
              <span class="time">2:00 PM - 2:00 AM</span>
            </div>
            <div class="hours-item special">
              <span class="day">Ladies Night</span>
              <span class="time">Free Refills After 6PM</span>
            </div>
          </div>

          <!-- Special Badge -->
          <div class="special-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span>#1 Hookah in LA</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-container">
        <p class="copyright">© 2025 Hookah Time LA. All rights reserved.</p>
        <div class="footer-badges">
          <span class="badge">21+ Only</span>
          <span class="badge">Guest Parking</span>
          <span class="badge">Indoor/Outdoor</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// Menu items
const menuItems = [
  { name: 'HOME', path: '/' },
  { name: 'MENU', path: '/#menu' },
  { name: 'ABOUT', path: '/#about' },
  { name: 'FAQ', path: '/#faq' },
];

let observer = null;

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

.site-footer {
  position: relative;
  background: #000000;
  color: rgba(255, 255, 255, 0.95);
  padding: 80px 0 0;
  border-top: 1px solid rgba(253, 185, 19, 0.2);
  overflow: hidden;
}

.site-footer::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 1000px;
  height: 500px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.05) 0%, transparent 70%);
  filter: blur(100px);
  transform: translateX(-50%);
  pointer-events: none;
}

.footer-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 80px;
  z-index: 1;
}

[data-animate] {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-animate].animated {
  opacity: 1;
  transform: translateY(0);
}

/* Footer Navigation */
.footer-nav {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 60px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #FDB913;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #FDB913;
}

.nav-link:hover::after {
  width: 100%;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

/* Headings */
.footer-heading {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0 0 24px;
  color: #FDB913;
  font-weight: 700;
}

/* Contact Section */
.footer-contact {
  display: flex;
  flex-direction: column;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #FDB913;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-link {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 300;
}

.contact-link:hover {
  color: #FDB913;
}

.contact-address {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.address-line {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 300;
  line-height: 1.6;
}

/* Social Links */
.social-links {
  margin-top: 8px;
}

.social-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0 0 16px;
  color: #FDB913;
  font-weight: 700;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.social-link:hover {
  background: rgba(253, 185, 19, 0.15);
  border-color: #FDB913;
  color: #FDB913;
  transform: translateY(-3px);
}

/* Features Section */
.footer-features {
  display: flex;
  flex-direction: column;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-item {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  line-height: 1.5;
  position: relative;
  padding-left: 20px;
  transition: all 0.3s ease;
}

.feature-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 8px;
  height: 8px;
  background: #FDB913;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.feature-item:hover {
  color: rgba(255, 255, 255, 0.9);
  padding-left: 24px;
}

.feature-item:hover::before {
  transform: scale(1.2);
}

/* Working Hours */
.footer-hours {
  display: flex;
  flex-direction: column;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.hours-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid rgba(253, 185, 19, 0.3);
  transition: all 0.3s ease;
}

.hours-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-left-color: #FDB913;
}

.hours-item.special {
  background: rgba(253, 185, 19, 0.05);
  border-left-color: #FDB913;
}

.day {
  font-size: 0.85rem;
  color: #FDB913;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.time {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
}

/* Special Badge */
.special-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(253, 185, 19, 0.15) 0%, rgba(253, 185, 19, 0.05) 100%);
  border: 1px solid rgba(253, 185, 19, 0.3);
  color: #FDB913;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  align-self: flex-start;
}

.special-badge svg {
  width: 16px;
  height: 16px;
}

/* Footer Bottom */
.footer-bottom {
  padding: 28px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-bottom-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  margin: 0;
}

.footer-badges {
  display: flex;
  gap: 12px;
}

.badge {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.badge:hover {
  background: rgba(253, 185, 19, 0.1);
  border-color: rgba(253, 185, 19, 0.3);
  color: #FDB913;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .footer-container,
  .footer-bottom-container {
    padding: 0 60px;
  }

  .footer-main {
    gap: 50px;
  }
}

@media (max-width: 968px) {
  .footer-container,
  .footer-bottom-container {
    padding: 0 40px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-nav {
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .site-footer {
    padding: 60px 0 0;
  }

  .footer-container,
  .footer-bottom-container {
    padding: 0 32px;
  }

  .footer-nav {
    flex-wrap: wrap;
    gap: 24px;
  }

  .footer-main {
    gap: 40px;
  }

  .footer-bottom-container {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .footer-badges {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .site-footer {
    padding: 50px 0 0;
  }

  .footer-container,
  .footer-bottom-container {
    padding: 0 24px;
  }

  .footer-nav {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .nav-link {
    font-size: 0.85rem;
  }

  .social-icons {
    gap: 10px;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .footer-badges {
    flex-wrap: wrap;
  }

  .badge {
    font-size: 0.7rem;
    padding: 6px 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .nav-link,
  .social-link,
  .feature-item,
  .hours-item {
    transition: none;
  }
}
</style>