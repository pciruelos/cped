<template>
  <div>
    <h1 class="text-4xl font-bold text-center my-8">Todas las Novedades</h1>
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="post in posts" :key="post.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4">{{ post.description }}</p>
          <div class="text-sm text-gray-600 mb-4">
            <span>{{ post.date }}</span> · <span>{{ post.author }}</span>
          </div>
          <router-link :to="`/news/${post.id}`" class="text-blue-500 hover:underline">Leer Más</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'Novedad 1',
    description: 'Descripción de la primera novedad.',
    image: 'https://via.placeholder.com/400x200',
    date: '2023-10-01',
    author: 'Admin',
  },
  {
    id: 2,
    title: 'Novedad 2',
    description: 'Descripción de la segunda novedad.',
    image: 'https://via.placeholder.com/400x200',
    date: '2023-10-05',
    author: 'Admin',
  },
  {
    id: 3,
    title: 'Novedad 3',
    description: 'Descripción de la tercera novedad.',
    image: 'https://via.placeholder.com/400x200',
    date: '2023-10-10',
    author: 'Admin',
  },
  {
    id: 4,
    title: 'Novedad 4',
    description: 'Descripción de la cuarta novedad.',
    image: 'https://via.placeholder.com/400x200',
    date: '2023-10-15',
    author: 'Admin',
  },
  {
    id: 5,
    title: 'Novedad 5',
    description: 'Descripción de la quinta novedad.',
    image: 'https://via.placeholder.com/400x200',
    date: '2023-10-20',
    author: 'Admin',
  },
]
</script>