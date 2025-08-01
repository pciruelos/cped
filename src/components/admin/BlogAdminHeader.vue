<!-- BlogAdminHeader.vue -->
<template>
    <div class="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 class="text-3xl font-bold text-gray-800">Gestión de Blog Posts</h1>
        <div class="flex gap-3">
          <button
            @click="$emit('nuevo-post')"
            class="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            + Nuevo Post
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
  </template>
  
  <script setup>
  defineEmits(['nuevo-post'])
  </script>