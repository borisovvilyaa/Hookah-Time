<template>
  <Layout>
    <div class="container-fluid p-3 min-vh-100 bg-light">
      <!-- Header with Quick Actions -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4 mb-3 mb-md-0">
              <h1 class="h4 mb-0 fw-bold"><span class="text-primary">Blogs</span> Management</h1>
            </div>
            <div class="col-md-8">
              <div class="d-flex flex-wrap gap-2 justify-content-md-end">
                <!-- Search Box -->
                <div class="input-group" style="max-width: 280px">
                  <span class="input-group-text bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search blogs..."
                    v-model="searchQueryRaw"
                    aria-label="Search blogs"
                  />
                </div>

                <!-- Add New Button -->
                <router-link to="/blogs/new" class="btn btn-primary d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="me-2"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                  Add New
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blogs Content -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body p-0">
          <div v-if="isLoadingBlogs" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else-if="errorBlogs" class="text-center text-danger py-4" id="blogs-error">
            {{ errorBlogs }}
          </div>
          <div v-else-if="filteredBlogs.length === 0" class="text-center py-5">
            <div class="text-muted mb-3">No blogs found matching your search.</div>
            <router-link to="/blogs/new" class="btn btn-outline-primary">
              Add New Blog
            </router-link>
          </div>
          <div v-else>
            <!-- Desktop Table View -->
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th scope="col" class="px-3 py-3">Title</th>
                    <th scope="col" class="px-3 py-3">Featured Image</th>
                    <th scope="col" class="px-3 py-3">Published Date</th>
                    <th scope="col" class="px-3 py-3">Read Time</th>
                    <th scope="col" class="px-3 py-3">Status</th>
                    <th scope="col" class="px-3 py-3">Updated</th>
                    <th scope="col" class="px-3 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="blog in filteredBlogs" :key="blog.id">
                    <td class="px-3 py-3">
                      <div class="d-flex align-items-start">
                        <span class="fw-medium" :title="blog.title">
                          {{ truncateText(blog.title, 60) }}
                        </span>
                      </div>
                    </td>
                    <td class="px-3 py-3">
                      <ImageModal
                        v-if="blog.FeaturedImage"
                        :image-src="getImageUrl(blog.FeaturedImage)"
                        image-class="rounded"
                        style="width: 80px; height: 60px; object-fit: cover"
                        :alt="blog.title"
                        @error="handleImageError"
                      />
                      <span v-else class="text-muted small">No image</span>
                    </td>
                    <td class="px-3 py-3">{{ formatDate(blog.Time) }}</td>
                    <td class="px-3 py-3">
                      <span class="badge bg-info">{{ blog.TimeReaded }}</span>
                    </td>
                    <td class="px-3 py-3">
                      <StatusBadge :status="blog.status" />
                    </td>
                    <td class="px-3 py-3">{{ formatDate(blog.updatedAt) }}</td>
                    <td class="px-3 py-3">
                      <div class="d-flex justify-content-center gap-2">
                        <button
                          class="btn btn-sm btn-outline-primary"
                          @click="showDetails(blog.documentId)"
                          title="View details"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                              d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                            />
                          </svg>
                        </button>
                        <button
                          v-if="
                            (blog.status === 'modified' || blog.status === 'draft') &&
                            isSuperAdmin
                          "
                          class="btn btn-sm btn-success"
                          @click="approveBlog(blog.documentId)"
                          :disabled="isApproving === blog.documentId"
                          title="Approve blog"
                        >
                          <span
                            v-if="isApproving === blog.documentId"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                            />
                          </svg>
                        </button>
                        <router-link
                          :to="`/blogs/edit/${blog.documentId}`"
                          class="btn btn-sm btn-outline-secondary"
                          title="Edit blog"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                            />
                          </svg>
                        </router-link>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="confirmDelete(blog.id)"
                          title="Delete blog"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Modal -->
      <GenericModal
        :isVisible="isModalVisible"
        :title="modalTitle"
        :actions="modalActions"
        @close="closeModal"
      >
        <BlogDetails v-if="selectedId" :documentId="selectedId" />
      </GenericModal>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import axios from 'axios'
