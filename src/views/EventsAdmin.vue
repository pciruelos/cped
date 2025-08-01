<!-- EventsAdminView -->
<template>
    <section class="min-h-screen bg-[#F4F4F4] py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 class="text-3xl font-bold text-gray-800">Gestión de Eventos</h1>
            <div class="flex gap-3">
              <button
                @click="mostrarFormulario = true"
                class="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                + Nuevo Evento
              </button>
              <router-link
                to="/panel"
                class="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Volver al Panel
              </router-link>
            </div>
          </div>
        </div>
  
  
  
        <!-- Loading -->
        <div v-if="loading" class="bg-white p-8 rounded-xl shadow-lg text-center">
          <p class="text-gray-600">Cargando eventos...</p>
        </div>
  
        <!-- Error -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 p-6 rounded-xl">
          <p class="text-red-600">Error: {{ error }}</p>
          <button
            @click="cargarEventos"
            class="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Reintentar
          </button>
        </div>
  
        <!-- Lista de eventos -->
        <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Lista de Eventos</h2>
          </div>
  
          <!-- Tabla Desktop -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
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
                <tr v-for="evento in eventos" :key="evento.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ evento.title }}</div>
                      <div v-if="evento.url" class="text-sm text-blue-500">
                        <a :href="evento.url" target="_blank" class="hover:underline">
                          Ver enlace →
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatearFecha(evento.date) }}</div>
                    <div class="text-sm text-gray-500">{{ evento.time }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ evento.location }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="esEventoProximo(evento.date) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ esEventoProximo(evento.date) ? 'Próximo' : 'Pasado' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="editarEvento(evento)"
                      class="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      @click="confirmarEliminar(evento)"
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
            <div
              v-for="evento in eventos"
              :key="evento.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-gray-900">{{ evento.title }}</h3>
                <span 
                  :class="esEventoProximo(evento.date) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  class="px-2 py-1 text-xs rounded-full"
                >
                  {{ esEventoProximo(evento.date) ? 'Próximo' : 'Pasado' }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-1">
                📅 {{ formatearFecha(evento.date) }} - {{ evento.time }}
              </p>
              <p class="text-sm text-gray-600 mb-3">
                📍 {{ evento.location }}
              </p>
              <div v-if="evento.url" class="mb-3">
                <a :href="evento.url" target="_blank" class="text-sm text-blue-500 hover:underline">
                  Ver enlace →
                </a>
              </div>
              <div class="flex gap-2">
                <button
                  @click="editarEvento(evento)"
                  class="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button
                  @click="confirmarEliminar(evento)"
                  class="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
  
          <!-- Empty state -->
          <div v-if="eventos.length === 0" class="p-8 text-center">
            <p class="text-gray-500 mb-4">No hay eventos creados</p>
            <button
              @click="mostrarFormulario = true"
              class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Crear primer evento
            </button>
          </div>
        </div>
  
        <!-- Estadísticas simples -->
        <div class="bg-white p-4 rounded-xl shadow-lg mt-8">
          <div class="text-sm text-gray-600 text-center space-x-6">
            <span>Total: <strong class="text-[#EB5032]">{{ eventos.length }}</strong> eventos</span>
            <span>•</span>
            <span>Próximos: <strong class="text-green-600">{{ eventosProximos }}</strong></span>
            <span>•</span>
            <span>Pasados: <strong class="text-gray-500">{{ eventosPasados }}</strong></span>
          </div>
        </div>
      </div>
  
      <!-- Modal de confirmación para eliminar -->
      <div
        v-if="eventoAEliminar"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
          <p class="text-gray-600 mb-4">
            ¿Estás seguro de que quieres eliminar el evento "{{ eventoAEliminar.title }}"?
          </p>
          <div class="flex gap-3 justify-end">
            <button
              @click="eventoAEliminar = null"
              class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              @click="eliminarEvento"
              class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal de formulario (crear/editar) -->
      <div
        v-if="mostrarFormulario"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ eventoEditando ? 'Editar Evento' : 'Nuevo Evento' }}
          </h3>
          
          <form @submit.prevent="guardarEvento" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                v-model="formulario.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre del evento"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                v-model="formulario.date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <input
                v-model="formulario.time"
                type="text"
                required
                placeholder="15:00HS"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
              <textarea
                v-model="formulario.location"
                required
                rows="2"
                placeholder="Dirección del evento"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL (opcional)</label>
              <input
                v-model="formulario.url"
                type="url"
                placeholder="https://ejemplo.com"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            
            <div class="flex gap-3 justify-end pt-4">
              <button
                type="button"
                @click="cerrarFormulario"
                class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="guardando"
                class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {{ guardando ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '../data/supabase'
  import { obtenerTodosLosEventos, crearEvento, actualizarEvento, eliminarEvento } from '../services/eventsService'
  
  const router = useRouter()
  
  // Estados
  const eventos = ref([])
  const loading = ref(true)
  const error = ref(null)
  const mostrarFormulario = ref(false)
  const eventoEditando = ref(null)
  const eventoAEliminar = ref(null)
  const guardando = ref(false)
  
  // Formulario
  const formulario = ref({
    title: '',
    date: '',
    time: '',
    location: '',
    url: ''
  })
  
  // Computeds
  const eventosProximos = computed(() => {
    const hoy = new Date()
    return eventos.value.filter(evento => new Date(evento.date) >= hoy).length
  })
  
  const eventosPasados = computed(() => {
    const hoy = new Date()
    return eventos.value.filter(evento => new Date(evento.date) < hoy).length
  })
  
  // Funciones
  const cargarEventos = async () => {
    try {
      loading.value = true
      error.value = null
      eventos.value = await obtenerTodosLosEventos()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const esEventoProximo = (fecha) => {
    return new Date(fecha) >= new Date()
  }
  
  const editarEvento = (evento) => {
    eventoEditando.value = evento
    formulario.value = { ...evento }
    mostrarFormulario.value = true
  }
  
  const cerrarFormulario = () => {
    mostrarFormulario.value = false
    eventoEditando.value = null
    formulario.value = {
      title: '',
      date: '',
      time: '',
      location: '',
      url: ''
    }
  }
  
  const guardarEvento = async () => {
    try {
      guardando.value = true
      
      const datosEvento = {
        title: formulario.value.title,
        date: formulario.value.date,
        time: formulario.value.time,
        location: formulario.value.location,
        url: formulario.value.url || null
      }
      
      if (eventoEditando.value) {
        await actualizarEvento(eventoEditando.value.id, datosEvento)
      } else {
        await crearEvento(datosEvento)
      }
      
      await cargarEventos()
      cerrarFormulario()
      
    } catch (err) {
      error.value = err.message
    } finally {
      guardando.value = false
    }
  }
  
  const confirmarEliminar = (evento) => {
    eventoAEliminar.value = evento
  }
  
  const eliminarEventoConfirmado = async () => {
    try {
      await eliminarEvento(eventoAEliminar.value.id)
      await cargarEventos()
      eventoAEliminar.value = null
    } catch (err) {
      error.value = err.message
    }
  }
  
  // Verificar autenticación
  onMounted(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/login')
      return
    }
    
    await cargarEventos()
  })
  </script>