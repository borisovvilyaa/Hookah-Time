<template>
  <section class="faq-section">
    <div class="container">
      <!-- Заголовок -->
      <header class="faq-header">
        <div class="label">
          <span class="line"></span>
          <span class="text">FAQ</span>
        </div>
        <h2 class="title">
          <span>Frequently Asked</span>
          <span class="accent">Questions</span>
        </h2>
      </header>

      <!-- Список вопросов -->
      <div class="faq-list">
        <article 
          v-for="(item, idx) in questions" 
          :key="`faq-${idx}`"
          class="faq-card"
          :class="{ 'is-open': openIndex === idx }"
        >
          <button 
            type="button"
            class="faq-btn"
            :aria-expanded="openIndex === idx ? 'true' : 'false'"
            :aria-controls="`answer-${idx}`"
            @click="handleToggle(idx)"
          >
            <span class="question">{{ item.q }}</span>
            <span class="icon" :class="{ 'rotate': openIndex === idx }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>

          <transition 
            name="expand"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
          >
            <div 
              v-show="openIndex === idx"
              :id="`answer-${idx}`"
              class="answer-wrap"
            >
              <div class="answer-content">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </transition>
        </article>
      </div>

      <!-- Призыв к действию -->
      <div class="cta-box">
        <div class="cta-inner">
          <div class="cta-text">
            <h3>Still Have Questions?</h3>
            <p>Visit us today and let our experts help you find the perfect hookah flavor. We're open 2PM-2AM every day!</p>
          </div>
          <a href="tel:+13233334343" class="cta-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call Us Now</span>
          </a>
        </div>
        <div class="cta-bg"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Состояние: индекс открытого элемента (null = все закрыты)
const openIndex = ref(null)

// Данные FAQ
const questions = [
  {
    q: 'What are your opening hours?',
    a: "We're open every day from 2PM to 2AM, packing 100+ bowls daily. Whether you're looking for an afternoon session or a late-night smoke, we're here for you!"
  },
  {
    q: 'Do you offer custom flavor mixes?',
    a: "Absolutely! With over 400+ flavors available, our expert staff can create custom blends tailored to your preferences. Just tell us what you like, and we'll mix the perfect bowl for you."
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, we have guest parking available for our customers. You can enjoy your session without worrying about parking.'
  },
  {
    q: 'Do you have outdoor seating?',
    a: 'Yes! Choose between our cozy indoor lounge or our relaxing outdoor patio. Both spaces are designed for the ultimate hookah experience.'
  },
  {
    q: 'What brands of tobacco do you offer?',
    a: 'We carry premium brands including AL FAKHER, FUMARI, STARBUZZ, TANGIERS, BANGER, DARKSIDE, BLACKBURN, MUSTHAVE, and STARLINE. Each brand offers unique flavors and smoking experiences.'
  }
]

// Функция переключения аккордеона
const handleToggle = (index) => {
  if (openIndex.value === index) {
    // Если кликнули на открытый элемент - закрываем его
    openIndex.value = null
  } else {
    // Иначе открываем новый элемент (предыдущий автоматически закроется)
    openIndex.value = index
  }
}

// Хуки для плавной анимации высоты
const onEnter = (el) => {
  el.style.height = '0'
  el.offsetHeight // Trigger reflow
  el.style.height = el.scrollHeight + 'px'
}

const onAfterEnter = (el) => {
  el.style.height = 'auto'
}

const onLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // Trigger reflow
  el.style.height = '0'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.faq-section {
  width: 100%;
  min-height: 100vh;
  background: #000;
  padding: 120px 80px;
  position: relative;
  overflow: hidden;
}

.faq-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.06), transparent 70%);
  filter: blur(120px);
  transform: translateX(-50%);
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Заголовок */
.faq-header {
  text-align: center;
  margin-bottom: 80px;
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, #FDB913, transparent);
}

