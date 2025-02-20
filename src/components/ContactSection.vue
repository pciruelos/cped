<template>
    <section class="py-20 bg-[#EB5032] text-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-8">Contactanos</h2>
        <form class="max-w-2xl mx-auto">
          <div class="mb-4">
            <label class="block text-white" for="name">Name</label>
            <input type="text" id="name" class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-white" for="email">Email</label>
            <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-white" for="message">Message</label>
            <textarea id="message" class="w-full px-4 py-2 border rounded-lg" rows="5"></textarea>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  // No need for additional logic here
  </script>