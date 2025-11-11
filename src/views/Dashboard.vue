<template>
  <Layout>
    <div class="container-fluid p-4 min-vh-100 bg-light">
      <!-- Quick Actions Bar -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
          <h1 class="h4 mb-0 fw-bold"><span class="text-primary">Staff</span> Dashboard</h1>
          <div class="d-flex flex-wrap gap-2">
            <router-link
              to="/blogs/new"
              class="btn btn-primary btn-sm d-flex align-items-center"
            >
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
              Add New Blog
            </router-link>
          </div>
        </div>
      </div>

      <!-- Task Overview Cards -->
      <div class="row row-cols-1 row-cols-md-4 g-4 mb-4">
        <!-- Total Blogs Card -->
        <div class="col">
          <div class="card shadow-sm h-100 border-light">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3 class="h4 fw-bold mb-0">{{ totalBlogs }}</h3>
                <p class="text-muted small mb-0">Total Blogs</p>
              </div>
              <div class="bg-primary bg-opacity-10 p-2 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0">
              <router-link
                to="/blogs"
                class="btn btn-link text-primary p-0 small d-flex align-items-center"
              >
                Manage
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ms-1"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Layout from '@/components/LayoutMain.vue'
import strapiService from '@/services/StrapiService'

interface StrapiResponse {
  pagination?: {
    total: number
  }
}

export default defineComponent({
  name: 'StaffDashboard',
  components: {
    Layout,
  },
  setup() {
    const totalBlogs = ref(0)
    const isLoading = ref(false)
    const error = ref('')

    const fetchBlogs = async () => {
      if (!strapiService.isAuthenticated()) {
        error.value = 'Not authenticated. Please log in again.'
        totalBlogs.value = 0
        return
      }

      try {
        isLoading.value = true
        error.value = ''

        const response = await strapiService.request<StrapiResponse>(
          'GET',
          `/content-manager/collection-types/api::blog.blog?pagination[page]=1&pagination[pageSize]=1`
        )

        totalBlogs.value = response.pagination?.total || 0
      } catch (err: any) {
        console.error('Failed to fetch blogs:', err)
        error.value = err.message || 'Failed to fetch blog data'
        totalBlogs.value = 0
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      fetchBlogs()
    })

    return {
      totalBlogs,
      isLoading,
      error,
      fetchBlogs,
    }
  },
})
</script>
