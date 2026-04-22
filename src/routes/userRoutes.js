const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, actualizarUsuario, deleteUser } =require('../controllers/userController');
// definimos que cuando alguien entre a "/usuarios", use la funcion de tu controlador
router.get('/', getAllUsers);
router.post('/', createUser);
// ruta para actualizar un usuario
router.put('/:id_usuario', actualizarUsuario);
// ruta para eliminar un usuario
router.delete('/:id', deleteUser);
module.exports = router;