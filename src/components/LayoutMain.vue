<!-- LayoutMain.vue -->
<template>
  <div class="app-container">
    <!-- Sidebar Component -->
    <AppSidebar />

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Header Bar -->
      <AppHeader />

      <!-- Page Content -->
      <div class="page-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

export default defineComponent({
  name: 'LayoutMain',
  components: {
    AppSidebar,
    AppHeader,
  },
})
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px; /* Width of sidebar */
  transition: margin-left 0.3s ease;
}

.page-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
