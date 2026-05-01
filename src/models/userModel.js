const db = require('../config/db');
const User = {
    //Buscar un usuario por el email para (login)
    findByEmail: async (correo) => {
        try {
            //Usamos "usuario" en singular porque asi aparece en phpMyAdmin
            const [rows] = await db.execute('SELECT *FROM usuario WHERE correo = ?', [correo]);
            return rows[0];
         } catch (error) {
                console.error('Error en findByEmail:', error.message);
                throw error;
        }
    },

// Crear un usuario (para el registro)
create: async (userData) => {
    try {
        const { nombre, apellido, documento, correo, password, tipo_usuario } = userData;
        const sql = 'INSERT INTO usuario (nombre, apellido, documento, correo, password, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db. execute(sql, [nombre, apellido, documento, correo, password, tipo_usuario || 'paciente']);
        return result.insertId;
    } catch (error) {
       throw error;
    }
},
// Obtener todos los usuarios
findAll: async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM usuario');
        return rows;
    } catch (error) {
        console.error('Error en findAll:',  error.message);
        throw error;
    }
},

    update: async (id, userData) => {
        try {
            const query = 'UPDATE usuario SET ? WHERE id_usuario = ?';
            const [result] = await db.query(query, [userData, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
    

module.exports = User;
