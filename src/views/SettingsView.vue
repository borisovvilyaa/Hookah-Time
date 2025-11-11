<template>
  <Layout>
    <div class="container-fluid p-4 min-vh-100 bg-light">
      <!-- Page Header -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body">
          <h1 class="h4 mb-0 fw-bold"><span class="text-primary">Settings</span></h1>
          <p class="text-muted small mb-0">Manage</p>
        </div>
      </div>

      <!-- Current User Profile -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-header bg-transparent">
          <h2 class="h5 mb-0 fw-bold">My Profile</h2>
        </div>

        <!-- Loading State for Current User -->
        <div v-if="isLoadingCurrentUser" class="card-body text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-muted small mt-2">Loading profile...</p>
        </div>

        <!-- Error State for Current User -->
        <div v-else-if="errorCurrentUser" class="card-body">
          <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="me-2"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
              />
            </svg>
            {{ errorCurrentUser }}
          </div>
        </div>

        <!-- Current User Profile Display -->
        <div v-else-if="currentUser" class="card-body">
          <div class="d-flex align-items-center mb-3">
            <div class="profile-avatar me-3" :style="{ backgroundColor: avatarColor }">
              {{ userInitials }}
            </div>
            <div>
              <h3 class="h5 mb-0 fw-bold">
                {{ currentUser.firstname }} {{ currentUser.lastname }}
              </h3>
              <p class="text-muted small mb-0">{{ currentUser.email }}</p>
              <span class="badge bg-primary bg-opacity-10 text-primary">{{ userRole }}</span>
            </div>
          </div>

          <form @submit.prevent="saveProfile">
            <!-- Messages -->
            <div
              v-if="profileSuccessMessage"
              class="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="me-2"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
                />
              </svg>
              {{ profileSuccessMessage }}
            </div>
            <div
              v-if="profileError"
              class="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="me-2"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              {{ profileError }}
            </div>

            <!-- Form Fields -->
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label for="firstname" class="form-label small fw-bold">First Name</label>
                <input
                  id="firstname"
                  v-model="profileForm.firstname"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="lastname" class="form-label small fw-bold">Last Name</label>
                <input
                  id="lastname"
                  v-model="profileForm.lastname"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label small fw-bold">Email Address</label>
              <input
                id="email"
                v-model="profileForm.email"
                type="email"
                class="form-control"
                placeholder="Email address"
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label small fw-bold">Username</label>
              <input
                id="username"
                v-model="profileForm.username"
                type="text"
                class="form-control"
                placeholder="Username (optional)"
              />
              <small class="text-muted small">Leave blank if not setting a username</small>
            </div>

            <!-- Form Actions -->
            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-link text-primary" @click="resetProfileForm">
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary d-flex align-items-center"
                :disabled="isSavingProfile"
              >
                <svg
                  v-if="isSavingProfile"
                  xmlns="http://www.w3.org/2000/svg"
                  class="me-2"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  />
                </svg>
                <span>{{ isSavingProfile ? 'Saving...' : 'Save Changes' }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- No Current User State -->
        <div v-else class="card-body">
          <div class="alert alert-warning d-flex align-items-center" role="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="me-2"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
              />
            </svg>
            No user data available. Please log in again.
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import Layout from '@/components/LayoutMain.vue'
import strapiService from '@/services/StrapiService'

// Define interfaces for API response structures
interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  username?: string
  roles?: Array<{ id: number; name: string }>
  isActive: boolean
  blocked: boolean
}

interface StrapiResponse<T> {
  data: T
}

