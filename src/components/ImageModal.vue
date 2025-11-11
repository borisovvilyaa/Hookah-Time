<template>
  <div class="image-modal-container">
    <!-- Clickable thumbnail image -->
    <img
      :src="imageSrc"
      :alt="alt"
      class="thumbnail"
      :loading="loading"
      @click="openModal"
      @error="handleError"
      :style="{ width: width + 'px', height: height + 'px' }"
    />

    <!-- Use Teleport for the modal to attach it to body -->
    <Teleport to="body" v-if="isModalOpen">
      <div
        class="modal-overlay"
        @click="closeModal"
        @keydown.esc="closeModal"
        tabindex="0"
        ref="modalOverlay"
      >
        <div class="modal-content" @click.stop>
          <div class="modal-image-container">
            <img :src="imageSrc" :alt="alt" class="modal-image" @error="handleModalImageError" />
          </div>
          <button class="close-button" @click="closeModal" aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" stroke-width="2" />
            </svg>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

export default defineComponent({
  name: 'ImageModal',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Image',
    },
    loading: {
      type: String as () => 'lazy' | 'eager' | undefined,
      default: 'lazy',
      validator: (value: string | undefined) => ['lazy', 'eager', undefined].includes(value),
    },
    width: {
      type: [Number, String],
      default: 48,
    },
    height: {
      type: [Number, String],
      default: 48,
    },
    placeholderImage: {
      type: String,
      default: 'https://via.placeholder.com/48',
    },
  },
  emits: ['modal-opened', 'modal-closed', 'error'],
  setup(props, { emit }) {
    const isModalOpen = ref(false)
    const modalOverlay = ref<HTMLElement | null>(null)
    const previousActiveElement = ref<HTMLElement | null>(null)

    // Helper function to convert height to proper CSS value
    const getStyleHeight = (): string => {
      if (typeof props.height === 'number') {
        return `${props.height}px`
      }
      return props.height
    }

    // Helper function to convert width to proper CSS value
    const getStyleWidth = (): string => {
      if (typeof props.width === 'number') {
        return `${props.width}px`
      }
      return props.width
    }

    const openModal = () => {
      previousActiveElement.value = document.activeElement as HTMLElement
      isModalOpen.value = true

      nextTick(() => {
        if (modalOverlay.value) {
          modalOverlay.value.focus()
        }
        document.body.classList.add('modal-open')
        emit('modal-opened')
      })
    }

    const closeModal = () => {
      isModalOpen.value = false
      document.body.classList.remove('modal-open')
      if (previousActiveElement.value) {
        previousActiveElement.value.focus()
      }
      emit('modal-closed')
    }

    const handleError = (event: Event) => {
      const target = event.target as HTMLImageElement
      target.src = props.placeholderImage
      emit('error', { type: 'thumbnail', event })
    }

    const handleModalImageError = (event: Event) => {
      const target = event.target as HTMLImageElement
      target.src = props.placeholderImage
      emit('error', { type: 'modal', event })
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (!isModalOpen.value) return
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (isModalOpen.value && event.target === modalOverlay.value) {
        closeModal()
      }
    }

    watch(
      () => props.imageSrc,
      () => {
        // Handle logic if needed when image source changes
      },
    )

    onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
      window.addEventListener('click', handleOutsideClick)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('click', handleOutsideClick)
      if (isModalOpen.value) {
        document.body.classList.remove('modal-open')
      }
    })

    return {
      isModalOpen,
      modalOverlay,
      openModal,
      closeModal,
      handleError,
      handleModalImageError,
      getStyleHeight,
      getStyleWidth,
    }
  },
})
</script>

<style scoped>
.image-modal-container {
  display: inline-block;
  position: relative;
}

.thumbnail {
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  outline: none;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 4px;
  padding: 8px;
  animation: scaleIn 0.3s ease-out;
}

.modal-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #131313;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background: #ffffff;
}

.close-button:focus {
  outline: 2px solid #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
}

:global(.modal-open) {
  overflow: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
  }

  .close-button {
    width: 32px;
    height: 32px;
  }
}
</style>
