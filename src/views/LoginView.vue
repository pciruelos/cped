<template>
  <section class="min-h-[calc(100vh-348px)] flex items-center justify-center bg-[#0F2332] px-4">
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h1>

      <div class="mb-4">
        <label for="email" class="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input 
          v-model="email" 
          type="email" 
          id="email" 
          required 
          :disabled="isLoading"
          class="w-full px-4 py-2 border rounded-lg disabled:opacity-50" 
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
        <input 
          v-model="password" 
          type="password" 
          id="password" 
          required 
          :disabled="isLoading"
          class="w-full px-4 py-2 border rounded-lg disabled:opacity-50" 
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full bg-[#EB5032] text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
      >
        {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
      </button>

      <p v-if="errorMsg" class="mt-4 text-sm text-red-600 text-center">{{ errorMsg }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    errorMsg.value = ''
    
    await authStore.login(email.value, password.value)
    
    // El router guard se encargará de redirigir al panel
    router.push('/panel')
  } catch (error) {
    console.error('Login error:', error)
    errorMsg.value = error.message || 'Email o contraseña incorrectos'
  } finally {
    isLoading.value = false
  }
}
</script>