<template>
    <section class="md:py-20 py-2 bg-[#EB5032]">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-left md:text-center md:mb-8 text-white font-first md:pl-0">
          Quines Somos:
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2 mb-12">
          <div>
            <h3 class="text-2xl font-bold mb-4 text-left md:text text-white pt-3">Misión</h3>
            <p class="text-white font-secondary">En nuestro club, promovemos la escalada deportiva como una disciplina accesible para todos, fomentando el amor por la montaña y el respeto por el medio ambiente. Nos dedicamos a brindar clases y entrenamientos de calidad, impulsando el crecimiento deportivo y personal de cada miembro, desde principiantes hasta atletas de alto rendimiento. A través de una comunidad inclusiva y apasionada, buscamos inspirar un estilo de vida activo, saludable y en conexión con la naturaleza.

</p>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-4 text-left md:text text-white">Visión</h3>
            <p class="text-white font-secondary">Ser un referente en la escalada deportiva, reconocido por nuestra formación integral de deportistas y el compromiso con el desarrollo sostenible del entorno natural. Aspiramos a crear un espacio donde cada persona pueda desafiar sus límites, encontrar su pasión y alcanzar su máximo potencial, promoviendo valores de esfuerzo, superación y compañerismo. Queremos ser un motor de crecimiento para la comunidad de escalada, impulsando el deporte a nivel local y profesional.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div v-for="(member, index) in members" :key="index" class="bg-white shadow-lg rounded-lg p-6 text-center">
            <img :src="member.image" :alt="member.name" class="w-24 h-24 mx-auto rounded-full mb-4" />
            <h3 class="text-xl font-bold">{{ member.name }}</h3>
            <p class="text-white">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const members = [
    { name: 'Juan Guevara', role: 'Presidente', image: 'https://avatar.iran.liara.run/public/41' },
    { name: 'Facundo Loker', role: 'Secretario', image: 'https://avatar.iran.liara.run/public/19' },
    { name: 'Alejandra Sepiurka', role: 'Tesorera', image: 'https://avatar.iran.liara.run/public/63' },
    { name: 'Pablo Ciruelos', role: 'Vocal 1', image: 'https://avatar.iran.liara.run/public/13' },
    { name: 'Juan Zarate', role: 'Vocal 2', image: 'https://avatar.iran.liara.run/public/9' },
  ]
  </script>