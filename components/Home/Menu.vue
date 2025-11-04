<template>
  <section class="menu" aria-label="Menu" id="menu">
    <div class="menu-container">
      <!-- Header -->
      <div class="menu-header" data-animate data-delay="0">
        <div class="section-label">
          <div class="label-line"></div>
          <span class="label-text">Our Menu</span>
        </div>
        
        <h2 class="menu-title">
          <span class="title-line">Premium Hookah</span>
          <span class="title-line title-accent">& Refreshments</span>
        </h2>
      </div>

      <!-- Menu Grid -->
      <div class="menu-grid">
        <!-- Hookah Bowls -->
        <div class="menu-section" data-animate data-delay="100">
          <div class="section-header">
            <h3 class="section-title">Hookah Bowls</h3>
            <div class="price-headers">
              <span class="price-label">Cash</span>
              <span class="price-label">Card</span>
            </div>
          </div>

          <div class="menu-items">
            <div 
              v-for="bowl in hookahBowls" 
              :key="bowl.name"
              class="menu-item"
              :class="{ 'highlight-item': bowl.highlight }"
            >
              <div class="item-content">
                <h4 class="item-name">{{ bowl.name }}</h4>
                <div v-if="bowl.flavors" class="flavors-tooltip">
                  {{ bowl.flavors }}
                </div>
                <p v-if="bowl.description" class="item-description">{{ bowl.description }}</p>
              </div>
              <div class="item-prices">
                <span class="price">{{ bowl.cashPrice }}</span>
                <span class="price">{{ bowl.cardPrice }}</span>
              </div>
            </div>
          </div>

          <div class="section-note">**ASK FOR MORE FLAVORS</div>
        </div>

        <!-- Drinks & Snacks Grid -->
        <div class="menu-secondary">
          <!-- Drinks Section -->
          <div class="menu-section" data-animate data-delay="200">
            <div class="section-header">
              <h3 class="section-title">Drinks</h3>
              <div class="price-headers">
                <span class="price-label">Cash</span>
                <span class="price-label">Card</span>
              </div>
            </div>

            <div class="menu-items compact">
              <div 
                v-for="drink in drinks" 
                :key="drink.name"
                class="menu-item"
              >
                <div class="item-content">
                  <h4 class="item-name">{{ drink.name }}</h4>
                  <div v-if="drink.variants" class="flavors-tooltip">
                    {{ drink.variants }}
                  </div>
                </div>
                <div class="item-prices">
                  <span class="price">{{ drink.cashPrice }}</span>
                  <span class="price">{{ drink.cardPrice }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Snacks Section -->
          <div class="menu-section" data-animate data-delay="300">
            <div class="section-header">
              <h3 class="section-title">Snacks</h3>
              <div class="price-headers">
                <span class="price-label">Cash</span>
                <span class="price-label">Card</span>
              </div>
            </div>

            <div class="menu-items compact">
              <div 
                v-for="snack in snacks" 
                :key="snack.name"
                class="menu-item"
              >
                <div class="item-content">
                  <h4 class="item-name">{{ snack.name }}</h4>
                  <div v-if="snack.variants" class="flavors-tooltip">
                    {{ snack.variants }}
                  </div>
                </div>
                <div class="item-prices">
                  <span class="price">{{ snack.cashPrice }}</span>
                  <span class="price">{{ snack.cardPrice }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="menu-footer" data-animate data-delay="400">
        <div class="footer-badge">TAXES EXCLUDED</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const hookahBowls = [
  {
    name: 'AL FAKHER',
    flavors: 'Grape / Orange / Gum Mint / Double Apple / Blueberry / Lemon / Guava / Grapefruit / Kiwi / Watermelon / Peach',
    cashPrice: '38',
    cardPrice: '39.52'
  },
  {
    name: 'FUMARI',
    flavors: 'Lemon Mint / White Gummy Bear / White Peach / Mandarin Zest / Ambrosia / Spiced Chai / Tangelo / Prickly Pear / Mint Chocolate Chill / Blueberry Muffin',
    cashPrice: '38',
    cardPrice: '39.52'
  },
  {
    name: 'STARBUZZ',
    flavors: 'Blue Mist / Safari Melon Dew / Sex On The Beach / Tangerine Dream',
    cashPrice: '38',
    cardPrice: '39.52'
  },
  {
    name: 'TANGIERS',
    flavors: 'Peach Ice Tea / Cane Mint / Foreplay On The Peach / Strawberry / Blueberry / Pinepas / Kashmir Peach / Passion Fruit / Watermelon / Horchata / Pear / Now With Melon / Erics Mango',
    cashPrice: '47',
    cardPrice: '48.88'
  },
  {
    name: 'BANGER',
    flavors: 'Saint-Tropez / Lambo / Mikado / Iron Bru / Green Day / Tropical Rose / Cola Bella / Grapefruit / Lemon Tonic / Watermelon & Melon',
    cashPrice: '47',
    cardPrice: '48.88'
  },
  {
    name: 'DARKSIDE',
    flavors: 'Ultranova / Cola / Lemon Blast / Raspberry / Banana Papa / Wild Forest / Red Tea / Red Alert / Needles / Mango Lassi / Killer Milk / Kale Grapefruit / Grape Core / Falling Star',
    cashPrice: '47',
    cardPrice: '48.88'
  },
  {
    name: 'BLACKBURN',
    flavors: 'Ananas Shock / Basilic / Cherry Garden / Ekzo Mango / Ice Baby / Juicy Smoothie / Malibu / Sweet Papaya / Red Orange / Real P.F. / Rising Star / Summer Basket',
    cashPrice: '47',
    cardPrice: '48.88'
  },
  {
    name: 'MUSTHAVE',
    flavors: 'Pinkman / Cherry Cola / Mango Sling / Blackberry / Pineapple Rings / Vanilla Cream / Cacao / Melonade / Strawberry Lychee / Barberry Candy / Raspberry',
    cashPrice: '47',
    cardPrice: '48.88'
  },
  {
    name: 'STARLINE',
    flavors: 'Pineapple / Vanilla Hola / Tropical Smoothie / Raspberry / Strawberry Millefeuille / Summer Fizz / Apple Juice / Banana Marshmallow / Belgian Waffle / Blueberry Crumble / Butter Cream / Flash Drink / Lemon Fizz / Mango Carambola / Mint Lozenge',
    cashPrice: '47',
    cardPrice: '48.88'
  },
  {
    name: '*REFILL',
    highlight: true,
    cashPrice: '22',
    cardPrice: '22.88'
  },
  {
    name: 'ADD FRUIT BOWL',
    description: 'Grapefruit / Pineapple',
    cashPrice: '22',
    cardPrice: '22.88'
  },
  {
    name: '*REFILL FRUIT BOWL',
    cashPrice: '27',
    cardPrice: '28.08'
  }
]

const drinks = [
  {
    name: 'ICED COFFEE',
    variants: 'Starbucks Frappuccino Mocha / Vanilla / Black Ice Coffee',
    cashPrice: '6',
    cardPrice: '6.24'
  },
  {
    name: 'ICED TEA',
    variants: 'Peach / Lemon / Raspberry',
    cashPrice: '5',
    cardPrice: '5.20'
  },
  {
    name: 'STILL WATER',
    variants: 'Evian',
    cashPrice: '5',
    cardPrice: '5.20'
  },
  {
    name: 'SPARKLING WATER',
    variants: 'S.Pellegrino / S.Pellegrino Melograno & Arancia',
    cashPrice: '6',
    cardPrice: '6.24'
  },
  {
    name: 'SODA',
    variants: 'Coke / Coke Zero / Fanta / Sprite',
    cashPrice: '6',
    cardPrice: '6.24'
  },
  {
    name: 'JUICE',
    variants: 'Apple / Orange / Pineapple / Cherry / Multivitamin / Tomato / Banana Strawberry Apple',
    cashPrice: '6',
    cardPrice: '6.24'
  },
  {
    name: 'ENERGY',
    variants: 'Red Bull / Red Bull Sugar Free',
    cashPrice: '7',
    cardPrice: '7.28'
  }
]

const snacks = [
  { name: 'LAY`S', cashPrice: '4', cardPrice: '4.16' },
  { name: 'DORITOS', cashPrice: '4', cardPrice: '4.16' },
  { name: 'CHEETOS', cashPrice: '4', cardPrice: '4.16' },
  { name: 'PRINGLES', cashPrice: '5', cardPrice: '5.20' },
  {
    name: 'CHOCOLATE BAR',
    variants: 'Snickers / Mars / Twix / Bounty',
    cashPrice: '4',
    cardPrice: '4.16'
  },
  {
    name: 'KINDER',
    variants: 'Delice / Country / Bueno',
    cashPrice: '4',
    cardPrice: '4.16'
  },
  { name: 'NUTELLA BREADSTICKS', cashPrice: '5', cardPrice: '5.20' },
  { name: 'HANUTA', cashPrice: '4', cardPrice: '4.16' },
  { name: 'CROISSANT', cashPrice: '5', cardPrice: '5.20' },
  { name: 'BROWNIE', cashPrice: '6', cardPrice: '6.24' }
]

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

.menu {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000000;
  padding: 120px 80px;
  overflow: hidden;
}

.menu::before {
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

.menu-container {
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
.menu-header {
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

.menu-title {
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

/* Menu Grid */
.menu-grid {
  display: grid;
  gap: 60px;
}

.menu-secondary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
}

/* Menu Section */
.menu-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 48px;
  backdrop-filter: blur(20px);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(253, 185, 19, 0.2);
}

.section-title {
  font-size: 2rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.price-headers {
  display: flex;
  gap: 48px;
}

.price-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #FDB913;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  min-width: 60px;
  text-align: center;
}

/* Menu Items */
.menu-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-items.compact {
  gap: 16px;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: rgba(253, 185, 19, 0.03);
  padding-left: 28px;
  border-left: 3px solid rgba(253, 185, 19, 0.6);
}

.menu-item.highlight-item {
  background: rgba(253, 185, 19, 0.08);
  border: 1px solid rgba(253, 185, 19, 0.3);
  padding: 20px 24px;
}

.menu-item.highlight-item:hover {
  background: rgba(253, 185, 19, 0.12);
  border-left: 3px solid #FDB913;
}

.item-content {
  flex: 1;
  position: relative;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.menu-item:hover .item-name {
  color: #FDB913;
}

.item-description {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 6px;
}

/* Flavors Tooltip */
.flavors-tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 12px;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(253, 185, 19, 0.3);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
  pointer-events: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
}

.flavors-tooltip::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 20px;
  width: 12px;
  height: 12px;
  background: rgba(0, 0, 0, 0.95);
  border-left: 1px solid rgba(253, 185, 19, 0.3);
  border-top: 1px solid rgba(253, 185, 19, 0.3);
  transform: rotate(45deg);
}

.menu-item:hover .flavors-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.item-prices {
  display: flex;
  gap: 48px;
  flex-shrink: 0;
}

.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #FDB913;
  min-width: 60px;
  text-align: center;
  transition: transform 0.3s ease;
}

.menu-item:hover .price {
  transform: scale(1.08);
}

.section-note {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(253, 185, 19, 0.2);
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(253, 185, 19, 0.9);
  letter-spacing: 0.1em;
  text-align: center;
}

/* Footer */
.menu-footer {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-badge {
  display: inline-block;
  padding: 16px 40px;
  background: rgba(253, 185, 19, 0.1);
  border: 1px solid rgba(253, 185, 19, 0.3);
  color: #FDB913;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Animations */
@keyframes shimmer {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Responsive Design */
@media (max-width: 1400px) {
  .menu {
    padding: 100px 60px;
  }
}

@media (max-width: 1200px) {
  .menu-secondary {
    grid-template-columns: 1fr;
  }
  
  .price-headers {
    gap: 32px;
  }
  
  .item-prices {
    gap: 32px;
  }
  
  .price {
    min-width: 50px;
    font-size: 1.2rem;
  }
  
  .price-label {
    min-width: 50px;
  }
}

@media (max-width: 968px) {
  .menu {
    padding: 80px 40px;
  }
  
  .menu-section {
    padding: 40px 32px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .item-name {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .menu {
    padding: 60px 32px;
  }
  
  .menu-header {
    margin-bottom: 60px;
  }
  
  .menu-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .menu-section {
    padding: 32px 24px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .price-headers {
    align-self: flex-end;
  }
  
  .menu-item {
    padding: 12px 16px;
  }
  
  .menu-item:hover {
    padding-left: 24px;
  }
  
  .flavors-tooltip {
    position: relative;
    margin-top: 8px;
    opacity: 1;
    visibility: visible;
    transform: none;
    font-size: 0.75rem;
    padding: 12px 16px;
  }
  
  .flavors-tooltip::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .menu {
    padding: 50px 24px;
  }
  
  .menu-section {
    padding: 24px 20px;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .price-headers {
    gap: 24px;
  }
  
  .item-prices {
    gap: 24px;
  }
  
  .price {
    font-size: 1.1rem;
    min-width: 45px;
  }
  
  .price-label {
    font-size: 0.75rem;
    min-width: 45px;
  }
  
  .item-name {
    font-size: 0.95rem;
  }
  
  .footer-badge {
    padding: 12px 32px;
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
  
  .menu-item,
  .flavors-tooltip,
  .price {
    transition: none;
  }
}
</style>