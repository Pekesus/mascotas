const express = require('express');
const rutas = express.Router();
const PerroModel = require('../models/Perro');

//endpoint traer todo
rutas.get('/traerPerros', async (req, res) => {
    try  {
        const perro = await PerroModel.find();
        res.json(perro);
    } catch (error) {
        res.status(500).json({mensaje: error.message});
    }
});
module.exports = rutas;