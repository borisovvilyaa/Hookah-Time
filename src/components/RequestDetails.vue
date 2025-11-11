<template>
  <div v-if="isLoading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-2">Loading request details...</p>
  </div>
  <div v-else-if="error" class="alert alert-danger" role="alert">
    <i class="bi bi-exclamation-triangle-fill me-2"></i>
    {{ error }}
  </div>
  <div v-else class="container-fluid py-3">
    <!-- Request Header -->
    <div class="card shadow-sm border-light mb-4">
      <div class="card-header bg-light">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="h4 mb-0 fw-bold">
            <i class="bi bi-envelope me-2"></i>Request #{{ request.id }}
          </h2>
          <span v-if="request.status" :class="['badge fs-6', getStatusClass(request.status)]">
            {{ formatStatus(request.status) }}
          </span>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-4">
          <!-- Personal Information -->
          <div class="col-md-6">
            <div class="d-flex flex-column h-100">
              <h3 class="h5 fw-bold mb-3"><i class="bi bi-person me-2"></i>Contact Information</h3>
              <div class="card h-100 bg-light border-0">
                <div class="card-body">
                  <div v-if="request.FirstName" class="mb-2">
                    <span class="small text-secondary">First Name:</span>
                    <strong class="d-block">{{ request.FirstName }}</strong>
                  </div>
                  <div v-if="request.LastName" class="mb-2">
                    <span class="small text-secondary">Last Name:</span>
                    <strong class="d-block">{{ request.LastName }}</strong>
                  </div>
                  <div v-if="request.Number" class="mb-2">
                    <span class="small text-secondary">Phone Number:</span>
                    <strong class="d-block">{{ request.Number }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="col-md-6">
            <div class="d-flex flex-column h-100">
              <h3 class="h5 fw-bold mb-3"><i class="bi bi-chat-text me-2"></i>Message</h3>
              <div class="card h-100 bg-light border-0">
                <div class="card-body">
                  <div class="mb-0">
                    <span class="small text-secondary">Description:</span>
                    <div class="mt-2" style="white-space: pre-wrap; word-wrap: break-word;">
                      <strong>{{ request.Description || 'No description provided' }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <div>{{ formatDate(request.createdAt) }}</div>
          </div>
          <div class="col-md-6">
            <div class="small text-secondary mb-1">Updated At</div>
            <div>{{ formatDate(request.updatedAt) }}</div>
          </div>
          <div v-if="request.publishedAt" class="col-md-6">
            <div class="small text-secondary mb-1">Published At</div>
            <div>{{ formatDate(request.publishedAt) }}</div>
          </div>
          <div class="col-md-6">
            <div class="small text-secondary mb-1">Document ID</div>
            <div class="font-monospace small">{{ request.documentId }}</div>
          </div>
          <div v-if="request.createdBy" class="col-md-6">
            <div class="small text-secondary mb-1">Created By</div>
            <div>
              {{ request.createdBy.firstname }} {{ request.createdBy.lastname }}
              <span class="text-muted">({{ request.createdBy.email }})</span>
            </div>
          </div>
          <div v-if="request.updatedBy" class="col-md-6">
            <div class="small text-secondary mb-1">Updated By</div>
            <div>
              {{ request.updatedBy.firstname }} {{ request.updatedBy.lastname }}
              <span class="text-muted">({{ request.updatedBy.email }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import strapiService from '@/services/StrapiService'

interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  username?: string
  isActive?: boolean
}

interface Request {
  id: number
  documentId: string
  FirstName: string
  LastName: string
  Number: string
  Description: string
  status: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  locale: string | null
  createdBy?: User
  updatedBy?: User
  [key: string]: any
}

interface StrapiResponse<T> {
  data?: T
  meta?: any
}

export default defineComponent({
  name: 'RequestDetails',
  props: {
    documentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const request = ref<Request>({
      id: 0,
      documentId: '',
      FirstName: '',
      LastName: '',
      Number: '',
      Description: '',
      status: '',
      createdAt: '',
      updatedAt: '',
      publishedAt: null,
      locale: null,
    })
    const isLoading = ref(true)
    const error = ref('')

    const fetchRequestDetails = async () => {
      if (!strapiService.isAuthenticated()) {
        error.value = 'Not authenticated. Please log in to view request details.'
        isLoading.value = false
        return
      }

      try {
        isLoading.value = true
        error.value = ''
        console.log('Fetching request details for:', props.documentId)

        const response = await strapiService.request<StrapiResponse<Request>>(
          'GET',
          `/content-manager/collection-types/api::requests-form.requests-form/${props.documentId}`,
        )

        console.log('Raw API Response:', JSON.stringify(response, null, 2))

        if (!response || !response.data) {
          throw new Error('Invalid response format')
        }

        request.value = response.data
        console.log('Processed request data:', request.value)
      } catch (err: unknown) {
        console.error('Error fetching request:', err)
        error.value = err instanceof Error ? err.message : 'Failed to load request data'
      } finally {
        isLoading.value = false
      }
    }

    const formatDate = (dateString?: string | null): string => {
      if (!dateString) return 'N/A'
      try {
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
        return new Date(dateString).toLocaleDateString('en-US', options)
      } catch {
        return 'Invalid Date'
      }
    }

    const formatStatus = (status: string): string => {
      if (status === 'published') return 'Published'
      if (status === 'draft') return 'Pending'
      return status.charAt(0).toUpperCase() + status.slice(1)
    }

    const getStatusClass = (status: string): string => {
      if (status === 'published') return 'bg-success'
      if (status === 'draft') return 'bg-warning'
      return 'bg-secondary'
    }

    // Watch for documentId changes
    watch(() => props.documentId, () => {
      fetchRequestDetails()
    })

    onMounted(() => {
      fetchRequestDetails()
    })

    return {
      request,
      isLoading,
      error,
      formatDate,
      formatStatus,
      getStatusClass,
    }
  },
})
</script>

<style scoped>
.card-body .small {
  font-size: 0.875rem;
}
</style>
