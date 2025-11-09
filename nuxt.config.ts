import { readdirSync } from 'fs'
import { resolve } from 'path'
import matter from 'gray-matter'

export default defineNuxtConfig({
  ssr: true,

  nitro: {
    preset: 'aws-amplify',
    minify: true,
    compressPublicAssets: true,
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('bootstrap')) return 'bootstrap'
            if (id.includes('@fortawesome')) return 'fontawesome'
            if (id.includes('gsap')) return 'gsap'
            return 'vendor'
          },
        },
      },
    },
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      titleTemplate: '%s | Hookah Time LA',
      htmlAttrs: { lang: 'en' },

      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'geo.region', content: 'US-CA' },
        { name: 'geo.placename', content: 'Los Angeles' },
        { name: 'geo.position', content: '34.1689;-118.4379' },
        { name: 'ICBM', content: '34.1689, -118.4379' },
        { name: 'theme-color', content: '#a1a1a1' },
      ],

      link: [
        { rel: 'canonical', href: 'https://hookahtimela.com/' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', href: '/banner.jpg', as: 'image', type: 'image/jpeg', fetchpriority: 'high' },
      ],

      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', defer: true },
      ],
    },

    pageTransition: { name: 'page', mode: 'out-in' },
  },

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/sitemap'],

  build: { transpile: ['gsap'] },

  experimental: { payloadExtraction: false },

  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      API_TOKEN: process.env.NUXT_API_TOKEN,
    },
  },

  sitemap: {
    hostname: 'https://hookahtimela.com',
    gzip: true,
    cacheTime: 1000 * 60 * 15,
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
    },
    routes: async () => {
      const routes = [
        { url: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString().split('T')[0] },
        { url: '/blog', changefreq: 'daily', priority: 0.9 },
      ]

      const blogDir = resolve('./content/blog')
      const files = readdirSync(blogDir)
        .filter(f => f.endsWith('.md'))
        .filter(f => !f.startsWith('_'))

      const blogRoutes = files.map(file => {
        const slug = file.replace('.md', '')
        const filePath = resolve(blogDir, file)
        const { data } = matter.read(filePath)
        const lastmod = (data.updatedAt || data.date || new Date()).toISOString().split('T')[0]

        return {
          url: `/blog/${slug}`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8,
        }
      })

      return [...routes, ...blogRoutes]
    },
  },

  compatibilityDate: '2025-04-20',
})