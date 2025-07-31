<template>
    <div>
      <section class="py-20 bg-gray-100">
        <div class="max-w-6xl mx-auto px-4">
          <h1 class="text-4xl font-bold text-center mb-8">Clases y Horarios</h1>
          <h2 class="mb-8">En esta sección encontrarás toda la información sobre las clases de escalada: horarios, niveles, edades, profesores,
             reglas, precios y más. No es necesario <router-link to="/partners" class="cursor-pointer underline hover:cursor-pointer">ser socio</router-link> del Club Puntano de Escalada Deportiva para tomar clases,
              aunque serlo brinda muchos beneficios adicionales, como el <router-link to="/partners" class="cursor-pointer underline hover:cursor-pointer">uso libre del muro</router-link> y acceso a todas las instalaciones.
               Tené en cuenta que el pago de las clases solo incluye el uso del muro durante ese horario.</h2>
          
          <!-- Horarios de Clases -->
          <div class="mb-12">
            <h3 class="text-3xl font-bold text-center mb-8">HORARIOS CLASES:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <!-- Juan -->
              <div class="bg-primary text-white p-6 rounded-lg shadow-lg">
                <h4 class="text-2xl font-bold mb-2">Juan Guevara</h4>
                <p class="text-sm mb-4">tel: <a href="tel:+542664489276" class="hover:underline">2664 489276</a></p>
                <div class="space-y-3">
                  <div>
                    <p class="font-semibold">Martes y Jueves</p>
                    <p class="text-lg">18 a 19hs</p>
                    <p class="text-sm">Niños 6-7-8 Años</p>
                  </div>
                  <div>
                    <p class="text-lg">19 a 20hs</p>
                    <p class="text-sm">9-10-11 Años</p>
                  </div>
                </div>
              </div>

              <!-- Mariana Hello -->
              <div class="bg-secondary text-white p-6 rounded-lg shadow-lg">
                <h4 class="text-2xl font-bold mb-2">Mariana Hello</h4>
                <p class="text-sm mb-4">tel: <a href="tel:+542664511873" class="hover:underline">2664 511873</a></p>
                <div>
                  <p class="font-semibold">Lunes y Miércoles</p>
                  <p class="text-lg">18:30 a 20:30hs</p>
                  <p class="text-sm">Juveniles y Adultos +11 Años</p>
                </div>
              </div>

              <!-- Mauri Ho -->
              <div class="bg-primary text-white p-6 rounded-lg shadow-lg">
                <h4 class="text-2xl font-bold mb-2">Mauri Ho</h4>
                <p class="text-sm mb-4">tel: <a href="tel:+542664584463" class="hover:underline">2664 584463</a></p>
                <div>
                  <p class="font-semibold">Martes y Jueves</p>
                  <p class="text-lg">20 a 22hs</p>
                  <p class="text-sm">Adultos</p>
                </div>
              </div>

              <!-- Lauti -->
              <div class="bg-secondary text-white p-6 rounded-lg shadow-lg">
                <h4 class="text-2xl font-bold mb-2">Lauti Jofre</h4>
                <p class="text-sm mb-4">tel: <a href="tel:+542665131540" class="hover:underline">2665 131540</a></p>
                <div>
                  <p class="font-semibold">Lunes y Miércoles</p>
                  <p class="text-lg">17:30 a 18:30hs</p>
                  <p class="text-sm">Niños 6 a 10 Años</p>
                </div>
              </div>

              <!-- Joaco Orellano -->
              <div class="bg-primary text-white p-6 rounded-lg shadow-lg">
                <h4 class="text-2xl font-bold mb-2">Joaco Orellano</h4>
                <p class="text-sm mb-4">tel: <a href="tel:+542664362073" class="hover:underline">2664 362073</a></p>
                <div>
                  <p class="font-semibold">Martes y Jueves</p>
                  <p class="text-lg">10:00hs</p>
                  <p class="text-sm">Juveniles y Adultos +11 Años</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Precio -->
          <div class="mb-12">
            <h3 class="text-3xl font-bold text-center mb-4">PRECIO:</h3>
            <p class="text-center text-gray-600 mb-8">
              Todos nuestros profesores cuentan con certificados avalados o en proceso de certificación.
            </p>
            <div class="text-center">
              <p class="text-4xl font-bold mb-6 text-blue-600">$20000 /mes</p>
              <div class="mb-6 space-y-2">
                <p class="text-gray-700">✓ 2 clases por semana</p>
                <p class="text-gray-700">✓ Seguro a cargo del docente</p>
                <p class="text-red-500">✗ No incluye <router-link to="/partners" class="text-red-500 underline hover:cursor-pointer">muro libre</router-link></p>
              </div>
          </div>
            </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  // No need for additional logic here
  </script>