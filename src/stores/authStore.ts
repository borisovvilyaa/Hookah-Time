// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import strapiService from '@/services/StrapiService'
import router from '@/router'

interface User {
  id: number
  username: string
  email: string
  firstname?: string
  lastname?: string
  [key: string]: unknown
}

interface ApiError {
  message: string
  [key: string]: unknown
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const initialize = () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      try {
        const userData = localStorage.getItem('userData')
        user.value = userData ? JSON.parse(userData) : null
      } catch {
        user.value = null
      }
    }
  }

  const isAuthenticated = computed(() => {
    return strapiService.isAuthenticated()
  })

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await strapiService.login(email, password)

      if (response && response.data) {
        user.value = response.data.user as User
        token.value = response.data.token
        localStorage.setItem('userData', JSON.stringify(response.data.user))
        router.push('/')
        return true
      }
      return false
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.message || 'Authentication failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    strapiService.logout()
    user.value = null
    token.value = null
    localStorage.removeItem('userData')
    router.push('/auth')
  }

  initialize()

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    initialize,
  }
})
