import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    });

    
axiosClient.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("No autorizado, redirigiendo al login...");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export default axiosClient;
    