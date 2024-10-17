import axios from 'axios';

// Configurar la URL base de la API

// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = import.meta.env.API_URL;
axios.defaults.withCredentials = true;

export default axios;
