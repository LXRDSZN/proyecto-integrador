import axios from 'axios';

// Detecta automáticamente si estás en desarrollo o producción
const baseURL = import.meta.env.PROD
  ? 'https://proyecto-integrador-hibe.onrender.com/api' 
  : 'http://localhost:5000/api'; 

// Crear instancia de Axios con la configuración base
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
