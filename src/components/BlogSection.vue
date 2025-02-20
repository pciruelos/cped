<template>
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-4">Novedades / Blog</h2>
      <p class="text-lg text-gray-600 text-center mb-8">
        Mantente al día con las últimas noticias y actualizaciones.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="post in displayedPosts" :key="post.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img :src="getImageUrl(post.image)" :alt="post.title" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
            <p class="text-gray-700 mb-4">{{ post.description }}</p>
            <div class="text-sm text-gray-600 mb-4">
              <span>{{ post.date }}</span> · <span>{{ post.author }}</span>
            </div>
            <router-link :to="`/news/${post.id}`" class="text-blue-500 hover:underline">Leer Más</router-link>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <router-link to="/news" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Ver Todas las Novedades
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import blogPosts from '../data/blogPosts.json'

// Get the first 3 posts
const displayedPosts = blogPosts.slice(0, 3)

// Helper function to dynamically load images from the assets/blog folder
const getImageUrl = (imagePath) => {
  console.log('Image Path:', imagePath) // Debug: Check the image path
  const url = new URL(`../assets/blog/${imagePath}`, import.meta.url).href
  console.log('Resolved URL:', url) // Debug: Check the resolved URL
  return url
}
</script>