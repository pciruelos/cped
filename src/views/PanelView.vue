<!-- src/views/PanelView.vue -->
<template>
  <section class="min-h-[calc(100vh-348px)] bg-[#F4F4F4] flex items-center justify-center px-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Panel del Administrador</h1>

      <p class="text-gray-600 mb-8">Bienvenido, estás autenticado.</p>

      <div class="grid grid-cols-1 gap-4">
        <router-link
          to="/blog-admin"
          class="bg-[#EB5032] text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition text-center"
          >
          Novedades / Blog: Cargar, Editar y Eliminar
        </router-link>
        <!-- <button class="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition">
          Ver Listado Post
        </button> -->
        <router-link
          to="/events-admin"
          class="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition text-center"
          >
          Eventos: Cargar, Editar y Eliminar
        </router-link>
        <router-link
          to="/socios-list"
          class="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition text-center"
          >
          Lista de Socios
        </router-link>
        <button 
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../data/supabase'

const router = useRouter()
const authStore = useAuthStore()
const isLoggingOut = ref(false)

onMounted(async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    router.push('/login') // redirecciona si no hay sesión activa
  }
})

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await authStore.logout()
    
    // Redirigir al login después del logout exitoso
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    // Opcional: mostrar mensaje de error al usuario
    alert('Error al cerrar sesión. Por favor, intenta de nuevo.')
  } finally {
    isLoggingOut.value = false
  }
}</script>