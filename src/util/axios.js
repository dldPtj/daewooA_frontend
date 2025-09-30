import axios from 'axios'

export const aTeamApi = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

await aTeamApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default aTeamApi