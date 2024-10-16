import axios from 'axios';
import dotenv from 'dotenv';

// Configurar la URL base de la API

// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = import.meta.env.PUBLIC_API_URL;

// Interceptor para agregar el token a cada solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejar errores de autenticación
      console.error('No autorizado. Redirigir a la página de inicio de sesión');
    }
    return Promise.reject(error);
  }
);

export default axios;
