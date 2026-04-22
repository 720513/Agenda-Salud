const db = require('../config/db');
// Obtener todos los medicos
exports.getAllMedicos = async (req, res) => {
        try {
            const [results] = await db.query('SELECT * FROM medico');
            res.json(results);
        } catch (err) {
            console.log("Error al consultar medicos:", err.message);
            res.status(500).json({ error: err.message });
        }
};
        
// Crear un nuevo medico
exports.createMedico =  async (req, res) => {
    try{
    const { id_usuario, id_especialista, numero_licencia, años_experiencia, estado } = req.body;
    const query = 'INSERT INTO medico (id_usuario, id_especialista, numero_licencia, años_experiencia, estado) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [id_usuario, id_especialista, numero_licencia, años_experiencia, estado]);
        res.json ({ mensaje: 'Medico creado exitosamente', id: result.insertId});
    } catch (err) {
        console.log("Error en POST:", err.message);
        res.status(500).json({ error: err.message});
    }
};
// Actualizar un medico
exports.updateMedico = async (req, res) => {
    try {
    const { id_medico } = req.params;
    const { id_usuario, id_especialista, numero_licencia, años_experiencia, estado } = req.body;
    const query = 'UPDATE medico SET id_usuario=?, id_especialista=?, numero_licencia=?, años_experiencia=?, estado=? WHERE id_medico=?';
    await db.query(query, [id_usuario, id_especialista, numero_licencia, años_experiencia, estado, id_medico]);
        res.json({ mensaje: 'Medico actualizado con exito' });
    } catch (err) {
        console.log("Error en PUT:", err.message);
        res.status(500).json({ error: err.massage });
    }
};
// Eliminar un medico
exports.deleteMedico = async (req, res) => {
      try {
         const { id_medico } = req.params;
         await db.query(`DELETE FROM medico WHERE id_medico = ?`, [id_medico]);
         res.json({ mensaje: 'Medico eliminado con exito' });
      } catch (err) {
          console.log("Error en DELETE:", err.message);
          res.status(500).json({ error: err.message});
    }
};       














