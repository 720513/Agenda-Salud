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
        }
}
// Crear un usuario (para el registro)
create: async (userData) => {
    try {
        const { nombre, apellido, documento, correo, contraseña, tipo_usuario } = userData;
        const [result] = await db. execute(
            'INSER INTO usuario (nombre, apellido, documento, correo, contraseña, tipo_usuario ) VALUES (?, ?, ?, ?)',
            [nombre, apellido, documento, correo, contraseña, tipo_usuario || 'paciente']
        );
        return result.insertId;
    }catch (error) {
       console.error('Error en create user:', error.message);
       throw error;
    }
};
module.exports = User;
