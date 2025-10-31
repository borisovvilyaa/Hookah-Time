<template>
  <div id="app">

    <Header />
    <main class="main-content">
      <NuxtPage
        :transition="{
          name: transitionName,
          mode: transitionMode
        }"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from '#app'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

// Data for transitions and scroll
const transitionName = ref('slide-right')
const transitionMode = ref('out-in')
const lastScrollPosition = ref(0)
let transitionTimeout = null

// Get the current route
const route = useRoute()

// Transition logic (temporary, until routes are moved)
const determineTransition = (to, from) => {
  if (to.meta?.transition) {
    transitionName.value = to.meta.transition
    transitionMode.value = to.meta.transitionMode || 'out-in'
    return
  }
  const toIndex = parseInt(to.meta?.index || 0)
  const fromIndex = parseInt(from?.meta?.index || 0)
  if (toIndex > fromIndex) {
    transitionName.value = 'slide-left'
  } else {
    transitionName.value = 'slide-right'
  }
  if (toIndex === fromIndex) {
    if (window.history.state?.direction === 'back') {
      transitionName.value = 'slide-right'
    } else {
      transitionName.value = 'slide-left'
    }
  }
  transitionMode.value = 'out-in'
}

// Watch for route changes
watch(
  () => route.path,
  (newPath, oldPath) => {
    const to = route
    const from = { meta: { index: 0 } } // Placeholder for from.meta
    determineTransition(to, from)
  }
)

// Scroll handling
const beforeEnter = () => {
  document.body.classList.add('page-transitioning')
  lastScrollPosition.value = window.pageYOffset || document.documentElement.scrollTop
  clearTransitionTimeout()
  transitionTimeout = setTimeout(restoreScrolling, 600)
}

const afterEnter = () => {
  nextTick(() => {
    clearTransitionTimeout()
    restoreScrolling()
    if (route.meta?.preserveScroll) {
      window.scrollTo(0, lastScrollPosition.value)
    } else {
      window.scrollTo(0, 0)
    }
  })
}

const afterLeave = () => {
  restoreScrolling()
}

const restoreScrolling = () => {
  document.body.classList.remove('page-transitioning')
}

const clearTransitionTimeout = () => {
  if (transitionTimeout) {
    clearTimeout(transitionTimeout)
    transitionTimeout = null
  }
}

// History management to determine direction (client-side only)
if (process.client) {
  window.addEventListener('popstate', () => {
    if (history.state) {
      history.state.direction = 'back'
    }
  })
}
</script>

<script>
// Inject Google Tag Manager script in the head
if (process.client) {
  // Inject Google Fonts for Inter
  const fontLink = document.createElement('link')
  fontLink.rel = 'stylesheet'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  document.head.appendChild(fontLink)
}
</script>

<style>
/* Global font setting - Inter from Google Fonts */
* {
  font-family: 'Inter', sans-serif;
  letter-spacing:1px;
}

body {
  font-family: 'Inter', sans-serif;
  letter-spacing:1px;

}

#app {
  font-family: 'Inter', sans-serif;
  letter-spacing:1px;

}
</style>

<style scoped>
.container {
  max-width: 1800px !important;
}
/* Basic horizontal transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.2s ease;
  position: absolute;
  width: 100%;
  will-change: transform, opacity;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Component styles */
.main-content {
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 100px); /* Considering footer height */
}

.page-component {
  width: 100%;
  position: relative;
}

/* Prevent scrolling during transitions */
body.page-transitioning {
  overflow: hidden;
  pointer-events: none;
}
</style>