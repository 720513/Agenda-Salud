const db = require('../config/db');
// Obtener todos los especialistas
exports.getAllEspecialistas = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM especialista');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};
// Crear un nuevo especialista
exports.createEspecialista = async (req, res) => {
    try {
        const { nombre_especialidad, descripcion, estado } = req.body;
        const sql = 'INSERT INTO especialista (nombre_especialidad, descripcion, estado) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [nombre_especialidad, descripcion, estado]);
        res.status(201).json({ mensaje: "Especialista creado exitosamente", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};
// Actualizar un especialista
exports.updateEspecialista = async (req, res) => {
    try {
        const { id_especialista } = req.params;
        const { nombre_especialidad, descripcion, estado } = req.body;
        const sql = 'UPDATE especialista SET nombre_especialidad=?, descripcion=?, estado=? WHERE id_especialista=?';
        await db.query(sql, [nombre_especialidad, descripcion, estado, id_especialista]);
        res.status(200).json({ message: "Especialista actualizado con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message  });
    }
};
// Eliminar un especialista
exports.deleteEspecialista = async (req,res) => {
    try {
        const { id_especialista } = req.params;
        await db.query('DELETE FROM especialista WHERE id_especialista = ?', [id_especialista]);
        res.status(200).json({ message: "Especialista eliminado con exito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



