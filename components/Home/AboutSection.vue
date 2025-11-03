<template>
  <section class="advantages" id="about">
    <div class="advantages-container">
      <!-- Header -->
      <div class="advantages-header" data-animate data-delay="0">
        <div class="section-label">
          <div class="label-line"></div>
          <span class="label-text">Why Choose Us</span>
        </div>
        
        <h2 class="advantages-title">
          <span class="title-line">What Makes Us</span>
          <span class="title-line title-accent">The Best in LA</span>
        </h2>
      </div>

      <!-- Advantages Grid -->
      <div class="advantages-grid">
        <div 
          v-for="(advantage, index) in advantages" 
          :key="index" 
          class="advantage-card"
          data-animate
          :data-delay="(index + 1) * 100"
        >
          <div class="card-image">
            <img :src="advantage.image" :alt="advantage.title" loading="lazy">
            <div class="image-overlay"></div>
          </div>
          
          <div class="card-content">
            <div class="icon-wrapper">
              <component :is="advantage.icon" />
            </div>
            <h3 class="card-title">{{ advantage.title }}</h3>
            <p class="card-description">{{ advantage.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-wrapper" data-animate data-delay="700">
        <div class="cta-content">
          <h3 class="cta-title">Ready for the Ultimate Experience?</h3>
          <p class="cta-description">Visit us today and discover why we're LA's #1 hookah lounge</p>
        </div>
        <a href="tel:+13233334343" class="cta-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Us Now</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, onMounted, onUnmounted } from 'vue';

const advantages = [
  {
    title: '400+ Premium Flavors',
    description: 'From classic AL FAKHER to exotic DARKSIDE and TANGIERS. Mix any flavors you want - our masters will create your perfect blend.',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' })
    ])
  },
  {
    title: '100+ Bowls Daily',
    description: 'We pack over 100 perfect bowls every single day. Each one prepared by expert masters who know how to get massive clouds.',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' })
    ])
  },
  {
    title: 'Expert Mix Masters',
    description: 'Our hookah masters have years of experience. They know every flavor and can create custom mixes that you\'ll never forget.',
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=600&h=400&fit=crop',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '9', cy: '7', r: '4' }),
      h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
      h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
    ])
  },
  {
    title: 'Indoor & Outdoor Seating',
    description: 'Choose your vibe - cozy indoor lounge with AC or our chill outdoor patio. Both spaces are designed for the perfect session.',
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=600&h=400&fit=crop',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      h('polyline', { points: '9 22 9 12 15 12 15 22' })
    ])
  },
  {
    title: 'Open Late 2PM-2AM',
    description: 'Whether it\'s afternoon chill or late night vibes, we\'re here for you 12 hours every day. Guest parking available.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('polyline', { points: '12 6 12 12 16 14' })
    ])
  }
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

.advantages {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  padding: 120px 80px;
  overflow: hidden;
}

.advantages::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.06) 0%, transparent 70%);
  filter: blur(120px);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.advantages-container {
  position: relative;
  max-width: 1600px;
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

/* Header */
.advantages-header {
  margin-bottom: 80px;
  text-align: center;
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

.advantages-title {
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

/* Advantages Grid */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;
}

.advantage-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.advantage-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(253, 185, 19, 0.3);
}

.card-image {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.advantage-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  pointer-events: none;
}

.card-content {
  padding: 32px;
  position: relative;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.3);
  color: #FDB913;
  transition: all 0.3s ease;
}

.advantage-card:hover .icon-wrapper {
  background: rgba(253, 185, 19, 0.2);
  transform: scale(1.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 16px 0;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.card-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0;
  font-weight: 300;
}

/* CTA Section */
.cta-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 48px 60px;
  background: linear-gradient(135deg, rgba(253, 185, 19, 0.08) 0%, rgba(253, 185, 19, 0.02) 100%);
  border: 1px solid rgba(253, 185, 19, 0.3);
  border-left: 4px solid #FDB913;
  gap: 40px;
}

.cta-content {
  flex: 1;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

.cta-description {
  font-size: 1.1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: #FDB913;
  color: #000000;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(253, 185, 19, 0.3);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
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

.cta-button:hover::before {
  transform: translateX(100%);
}

.cta-button:hover {
  background: #ffdd55;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(253, 185, 19, 0.4);
}

/* Animations */
@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Responsive Design */
@media (max-width: 1400px) {
  .advantages {
    padding: 100px 60px;
  }
  
  .advantages-grid {
    gap: 28px;
  }
}

@media (max-width: 1200px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 968px) {
  .advantages {
    padding: 80px 40px;
  }
  
  .advantages-header {
    margin-bottom: 60px;
  }
  
  .card-image {
    height: 240px;
  }
  
  .cta-wrapper {
    flex-direction: column;
    padding: 40px;
    text-align: center;
  }
  
  .cta-button {
    align-self: center;
  }
}

@media (max-width: 768px) {
  .advantages {
    padding: 60px 32px;
  }
  
  .advantages-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }
  
  .card-content {
    padding: 28px;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-description {
    font-size: 0.95rem;
  }
  
  .cta-wrapper {
    padding: 32px;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .advantages {
    padding: 50px 24px;
  }
  
  .card-image {
    height: 200px;
  }
  
  .card-content {
    padding: 24px;
  }
  
  .icon-wrapper {
    width: 48px;
    height: 48px;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
  .cta-wrapper {
    padding: 28px 24px;
  }
  
  .cta-title {
    font-size: 1.25rem;
  }
  
  .cta-button {
    padding: 16px 32px;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
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
  
  .advantage-card,
  .card-image img,
  .icon-wrapper {
    transition: none;
  }
  
  .cta-button::before {
    display: none;
  }
}
</style>