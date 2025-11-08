import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './models/db.js';
import tareasRoutes from './routes/auth.js';  // 👈 usa el archivo que ya tienes
/* eslint-env node */

const app = express();
const port = process.env.PORT || 5000;

// Conexión a la base de datos MongoDB
await connectDB();

// Middleware para habilitar CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://elegant-kringle-6c2dbc.netlify.app/'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(cookieParser());

// ✅ Monta tus rutas de tareas
app.use('/api', tareasRoutes);

// ✅ Ruta raíz para comprobar funcionamiento
app.get('/', (req, res) => {
  res.send('🚀 Backend del proyecto integrador funcionando correctamente');
});

// ✅ Inicia servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en el puerto ${port}`);
});
