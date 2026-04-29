const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
// definimos la ruta POST
router.post('/', pacienteController.createPaciente);
router.get('/', pacienteController.getAllPacientes);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);
module.exports = router;