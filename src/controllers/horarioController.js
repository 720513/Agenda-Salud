const db = require('../config/db');
// 1. OBTENER TODOS LOS GET
exports.getAllHorarios = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM horario');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 2. CREAR UN NUEVO HORARIO (POST)
exports.createHorario = async (req, res) => {
    const { id_medico, dia, hora_inicio, hora_fin, estado } = req.body;
    try {
        const sql = 'INSERT INTO horario (id_medico, dia, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(sql, [id_medico, dia, hora_inicio, hora_fin, estado]);
        res.status(201).json({ mensaje: "horario creado exitosamente", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 3. ACTUALIZAR UN HORARIO (PUT)
exports.updateHorario = async (req, res) => {
    const { id_horario } = req.params;
    const { id_medico, dia, hora_inicio, hora_fin, estado } = req.body;
    try {
        const sql = 'UPDATE horario SET id_medico=?, dia=?, hora_inicio=?, hora_fin=?, estado=? WHERE id_horario=?';
        await db.query(sql, [id_medico, dia, hora_inicio, hora_fin, estado, id_horario]);
        res.status(200).json({ mensaje: "Horario actualizado con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 4. ELIMINAR UN HORARIO (DELETE)
exports.deleteHorario = async (req, res) => {
    const { id_horario } = req.params;
    try {
        const sql = 'DELETE FROM horario WHERE id_horario = ?';
        await db.query(sql, [id_horario]);
        res.status(200).json({ mensaje: "Horario eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


