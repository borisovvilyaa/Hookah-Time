import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()
  
  const fetchData = async (endpoint) => {
    const apiUrl = config.public.shopApiUrl
    const token = config.public.shopApiToken
    
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
    
    try {
      // console.log(`Fetching from: ${apiUrl}/${endpoint}`)
      
      const response = await $fetch(`${apiUrl}/${endpoint}`, { 
        method: 'GET',
        headers 
      })
      
      // console.log(`Response from ${endpoint}:`, response)
      
      // Check if the response has the expected structure
      if (!response) {
        console.error(`No response received for ${endpoint}`)
        return []
      }
      
      if (!response.data && Array.isArray(response)) {
        return response // Some APIs might return an array directly
      }
      
      if (!response.data) {
        console.error(`Invalid response structure for ${endpoint}:`, response)
        return []
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      // Return empty array instead of throwing error
      return []
    }
  }
  
  return { fetchData }
}