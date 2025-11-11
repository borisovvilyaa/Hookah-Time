import axios, { AxiosError } from 'axios'

interface LoginResponse {
  data: {
    token: string
    user: Record<string, unknown>
  }
}

interface RequestOptions {
  method: string
  url: string
  data?: unknown
  headers: Record<string, string>
}

class StrapiService {
  private baseUrl: string = ''
  private token: string | null = null
  private tokenCheckInterval: number | null = null

  constructor() {
    // Initialize baseUrl from VITE_SHOP_URL
    this.baseUrl = import.meta.env.VITE_SHOP_UPLOAD_URL || ''
    if (!this.baseUrl) {
      console.error('VITE_SHOP_URL is not set in .env file')
    }

    // Initialize token from localStorage (keeping token storage as is)
    this.token = localStorage.getItem('token') || null

    // Start token validation check if there's a token
    if (this.token) {
      this.startTokenValidationCheck()
    }
  }

  /**
   * Get the authentication token
   */
  getToken(): string | null {
    return this.token
  }

  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl
  }

  /**
   * Set the base URL
   */
  setBaseUrl(url: string): void {
    // Make sure URL doesn't end with a slash
    this.baseUrl = url.endsWith('/') ? url.slice(0, -1) : url
  }

  /**
   * Start periodic token validation check
   */
  private startTokenValidationCheck(): void {
    // Clear any existing interval
    if (this.tokenCheckInterval !== null) {
      window.clearInterval(this.tokenCheckInterval)
    }

    // Check token validity every 5 minutes
    this.tokenCheckInterval = window.setInterval(
      async () => {
        try {
          if (this.token) {
            // Make a simple request to verify the token
            await this.request('GET', '/admin/users/me')
          }
        } catch {
          // If request fails due to auth, clear the token
          console.log('Token validation failed, logging out')
          this.logout()

          // Force a page reload if needed to ensure clean state
          if (window.location.pathname !== '/auth') {
            window.location.href = '/#/auth'
          }
        }
      },
      5 * 60 * 1000,
    ) // 5 minutes interval
  }

  /**
   * Handle admin login
   */
  async login(email: string, password: string, baseUrl?: string): Promise<LoginResponse> {
    if (baseUrl) {
      this.setBaseUrl(baseUrl)
    } else if (!this.baseUrl) {
      // Fallback to VITE_SHOP_URL
      this.baseUrl = import.meta.env.VITE_SHOP_URL || ''
    }

    if (!this.baseUrl) {
      console.error('Strapi URL is not set in login method')
      throw new Error('Strapi URL is not set')
    }

    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseUrl}/admin/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (response.data && response.data.data && response.data.data.token) {
        this.token = response.data.data.token
        localStorage.setItem('token', this.token)

        // Start token validation check
        this.startTokenValidationCheck()

        return response.data
      }

      throw new Error('Invalid response from server')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ error: { message: string } }>
        const errorMessage = axiosError.response?.data?.error?.message || axiosError.message
        throw new Error(errorMessage)
      }
      throw error
    }
  }

  /**
   * Log out current user
   */
  logout(): void {
    this.token = null
    localStorage.removeItem('token')

    // Clear token validation interval
    if (this.tokenCheckInterval !== null) {
      window.clearInterval(this.tokenCheckInterval)
      this.tokenCheckInterval = null
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token
  }

  /**
   * Make an authenticated request to Strapi
   */
  async request<T = unknown>(method: string, endpoint: string, data?: unknown): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('Strapi URL is not set')
    }

    if (!this.token) {
      throw new Error('Not authenticated')
    }

    try {
      const requestOptions: RequestOptions = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      }

      if (data !== undefined) {
        requestOptions.data = data
      }

      const response = await axios<T>(requestOptions)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Token expired or invalid
        this.logout()
        throw new Error('Authentication expired. Please log in again.')
      }
      throw error
    }
  }
}

// Create a singleton instance
const strapiService = new StrapiService()
export default strapiService
