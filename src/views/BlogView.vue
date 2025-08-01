<template>
  <div class="mt-30">
    <h1 class="text-4xl font-bold text-center my-8">Toda la información y Novedades</h1>

    <!-- Buscador -->
    <div class="max-w-2xl mx-auto px-4 mb-8">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por título o descripción..."
          class="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i class="fas fa-search text-gray-400 text-lg"></i>
        </div>
      </div>
    </div>

    <!-- Posteos destacados -->
    <div v-if="filteredFeaturedPosts.length > 0" class="max-w-6xl mx-auto px-4 mb-2">
      <h2 class="text-3xl font-bold text-center mb-4 text-blue-600 text-primary">Destacados</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div v-for="post in filteredFeaturedPosts" :key="'featured-' + post.id" class="bg-blue-50 shadow-lg rounded-lg overflow-hidden border border-blue-300">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 font-secondary text-primary">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4">{{ post.description }}</p>
          <div class="text-sm text-gray-600 mb-4">
            <span>{{ formatDate(post.created_at) }}</span> · <span>{{ post.author }}</span>
          </div>
          <router-link :to="`/blog/${post.id}`" class="text-blue-500 hover:underline">Leer Más</router-link>
        </div>
      </div>
    </div>
  </div>

    <!-- Resto de los posteos -->
    <div v-if="filteredOtherPosts.length > 0" class="max-w-6xl mx-auto px-4 mb-6">
      <h2 class="text-3xl font-bold text-center mb-4 text-gray-700 text-primary">Posts</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div v-for="post in filteredOtherPosts" :key="'normal-' + post.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 font-secondary text-primary">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4">{{ post.description }}</p>
          <div class="text-sm text-gray-600 mb-4">
            <span>{{ formatDate(post.created_at) }}</span> · <span>{{ post.author }}</span>
          </div>
          <router-link :to="`/blog/${post.id}`" class="text-blue-500 hover:underline">Leer Más</router-link>
        </div>
      </div>
    </div>
  </div>
    <!-- Mensaje cuando no hay resultados -->
    <div v-if="searchQuery && filteredFeaturedPosts.length === 0 && filteredOtherPosts.length === 0" class="max-w-6xl mx-auto px-4 text-center py-12">
      <p class="text-gray-500 text-lg">No se encontraron resultados para "{{ searchQuery }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../data/supabase'

const featuredPosts = ref([])
const otherPosts = ref([])
const searchQuery = ref('')

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Computed properties para filtrar los posts
const filteredFeaturedPosts = computed(() => {
  if (!searchQuery.value) return featuredPosts.value
  
  const query = searchQuery.value.toLowerCase()
  return featuredPosts.value.filter(post => 
    post.title.toLowerCase().includes(query) || 
    post.description.toLowerCase().includes(query)
  )
})

const filteredOtherPosts = computed(() => {
  if (!searchQuery.value) return otherPosts.value
  
  const query = searchQuery.value.toLowerCase()
  return otherPosts.value.filter(post => 
    post.title.toLowerCase().includes(query) || 
    post.description.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al cargar novedades:', error)
    return
  }

  featuredPosts.value = data.filter(post => post.featured)
  otherPosts.value = data.filter(post => !post.featured)
})
</script>