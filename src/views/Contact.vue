<template>
    <section class="py-30 bg-[#EB5032] text-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-8">Contactanos</h2>
        <form
          ref="contactForm"
          class="max-w-2xl mx-auto"
          action="https://formspree.io/f/xeogrvbp"
          method="POST"
          @submit="handleSubmit"
        >
          <input type="hidden" name="_subject" value="MAIL DESDE WEBSITE" />
          <input type="hidden" name="_redirect" value="https://cped.org/gracias" />
  
          <div class="mb-4">
            <label class="block text-white" for="name">Nombre</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-white" for="email">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-white" for="message">Mensaje</label>
            <textarea
              v-model="form.message"
              id="message"
              name="message"
              rows="5"
              required
              class="w-full px-4 py-2 border rounded-lg text-black"
            ></textarea>
          </div>
  
          <button
            type="submit"
            class="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const contactForm = ref(null)
  
  const form = ref({
    name: '',
    email: '',
    message: '',
  })
  
  const handleSubmit = () => {
    // Esperamos 100ms para que el formulario se envíe, y luego limpiamos
    setTimeout(() => {
      form.value.name = ''
      form.value.email = ''
      form.value.message = ''
    }, 100)
  }
  </script>
  