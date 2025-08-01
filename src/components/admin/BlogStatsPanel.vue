<!-- BlogStatsPanel.vue -->
<template>
    <div class="bg-white p-4 rounded-xl shadow-lg">
      <div class="text-sm text-gray-600 text-center space-x-6">
        <span>Total: <strong class="text-[#EB5032]">{{ total }}</strong> posts</span>
        <span>•</span>
        <span>Destacados: <strong class="text-green-600">{{ destacados }}</strong></span>
        <span>•</span>
        <span>Importantes: <strong class="text-red-600">{{ importantes }}</strong></span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    total: {
      type: Number,
      default: 0
    },
    destacados: {
      type: Number,
      default: 0
    },
    importantes: {
      type: Number,
      default: 0
    }
  })
  </script>