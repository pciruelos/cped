import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

//componentes
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import Partners from '../views/Partners.vue'
import Contact from '../views/Contact.vue'
import PostDetail from '../views/PostDetail.vue'
import GraciasView from '../views/gracias.vue'
import LoginView from '../views/LoginView.vue'
import PanelView from '../views/PanelView.vue'
import BlogPostAdmin from '../views/BlogPostAdmin.vue'
import EventsAdmin from '../views/EventsAdmin.vue'
import Clases from '../views/Clases.vue'
import Comunidad from '../views/Comunidad.vue'
import SociosList from '../views/SociosList.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/news', component: News },
  { path: '/partners', component: Partners },
  { path: '/contact', component: Contact },
  { path: '/news/:id', component: PostDetail },
  { path: '/socios-list', component: SociosList },
  { path: '/comunidad', component: Comunidad },
  { path: '/gracias', component: GraciasView },
  { path: '/clases', component: Clases },
  { path: '/login', component: LoginView, meta: { requiresGuest: true } },
  { path: '/panel', component: PanelView,  meta: { requiresAuth: true } },
  { path: '/blog-admin', component: BlogPostAdmin,  meta: { requiresAuth: true } },
  { path: '/events-admin', component: EventsAdmin,  meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard Global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Si la app aún está cargando, esperar
  if (authStore.loading) {
    // Puedes mostrar un loading spinner aquí
    return next()
  }
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const isAuthenticated = authStore.isAuthenticated
  
  if (requiresAuth && !isAuthenticated) {
    // Ruta protegida pero usuario no autenticado
    next('/login')
  } else if (requiresGuest && isAuthenticated) {
    // Usuario autenticado tratando de acceder a login
    next('/panel')
  } else {
    // Todo OK, continuar
    next()
  }
})

export default router