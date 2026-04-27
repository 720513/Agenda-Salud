const db = require('../config/db');
const Medico = {
    // Obtener todos lod medicos
    findAll: async () => {
        try {
            const [rows] = await db.execute('SELECT * FROM medico');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    create: async (datos) => {
        try {
            const [result] = await db.query('INSERT INTO medico SET ?', [datos]);
            return result;
        } catch (error) {
            throw error;
        }
    }
};
module.exports = Medico;