import Layout from '@/components/LayoutMain.vue'
import GenericModal from '@/components/GenericModal.vue'
import BlogDetails from '@/components/BlogDetails.vue'
import ImageModal from '@/components/ImageModal.vue'
import strapiService from '@/services/StrapiService'

interface Role {
  code: string
  [key: string]: any
}

interface UserData {
  roles?: Role[]
  [key: string]: any
}

interface Image {
  id?: number
  url?: string
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

interface Blog {
  id: number
  documentId: string
  title: string
  status: string
  updatedAt: string
  FeaturedImage?: Image
  Time: string
  TimeReaded: string
  slug: string
  KeyWords?: {
    terms: string[]
  }
  createdAt: string
  publishedAt: string | null
  locale: string | null
  createdBy?: User
  updatedBy?: User
  [key: string]: any
}

interface ApiResponse {
  results?: Blog[]
  pagination?: {
    total: number
    [key: string]: any
  }
  [key: string]: any
}

interface ModalAction {
  label: string
  className: string
  handler: () => void
}

// Status Badge Component
const StatusBadge = defineComponent({
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const getStatusLabel = computed(() => {
      if (props.status === 'modified' || props.status === 'draft') {
        return 'Waiting to approve'
      }
      return props.status.charAt(0).toUpperCase() + props.status.slice(1)
    })

    const getStatusClass = computed(() => {
      if (props.status === 'published') return 'bg-success'
      return 'bg-warning'
    })

    return { getStatusLabel, getStatusClass }
  },
  template: `
    <span :class="['badge', getStatusClass]">{{ getStatusLabel }}</span>
  `,
})

