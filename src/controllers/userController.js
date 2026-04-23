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
 //2. Funcion para crear un nuevo usuario, paciente, medico (POST)  
 const createUser = async (req, res)  => {
   //Recibimos los datos del JSON de Thunder Client
   //Incluimos tambien los datos que iran a la tabla PACIENTE y MEDICO
        const {
    tipo_usuario, nombre, apellido, documento,correo, password,
    telefono, direccion, fecha_nacimiento, sexo, especialidad, tarjeta_profecional, años_experiencia,id_especialista
        } = req.body;
        try {
            // A. Insertamos primero en la tabla USUARIO
            const queryUser = 'INSERT INTO usuario (tipo_usuario, nombre, apellido, documento, correo, password) VALUES (?, ?, ?, ?, ?, ?)';
            const [resultUser] = await db.query(queryUser, [tipo_usuario, nombre, apellido, documento, correo, password]);
            const newUserId = resultUser.insertId;
            // B. Si es paciente, lo guardamos automaticamente en la tabla PACIENTE
            if (tipo_usuario === 'paciente') {
                const queryPaciente = 'INSERT INTO paciente (id_usuario, telefono, direccion, fecha_nacimiento, sexo, estado) VALUES (?, ?, ?, ?, ?, ?)';
                await db.query(queryPaciente, [newUserId, telefono, direccion, fecha_nacimiento, sexo, 'activo']);
            }
            // Si es medico lo guardamos en la tabla MEDICO
            else if (tipo_usuario === 'medico') {
                const queryMedico = 'INSERT INTO medico (id_usuario, id_especialista, numero_licencia, años_experiencia, estado) VALUES (?, ?, ?, ?, ?)';
                await db.query(queryMedico, [
                    newUserId,
                    id_especialista || 1,
                    tarjeta_profecional || '000-AAA',
                    años_experiencia || 5,
                    'activo'
                ]);
            }
            res.status(201).json({ mensaje: `Usuario tipo ${tipo_usuario} creados con exito`,
                id_usuario: newUserId});
            
        } catch (err) {
            console.error('Error en el registro:',);
            res.status(500).json({ error: 'No se pudo completar el registro: ' + err.message});
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