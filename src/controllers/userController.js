const db = require('../config/db');
// 1. OBTENER TODOS LOS USUARIOS (GET)
const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};
 //2. Funcion para crear un nuevo usuario (POST)  
 const createUser = async (req, res)  => {
   //Recibimos los datos que vienen del frontend o de la prueba
     try {
         const { tipo_usuario, nombre, apellido, documento, correo, password  } = req.body;
        // La consulta SQL exacta
      const query = 'INSERT INTO usuario (tipo_usuario, nombre, apellido, documento, correo, password) VALUES (?, ?, ?, ?, ?, ?)';
      await db.query(query, [tipo_usuario, nombre, apellido, documento, correo, password]);
      res.json({ mensaje: '¡Usuario guardado con exito!'});
 } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' No se pudo guardar el usuario' });
   }
 };
 // funcion para actualizar un usuario (PUT)
 const actualizarUsuario = async (req, res) => {
    try {
        const {id_usuario} = req.params;
        const { tipo_usuario, nombre, apellido, documento, correo, password} = req.body;
        const query = 'UPDATE usuario SET tipo_usuario = ?, nombre =?, apellido =?, documento =?, correo =?, password =? WHERE id_usuario = ?';
        await db.query(query,[tipo_usuario, nombre, apellido, documento, correo, password, id_usuario]);
        res.json({ mensaje: 'usuario actualizado con exito'});
    } catch (err) {
        console.error(err);
        res .status(500).json({ error: 'No se pudo actualizar el usuario'});
    }
  };
  // funcion para eliminar un usuario (DELETE)
 const deleteUser = async (req, res) => {
     try {
          const { id_usuario} = req.params;
          const query = 'DELETE FROM usuario WHERE id_usuario = ?';
           await db.query(query, [id_usuario]);         
          res.json({ mensaje: 'Usuario eliminado correctamenta'});
     } catch (err) {
            console.error(err);
        res.status(500).json({ error: 'No se pudo eliminar el usuario'});
     }
};
module.exports = {
    actualizarUsuario,
    deleteUser,
    getAllUsers,
    createUser
};