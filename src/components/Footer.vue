<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Column 1: Dirección del Muro -->
      <div>
        <h3 class="text-xl font-bold mb-4 font-first">Dirección del Muro:</h3>
        <a
          href="https://maps.app.goo.gl/CVhZK1KPvURJhrLk7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p class="font-secondary cursor-pointer underline">
            Riobamba 1537, San Luis, Argentina.
          </p>
        </a>
      </div>

      <!-- Column 2: Contacto -->
      <div>
        <h3 class="text-xl font-bold mb-4">Contacto</h3>
        <p class="text-sm font-secondary">Cel:<br>+54 9 2664 48-9276 ( Presidente )</p>
        <p class="text-sm font-secondary">Email:<br> clubescaladasanluis@gmail.com</p>
      </div>

      <!-- Column 3: Síguenos -->
      <div>
        <h3 class="text-xl font-bold mb-4 font-first">Síguenos</h3>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-blue-500 font-secondary">Facebook</a>
          <a href="#" class="hover:text-blue-500 font-secondary">Instagram</a>
        </div>
      </div>

      <!-- Column 4: Mapa de Sitio -->
      <div>
        <h3 class="text-xl font-bold mb-4 font-first">Mapa de Sitio</h3>
        <ul class="space-y-2">
          <li>
            <a href="#" class="hover:text-blue-500 font-secondary">Seguros y Seguridad</a>
          </li>
          <li>
            <a href="#" class="hover:text-blue-500 font-secondary">Socios y Muro</a>
          </li>
          <li>
            <a href="#" class="hover:text-blue-500 font-secondary">Clases</a>
          </li>
          <li>
            <router-link
             to="/login"
             class="hover:text-blue-500 font-secondary">Administradores
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No need for additional logic here
</script>