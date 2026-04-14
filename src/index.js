const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db'); //Importa tus conecciones exitosas
// 1. Middlewares (para que el servidor enteinda JSON)
app.use(cors());
 app.use(express.json());
 // 2. Todo lo que venga de "/usuarios" lo maneje el archivo de rutas
 app.use('/usuarios', require('./routes/userRoutes'));
 // 3. // Ruta de prueba (para confirmar que el servidor responde)
 app.get('/', (req, res) => {
    res.json({ mensaje: "Bienvenido a las API Agenda_Salus" });
 });
 // 4.//Iniciar el servidor
 const PORT = process.env.PORT || 3000;
 app.listen(PORT,() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
 });