.text {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(253, 185, 19, 0.8);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.title span {
  display: block;
  color: rgba(255, 255, 255, 0.95);
}

.title .accent {
  background: linear-gradient(135deg, #FDB913, #ffdd55, #FDB913);
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

/* Список FAQ */
.faq-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
}

.faq-card {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.faq-card:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.faq-card:hover {
  background: rgba(255, 255, 255, 0.04);
}

.faq-card.is-open {
  background: rgba(253, 185, 19, 0.03);
  border-color: rgba(253, 185, 19, 0.2);
}

.faq-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 40px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: transform 0.2s ease;
}

.faq-btn:active {
  transform: scale(0.99);
}

.question {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  padding-right: 32px;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.faq-card.is-open .question {
  color: #FDB913;
}

.icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.2);
  border-radius: 50%;
  color: #FDB913;
  transition: all 0.3s ease;
}

.icon svg {
  transition: transform 0.3s ease;
}

.icon.rotate svg {
  transform: rotate(180deg);
}

.faq-card.is-open .icon {
  background: rgba(253, 185, 19, 0.2);
  border-color: #FDB913;
}

.faq-btn:hover .icon {
  background: rgba(253, 185, 19, 0.15);
  transform: scale(1.05);
}

/* Анимация ответа */
.answer-wrap {
  overflow: hidden;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.answer-content {
  padding: 0 40px 32px 40px;
}

.answer-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-weight: 300;
  letter-spacing: 0.01em;
}

/* Переходы */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.4s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}

/* CTA блок */
.cta-box {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(253, 185, 19, 0.3);
  padding: 60px;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.cta-box::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #FDB913, #ffdd55);
}

.cta-inner {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
  z-index: 2;
}

.cta-text {
  flex: 1;
}

.cta-text h3 {
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin-bottom: 16px;
}

.cta-text p {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: #FDB913;
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(253, 185, 19, 0.3);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.cta-link::before {
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

.cta-link:hover::before {
  transform: translateX(100%);
}

.cta-link:hover {
  background: #ffdd55;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(253, 185, 19, 0.4);
}

.cta-link:active {
  transform: translateY(0);
}

.cta-bg {
  position: absolute;
  right: 60px;
  bottom: 60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.2), transparent 70%);
  filter: blur(50px);
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Адаптивность */
@media (max-width: 968px) {
  .faq-section {
    padding: 80px 40px;
  }

  .faq-btn {
    padding: 28px 32px;
  }

  .question {
    font-size: 1.25rem;
  }

  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .cta-box {
    padding: 48px;
  }

  .cta-text h3 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .faq-section {
    padding: 60px 32px;
  }

  .faq-btn {
    padding: 24px;
  }

  .question {
    font-size: 1.1rem;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .answer-content {
    padding: 0 24px 24px 24px;
  }

  .answer-content p {
    font-size: 1rem;
  }

  .cta-box {
    padding: 40px 32px;
  }

  .cta-text h3 {
    font-size: 1.75rem;
  }

  .cta-text p {
    font-size: 1rem;
  }

  .cta-bg {
    display: none;
  }
}

@media (max-width: 480px) {
  .faq-section {
    padding: 50px 24px;
  }

  .faq-btn {
    padding: 20px;
  }

  .question {
    font-size: 1rem;
    padding-right: 16px;
  }

  .icon {
    width: 36px;
    height: 36px;
  }

  .answer-content {
    padding: 0 20px 20px 20px;
  }

  .answer-content p {
    font-size: 0.95rem;
  }

  .cta-box {
    padding: 32px 24px;
  }

  .cta-text h3 {
    font-size: 1.5rem;
  }

  .cta-text p {
    font-size: 0.95rem;
  }

  .cta-link {
    padding: 16px 32px;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .title .accent {
    animation: none;
  }

  .cta-link::before {
    display: none;
  }

  .cta-bg {
    animation: none;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: none;
  }
}
</style>