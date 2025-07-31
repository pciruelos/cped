// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../data/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  // Computeds
  const isAuthenticated = computed(() => !!user.value)

  // Inicializar el estado de autenticación
  const initAuth = async () => {
    try {
      // Obtener sesión actual
      const { data: { session } } = await supabase.auth.getSession()
      user.value = session?.user || null
      
      // Escuchar cambios en el estado de autenticación
      supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
    } finally {
      loading.value = false
    }
  }

  // Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  }

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  return {
    user,
    loading,
    isAuthenticated,
    initAuth,
    login,
    logout
  }
})