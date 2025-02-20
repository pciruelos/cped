import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import Partners from '../views/Partners.vue'
import Contact from '../views/Contact.vue'
import PostDetail from '../views/PostDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/news', component: News },
  { path: '/partners', component: Partners },
  { path: '/contact', component: Contact },
  { path: '/news/:id', component: PostDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router