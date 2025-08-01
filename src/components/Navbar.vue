<template>
  <nav class="bg-white shadow-lg fixed md:static top-0 left-0 right-0 z-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-2">
        <!-- Mobile: Menu hamburguesa (izquierda) -->
        <button @click="toggleMenu" class="md:hidden text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <!-- Logo (centrado en mobile, izquierda en desktop) -->
        <router-link to="/" class="flex items-center space-x-2 md:flex-1">
          <img src="../assets/Pics/simbolo.png" alt="Logo" class="h-18 w-18" />
          <!-- Texto solo visible en desktop -->
          <span class="hidden md:block text-2xl font-bold text-gray-800">
            Club Puntano de Escalada Deportiva
          </span>
        </router-link>

        <!-- Mobile: Lupa (derecha) -->
        <button class="md:hidden text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-4 items-center">
          <router-link to="/" class="text-gray-800 hover:text-blue-500 font-first">Inicio</router-link>
          <router-link to="/about" class="text-gray-800 hover:text-blue-500 font-first">Acerca</router-link>
          <router-link to="/blog" class="text-gray-800 hover:text-blue-500 font-first">Blog y Novedades</router-link>
          <router-link to="/partners" class="text-gray-800 hover:text-blue-500 font-first">Socios y Muro</router-link>
          <router-link to="/clases" class="text-gray-800 hover:text-blue-500 font-first">Clases y Horarios</router-link>
          <router-link to="/comunidad" class="text-gray-800 hover:text-blue-500 font-first">Comunidad</router-link>
          <router-link to="/contact" class="text-gray-800 hover:text-blue-500 font-first">Contacto</router-link>
          
          <!-- Lupa en desktop -->
          <button class="text-gray-800 hover:text-blue-500 focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <!-- Logout button (solo si hay usuario autenticado) -->
          <button 
            v-if="authStore.isAuthenticated"
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50 text-sm"
          >
            {{ isLoggingOut ? 'Saliendo...' : 'Logout' }}
          </button>
        </div>
      </div>
      <Transition
        enter-active-class="transition-all duration-700 ease-out"
        leave-active-class="transition-all duration-700 ease-in"
        enter-from-class="opacity-0 max-h-0 transform -translate-y-2"
        enter-to-class="opacity-100 max-h-96 transform translate-y-0"
        leave-from-class="opacity-100 max-h-96 transform translate-y-0"
        leave-to-class="opacity-0 max-h-0 transform -translate-y-2"
      >
      <!-- Mobile Menu (Collapsible) -->
      <div v-if="isMenuOpen" @click="handleMenuClick" class="md:hidden">
        <router-link to="/" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Inicio</router-link>
        <router-link to="/about" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Acerca</router-link>
        <router-link to="/blog" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Blog y Novedades</router-link>
        <router-link to="/partners" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Socios y Muro</router-link>
        <router-link to="/clases" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Clases y Horarios</router-link>
        <router-link to="/comunidad" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Comunidad</router-link>
        <router-link to="/contact" class="block py-4 text-gray-800 hover:text-blue-500 font-first text-xl">Contacto</router-link>
        
        <!-- Logout en mobile (solo si hay usuario autenticado) -->
        <button 
          v-if="authStore.isAuthenticated"
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="block w-full text-left py-4 text-red-600 hover:text-red-700 font-first text-xl disabled:opacity-50"
        >
          {{ isLoggingOut ? 'Cerrando sesión...' : 'Logout' }}
        </button>
      </div>
    </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isMenuOpen = ref(false)
const isLoggingOut = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleMenuClick = (event) => {
  if (event.target.closest('a')) {
    isMenuOpen.value = false
  }
}

const handleLogout = async () => {
  if (isLoggingOut.value) return
  
  try {
    isLoggingOut.value = true
    await authStore.logout()
    isMenuOpen.value = false // Cerrar menu mobile si está abierto
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>