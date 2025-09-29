import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('에러가 발생하였습니다:');
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
