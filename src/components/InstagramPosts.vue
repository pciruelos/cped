<template>
    <section class="py-20 bg-[#0F2332] text-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-8">Instagram Posts</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(post, index) in posts" :key="index" class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img :src="post.image" :alt="post.caption" class="w-full h-48 object-cover" />
            <p class="p-4 text-gray-700">{{ post.caption }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const posts = [
    { image: 'https://via.placeholder.com/300', caption: 'Post 1' },
    { image: 'https://via.placeholder.com/300', caption: 'Post 2' },
    { image: 'https://via.placeholder.com/300', caption: 'Post 3' },
    { image: 'https://via.placeholder.com/300', caption: 'Post 4' },
  ]
  </script>