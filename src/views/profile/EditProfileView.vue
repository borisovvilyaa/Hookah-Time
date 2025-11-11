<template>
  <!-- Template remains unchanged -->
  <Layout>
    <div class="container-fluid p-4 min-vh-100 bg-light">
      <!-- Page Header -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body">
          <h1 class="h4 mb-0 fw-bold"><span class="text-primary">Edit Profile</span></h1>
          <p class="text-muted small mb-0">Update your account details</p>
        </div>
      </div>

      <!-- Profile Edit Form -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-header bg-transparent">
          <h2 class="h5 mb-0 fw-bold">Profile Details</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveProfileChanges">
            <!-- Success Alert -->
            <div
              v-if="editProfileSuccess"
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
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
                />
              </svg>
              {{ editProfileSuccess }}
            </div>
            <!-- Error Alert -->
            <div
              v-if="editProfileError"
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
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              {{ editProfileError }}
            </div>
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="text-muted small mt-2">Loading profile...</p>
            </div>
            <!-- Form Fields -->
            <div v-else>
              <div class="mb-3">
                <label for="editFirstname" class="form-label small fw-bold">First Name</label>
                <input
                  id="editFirstname"
                  v-model="profile.firstname"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editLastname" class="form-label small fw-bold">Last Name</label>
                <input
                  id="editLastname"
                  v-model="profile.lastname"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label small fw-bold">Email Address</label>
                <input
                  id="editEmail"
                  v-model="profile.email"
                  type="email"
                  class="form-control"
                  placeholder="Email address"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="editRole" class="form-label small fw-bold">Role</label>
                <select id="editRole" v-model="profile.role" class="form-select" required>
                  <option value="" disabled>Select a role</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editStatus" class="form-label small fw-bold">Status</label>
                <select id="editStatus" v-model="profile.isActive" class="form-select" required>
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
              </div>
              <!-- Password Change Section -->
              <div class="card shadow-sm mb-4 border-light">
                <div class="card-header bg-transparent">
                  <h2 class="h5 mb-0 fw-bold">Change Password</h2>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="currentPassword" class="form-label small fw-bold"
                      >Current Password</label
                    >
                    <input
                      id="currentPassword"
                      v-model="password.current"
                      type="password"
                      class="form-control"
                      placeholder="Current password"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="newPassword" class="form-label small fw-bold">New Password</label>
                    <input
                      id="newPassword"
                      v-model="password.new"
                      type="password"
                      class="form-control"
                      placeholder="New password"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="confirmPassword" class="form-label small fw-bold"
                      >Confirm New Password</label
                    >
                    <input
                      id="confirmPassword"
                      v-model="password.confirm"
                      type="password"
                      class="form-control"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  class="btn btn-danger d-flex align-items-center"
                  :disabled="isDeleting"
                  @click="deleteAccount"
                >
                  <svg
                    v-if="isDeleting"
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
                  <span>{{ isDeleting ? 'Deleting...' : 'Delete Account' }}</span>
                </button>
                <router-link to="/settings" class="btn btn-link text-primary"> Cancel </router-link>
                <button
                  type="submit"
                  class="btn btn-primary d-flex align-items-center"
                  :disabled="isSaving"
                >
                  <svg
                    v-if="isSaving"
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
                  <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/LayoutMain.vue'
import strapiService from '@/services/StrapiService'

// Define interfaces for API responses
interface Role {
  id: string
  name: string
}

interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  roles: Role[]
  isActive: boolean
  blocked: boolean
}

interface UserResponse {
  data: User
}

interface RolesResponse {
  data: Role[]
}

interface UpdateProfileData {
  firstname: string
  lastname: string
  roles: number[]
  isActive: boolean
  password?: string
  currentPassword?: string
}

