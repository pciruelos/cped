<template>
    <section class="min-h-screen bg-gray-100 py-10 px-4">
      <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Cargar Nueva Novedad</h1>
  
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-semibold">Título</label>
            <input v-model="title" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
  
          <div>
            <label class="block mb-1 font-semibold">Descripción</label>
            <input v-model="description" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
  
          <div>
            <label class="block mb-1 font-semibold">Imagen</label>
            <input type="file" accept="image/*" @change="handleFileUpload" class="w-full" />
            <div v-if="uploading" class="text-sm text-gray-500 mt-1">Subiendo imagen...</div>
            <div v-if="imageUrl" class="text-sm text-green-600 mt-1">Imagen subida correctamente ✅</div>
          </div>
  
          <div>
            <label class="block mb-1 font-semibold">Autor</label>
            <input v-model="author" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
  
          <div>
            <label class="block mb-1 font-semibold">Contenido</label>
            <textarea v-model="content" rows="5" required class="w-full px-4 py-2 border rounded-lg"></textarea>
          </div>
  
          <div class="flex items-center gap-2">
            <input type="checkbox" id="featured" v-model="featured" />
            <label for="featured" class="text-sm">Destacar este post</label>
          </div>
  
          <button
            type="submit"
            class="bg-[#EB5032] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            :disabled="uploading"
          >
            Publicar
          </button>
  
          <p v-if="errorMsg" class="text-red-600 text-sm text-center mt-2">{{ errorMsg }}</p>
          <p v-if="successMsg" class="text-green-600 text-sm text-center mt-2">{{ successMsg }}</p>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '../data/supabase'
  
  const title = ref('')
  const description = ref('')
  const author = ref('')
  const content = ref('')
  const featured = ref(false)
  const imageUrl = ref('')
  const uploading = ref(false)
  
  const errorMsg = ref('')
  const successMsg = ref('')
  const router = useRouter()
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    errorMsg.value = 'Debes estar logueado para subir imágenes'
    return
  }
  
    uploading.value = true
  
    // Generar nombre más simple y seguro
    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExtension}`
  
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file)
  
    if (uploadError) {
      errorMsg.value = 'Error al subir la imagen'
      uploading.value = false
      return
    }
  
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)
  
    imageUrl.value = data.publicUrl
    uploading.value = false
  }
  
  const handleSubmit = async () => {
    errorMsg.value = ''
    successMsg.value = ''
  
    if (!imageUrl.value) {
      errorMsg.value = 'Debes subir una imagen antes de publicar'
      return
    }
  
    const {
      data: { session }
    } = await supabase.auth.getSession()
  
    if (!session) {
      errorMsg.value = 'No estás logueado'
      return
    }
  
    const { user } = session
  
    const { error } = await supabase.from('blog_posts').insert([
      {
        title: title.value,
        description: description.value,
        image: imageUrl.value,
        author: author.value,
        content: content.value,
        featured: featured.value,
        user_id: user.id
      }
    ])
  
    if (error) {
      errorMsg.value = 'Error al guardar el post'
    } else {
      successMsg.value = 'Post guardado correctamente'
      setTimeout(() => {
        router.push('/news')
      }, 500)
    }
  }
  </script>
  