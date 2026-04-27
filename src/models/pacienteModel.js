const db = require('../config/db');
const Paciente = {
    // Obtener todos los pacientes
    obtenerTodos: async () => {
        const [rows] = await db.query('SELECT * FROM paciente');
        return rows;
    },
    // Crear un nuevo paciente con tus columnas exactas
    crear: async (datos) => {
        const { id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono,direccion, estado } = datos;
        const query = 'INSERT INTO paciente (id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado]);
        return result;
    },
    // Buscar por ID especifico
    obtenerPorId: async (id) => {
        const [rows] = await db.query('SELECT * FROM paciente WHERE id_paciente = ?', [id]);
        return rows[0];
    }
};
module. exports = Paciente