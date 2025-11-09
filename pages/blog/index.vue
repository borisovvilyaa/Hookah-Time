<!-- pages/blog/index.vue -->
<script setup>
const config = useRuntimeConfig()
const { data: blogData } = await useAsyncData('blog-list', () =>
  $fetch(`${config.public.API_URL}/blogs`, {
    params: { 'populate': '*' },
    headers: { Authorization: `Bearer ${config.public.API_TOKEN}` },
  })
)

const posts = computed(() => blogData.value?.data || [])

useHead({
  title: 'Hookah Time Blog | News, Tips & Updates',
  meta: [{ name: 'description', content: 'Latest hookah news, flavor reviews, events from Hookah Time LA' }],
})
</script>

<template>
  <div class="container py-5">
    <h1>Hookah Time Blog</h1>
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-4 mb-4">
        <NuxtLink :to="`/blog/${post.attributes.slug}`">
          <img :src="post.attributes.FeaturedImage?.data?.attributes?.url" class="img-fluid" />
          <h3>{{ post.attributes.title }}</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>