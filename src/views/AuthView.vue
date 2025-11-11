<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="brand">
        <div class="brand-logo">HT</div>
        <div class="brand-info">
          <h1 class="brand-title"><span class="text-primary">HOOKAH</span> TIME</h1>
          <p class="brand-subtitle">Admin Dashboard</p>
        </div>
      </div>

      <div class="auth-form-container">
        <h2 class="auth-title">Sign in to Dashboard</h2>

        <form @submit.prevent="handleLogin" class="auth-form" name="login-form" method="post">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              />
            </div>
          </div>

          <div v-if="error" class="error-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ error }}
          </div>

          <button type="submit" :disabled="isLoading" class="submit-button">
            <svg v-if="isLoading" class="loading-icon" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <span v-else>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import strapiService from '@/services/StrapiService'

export default defineComponent({
  name: 'AuthView',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const isLoading = ref(false)

    onMounted(() => {
      if (strapiService.isAuthenticated()) {
        router.push('/')
      }
    })

    const handleLogin = async () => {
      error.value = ''
      isLoading.value = true

      try {
        if (!email.value || !password.value) {
          error.value = 'Email and password are required'
          isLoading.value = false
          return
        }

        await strapiService.login(email.value, password.value)
        router.push('/')
      } catch (err: any) {
        console.error('Login error:', err)
        error.value = err.message || 'Failed to authenticate'
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      error,
      isLoading,
      handleLogin,
    }
  },
})
</script>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.auth-card {
  width: 100%;
  max-width: 460px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.brand {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #edf2f9;
}

.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 0.375rem;
  background-color: var(--bs-primary, #0d6efd);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-right: 0.75rem;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.text-primary {
  color: var(--bs-primary, #0d6efd);
}

.brand-subtitle {
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0.25rem 0 0;
}

.auth-form-container {
  padding: 2rem;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #212529;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #343a40;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #6c757d;
}

.input-container input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.input-container input:focus {
  border-color: var(--bs-primary, #0d6efd);
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  outline: none;
}

.error-message {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
  background-color: #f8d7da;
  color: #842029;
  border-radius: 0.375rem;
}

.error-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: var(--bs-primary, #0d6efd);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  height: 3rem;
}

.submit-button:hover {
  background-color: #0b5ed7;
}

.submit-button:disabled {
  background-color: #7aaef2;
  cursor: not-allowed;
}

.loading-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
