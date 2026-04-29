const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// definimos que cuando alguien entre a "/usuarios", use la funcion de tu controlador
router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
// ruta para actualizar un usuario
router.put('/:id', userController.updateUser);
// ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);
module.exports = router;