const db = require('../config/db');
// 1. Obtener todas las citas (Con JOIN para ver detalles del paciente y medico)
exports.getAllCitas = async (req, res) => {
    try {
        const sql = `
           SELECT
            c.id_cita, c.fecha, c.hora, c.estado, c.motivo,
          CONCAT(up.nombre, ' ', up.apellido) AS nombre_paciente,
           CONCAT(um.nombre, ' ',um.apellido) AS nombre_medico
    FROM cita c
    JOIN paciente p ON c.id_paciente = p.id_paciente
    JOIN usuario up ON p.id_usuario = up.id_usuario
    JOIN medico m ON c.id_medico = m.id_medico
    JOIN usuario um ON m.id_usuario = um.id_usuario
    `;
     const [results] = await db.query(sql);
     res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
    // 2. Crear una nueva cita
    exports.createCita = async (req, res) => {
        const { id_paciente, id_medico, fecha, hora, estado, motivo } = req.body;
        try {
            const sql = 'INSERT INTO cita (id_paciente, id_medico, fecha, hora, estado, motivo) VALUES (?, ?, ?, ?, ?, ?)';
            const [result] = await db.query(sql, [id_paciente, id_medico, fecha, hora, estado, motivo]);
            res.status(201).json({ mensaje: "Cita programada con exito", id: result.inserId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    // 3. Actualizar una cita existente
    exports.updateCita = async (req, res) => {
        const {id_cita } = req.params;
        const { id_paciente, id_medico, fecha, hora, estado, motivo } = req.body;
        try {
            const sql = 'UPDATE cita SET id_paciente=?, id_medico=?, fecha=?, hora=?, estado=?, motivo=? WHERE id_cita=?';
            await db.query(sql, [id_paciente, id_medico, fecha, hora, estado, motivo, id_cita]);
            res.status(200).json({ mensaje: "cita actualizada correctamente" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    // 4. Eliminar una cita
    exports.deleteCita = async (req, res) => {
        const { id_cita } = req.params;
        try {
            const sql = 'DELETE FROM cita WHERE id_cita = ?';
            await db.query(sql, [id_cita]);
            res.status(200).json({ mensaje: "Cita eliminada correctamente"});
        }  catch (err) {
                res.status(500).json({ error: err.message });
            }
    };
