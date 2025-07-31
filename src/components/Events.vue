<template>
  <section class="py-20 bg-[#b9442d]">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Título de la sección -->
      <h2 class="text-3xl font-bold mb-8 text-center text-white italic">
        PRÓXIMO EVENTO:
      </h2>
      
      <!-- Loading state -->
      <div v-if="loading" class="text-center text-white">
        <p class="text-xl">Cargando eventos...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center text-white">
        <p class="text-xl">Error al cargar eventos</p>
        <p class="text-sm mt-2">{{ error }}</p>
      </div>
      
      <!-- Eventos -->
      <div v-else-if="upcomingEvents.length > 0" class="relative">
        <!-- Container del carousel -->
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentEventIndex * 100}%)` }"
          >
            <!-- Eventos con v-for -->
            <div
              v-for="(event, index) in upcomingEvents"
              :key="event.id"
              class="w-full flex-shrink-0 px-4"
            >
              <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 mx-auto max-w-2xl">
                <!-- Versión Desktop -->
                <div class="hidden md:block text-center">
                  <div class="text-xl font-semibold text-gray-800 mb-2">
                    {{ formatEventDate(event.date) }} {{ event.time }}
                  </div>
                  <div class="text-2xl font-bold text-[#EB5032] mb-3">
                    {{ event.title }}
                  </div>
                  <div class="text-gray-600">
                    <span class="font-medium">Ubicación:</span> {{ event.location }}
                  </div>
                  <a 
                    v-if="event.url" 
                    :href="event.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block mt-4 text-sm text-[#EB5032] font-medium hover:text-[#d63d1e] transition-colors"
                  >
                    Ver más detalles →
                  </a>
                </div>
                
                <!-- Versión Mobile -->
                <div class="md:hidden text-center">
                  <div class="text-lg font-semibold text-gray-800 mb-1">
                    {{ formatEventDate(event.date) }}
                  </div>
                  <div class="text-lg font-semibold text-gray-800 mb-2">
                    {{ event.time }}
                  </div>
                  <div class="text-xl font-bold text-[#EB5032] mb-3">
                    {{ event.title }}
                  </div>
                  <div class="text-gray-600">
                    {{ event.location }}
                  </div>
                  <a 
                    v-if="event.url" 
                    :href="event.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block mt-3 text-sm text-[#EB5032] font-medium hover:text-[#d63d1e] transition-colors"
                  >
                    Ver más →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Indicadores de slides (solo si hay más de un evento) -->
        <div v-if="upcomingEvents.length > 1" class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(event, index) in upcomingEvents"
            :key="index"
            @click="currentEventIndex = index"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentEventIndex ? 'bg-white' : 'bg-white/50'
            ]"
          ></button>
        </div>
        
        <!-- Navegación (solo si hay más de un evento) -->
        <div v-if="upcomingEvents.length > 1" class="absolute inset-y-0 left-0 flex items-center">
          <button
            @click="previousEvent"
            class="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full ml-2 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>
        
        <div v-if="upcomingEvents.length > 1" class="absolute inset-y-0 right-0 flex items-center">
          <button
            @click="nextEvent"
            class="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full mr-2 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mensaje cuando no hay eventos próximos -->
      <div v-else class="text-center text-white">
        <p class="text-xl">No hay eventos programados próximamente</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { obtenerEventosProximos } from '../services/eventsService'

// Estados
const currentEventIndex = ref(0)
const eventsData = ref([])
const loading = ref(true)
const error = ref(null)

// Filtrar eventos que aún no han pasado
const upcomingEvents = computed(() => {
  // Ya vienen filtrados desde el servicio, pero por si acaso:
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  return eventsData.value.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate >= tomorrow
  }).sort((a, b) => new Date(a.date) - new Date(b.date))
})

// Cargar eventos desde Supabase
const cargarEventos = async () => {
  try {
    loading.value = true
    error.value = null
    
    const eventos = await obtenerEventosProximos()
    eventsData.value = eventos
    
  } catch (err) {
    error.value = err.message
    console.error('Error al cargar eventos:', err)
  } finally {
    loading.value = false
  }
}

// Formatear fecha para mostrar
const formatEventDate = (dateString) => {
  const date = new Date(dateString)
  const days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO']
  const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
  
  const dayName = days[date.getDay()]
  const dayNumber = date.getDate()
  const monthName = months[date.getMonth()]
  
  return `${dayName} ${dayNumber} ${monthName}`
}

// Navegación entre eventos
const nextEvent = () => {
  currentEventIndex.value = (currentEventIndex.value + 1) % upcomingEvents.value.length
}

const previousEvent = () => {
  currentEventIndex.value = currentEventIndex.value === 0 
    ? upcomingEvents.value.length - 1 
    : currentEventIndex.value - 1
}

// Auto-slide cada 5 segundos
let autoSlideInterval = null

const startAutoSlide = () => {
  if (upcomingEvents.value.length > 1) {
    autoSlideInterval = setInterval(() => {
      nextEvent()
    }, 5000)
  }
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

// Lifecycle hooks
onMounted(async () => {
  await cargarEventos()
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
/* Los estilos de transición ya están en las clases de Tailwind */
</style>