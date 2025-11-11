<template>
  <transition name="notification-fade">
    <div
      class="modal-wrapper"
      v-if="isVisible"
      @keydown.esc="close"
      tabindex="-1"
      ref="modalWrapper"
    >
      <div class="modal-overlay" @click="close"></div>
      <div
        class="notification-modal"
        role="dialog"
        aria-labelledby="notification-title"
        aria-modal="true"
      >
        <div class="notification-header">
          <h3 id="notification-title">{{ title }}</h3>
          <button class="close-btn" @click="close" aria-label="Close notification" type="button">
            ×
          </button>
        </div>

        <div class="notification-content">
          <slot></slot>
        </div>

        <div class="notification-actions">
          <button
            v-for="(action, index) in actions"
            :key="index"
            :class="action.className"
            @click="action.handler"
            type="button"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
defineProps({
  isVisible: { type: Boolean, required: true },
  title: { type: String, required: true },
  actions: {
    type: Array,
    default: () => [],
    validator: (actions) =>
      actions.every(
        (action) =>
          typeof action === 'object' &&
          'label' in action &&
          'handler' in action &&
          'className' in action,
      ),
  },
})

// Emits
const emit = defineEmits(['close'])
const modalWrapper = ref(null)

const close = () => {
  emit('close')
}

// Handle ESC key press
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    close()
  }
}

// Focus management
const focusModal = () => {
  if (modalWrapper.value) {
    modalWrapper.value.focus()
  }
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  focusModal()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  outline: none;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1005;
}

.notification-modal {
  position: relative;
  max-width: 1200px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1010;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  max-height: 90vh; /* Added to constrain modal height */
}

.notification-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.notification-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  flex-grow: 1;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #888;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: color 0.2s;
}

.close-btn:hover,
.close-btn:focus {
  color: #333;
}

.close-btn:focus {
  outline: 2px solid #333;
  outline-offset: 2px;
}

.notification-content {
  padding: 12px 20px;
  font-size: 14px;
  color: #666;
  overflow-y: auto; /* Enable scrolling for content */
  max-height: 60vh; /* Limit content height */
}

.notification-actions {
  display: flex;
  padding: 12px 20px;
  border-top: 1px solid #e0e0e0;
  gap: 10px;
}

.notification-actions button {
  flex: 1;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  border: none;
}

.notification-actions button:focus {
  outline: 2px solid #333;
  outline-offset: 2px;
}

.continue-shopping-btn {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #e0e0e0;
}

.continue-shopping-btn:hover {
  background: #e8e8e8;
}

.open-cart-btn {
  background: #333;
  color: white;
}

.open-cart-btn:hover {
  background: #000;
}

.notification-fade-enter-active {
  animation: fade-in 0.3s;
}

.notification-fade-leave-active {
  animation: fade-out 0.3s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

@media (max-width: 480px) {
  .notification-modal {
    width: calc(100% - 30px);
  }

  .notification-header {
    padding: 12px 16px;
  }

  .notification-content {
    padding: 10px 16px;
  }

  .notification-actions {
    padding: 10px 16px;
  }

  .notification-actions button {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>
