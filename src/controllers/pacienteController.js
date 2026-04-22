const db = require('../config/db');
exports.createPaciente = async (req, res) => {
    try {
        const { id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado } = req.body;
        const query = 'INSERT INTO paciente (id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query,  [id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado]);
        res.status(201).json({
            mensaje: '¡paciente guardado con exito!',
            id: result.insertId
        })
    } catch (error) {
        console.error('Error al insertar paciente en Mysql:', error);
        res.status(500).json({
            mensaje: 'Error en el servidor al intentar guardar el paciente',
            error: error.message
        });
    }
};
// Obtener los pacientes registrados
exports.getAllPacientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM paciente');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener pacientes de Mysql:', error);
        res.status(500).json({
            mensaje: 'Error al consultar los pacientes',
            error: error.message
        });
    }
    };
    // Actualizar un paciente (PUT)
    exports.updatePaciente = async (req, res) => {
        try {
            const { id_paciente } = req.params;
            const { id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado } = req.body;
            const query = `UPDATE paciente SET id_usuario = ?, tipo_sangre = ?, sexo = ?, fecha_nacimiento = ?, telefono = ?, direccion = ?, estado = ? WHERE id_paciente = ?`; 
            const [result] = await db.query(query, [id_usuario, tipo_sangre, sexo, fecha_nacimiento, telefono, direccion, estado, id_paciente]);
            res.status(200).json({ mensaje: 'Paciente actualizado con exito' });
        }catch (error) {
            console.error('Error al actualizar paciente enMysql:', error);
            res.status(500).json({
                mensaje: 'Error al actualizar el paciente',
                error: error.message
            });
        }
    };
    // Eliminar un paciente (DELETE)
    exports.deletePaciente = async (req, res) => {
        try {
            const { id_paciente} = req.params;
            const query = 'DELETE FROM paciente WHERE id_paciente = ?';
            const [result] = await db.query(query, [id_paciente]);
            res.status(200).json({ mensaje: 'Paciente eliminado con exito'});
        } catch (error) {
            console.error('Error al eliminar paciente en Mysql:', error);
            res.status(500).json({
                mensale: 'Error al eliminar el paciente',
                error: error.message
            });
        }
        
    };

