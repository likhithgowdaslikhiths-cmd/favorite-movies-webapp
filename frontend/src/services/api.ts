import axios from "axios";

const api = axios.create({
  baseURL: "https://favorite-movies-webapp-2.onrender.com", // ✅ Use Render backend URL
});

export default api;
