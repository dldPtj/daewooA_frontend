import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPersistedState) // ✅ 플러그인 등록

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')