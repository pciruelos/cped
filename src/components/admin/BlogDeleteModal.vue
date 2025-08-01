<!-- BlogDeleteModal.vue -->
<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
        
        <div class="mb-4">
          <p class="text-gray-600 mb-3">
            ¿Estás seguro de que quieres eliminar el post "<strong>{{ post.title }}</strong>"?
          </p>
          
          <div class="bg-gray-50 p-3 rounded-lg">
            <div class="flex items-center gap-3 mb-2">
              <img 
                v-if="post.image" 
                :src="post.image" 
                :alt="post.title"
                class="h-12 w-12 rounded object-cover"
              >
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ post.title }}</p>
                <p class="text-sm text-gray-600 truncate">{{ post.description }}</p>
              </div>
            </div>
            
            <div class="flex gap-1">
              <span 
                v-if="post.featured"
                class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"
              >
                ⭐️ Destacado
              </span>
              <span 
                v-if="post.important"
                class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800"
              >
                📌 Importante
              </span>
            </div>
          </div>
          
          <p class="text-red-600 text-sm mt-3">
            ⚠️ Esta acción no se puede deshacer.
          </p>
        </div>
        
        <div class="flex gap-3 justify-end">
          <button
            @click="$emit('cancelar')"
            class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            @click="$emit('confirmar')"
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
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
  
  defineEmits(['confirmar', 'cancelar'])
  </script>