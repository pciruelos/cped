<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-2">
        <!-- Logo and Brand Name -->
        <router-link to="/" class="flex items-center space-x-2">
          <img src="../assets/Pics/simbolo.png" alt="Logo" class="h-18 w-18" /> <!-- Adjust the logo path and size -->
          <span class="text-2xl font-bold text-gray-800">
            Club Puntano de Escalada Deportiva
          </span>
        </router-link>

        <!-- Hamburger Menu (Mobile) -->
        <button @click="toggleMenu" class="md:hidden text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-4">
          <router-link to="/" class="text-gray-800 hover:text-blue-500">Inicio</router-link>
          <router-link to="/about" class="text-gray-800 hover:text-blue-500">Acerca</router-link>
          <router-link to="/news" class="text-gray-800 hover:text-blue-500">Blog</router-link>
          <router-link to="/partners" class="text-gray-800 hover:text-blue-500">Socios, Muro y Clases</router-link>
          <router-link to="/contact" class="text-gray-800 hover:text-blue-500">Contacto</router-link>
        </div>
      </div>

      <!-- Mobile Menu (Collapsible) -->
      <div v-if="isMenuOpen" class="md:hidden">
        <router-link to="/" class="block py-2 text-gray-800 hover:text-blue-500">Inicio</router-link>
        <router-link to="/about" class="block py-2 text-gray-800 hover:text-blue-500">Acerca</router-link>
        <router-link to="/news" class="block py-2 text-gray-800 hover:text-blue-500">Blog</router-link>
        <router-link to="/partners" class="block py-2 text-gray-800 hover:text-blue-500">Socios, Muro y Clases</router-link>
        <router-link to="/contact" class="block py-2 text-gray-800 hover:text-blue-500">Contacto</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>