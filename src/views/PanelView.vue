<!-- src/views/PanelView.vue -->
<template>
    <section class="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-4">
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
          <button class="bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '../data/supabase'
  
  const router = useRouter()
  
  onMounted(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()
  
    if (!session) {
      router.push('/login') // redirecciona si no hay sesión activa
    }
  })
  </script>
  