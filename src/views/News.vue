<template>
  <div class="mt-30">
    <h1 class="text-4xl font-bold text-center my-8">Toda la información y Novedades</h1>

    <!-- Posteos destacados -->
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div v-for="post in featuredPosts" :key="'featured-' + post.id" class="bg-blue-50 shadow-lg rounded-lg overflow-hidden border border-blue-300">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4">{{ post.description }}</p>
          <div class="text-sm text-gray-600 mb-4">
            <span>{{ formatDate(post.created_at) }}</span> · <span>{{ post.author }}</span>
          </div>
          <router-link :to="`/news/${post.id}`" class="text-blue-500 hover:underline">Leer Más</router-link>
        </div>
      </div>
    </div>

    <!-- Resto de los posteos -->
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="post in otherPosts" :key="'normal-' + post.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4">{{ post.description }}</p>
          <div class="text-sm text-gray-600 mb-4">
            <span>{{ formatDate(post.created_at) }}</span> · <span>{{ post.author }}</span>
          </div>
          <router-link :to="`/news/${post.id}`" class="text-blue-500 hover:underline">Leer Más</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../data/supabase'

const featuredPosts = ref([])
const otherPosts = ref([])

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false }) // ✅ Cambiado de 'date' a 'created_at'

  if (error) {
    console.error('Error al cargar novedades:', error)
    return
  }

  featuredPosts.value = data.filter(post => post.featured)
  otherPosts.value = data.filter(post => !post.featured)
})
</script>