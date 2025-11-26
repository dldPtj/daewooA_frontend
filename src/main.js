import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';

// ✅ Pinia 생성 및 플러그인 등록
const pinia = createPinia();
pinia.use(piniaPersistedState);

// ✅ URL에서 token 파라미터 읽기
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');  // 예: ?token=abc123 일 때

// ✅ 기존 localStorage 토큰 확인
const existingToken = localStorage.getItem('token');

// ✅ 토큰이 URL에 있고, 기존에 저장된 토큰이 없을 때만 저장
if (token && !existingToken) {
    localStorage.setItem('token', token);

    // ✅ URL에서 ?token= 제거 (새로고침 시 다시 저장되지 않게)
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
}

const alive = localStorage.getItem("alive");

if(alive){
    const diff = Date.now() - Number(alive);

    if(diff > 1000 * 60 * 20){
        localStorage.removeItem("token");
    }
}

setInterval(() =>{
    localStorage.setItem("alive", Date.now());},15000);

// ✅ Vue 앱 초기화
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
