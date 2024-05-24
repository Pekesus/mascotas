const express = require('express');
const rutas = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//registro
rutas.post ('/registro', async (req, res) => {
    try {
        const {nombreusuario, correo, contrasenia} = req.body;
        const usuario = new Usuario({ nombreusuario, correo, contrasenia});
        await usuario.save();
        res.status(201).json({mensaje: 'Usuario registrado'});
    } catch(error) {
        res.status(500).json({mensaje: error.message});
    }
});

//inicio de sesion
rutas.post('/iniciosesion', async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario)
            return res.status(401).json({ error: 'Usuario no encontrado' });

        const validarContrasenia = await usuario.compararContrasenia(contrasenia);
        if (!validarContrasenia)
            return res.status(401).json({ error: 'Contraseña inválida' });

        // Creación de token
        const token = jwt.sign({ usuarioId: usuario._id }, 'clave_secreta', { expiresIn: '5h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
module.exports = rutas;