import axios from "axios";

const publicApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

publicApi.interceptors.request.use((config) => {
  console.log("📤 Enviando a:", config.baseURL + config.url);
  console.log("📦 Data:", config.data);
  return config;
});

export default publicApi;