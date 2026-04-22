const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
// definimos la ruta POST
router.post('/', pacienteController.createPaciente);
router.get('/', pacienteController.getAllPacientes);
router.put('/:id_paciente', pacienteController.updatePaciente);
router.delete('/:id_paciente', pacienteController.deletePaciente);
module.exports = router;