export default defineComponent({
  name: 'ProfileEditView',
  components: {
    Layout,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const profile = ref({
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      isActive: true,
    })
    const password = ref({
      current: '',
      new: '',
      confirm: '',
    })
    const roles = ref<Role[]>([])
    const isLoading = ref(true)
    const isSaving = ref(false)
    const isDeleting = ref(false)
    const editProfileError = ref('')
    const editProfileSuccess = ref('')

    // Fetch user profile and roles on mount
    onMounted(async () => {
      try {
        isLoading.value = true
        const userId = route.params.id as string

        // Fetch user details
        const userResponse: UserResponse = await strapiService.request(
          'GET',
          `/admin/users/${userId}`,
        )
        const user = userResponse.data
        profile.value = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.roles && user.roles.length ? user.roles[0].id : '',
          isActive: user.isActive && !user.blocked,
        }

        // Fetch roles
        const rolesResponse: RolesResponse = await strapiService.request('GET', '/admin/roles')
        roles.value = rolesResponse.data || []
      } catch (err: any) {
        console.error('Failed to fetch profile or roles:', err)
        editProfileError.value = err.message || 'Failed to load profile'
      } finally {
        isLoading.value = false
      }
    })

    // Validate inputs
    const validateInputs = () => {
      if (!profile.value.firstname || !profile.value.lastname) {
        throw new Error('First name and last name are required')
      }
      if (!profile.value.role) {
        throw new Error('A role must be selected')
      }
      // Validate password fields if any are filled
      if (password.value.current || password.value.new || password.value.confirm) {
        if (!password.value.current) {
          throw new Error('Current password is required to change password')
        }
        if (!password.value.new) {
          throw new Error('New password is required')
        }
        if (password.value.new !== password.value.confirm) {
          throw new Error('New password and confirmation do not match')
        }
        if (password.value.new.length < 8) {
          throw new Error('New password must be at least 8 characters long')
        }
      }
    }

    // Save profile changes
    const saveProfileChanges = async () => {
      try {
        isSaving.value = true
        editProfileError.value = ''
        editProfileSuccess.value = ''

        // Validate inputs
        validateInputs()

        // Update profile data
        const updateData: UpdateProfileData = {
          firstname: profile.value.firstname,
          lastname: profile.value.lastname,
          roles: [parseInt(profile.value.role)],
          isActive: profile.value.isActive,
        }

        // Include password update if provided
        if (password.value.new && password.value.current) {
          updateData.password = password.value.new
          updateData.currentPassword = password.value.current
        }

        const response: UserResponse = await strapiService.request(
          'PUT',
          `/admin/users/${profile.value.id}`,
          updateData,
        )
        if (response.data) {
          editProfileSuccess.value = 'Profile updated successfully'
          // Clear password fields after successful update
          password.value.current = ''
          password.value.new = ''
          password.value.confirm = ''
          setTimeout(() => {
            router.push('/settings')
          }, 1500)
        }
      } catch (err: any) {
        console.error('Error updating profile:', err)
        editProfileError.value =
          err.response?.data?.error?.message || err.message || 'Failed to update profile'
      } finally {
        isSaving.value = false
      }
    }

    // Delete account
    const deleteAccount = async () => {
      if (!confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
        return
      }
      try {
        isDeleting.value = true
        editProfileError.value = ''
        editProfileSuccess.value = ''

        await strapiService.request('DELETE', `/admin/users/${profile.value.id}`)
        editProfileSuccess.value = 'Account deleted successfully'
        setTimeout(() => {
          router.push('/settings')
        }, 1500)
      } catch (err: any) {
        console.error('Error deleting account:', err)
        editProfileError.value =
          err.response?.data?.error?.message || err.message || 'Failed to delete account'
      } finally {
        isDeleting.value = false
      }
    }

    return {
      profile,
      password,
      roles,
      isLoading,
      isSaving,
      isDeleting,
      editProfileError,
      editProfileSuccess,
      saveProfileChanges,
      deleteAccount,
    }
  },
})
</script>