export default defineComponent({
  name: 'BlogsPage',
  components: {
    Layout,
    GenericModal,
    BlogDetails,
    ImageModal,
    StatusBadge,
  },
  setup() {
    const router = useRouter()
    const blogs = ref<Blog[]>([])
    const blogsTotal = ref<number>(0)
    const isLoadingBlogs = ref<boolean>(false)
    const errorBlogs = ref<string>('')
    const searchQueryRaw = ref<string>('')
    const searchQuery = ref<string>('')
    const isApproving = ref<string | null>(null)
    const userData = ref<UserData>({})
    const isModalVisible = ref<boolean>(false)
    const selectedId = ref<string | null>(null)

    // Debounce search input
    const updateSearchQuery = debounce((value: string) => {
      searchQuery.value = value
    }, 300)

    watch(searchQueryRaw, (newValue) => {
      updateSearchQuery(newValue)
    })

    // Modal actions
    const modalActions = ref<ModalAction[]>([
      {
        label: 'Close',
        className: 'btn btn-secondary',
        handler: () => closeModal(),
      },
    ])

    const modalTitle = computed((): string => {
      return 'Blog Details'
    })

    // User permissions
    const isSuperAdmin = computed((): boolean => {
      if (!userData.value || !userData.value.roles) return false
      return userData.value.roles.some((role: Role) => role.code === 'strapi-super-admin')
    })

    // Computed properties
    const filteredBlogs = computed((): Blog[] => {
      const query = searchQuery.value.toLowerCase()
      return blogs.value
        .filter(
          (blog) =>
            blog.title.toLowerCase().includes(query) ||
            (blog.slug?.toLowerCase().includes(query) ?? false) ||
            (blog.status?.toLowerCase().includes(query) ?? false) ||
            (blog.TimeReaded?.toLowerCase().includes(query) ?? false),
        )
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    })

    // Methods
    const fetchUserData = async (): Promise<void> => {
      if (!strapiService.isAuthenticated()) {
        return
      }

      try {
        const response = (await strapiService.request('GET', '/admin/users/me')) as ApiResponse
        userData.value = response.data || {}
      } catch (error: unknown) {
        const err = error as Error & { response?: { status: number } }
        console.error('Failed to fetch user data:', err)
        if (err.response && err.response.status === 401) {
          console.warn('Session expired, redirecting to login')
          router.push('/auth')
        }
      }
    }

    const fetchBlogs = async (): Promise<void> => {
      if (!strapiService.isAuthenticated()) {
        errorBlogs.value = 'Not authenticated. Please log in again.'
        blogs.value = []
        blogsTotal.value = 0
        return
      }

      try {
        isLoadingBlogs.value = true
        errorBlogs.value = ''
        const response = (await strapiService.request(
          'GET',
          `/content-manager/collection-types/api::blog.blog?populate[FeaturedImage][fields][0]=url&sort=updatedAt:DESC&pageSize=1000`,
        )) as ApiResponse
        if (!response || !Array.isArray(response.results)) {
          console.error('Invalid response for blogs:', response)
          blogs.value = []
          blogsTotal.value = 0
          return
        }
        blogs.value = response.results
        blogsTotal.value = response.pagination?.total || 0
      } catch (error: unknown) {
        const err = error as Error
        console.error('Failed to fetch blogs:', err)
        errorBlogs.value = err.message || 'Failed to fetch blogs'
        blogs.value = []
        blogsTotal.value = 0
      } finally {
        isLoadingBlogs.value = false
      }
    }

    const approveBlog = async (documentId: string): Promise<void> => {
      if (!isSuperAdmin.value) {
        alert('Only super admins can approve blogs.')
        return
      }

      if (!documentId) {
        console.error('No document ID provided for approval')
        return
      }

      try {
        isApproving.value = documentId
        await strapiService.request(
          'POST',
          `/content-manager/collection-types/api::blog.blog/${documentId}/actions/publish`,
        )
        await fetchBlogs()
        alert('Blog has been approved and published successfully!')
      } catch (error: unknown) {
        const err = error as Error
        console.error('Failed to approve blog:', err)
        alert(`Failed to approve blog: ${err.message || 'Unknown error'}`)
      } finally {
        isApproving.value = null
      }
    }

    const getImageUrl = (image: Image | undefined): string => {
      if (image && image.url) {
        return image.url
      }
      return import.meta.env.PLACEHOLDER
    }

    const handleImageError = (event: Event): void => {
      const target = event.target as HTMLImageElement
      target.src = import.meta.env.PLACEHOLDER
    }

    const formatDate = (dateString: string): string => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    const truncateText = (text: string, maxLength: number): string => {
      if (!text || text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    }

    const confirmDelete = async (id: number): Promise<void> => {
      if (!confirm('Are you sure you want to delete this blog?')) {
        return
      }

      try {
        const blog = blogs.value.find((item) => item.id === id)
        if (!blog) {
          throw new Error(`No blog found with ID: ${id}`)
        }

        const endpoint = `/content-manager/collection-types/api::blog.blog/${blog.documentId}?locale=*`

        if (blog.FeaturedImage && blog.FeaturedImage.id) {
          const baseUrl = strapiService.getBaseUrl()
          if (!baseUrl) {
            throw new Error('Strapi URL is not configured')
          }

          await axios.delete(`${baseUrl}/upload/files/${blog.FeaturedImage.id}`, {
            headers: {
              Authorization: `Bearer ${strapiService.getToken()}`,
            },
          })
        }

        await strapiService.request('DELETE', endpoint)
        await fetchBlogs()
        alert('Blog deleted successfully!')
      } catch (error: unknown) {
        const err = error as Error
        console.error('Failed to delete blog:', err)
        alert(`Failed to delete blog: ${err.message || 'Unknown error'}`)
      }
    }

    const showDetails = (documentId: string): void => {
      selectedId.value = documentId
      isModalVisible.value = true
    }

    const closeModal = (): void => {
      isModalVisible.value = false
      selectedId.value = null
      const triggerButton = document.querySelector(
        `button[title="View details"]`,
      ) as HTMLElement | null
      if (triggerButton) triggerButton.focus()
    }

    // Fetch data on mount
    onMounted(() => {
      fetchUserData()
      fetchBlogs()
    })

    return {
      blogs,
      blogsTotal,
      isLoadingBlogs,
      errorBlogs,
      searchQueryRaw,
      searchQuery,
      filteredBlogs,
      isApproving,
      isSuperAdmin,
      isModalVisible,
      selectedId,
      modalActions,
      modalTitle,
      fetchBlogs,
      approveBlog,
      getImageUrl,
      handleImageError,
      formatDate,
      truncateText,
      confirmDelete,
      showDetails,
      closeModal,
    }
  },
})
</script>
