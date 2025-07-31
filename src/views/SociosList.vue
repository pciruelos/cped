<template>
    <div class="py-20 bg-gray-100 min-h-screen">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-8">Lista de Socios</h1>
        
        <!-- Buscador -->
        <div class="mb-8" v-if="!loading && !error">
          <div class="relative">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar por nombre o DNI..."
              class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            Mostrando {{ filteredMembers.length }} de {{ members.length }} socios
          </p>
        </div>
  
        <!-- Lista de socios -->
        <div v-if="!loading && !error && members.length > 0">
          <div class="grid gap-4">
            <div
              v-for="member in filteredMembers"
              :key="member.dni"
              class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-primary"
            >
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ member.nombre }}</h3>
                  <p class="text-gray-600">DNI: {{ member.dni }}</p>
                </div>
                <div class="text-primary font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                  ✓ SOCIO
                </div>
              </div>
            </div>
          </div>
  
          <!-- Estado vacío de búsqueda -->
          <div v-if="filteredMembers.length === 0 && searchTerm" class="text-center py-8">
            <div class="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No se encontraron socios</h3>
            <p class="text-gray-500">
              No hay socios que coincidan con "{{ searchTerm }}"
            </p>
            <button 
              @click="searchTerm = ''"
              class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Mostrar todos
            </button>
          </div>
        </div>
  
        <!-- Estado de carga -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p class="text-gray-600 text-xl">Cargando lista de socios...</p>
        </div>
  
        <!-- Error -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div class="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 class="text-red-800 font-semibold mb-2 text-xl">Error al cargar la lista</h3>
          <p class="text-red-700 mb-4">{{ error }}</p>
          <button
            @click="loadMembers"
            class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
  
        <!-- Estado sin datos pero cargado -->
        <div v-if="!loading && !error && members.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay socios registrados</h3>
          <p class="text-gray-500">La lista está vacía o no se pudo cargar información.</p>
        </div>
  
        <!-- Footer info -->
        <div class="text-center mt-8 text-gray-500 text-sm">
          <p>Club Puntano de Escalada Deportiva • Lista actualizada automáticamente</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { obtenerSocios } from '../services/googleApiSocios'
  
  // Estado reactivo
  const members = ref([])
  const searchTerm = ref('')
  const loading = ref(true)
  const error = ref(null)
  
  // Computed
  const filteredMembers = computed(() => {
    if (!searchTerm.value) {
      return members.value
    }
    
    const term = searchTerm.value.toLowerCase()
    return members.value.filter(member =>
      member.nombre.toLowerCase().includes(term) ||
      member.dni.includes(term)
    )
  })
  
  // Métodos
  const loadMembers = async () => {
    loading.value = true
    error.value = null
    
    try {
      members.value = await obtenerSocios()
    } catch (err) {
      console.error('Error loading members:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Lifecycle - Cargar automáticamente
  onMounted(() => {
    loadMembers()
  })
  </script>
  
  <style scoped>
  /* Usar las clases de Tailwind que ya tienes configuradas */
  .bg-primary {
    background-color: var(--primary-color, #3B82F6);
  }
  
  .bg-secondary {
    background-color: var(--secondary-color, #10B981);
  }
  
  .text-primary {
    color: var(--primary-color, #3B82F6);
  }
  </style>