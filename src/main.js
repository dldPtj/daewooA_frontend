import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPersistedState) // ✅ 플러그인 등록

const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')  // 예: ?token=abc123 일 때

// ✅ 앱 실행 전에 스토리지에 저장
if (token) {
    localStorage.setItem('token', token)
}

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')