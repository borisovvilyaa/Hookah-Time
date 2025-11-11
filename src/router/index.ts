import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'
import AuthView from '../views/AuthView.vue'
import SettingsView from '@/views/SettingsView.vue'
import strapiService from '../services/StrapiService'

import BlogPage from '@/views/BlogPage.vue'
import EditBlogPage from '@/views/blog/EditBlogPage.vue'
import AddBlog from '@/views/blog/AddBlog.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/blogs',
    name: 'blog',
    component: BlogPage,
    meta: { requiresAuth: true },
  },

  {
    path: '/blogs/new',
    name: 'add-products',
    component: AddBlog,
    meta: { requiresAuth: true },
  },
  {
    path: '/blogs/edit/:id',
    name: 'edit-product',
    component: EditBlogPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: { requiresAuth: false },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = strapiService.isAuthenticated()

  if (to.path === '/auth' && isAuthenticated) {
    const redirectPath = to.query.redirect as string | undefined
    next({ path: redirectPath && redirectPath !== '/auth' ? redirectPath : '/' })
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/auth', query: { redirect: to.fullPath } })
    return
  }

  next()
})

export default router
