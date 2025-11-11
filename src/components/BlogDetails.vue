<template>
  <div v-if="isLoading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-2">Loading blog details...</p>
  </div>
  <div v-else-if="error" class="alert alert-danger" role="alert">
    <i class="bi bi-exclamation-triangle-fill me-2"></i>
    {{ error }}
  </div>
  <div v-else class="container-fluid py-3">
    <!-- Blog Header -->
    <div class="card shadow-sm border-light mb-4">
      <div class="card-header bg-light">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="h4 mb-0 fw-bold">
            <i class="bi bi-newspaper me-2"></i>{{ blog.title }}
          </h2>
          <span v-if="blog.status" :class="['badge fs-6', getStatusClass(blog.status)]">
            {{ formatStatus(blog.status) }}
          </span>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-4">
          <!-- Basic Info -->
          <div class="col-md-6">
            <div class="d-flex flex-column h-100">
              <h3 class="h5 fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>Basic Info</h3>
              <div class="card h-100 bg-light border-0">
                <div class="card-body">
                  <div v-if="blog.title" class="mb-2">
                    <span class="small text-secondary">Title:</span>
                    <strong class="d-block">{{ blog.title }}</strong>
                  </div>
                  <div v-if="blog.slug" class="mb-2">
                    <span class="small text-secondary">Slug:</span>
                    <span class="d-block text-muted">{{ blog.slug }}</span>
                  </div>
                  <div v-if="blog.Time" class="mb-2">
                    <span class="small text-secondary">Published Date:</span>
                    <strong class="d-block">{{ formatDate(blog.Time) }}</strong>
                  </div>
                  <div v-if="blog.TimeReaded" class="mb-2">
                    <span class="small text-secondary">Read Time:</span>
                    <span class="badge bg-info">{{ blog.TimeReaded }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Keywords -->
          <div class="col-md-6">
            <div class="d-flex flex-column h-100">
              <h3 class="h5 fw-bold mb-3"><i class="bi bi-tags me-2"></i>Keywords</h3>
              <div class="card h-100 bg-light border-0">
                <div class="card-body">
                  <div v-if="blog.KeyWords && blog.KeyWords.terms && blog.KeyWords.terms.length > 0">
                    <div class="d-flex flex-wrap gap-2">
                      <span
                        v-for="(keyword, index) in blog.KeyWords.terms"
                        :key="index"
                        class="badge bg-secondary"
                      >
                        {{ keyword }}
                      </span>
                    </div>
                  </div>
                  <div v-else class="text-muted">
                    <i class="bi bi-tags me-2"></i>No keywords available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Image -->
    <div class="card shadow-sm border-light mb-4">
      <div class="card-header bg-light">
        <h3 class="h5 mb-0 fw-bold"><i class="bi bi-image me-2"></i>Featured Image</h3>
      </div>
      <div class="card-body">
        <div v-if="!blog.FeaturedImage" class="p-4 text-muted text-center">
          <i class="bi bi-image me-2"></i>No featured image available.
        </div>
        <div v-else class="text-center">
          <img
            :src="getImageUrl(blog.FeaturedImage)"
            :alt="blog.title"
            class="img-fluid rounded shadow-sm"
            style="max-height: 400px; object-fit: contain; cursor: pointer"
            @click="openImageModal(getImageUrl(blog.FeaturedImage), blog.title)"
            @error="handleImageError"
          />
          <div v-if="blog.FeaturedImage.name" class="mt-2 small text-muted">
            {{ blog.FeaturedImage.name }}
          </div>
        </div>

        <!-- Image Modal -->
        <teleport to="body" v-if="modalImage.isOpen">
          <div class="image-modal-overlay" @click="closeImageModal">
            <div class="image-modal-content" @click.stop>
              <button class="image-modal-close" @click="closeImageModal">
                <i class="bi bi-x-lg"></i>
              </button>
              <img :src="modalImage.src" :alt="modalImage.alt" class="image-modal-img" />
            </div>
          </div>
        </teleport>
      </div>
    </div>

    <!-- Content Preview -->
    <div class="card shadow-sm border-light mb-4">
      <div class="card-header bg-light">
        <h3 class="h5 mb-0 fw-bold"><i class="bi bi-file-text me-2"></i>Content Preview</h3>
      </div>
      <div class="card-body">
        <div v-if="!blog.Content || blog.Content.length === 0" class="p-4 text-muted text-center">
          <i class="bi bi-file-text me-2"></i>No content available.
        </div>
        <div v-else class="blog-content">
          <div v-for="(block, index) in blog.Content" :key="index" class="mb-3">
            <!-- Paragraph -->
            <p v-if="block.type === 'paragraph'" class="mb-2">
              <template v-for="(child, childIndex) in block.children" :key="childIndex">
                <strong v-if="child.bold">{{ child.text }}</strong>
                <span v-else>{{ child.text }}</span>
              </template>
            </p>

            <!-- Heading -->
            <component
              v-else-if="block.type === 'heading'"
              :is="`h${block.level || 2}`"
              class="fw-bold mt-4 mb-2"
            >
              <template v-for="(child, childIndex) in block.children" :key="childIndex">
                {{ child.text }}
              </template>
            </component>

            <!-- List -->
            <ul v-else-if="block.type === 'list' && block.format === 'unordered'" class="mb-2">
              <li v-for="(item, itemIndex) in block.children" :key="itemIndex">
                <template v-for="(child, childIndex) in item.children" :key="childIndex">
                  {{ child.text }}
                </template>
              </li>
            </ul>

            <ol v-else-if="block.type === 'list' && block.format === 'ordered'" class="mb-2">
              <li v-for="(item, itemIndex) in block.children" :key="itemIndex">
                <template v-for="(child, childIndex) in item.children" :key="childIndex">
                  {{ child.text }}
                </template>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- System Info -->
    <div class="card shadow-sm border-light">
      <div class="card-header bg-light">
        <h3 class="h5 mb-0 fw-bold"><i class="bi bi-clock-history me-2"></i>System Information</h3>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="small text-secondary mb-1">Created At</div>
            <div>{{ formatDate(blog.createdAt) }}</div>
          </div>
          <div class="col-md-6">
            <div class="small text-secondary mb-1">Updated At</div>
            <div>{{ formatDate(blog.updatedAt) }}</div>
          </div>
          <div v-if="blog.publishedAt" class="col-md-6">
            <div class="small text-secondary mb-1">Published At</div>
            <div>{{ formatDate(blog.publishedAt) }}</div>
          </div>
          <div v-if="blog.createdBy" class="col-md-6">
            <div class="small text-secondary mb-1">Created By</div>
            <div>
              {{ blog.createdBy.firstname }} {{ blog.createdBy.lastname }}
              <span class="text-muted">({{ blog.createdBy.email }})</span>
            </div>
          </div>
          <div v-if="blog.updatedBy" class="col-md-6">
            <div class="small text-secondary mb-1">Updated By</div>
            <div>
              {{ blog.updatedBy.firstname }} {{ blog.updatedBy.lastname }}
              <span class="text-muted">({{ blog.updatedBy.email }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import strapiService from '@/services/StrapiService'

interface Image {
  id?: number
  url?: string
  name?: string
  alternativeText?: string
  [key: string]: any
}

interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  username?: string
  isActive?: boolean
}

interface ContentChild {
  text: string
  type: string
  bold?: boolean
  [key: string]: any
}

interface ContentBlock {
  type: string
  level?: number
  format?: string
  children: ContentChild[] | ContentBlock[]
  [key: string]: any
}

interface Blog {
  id?: number
  documentId?: string
  title: string
  slug?: string
  Time?: string
  TimeReaded?: string
  status?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  locale?: string | null
  FeaturedImage?: Image
  Content?: ContentBlock[]
  KeyWords?: {
    terms: string[]
  }
  createdBy?: User
  updatedBy?: User
  [key: string]: any
}

interface StrapiResponse<T> {
  data?: T
  results?: T[]
  meta?: any
}

export default defineComponent({
  name: 'BlogDetails',
  props: {
    documentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const blog = ref<Blog>({
      title: '',
    })
    const isLoading = ref(true)
    const error = ref('')
    const modalImage = ref({
      isOpen: false,
      src: '',
      alt: '',
    })

    const fetchBlogDetails = async () => {
      if (!strapiService.isAuthenticated()) {
        error.value = 'Not authenticated. Please log in to view blog details.'
        isLoading.value = false
        return
      }

      try {
        isLoading.value = true
        error.value = ''
        console.log('Fetching blog details for:', props.documentId)

        const response = await strapiService.request<StrapiResponse<Blog>>(
          'GET',
          `/content-manager/collection-types/api::blog.blog/${props.documentId}`,
        )

        console.log('Raw API Response:', JSON.stringify(response, null, 2))

        if (!response || !response.data) {
          throw new Error('Invalid response format')
        }

        blog.value = response.data
        console.log('Processed blog data:', blog.value)
      } catch (err: unknown) {
        console.error('Error fetching blog:', err)
        error.value = err instanceof Error ? err.message : 'Failed to load blog data'
      } finally {
        isLoading.value = false
      }
    }

    const getImageUrl = (image: Image | undefined): string => {
      if (image && image.url) {
        return image.url
      }
      return import.meta.env.PLACEHOLDER || '/placeholder-image.jpg'
    }

    const handleImageError = (event: Event): void => {
      const target = event.target as HTMLImageElement
      target.src = import.meta.env.PLACEHOLDER || '/placeholder-image.jpg'
    }

    const formatDate = (dateString?: string | null): string => {
      if (!dateString) return 'N/A'
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      } catch {
        return 'Invalid Date'
      }
    }

    const formatStatus = (status: string): string => {
      if (status === 'published') return 'Published'
      if (status === 'draft') return 'Draft'
      if (status === 'modified') return 'Waiting to Approve'
      return status.charAt(0).toUpperCase() + status.slice(1)
    }

    const getStatusClass = (status: string): string => {
      if (status === 'published') return 'bg-success'
      if (status === 'draft' || status === 'modified') return 'bg-warning'
      return 'bg-secondary'
    }

    const openImageModal = (src: string, alt: string) => {
      modalImage.value = {
        isOpen: true,
        src,
        alt,
      }
      document.body.style.overflow = 'hidden'
    }

    const closeImageModal = () => {
      modalImage.value.isOpen = false
      document.body.style.overflow = ''
    }

    onMounted(() => {
      fetchBlogDetails()
    })

    return {
      blog,
      isLoading,
      error,
      modalImage,
      getImageUrl,
      handleImageError,
      formatDate,
      formatStatus,
      getStatusClass,
      openImageModal,
      closeImageModal,
    }
  },
})
</script>

<style scoped>
.card-body .small {
  font-size: 0.875rem;
}

/* Blog Content Styling */
.blog-content {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
}

.blog-content::-webkit-scrollbar {
  width: 8px;
}

.blog-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.blog-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.blog-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
  color: #2c3e50;
}

.blog-content p {
  line-height: 1.7;
  color: #333;
}

.blog-content ul,
.blog-content ol {
  padding-left: 1.5rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Keywords Badge Styling */
.badge.bg-secondary {
  font-weight: 500;
  padding: 0.4rem 0.7rem;
}

/* Image Modal Styles */
.image-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;
}

.image-modal-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal-img {
  max-width: 100%;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 8px;
}

.image-modal-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  transition: all 0.2s ease;
  z-index: 10000;
}

.image-modal-close:hover {
  background: white;
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .image-modal-close {
    top: 10px;
    right: 10px;
  }

  .blog-content {
    max-height: 400px;
  }
}
</style>
