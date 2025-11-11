<template>
  <aside class="sidebar">
    <!-- Logo and Branding -->
    <div class="brand">
      <!-- <div class="brand-logo">MCB</div> -->
      <div class="brand-info">
        <h1 class="brand-title"><span class="text-primary">HOOKAH</span> TIME</h1>
        <p class="brand-subtitle">Admin Dashboard</p>
      </div>
    </div>

    <!-- Navigation Menus -->
    <div class="navigation">
      <!-- Dynamic Navigation Generation -->
      <div
        v-for="(section, index) in filteredNavigation"
        :key="`section-${index}`"
        class="nav-section"
      >
        <h2 class="nav-title">{{ section.title }}</h2>
        <ul class="nav-items">
          <li v-for="item in section.items" :key="item.path">
            <router-link
              :to="item.path"
              class="nav-link"
              :class="{ active: isRouteActive(item.path) }"
            >
              <component :is="renderIcon(item.icon)" class="nav-icon" />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- User Profile & Logout -->
    <div class="user-section">
      <div class="user-info">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-details">
          <h3 class="user-name">{{ fullName }}</h3>
          <p class="user-role">{{ userRole }}</p>
        </div>
      </div>
      <button @click="handleLogout" class="logout-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="nav-icon"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Log Out
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, h } from 'vue'
import type { VNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import strapiService from '@/services/StrapiService'

// Define types for better TypeScript support
interface NavItem {
  path: string
  name: string
  icon: string
  requiresAdmin?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface UserData {
  firstname?: string
  lastname?: string
  roles?: Array<{ code: string; name: string }>
}

// Define error type (assuming Axios-like error handling)
interface RequestError {
  response?: {
    status: number
  }
}

export default defineComponent({
  name: 'AppSidebar',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userData = ref<UserData>({})
    const isLoading = ref(true)

    // Navigation structure with Projects added
    const navigationConfig = ref<NavSection[]>([
      {
        title: 'Main',
        items: [
          { path: '/', name: 'Dashboard', icon: 'dashboard-icon' },
          { path: '/blogs', name: 'Blog', icon: 'product-icon' },

        ],
      },

      {
        title: 'Settings',
        items: [
          { path: '/settings', name: 'Settings', icon: 'settings-icon', requiresAdmin: true },
        ],
      },
    ])

    // Fetch user data with retry mechanism
    const fetchUserData = async (retries = 3) => {
      isLoading.value = true

      if (!strapiService.isAuthenticated()) {
        isLoading.value = false
        return
      }

      try {
        const response = await strapiService.request<{ data: UserData }>('GET', '/admin/users/me')
        userData.value = response.data || {}
      } catch (error: unknown) {
        console.error('Failed to fetch user data:', error)

        // Retry mechanism with exponential backoff
        if (retries > 0) {
          const retryDelay = Math.pow(2, 4 - retries) * 1000
          setTimeout(() => fetchUserData(retries - 1), retryDelay)
          return
        }

        // Handle permanent failure
        const typedError = error as RequestError
        if (typedError.response && typedError.response.status === 401) {
          console.warn('Session expired, redirecting to login')
          handleLogout()
        }

        userData.value = {}
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      fetchUserData()
    })

    // Computed properties for user data
    const isSuperAdmin = computed(() => {
      if (!userData.value || !userData.value.roles) return false
      return userData.value.roles.some((role) => role.code === 'strapi-super-admin')
    })

    const fullName = computed(() => {
      if (!userData.value) return 'User'
      return `${userData.value.firstname || ''} ${userData.value.lastname || ''}`.trim() || 'User'
    })

    const userInitials = computed(() => {
      if (!userData.value) return 'U'
      const first = (userData.value.firstname || '').charAt(0).toUpperCase()
      const last = (userData.value.lastname || '').charAt(0).toUpperCase()
      return first + last || 'U'
    })

    const userRole = computed(() => {
      if (!userData.value?.roles?.length) return 'Administrator'
      return userData.value.roles[0].name || 'Administrator'
    })

    // Filter navigation based on user permissions
    const filteredNavigation = computed(() => {
      return navigationConfig.value
        .map((section) => {
          const filteredItems = section.items.filter((item) => {
            return !item.requiresAdmin || isSuperAdmin.value
          })

          return {
            ...section,
            items: filteredItems,
          }
        })
        .filter((section) => section.items.length > 0)
    })

    // Active route detection
    const isRouteActive = (path: string) => {
      if (path === '/' && route.path === '/') {
        return true
      }
      if (path !== '/' && route.path.startsWith(path)) {
        return true
      }
      return false
    }

    // Icons as render functions
    const renderIcon = (iconName: string): VNode => {
      const icons: { [key: string]: () => VNode } = {
        'dashboard-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z',
              }),
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
              }),
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
              }),
            ],
          ),
        'product-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M8 9l3 3-3 3M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
              }),
            ],
          ),
        'order-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
              }),
            ],
          ),
        'blog-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
              }),
            ],
          ),
        'project-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              }),
            ],
          ),
        'requests-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              }),
            ],
          ),
        'settings-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
              }),
            ],
          ),
        'profile-icon': () =>
          h(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              class: 'nav-icon',
              width: '20',
              height: '20',
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            [
              h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              }),
            ],
          ),
      }

      // Call the icon function to return a VNode, or fallback to a div
      return icons[iconName]?.() || h('div')
    }

    // Logout handler
    const handleLogout = async () => {
      try {
        await strapiService.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        localStorage.removeItem('token')
        localStorage.removeItem('strapiUrl')
        router.push('/auth')
      }
    }

    return {
      fullName,
      userInitials,
      userRole,
      handleLogout,
      filteredNavigation,
      isRouteActive,
      renderIcon,
      isLoading,
    }
  },
})
</script>
<style scoped>
/* Style remains unchanged */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  flex-direction: column;
  z-index: 1000;
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
  background-color: var(--bs-primary);
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

.brand-subtitle {
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0.25rem 0 0;
}

.navigation {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.nav-title {
  text-transform: uppercase;
  color: #6c757d;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0 0.75rem;
  margin-bottom: 0.5rem;
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.625rem 0.75rem;
  color: #212529;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
}

.nav-link:hover {
  background-color: #f8f9fa;
}

.nav-link.active {
  background-color: #e7f1ff;
  color: var(--bs-primary);
}

.nav-icon {
  margin-right: 0.75rem;
}

.user-section {
  padding: 1rem;
  border-top: 1px solid #edf2f9;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(13, 110, 253, 0.1);
  color: var(--bs-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-right: 0.75rem;
}

.user-name {
  font-size: 0.9375rem;
  font-weight: 500;
  margin: 0;
}

.user-role {
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: #212529;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #e9ecef;
}

.logout-button svg {
  margin-right: 0.5rem;
}
</style>
