const Medico = require('../models/medicoModel');
// Obtener todos los medicos
exports.getAllMedicos = async (req, res) => {
        try {
            const result = await Medico.obtenerTodos();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
};
        
// Crear un nuevo medico
exports.createMedico =  async (req, res) => {
    try{
    const result = await Medico.crear(req.body);
        res.status(201).json({ mensaje: '¡Medico guardado con exito!', id: result.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar el medico', error: error.message});
    }
};
// Obtener medico por ID
exports.getMedicoById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Medico.obtenerPorId(id);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ mensaje: 'Medico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};
    // Actualizar un medico
exports.updateMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Medico.actualizar(id, req.body);
        if (result.affectedRows > 0) {
        res.status(200).json({ mensaje: 'Medico actualizado con exito' });
        } else {
            res.status(404).json({ mensaje: 'Medico no encontrado' });
        }
      } catch (err) {
        res.status(500).json({ error: error.massage });
    }
};
// Eliminar un medico
exports.deleteMedico = async (req, res) => {
      try {
         const { id } = req.params;
         const result = await Medico.eliminar(id);
         if (result.affectedRows > 0) {
         res.status(200).json({ mensaje: 'Medico eliminado con exito' });
         } else {
            res.status(404).json({ mensaje: 'Medico no encontrado' });
         }
      } catch (error) {
          res.status(500).json({ error: error.message});
    }
};    















