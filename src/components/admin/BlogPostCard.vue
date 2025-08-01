<!-- BlogPostCard.vue -->
<template>
    <div class="border border-gray-200 rounded-lg p-4">
      <div class="flex gap-3 mb-3">
        <div class="flex-shrink-0">
          <img 
            v-if="post.image" 
            :src="post.image" 
            :alt="post.title"
            class="h-16 w-16 rounded-lg object-cover"
          >
          <div v-else class="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span class="text-gray-400 text-xs">Sin img</span>
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold text-gray-900 text-sm leading-tight">{{ post.title }}</h3>
            <div class="flex flex-col gap-1 ml-2">
              <span 
                v-if="post.featured"
                class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 whitespace-nowrap"
              >
                ⭐️ Destacado
              </span>
              <span 
                v-if="post.important"
                class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 whitespace-nowrap"
              >
                📌 Importante
              </span>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">
            {{ post.description }}
          </p>
          
          <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
            <span>👤 {{ post.author }}</span>
            <span>📅 {{ formatearFecha(post.created_at) }}</span>
          </div>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="$emit('editar')"
          class="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          @click="$emit('eliminar')"
          class="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    post: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['editar', 'eliminar'])
  
  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>