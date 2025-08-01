import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Inicializar autenticación antes de montar la app
// usariamos await pero como no esta soportado usar await fuera de async en el top level simplement usamos then
const authStore = useAuthStore();
authStore.initAuth().then(() => {
  app.mount('#app');
});