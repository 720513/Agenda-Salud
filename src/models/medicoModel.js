const db = require('../config/db');
const Medico = {
    // Obtener todos los medicos
    obtenerTodos: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM medico');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    // Crear un nuevo medico (INSERT)
    crear: async (datos) => {
        try {
            const { id_usuario, id_especialista, numero_licencia, años_experiencia, estado } = datos;
            const query = `INSERT INTO medico (id_usuario, id_especialista, numero_licencia, años_experiencia, estado) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await db.query(query, [id_usuario, id_especialista, numero_licencia, años_experiencia, estado]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    // Obtener medico por ID
    obtenerPorId: async (id) => {
        try {
            const [rows] = await db.query('SELECT * FROM medico WHERE id_medico = ?', [id]);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    // Actualizar medico (PUT)
    actualizar: async (id, datos) => {
        try {
            const [result] = await db.query('UPDATE medico SET ? WHERE id_medico = ?', [datos, id]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    // Eliminar medico (DELETE)
    eliminar: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM medico WHERE id_medico = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
module.exports = Medico;

