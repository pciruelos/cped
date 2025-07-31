<template>
  <section class="py-3 md:py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Blog Section -->
        <div>
           <!-- Header con título y botón en móvil -->
          <div class="flex justify-between items-start md:block mb-2 md:mb-4">
            <div>
              <h2 class="text-4xl font-bold text-left md:text-center mb-2 md:mb-4 font-first italic">Blog</h2>
              <p class="text-lg text-gray-600 text-left md:text-center mb-2 md:mb-8">
                Artículos y reflexiones interesantes
              </p>
            </div>
            <!-- Botón "Ver más" solo visible en móvil -->
            <button class="transform -skew-x-12 h-[40px] md:hidden bg-primary text-white px-4 py-2 rounded text-sm font-first hover:bg-gray-800 transition-colors whitespace-nowrap ml-4">
              Ver más
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="post in blogPosts" :key="post.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
              <div class="relative w-full h-48">
                <img :src="getImageUrl(post.image)" :alt="post.title" class="w-full h-full object-cover" />
                <div class="absolute bottom-0 right-0 w-0 h-0 border-l-[100px] border-b-48 border-l-transparent border-r-transparent border-b-orange-500"></div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2 font-secondary text-primary">{{ post.title }}</h3>
                <p class="text-gray-700 mb-4 font-secondary">{{ post.description }}</p>
                <div class="text-[10px] text-secondary text-gray-600 mb-4 font-secondary">
                  <span>{{ post.date }}</span> · <span>{{ post.author }}</span>
                </div>
                <router-link :to="`/news/${post.id}`" class="hover:text-blue-500 hover:underline text-secondary font-first">Leer Más</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Novedades Section -->
        <div>
           <!-- Header con título y botón en móvil -->
           <div class="flex justify-between items-start md:block mb-2 md:mb-4">
            <div>
          <h2 class="text-4xl font-bold text-left md:text-center mb-4 font-first">Novedades</h2>
          <p class="text-lg text-gray-600 text-left md:text-center mb-2 md:mb-8 font-secondary">
            Mantente al día con las últimas noticias
          </p>
        </div>
          <!-- Botón "Ver más" solo visible en móvil -->
          <button class="transform -skew-x-12 h-[40px] md:hidden bg-primary text-white px-4 py-2 rounded-lg text-sm font-first hover:bg-gray-800 transition-colors whitespace-nowrap ml-4">
              Ver más
            </button>
            </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="post in newsPosts" :key="post.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img :src="getImageUrl(post.image)" :alt="post.title" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2 font-secondary text-primary">{{ post.title }}</h3>
                <p class="text-gray-700 mb-4 font-secondary">{{ post.description }}</p>
                <div class="text-[10px] text-secondary text-gray-600 mb-4 font-secondary">
                  <span>{{ post.date }}</span> · <span>{{ post.author }}</span>
                </div>
                <router-link :to="`/news/${post.id}`" class="hover:text-blue-500 hover:underline font-first text-secondary">Leer Más</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <router-link to="/news" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-first hidden md:block">
          Ver Todas las Publicaciones
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import blogPostsData from '../data/blogPosts.json'

// Split posts into blog and news (assuming first half is blog, second half is news)
// Adjust this logic based on how you want to categorize your posts
const blogPosts = blogPostsData.slice(0, 2)  // First 2 posts for Blog
const newsPosts = blogPostsData.slice(2, 4)  // Next 2 posts for Novedades

// Helper function to dynamically load images from the assets/blog folder
const getImageUrl = (imagePath) => {
  const url = new URL(`../assets/blog/${imagePath}`, import.meta.url).href
  return url
}
</script>