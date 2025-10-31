<template>
  <section class="faq" aria-label="Frequently Asked Questions">
    <div class="faq-container">
      <!-- Header -->
      <div class="faq-header" data-animate data-delay="0">
        <div class="section-label">
          <div class="label-line"></div>
          <span class="label-text">FAQ</span>
        </div>
        
        <h2 class="faq-title">
          <span class="title-line">Frequently Asked</span>
          <span class="title-line title-accent">Questions</span>
        </h2>
      </div>

      <!-- FAQ List -->
      <div class="faq-list">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index" 
          class="faq-item"
          :class="{ 'active': activeIndex === index }"
          data-animate
          :data-delay="index * 100"
        >
          <button 
            class="faq-question" 
            @click="toggleFaq(index)"
            :aria-expanded="activeIndex === index"
          >
            <span class="question-text">{{ item.question }}</span>
            <div class="icon-wrapper">
              <svg 
                class="icon" 
                :class="{ 'rotated': activeIndex === index }"
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M6 9L12 15L18 9" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>
          
          <div 
            class="faq-answer-wrapper"
            :class="{ 'expanded': activeIndex === index }"
          >
            <div class="faq-answer">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section" data-animate data-delay="500">
        <div class="cta-content">
          <div class="cta-text">
            <h3 class="cta-title">Still Have Questions?</h3>
            <p class="cta-description">
              Visit us today and let our experts help you find the perfect hookah flavor. 
              We're open 2PM-2AM every day!
            </p>
          </div>
          <a href="tel:+13233334343" class="cta-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Call Us Now</span>
          </a>
        </div>
        
        <div class="cta-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeIndex = ref(null);
let observer = null;

const faqItems = [
  {
    question: 'What are your opening hours?',
    answer: 'We\'re open every day from 2PM to 2AM, packing 100+ bowls daily. Whether you\'re looking for an afternoon session or a late-night smoke, we\'re here for you!'
  },
  {
    question: 'Do you offer custom flavor mixes?',
    answer: 'Absolutely! With over 400+ flavors available, our expert staff can create custom blends tailored to your preferences. Just tell us what you like, and we\'ll mix the perfect bowl for you.'
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, we have guest parking available for our customers. You can enjoy your session without worrying about parking.'
  },
  {
    question: 'Do you have outdoor seating?',
    answer: 'Yes! Choose between our cozy indoor lounge or our relaxing outdoor patio. Both spaces are designed for the ultimate hookah experience.'
  },
  {
    question: 'What\'s the Ladies Night special?',
    answer: 'Ladies get free refills after 6PM every single day! It\'s our way of saying thank you. Bring your crew and enjoy unlimited refills all evening.'
  },
  {
    question: 'What brands of tobacco do you offer?',
    answer: 'We carry premium brands including AL FAKHER, FUMARI, STARBUZZ, TANGIERS, BANGER, DARKSIDE, BLACKBURN, MUSTHAVE, and STARLINE. Each brand offers unique flavors and smoking experiences.'
  }
];

const toggleFaq = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
  }
};

onMounted(() => {
  // Intersection Observer для анимаций
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

.faq {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  padding: 120px 80px;
  overflow: hidden;
}

.faq::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.06) 0%, transparent 70%);
  filter: blur(120px);
  transform: translateX(-50%);
  pointer-events: none;
}

.faq-container {
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

/* Header */
.faq-header {
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

.faq-title {
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

/* FAQ List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 80px;
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-item:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-item.active {
  background: rgba(253, 185, 19, 0.03);
  border-color: rgba(253, 185, 19, 0.2);
}

.faq-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 40px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  padding-right: 32px;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.faq-item.active .question-text {
  color: #FDB913;
}

.icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.faq-item.active .icon-wrapper {
  background: rgba(253, 185, 19, 0.2);
  border-color: #FDB913;
}

.faq-question:hover .icon-wrapper {
  background: rgba(253, 185, 19, 0.15);
  transform: scale(1.05);
}

.icon {
  color: #FDB913;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon.rotated {
  transform: rotate(180deg);
}

.faq-answer-wrapper {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer-wrapper.expanded {
  max-height: 500px;
  opacity: 1;
}

.faq-answer {
  padding: 0 40px 32px 40px;
}

.faq-answer p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.01em;
}

/* CTA Section */
.cta-section {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(253, 185, 19, 0.3);
  padding: 60px;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #FDB913 0%, #ffdd55 100%);
}

.cta-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
  z-index: 2;
}

.cta-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.cta-description {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
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

.cta-button:active {
  transform: translateY(0);
}

.cta-decoration {
  position: absolute;
  right: 60px;
  bottom: 60px;
  display: flex;
  gap: 12px;
  z-index: 1;
  opacity: 0.3;
}

.decoration-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.2) 0%, transparent 70%);
  filter: blur(30px);
  animation: float 6s ease-in-out infinite;
}

.decoration-circle:nth-child(2) {
  animation-delay: 2s;
}

.decoration-circle:nth-child(3) {
  animation-delay: 4s;
}

/* Animations */
@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .faq {
    padding: 100px 60px;
  }
  
  .cta-content {
    gap: 32px;
  }
}

@media (max-width: 968px) {
  .faq {
    padding: 80px 40px;
  }
  
  .faq-header {
    margin-bottom: 60px;
  }
  
  .faq-question {
    padding: 28px 32px;
  }
  
  .question-text {
    font-size: 1.25rem;
  }
  
  .cta-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .cta-section {
    padding: 48px;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-button {
    align-self: flex-start;
  }
}

@media (max-width: 768px) {
  .faq {
    padding: 60px 32px;
  }
  
  .faq-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .faq-question {
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .question-text {
    font-size: 1.1rem;
    padding-right: 0;
  }
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
    align-self: flex-end;
  }
  
  .faq-answer {
    padding: 0 24px 24px 24px;
  }
  
  .faq-answer p {
    font-size: 1rem;
  }
  
  .cta-section {
    padding: 40px 32px;
  }
  
  .cta-title {
    font-size: 1.75rem;
  }
  
  .cta-description {
    font-size: 1rem;
  }
  
  .cta-decoration {
    display: none;
  }
}

@media (max-width: 480px) {
  .faq {
    padding: 50px 24px;
  }
  
  .faq-question {
    padding: 20px;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .icon-wrapper {
    width: 36px;
    height: 36px;
  }
  
  .faq-answer {
    padding: 0 20px 20px 20px;
  }
  
  .faq-answer p {
    font-size: 0.95rem;
  }
  
  .cta-section {
    padding: 32px 24px;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-description {
    font-size: 0.95rem;
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
  
  .cta-button::before {
    display: none;
  }
  
  .decoration-circle {
    animation: none;
  }
}
</style>