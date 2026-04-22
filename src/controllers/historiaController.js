const db = require('../config/db');
// 1. Obtener todas las historias
exports.getAllHistorias = async (req, res) => {
    try {
        const sql = `
        SELECT 
        h.id_historia, h.fecha, h.diagnostico, h.tratamiento, h.observaciones, h.estado,
        CONCAT(up.nombre, ' ', up.apellido) AS nombre_paciente,
        CONCAT(um.nombre, ' ', um.apellido) AS nombre_medico
        FROM historia_clinica h
        JOIN paciente p ON h.id_paciente = p.id_paciente
        JOIN usuario up ON p.id_usuario = up.id_usuario
        JOIN medico m ON h.id_medico = m.id_medico
        JOIN usuario um ON m.id_usuario = um.id_usuario
        `;
        const [results] = await db.query(sql);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 2. CREAR HISTORIA CLINICA (POST)
exports.createHistoria =  async (req, res) => {
    const { id_paciente, id_medico, fecha, diagnostico, tratamiento, observaciones, estado } = req.body;
    try {
        const sql = 'INSERT INTO historia_clinica (id_paciente, id_medico, fecha, diagnostico, tratamiento, observaciones, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(sql, [id_paciente, id_medico, fecha, diagnostico, tratamiento, observaciones, estado]);
        res.status(201).json({ mensaje: " Historia clinica creada con exito", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// ACTUALIZAR HISTORIA CLINICA (PUT)
exports.updateHistoria = async (req, res) => {
    const { id_historia } = req.params;
    const { id_paciente, id_medico, fecha, diagnostico, tratamiento, observaciones, estado } = req.body;
    try {
        const sql = 'UPDATE historia_clinica SET id_paciente=?, id_medico=?, fecha=?, diagnostico=?, tratamiento=?, observaciones=?, estado=? WHERE id_historia=?';
        await db.query(sql, [id_paciente, id_medico, fecha, diagnostico, tratamiento, observaciones, estado, id_historia]);
        res.status(200).json({ mensaje: "Historia clinica actualizada con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// ELIMINAR HISTORIA CLINICA (DELETE)
exports.deleteHistoria = async (req, res) => {
    const { id_historia } = req.params;
    try {
        const sql = 'DELETE FROM historia_clinica WHERE id_historia=?';
        await db.query(sql, [id_historia]);
        res.status(200).json({ mensaje: "Historia clinica eliminada con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


