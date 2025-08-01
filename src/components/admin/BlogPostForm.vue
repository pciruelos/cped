<!-- BlogPostForm.vue -->
<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ post ? 'Editar Post' : 'Nuevo Post' }}
        </h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              v-model="formulario.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Título del post"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
            <input
              v-model="formulario.description"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción breve del post"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
            
            <!-- Si estamos editando, mostrar imagen actual sin posibilidad de cambiar -->
            <div v-if="post && post.image" class="mb-2">
              <img :src="post.image" alt="Imagen actual" class="h-20 w-20 object-cover rounded-lg">
              <p class="text-sm text-gray-600 mt-1">Imagen actual (no se puede modificar)</p>
            </div>
            
            <!-- Si es nuevo post, permitir subir imagen -->
            <div v-else>
              <input 
                type="file" 
                accept="image/*" 
                @change="handleFileUpload" 
                :disabled="uploading"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <div v-if="uploading" class="text-sm text-blue-500 mt-1 flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
                Subiendo imagen...
              </div>
              
              <div v-if="formulario.image && !uploading" class="mt-2">
                <img :src="formulario.image" alt="Preview" class="h-20 w-20 object-cover rounded-lg">
                <p class="text-sm text-green-600 mt-1">✅ Imagen lista</p>
              </div>
              
              <p class="text-sm text-gray-500 mt-1">
                * La imagen es requerida para posts nuevos
              </p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
            <input
              v-model="formulario.author"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nombre del autor"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
            <textarea
              v-model="formulario.content"
              rows="6"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contenido completo del post..."
            ></textarea>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="featured" 
                v-model="formulario.featured"
                class="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label for="featured" class="text-sm text-gray-700">
                ⭐️ Destacar este post (aparecerá en la sección de blog como destacado)
              </label>
            </div>
  
            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="important" 
                v-model="formulario.important"
                class="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label for="important" class="text-sm text-gray-700">
                📌 Marcar como importante (aparecerá en la portada del sitio)
              </label>
            </div>
          </div>
          
          <div v-if="errorMsg" class="bg-red-50 border border-red-200 p-3 rounded-lg">
            <p class="text-red-600 text-sm">{{ errorMsg }}</p>
          </div>
          
          <div class="flex gap-3 justify-end pt-4">
            <button
              type="button"
              @click="$emit('cerrar')"
              class="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              :disabled="guardando || uploading"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="guardando || uploading || (!post && !formulario.image)"
              class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ guardando ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue'
  import { supabase } from '../../data/supabase'
  
  const props = defineProps({
    post: {
      type: Object,
      default: null
    },
    guardando: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['guardar', 'cerrar'])
  
  const uploading = ref(false)
  const errorMsg = ref('')
  
  const formulario = reactive({
    title: '',
    description: '',
    image: '',
    author: '',
    content: '',
    featured: false,
    important: false
  })
  
  // Cargar datos del post si estamos editando
  watch(() => props.post, (newPost) => {
    if (newPost) {
      Object.assign(formulario, {
        title: newPost.title || '',
        description: newPost.description || '',
        image: newPost.image || '',
        author: newPost.author || '',
        content: newPost.content || '',
        featured: newPost.featured || false,
        important: newPost.important || false
      })
    } else {
      // Limpiar formulario para nuevo post
      Object.assign(formulario, {
        title: '',
        description: '',
        image: '',
        author: '',
        content: '',
        featured: false,
        important: false
      })
    }
  }, { immediate: true })
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
  
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      errorMsg.value = 'Debes estar logueado para subir imágenes'
      return
    }
  
    uploading.value = true
    errorMsg.value = ''
  
    try {
      // Generar nombre único para el archivo
      const fileExtension = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`
  
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file)
  
      if (uploadError) throw uploadError
  
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)
  
      formulario.image = data.publicUrl
  
    } catch (error) {
      errorMsg.value = 'Error al subir la imagen: ' + error.message
    } finally {
      uploading.value = false
    }
  }
  
  const handleSubmit = () => {
    errorMsg.value = ''
  
    // Validar que tenga imagen solo si es un post nuevo
    if (!props.post && !formulario.image) {
      errorMsg.value = 'Debes subir una imagen para el post'
      return
    }
  
    // Si estamos editando, no incluir la imagen en los datos a actualizar
    const datosAEnviar = {
      title: formulario.title,
      description: formulario.description,
      author: formulario.author,
      content: formulario.content,
      featured: formulario.featured,
      important: formulario.important
    }
  
    // Solo incluir imagen si es un post nuevo
    if (!props.post) {
      datosAEnviar.image = formulario.image
    }
  
    emit('guardar', datosAEnviar)
  }
  </script>