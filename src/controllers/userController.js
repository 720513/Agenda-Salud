const db = require('../config/db');
// 1. Usamos async para poder usar await
exports.getAllUsers = async (req, res) => {
    try{
        // con promesas ya no usamo (err, results), usamos await
        const [results] = await db.query('SELECT * FROM usuario');
        res.json(results);
    }catch (err) {
        console.error('Eroor en la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};
 //2. Funcion para crear un nuevo usuario (POST)  
 exports.createUser = async (req, res)  => {
   //Recibimos los datos que vienen del frontend o de la prueba
   const { tipo_usuario, nombre, apellido, documento, correo, password  } = req.body;
   try {
    // La consulta SQL exacta
      const query = 'INSERT INTO usuario (tipo_usario, nombre, apellido, documento, correo, password) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await db.query(query, [tipo_usuario, nombre, apellido, documento, correo, password]);
      res.status(201).json({
        mensaje: '¡Usuario guardado con exito!',
        id: result.insertId
      });
 } catch (err) {
    console.error('ERROR EN MySQL:', err.message);
    res.status(500).json({ error: ' No se pudo guardar el usuario' });
 }
 };