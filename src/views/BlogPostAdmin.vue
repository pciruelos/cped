<!-- BlogAdminView.vue -->
<template>
  <section class="min-h-screen bg-[#F4F4F4] py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <BlogAdminHeader 
        @nuevo-post="abrirFormulario" 
      />

      <!-- Loading -->
      <div v-if="loading" class="bg-white p-8 rounded-xl shadow-lg text-center">
        <p class="text-gray-600">Cargando posts...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 p-6 rounded-xl">
        <p class="text-red-600">Error: {{ error }}</p>
        <button
          @click="cargarPosts"
          class="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Reintentar
        </button>
      </div>

      <!-- Contenido principal -->
      <div v-else class="space-y-8">
        <!-- Panel de estadísticas -->
        <BlogStatsPanel 
          :total="posts.length"
          :destacados="postsDestacados"
          :importantes="postsImportantes"
        />

        <!-- Filtros -->
        <BlogFilterBar 
          v-model:busqueda="filtros.busqueda"
        />

        <!-- Lista de posts -->
        <BlogPostsList 
          :posts="postsFiltrados"
          @editar="editarPost"
          @eliminar="confirmarEliminar"
        />
      </div>

      <!-- Modal de formulario -->
      <BlogPostForm
        v-if="mostrarFormulario"
        :post="postEditando"
        :guardando="guardando"
        @guardar="guardarPost"
        @cerrar="cerrarFormulario"
      />

      <!-- Modal de confirmación para eliminar -->
      <BlogDeleteModal
        v-if="postAEliminar"
        :post="postAEliminar"
        @confirmar="eliminarPost"
        @cancelar="postAEliminar = null"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../data/supabase'
import BlogAdminHeader from '../components/admin/BlogAdminHeader.vue'
import BlogStatsPanel from '../components/admin/BlogStatsPanel.vue'
import BlogFilterBar from '../components/admin/BlogFilterBar.vue'
import BlogPostsList from '../components/admin/BlogPostsList.vue'
import BlogPostForm from '../components/admin/BlogPostForm.vue'
import BlogDeleteModal from '../components/admin/BlogDeleteModal.vue'

const router = useRouter()

// Estados principales
const posts = ref([])
const loading = ref(true)
const error = ref(null)
const mostrarFormulario = ref(false)
const postEditando = ref(null)
const postAEliminar = ref(null)
const guardando = ref(false)

// Filtros
const filtros = ref({
  busqueda: ''
})

// Computeds para estadísticas
const postsDestacados = computed(() => {
  return posts.value.filter(post => post.featured).length
})

const postsImportantes = computed(() => {
  return posts.value.filter(post => post.important).length
})

// Posts filtrados
const postsFiltrados = computed(() => {
  let resultado = posts.value

  if (filtros.value.busqueda) {
    const termino = filtros.value.busqueda.toLowerCase()
    resultado = resultado.filter(post =>
      post.title.toLowerCase().includes(termino) ||
      post.description.toLowerCase().includes(termino)
    )
  }

  return resultado
})

// Funciones principales
const cargarPosts = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    posts.value = data || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const abrirFormulario = () => {
  postEditando.value = null
  mostrarFormulario.value = true
}

const editarPost = (post) => {
  postEditando.value = post
  mostrarFormulario.value = true
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  postEditando.value = null
}

const guardarPost = async (datosPost) => {
  try {
    guardando.value = true

    if (postEditando.value) {
      // Actualizar post existente
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(datosPost)
        .eq('id', postEditando.value.id)

      if (updateError) throw updateError
    } else {
      // Crear nuevo post
      const { data: { session } } = await supabase.auth.getSession()
      
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert([{
          ...datosPost,
          user_id: session.user.id
        }])

      if (insertError) throw insertError
    }

    await cargarPosts()
    cerrarFormulario()

  } catch (err) {
    error.value = err.message
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = (post) => {
  postAEliminar.value = post
}

const eliminarPost = async () => {
  try {
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postAEliminar.value.id)

    if (deleteError) throw deleteError

    await cargarPosts()
    postAEliminar.value = null

  } catch (err) {
    error.value = err.message
  }
}

// Verificar autenticación y cargar datos
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    router.push('/login')
    return
  }
  
  await cargarPosts()
})
</script>