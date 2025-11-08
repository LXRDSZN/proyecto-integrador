import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './models/db.js';
import authRoutes from './routes/auth.js'; // Tus rutas (pueden llamarse como quieras)
/* eslint-env node */
const app = express();
const port = process.env.PORT || 5000;

// 🔗 Conexión a MongoDB
await connectDB();

// 🛡️ Configuración de CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Desarrollo local
      'https://elegant-kringle-6c2dbc.netlify.app' // Tu frontend desplegado
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 🧩 Middlewares
app.use(express.json());
app.use(cookieParser());

// 🧭 Rutas principales
app.use('/api', authRoutes);

// 🧪 Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend del proyecto integrador funcionando correctamente');
});

// ▶️ Inicia el servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en el puerto ${port}`);
});
