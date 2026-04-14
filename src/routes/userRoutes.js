const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// definimos que cuando alguien entre a "/usuarios", use la funcion de tu controlador
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
module.exports = router;