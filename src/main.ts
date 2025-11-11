// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
// Create application
const app = createApp(App)

// Initialize Pinia store
const pinia = createPinia()
app.use(pinia)

// Initialize the auth check before mounting the app
const initializeAuth = () => {
  // Check if there's a token in localStorage
  const token = localStorage.getItem('token')

  // If there's a token, make sure StrapiService is properly initialized
  if (token) {
    // The StrapiService constructor should load the token from localStorage
    console.log('Token found in localStorage, initializing auth service')
  }
}

// Initialize auth state
initializeAuth()

// Use the router
app.use(router)

// Mount the app
app.mount('#app')
