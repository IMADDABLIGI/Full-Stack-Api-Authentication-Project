import axios from "axios"
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use( // This is the argument that is responsible for intercepting our process of sending requests to check if we have an access token and add it else return an error
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // This is how you pass jwt acces_token we create a authorisation header which can be handled by axios. {Bearer 13%a!sd4ad&3afs#}
        }
        return config
    },
    (errors) => {
        return Promise.reject(errors)
    }
)

export default api