export default defineComponent({
  name: 'SettingsView',
  components: {
    Layout,
  },
  setup() {
    const currentUser = ref<User | null>(null)
    const isLoadingCurrentUser = ref(true)
    const errorCurrentUser = ref('')
    const isSavingProfile = ref(false)
    const profileError = ref('')
    const profileSuccessMessage = ref('')
    const profileForm = ref({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
    })

    // Fetch current user data
    const fetchCurrentUser = async () => {
      if (strapiService.isAuthenticated()) {
        try {
          isLoadingCurrentUser.value = true
          const response = await strapiService.request<StrapiResponse<User>>(
            'GET',
            '/admin/users/me',
          )
          currentUser.value = response.data || null
          resetProfileForm()
        } catch (err: any) {
          console.error('Failed to fetch current user data:', err)
          errorCurrentUser.value = err.message || 'Failed to load profile'
        } finally {
          isLoadingCurrentUser.value = false
        }
      } else {
        isLoadingCurrentUser.value = false
        errorCurrentUser.value = 'Not authenticated. Please log in again.'
      }
    }

    // Fetch current user on mount
    onMounted(async () => {
      await fetchCurrentUser()
    })

    // Generate user initials for avatar
    const userInitials = computed(() => {
      if (currentUser.value) {
        const first = (currentUser.value.firstname || '').charAt(0).toUpperCase()
        const last = (currentUser.value.lastname || '').charAt(0).toUpperCase()
        return first + last || 'U'
      }
      return 'U'
    })

    // Generate random avatar color based on user ID
    const avatarColor = computed(() => {
      const colors = [
        '#3498db',
        '#2ecc71',
        '#e74c3c',
        '#f39c12',
        '#9b59b6',
        '#1abc9c',
        '#e67e22',
        '#34495e',
        '#d35400',
        '#16a085',
      ]
      if (currentUser.value && currentUser.value.id) {
        const id = currentUser.value.id.toString()
        const sum = id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
        return colors[sum % colors.length]
      }
      return colors[0]
    })

    // Dynamic user role
    const userRole = computed(() => {
      if (currentUser.value && currentUser.value.roles && currentUser.value.roles.length > 0) {
        return currentUser.value.roles[0].name || 'User'
      }
      return 'User'
    })

    // Reset profile form to current user data
    const resetProfileForm = () => {
      if (currentUser.value) {
        profileForm.value = {
          firstname: currentUser.value.firstname || '',
          lastname: currentUser.value.lastname || '',
          email: currentUser.value.email || '',
          username: currentUser.value.username || '',
        }
      }
      profileError.value = ''
      profileSuccessMessage.value = ''
    }

    // Save profile changes
    const saveProfile = async () => {
      try {
        profileError.value = ''
        profileSuccessMessage.value = ''
        isSavingProfile.value = true

        // Prepare update data
        const updateData: Partial<User> = {
          firstname: profileForm.value.firstname,
          lastname: profileForm.value.lastname,
          username: profileForm.value.username || undefined, // Convert empty string to undefined
        }

        // Send update request
        const response = await strapiService.request<StrapiResponse<User>>(
          'PUT',
          '/admin/users/me',
          updateData,
        )

        // Update current user data
        if (response && response.data) {
          currentUser.value = response.data
          profileSuccessMessage.value = 'Profile updated successfully'
        }
      } catch (err: any) {
        console.error('Error updating profile:', err)
        profileError.value = err.message || 'Failed to update profile'
      } finally {
        isSavingProfile.value = false
      }
    }

    return {
      currentUser,
      isLoadingCurrentUser,
      errorCurrentUser,
      profileForm,
      isSavingProfile,
      profileError,
      profileSuccessMessage,
      userInitials,
      avatarColor,
      userRole,
      resetProfileForm,
      saveProfile,
    }
  },
})
</script>

<style scoped>
.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  flex-shrink: 0;
}

.alert {
  padding: 0.75rem;
  font-size: 0.875rem;
}

.alert svg {
  flex-shrink: 0;
}

.form-control,
.form-select {
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}

.form-label {
  margin-bottom: 0.25rem;
}

.btn {
  font-size: 0.875rem;
}

.btn-primary {
  background-color: var(--bs-primary, #0d6efd);
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

.btn-link {
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

.spinner-border {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
