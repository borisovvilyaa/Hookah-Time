import axios from 'axios'

// Environment variable for default API URL
const DEFAULT_API_URL = import.meta.env.VITE_SHOP_API_URL

interface FetchOptions {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: Record<string, string | number | boolean>
  body?: object
  baseUrl?: string // Allow custom base URL
  useAuth?: boolean // Control whether to include Authorization header
}

/**
 * Performs an API request with optional authorization token
 * @param options - Object containing request parameters
 * @returns Data retrieved from the API
 */
export async function fetchFromApi<T>({
  endpoint,
  method = 'GET',
  params,
  body,
  baseUrl = DEFAULT_API_URL,
  useAuth = true,
}: FetchOptions): Promise<T> {
  try {
    // Check if baseUrl is defined
    if (!baseUrl) {
      throw new Error('Base URL is not defined. Please check your environment variables or input.')
    }

    // Ensure no double slashes in the URL
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    const requestUrl = `${cleanBaseUrl}/${endpoint.replace(/^\/+/, '')}`
    console.log(`Fetching from: ${requestUrl}`) // Debug log

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add Authorization header if useAuth is true and token exists
    if (useAuth) {
      const token = localStorage.getItem('token') || import.meta.env.VITE_SHOP_API_TOKEN
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    const response = await axios({
      method,
      url: requestUrl,
      headers,
      params,
      data: body,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching from ${endpoint}:`, {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      })
      throw new Error(
        `Failed to fetch from ${endpoint}: ${
          error.response?.data?.error?.message || error.message
        }`,
      )
    }
    console.error(`Unexpected error fetching from ${endpoint}:`, error)
    throw new Error(`Unexpected error fetching from ${endpoint}`)
  }
}
