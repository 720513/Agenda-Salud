const User = require('../models/userModel');
// 1. Login / Buscar por email
loginUser = async (req, res) => {
    try {
        const { correo } = req.body;
        const user = await User.findByEmail(correo);
        if (!correo) {
            return res.status(404).json({ mensaje: "El correo es obligatorio" });
        }
        if (user.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(user[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al buscar usuario" });
    }
};
// Obtener los usuarios (GET)
         getAllUser = async (req, res) => {
            try {
                const users = await User.findAll();
                res.json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al obtener la lista de usuarios" });
        }
;}
        
    
// 2. Crear usuario (POST)
 createUser = async (req, res) => {
    try {
        const id = await User.create(req.body);
        res.status(201).json({ mensaje: "Usuario creado con exito", id_usuario: id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

// 3. Actualizar usuario (PUT)
 updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.update(id, req.body);
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
     } catch (error) {
        res.status(500).json({ error: error.message });
     }
};
// 4. Eliminar usuario (DELETE)
 deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.delete(id);
        res.json({ mensje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// 5. Exportacion para las rutas
module.exports = {
    loginUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
};



