<template>
    <div class="max-w-4xl mx-auto px-4 py-12">
      <img :src="post.image" :alt="post.title" class="w-full h-64 object-cover rounded-lg mb-8" />
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <div class="text-sm text-gray-600 mb-8">
        <span>{{ post.date }}</span> · <span>{{ post.author }}</span>
      </div>
      <p class="text-gray-700 leading-relaxed">{{ post.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const post = ref({})
  
  const posts = [
    {
      id: 1,
      title: 'Novedad 1',
      description: 'Descripción detallada de la primera novedad.',
      image: 'https://via.placeholder.com/800x400',
      date: '2023-10-01',
      author: 'Admin',
    },
    {
      id: 2,
      title: 'Novedad 2',
      description: 'Descripción detallada de la segunda novedad.',
      image: 'https://via.placeholder.com/800x400',
      date: '2023-10-05',
      author: 'Admin',
    },
    // Add more posts as needed
  ]
  
  onMounted(() => {
    const postId = parseInt(route.params.id)
    post.value = posts.find(p => p.id === postId) || {}
  })
  </script>