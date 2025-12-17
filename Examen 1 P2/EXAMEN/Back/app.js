//librerias necesarias
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { dbConnect, sequelize } from './src/config/database.js';

import equipoRoute from './src/routes/equipoRoute.js';
import jugadorRoute from './src/routes/jugadorRoute.js';



//inicializar la app
const app = express();
app.use(cors());
app.use(express.json());

// Log simple de peticiones (incluye body para ayudar a depurar PUT/POST)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    if (req.method !== 'GET') console.log('Body:', req.body);
    next();
});

//rutas
// Ruta raíz simple para evitar "Cannot GET /"
app.get('/', (req, res) => {
    res.send('API Backend Sistema Equipos y Jugadores funcionando');
});

app.use('/api/equipos', equipoRoute);
app.use('/api/jugadores', jugadorRoute);



//conexion a la base de datos
dbConnect();
sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});

//puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
