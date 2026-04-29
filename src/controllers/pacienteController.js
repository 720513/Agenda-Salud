const Paciente = require('../models/pacienteModel');
// 1. Crear Paciente
exports.createPaciente = async (req, res) => {
    try {
        const result = await Paciente.crear(req.body);
        res.status(201).json({ mensaje: '¡paciente guardado con exito!', id: result.insertId });
    } catch (error) {
        console.error('Error al insertar paciente:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al intentar guardar el paciente', error: error.message });
    }
};
// 2. Obtener los pacientes registrados
exports.getAllPacientes = async (req, res) => {
    try {
        const result = await Paciente.obtenerTodos();
        console.log("Cantidad de pacientes encontrados:", result.length);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    // Actualizar un paciente (PUT)
    exports.updatePaciente = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Paciente.actualizar(id, req.body);
            res.status(200).json({ mensaje: 'Paciente actualizado con exito' });
        }catch (error) {
            console.error('Error al actualizar paciente correctamente', error);
            res.status(500).json({ error: error.message });
                
        }
};
    // Eliminar un paciente (DELETE)
    exports.deletePaciente = async (req, res) => {
        try {
            const { id } = req.params;
            await Paciente.eliminar(id);
            res.status(200).json({ mensaje: 'Paciente eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar paciente en Mysql:', error);
            res.status(500).json({ error: error.message });
    }
};

