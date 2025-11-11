<!-- AppHeader.vue -->
<template>
  <header class="app-header">
    <!-- Page Title -->
    <div class="header-title">
      <h1>{{ pageTitle }}</h1>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppHeader',

  setup() {
    const route = useRoute()

    const pageTitle = computed(() => {
      const path = route.path
      if (path === '/') return 'Dashboard'
      if (path.includes('/blog')) return 'Blog Management'
      return 'HOOKAH TIME Admin'
    })

    return {
      pageTitle,
    }
  },
})
</script>
<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #edf2f9;
}

.header-title h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #212529;
}
</style>
