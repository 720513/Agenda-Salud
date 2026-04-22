const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db'); //Importa tus conecciones exitosas
// 1. Middlewares (para que el servidor enteinda JSON)
app.use(cors());
 app.use(express.json());
 app.use(morgan( 'dev'));
 // 2. Todo lo que venga de "/usuarios" lo maneje el archivo de rutas
 app.use('/usuario', require('./routes/userRoutes'));
 app.use('/paciente', require('./routes/pacienteRoutes'));
 app.use('/medico', require('./routes/medicoRoutes'));
 app.use('/especialista', require('./routes/especialistaRoutes'));
 app.use('/horario', require('./routes/horarioRoutes'));
 app.use('/cita', require('./routes/citaRoutes'));
 app.use('/historia', require('./routes/historiaRoutes'));
 // 3. // Ruta de prueba (para confirmar que el servidor responde)
 app.get('/', (req, res) => {
    res.json({ mensaje: "Bienvenido a las API Agenda_Salus" });
 });
 // 4.//Iniciar el servidor
 const PORT = process.env.PORT || 3000;
 app.listen(PORT,() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
 });












