<!-- BlogFilterBar.vue -->
<template>
  <div class="bg-white p-4 rounded-xl shadow-lg">
    <div class="max-w-md mx-auto">
      <label class="block text-sm font-medium text-gray-700 mb-2">Buscar posts</label>
      <input
        :value="busqueda"
        @input="$emit('update:busqueda', $event.target.value)"
        type="text"
        placeholder="🔍 Buscar en título y descripción..."
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
    </div>
    
    <div v-if="busqueda" class="mt-3 text-sm text-gray-500 text-center">
      Mostrando resultados para: "<strong>{{ busqueda }}</strong>"
      <button
        @click="limpiarFiltro"
        class="ml-2 text-blue-500 hover:text-blue-700 underline"
      >
        Limpiar búsqueda
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  busqueda: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:busqueda'])

const limpiarFiltro = () => {
  emit('update:busqueda', '')
}
</script>