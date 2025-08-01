<!-- BlogPostsList.vue -->
<template>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Lista de Posts</h2>
      </div>
  
      <!-- Tabla Desktop -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Autor
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img 
                      v-if="post.image" 
                      :src="post.image" 
                      :alt="post.title"
                      class="h-12 w-12 rounded-lg object-cover"
                    >
                    <div v-else class="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-xs">Sin img</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ post.title }}</div>
                    <div class="text-sm text-gray-500">{{ truncateText(post.description, 50) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ post.author }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatearFecha(post.created_at) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex gap-1">
                  <span 
                    v-if="post.featured"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    ⭐️ Destacado
                  </span>
                  <span 
                    v-if="post.important"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >
                    📌 Importante
                  </span>
                  <span 
                    v-if="!post.featured && !post.important"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
                  >
                    Normal
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="$emit('editar', post)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Editar
                </button>
                <button
                  @click="$emit('eliminar', post)"
                  class="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Cards Mobile -->
      <div class="md:hidden space-y-4 p-4">
        <BlogPostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @editar="$emit('editar', post)"
          @eliminar="$emit('eliminar', post)"
        />
      </div>
  
      <!-- Empty state -->
      <div v-if="posts.length === 0" class="p-8 text-center">
        <p class="text-gray-500 mb-4">No hay posts que coincidan con los filtros</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import BlogPostCard from '../admin/BlogPostCard.vue'
  
  defineProps({
    posts: {
      type: Array,
      default: () => []
    }
  })
  
  defineEmits(['editar', 'eliminar'])
  
  const truncateText = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }
  
  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
  </script>