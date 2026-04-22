const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/MedicoController');
// Rutas para la entidad medicos
router.get('/', medicoController.getAllMedicos);
router.post('/', medicoController.createMedico);
router.put('/:id_medico', medicoController.updateMedico);
router.delete('/:id_medico', medicoController.deleteMedico);
module.exports = router;