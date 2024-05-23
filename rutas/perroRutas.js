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

//endpoint 2 Crear
rutas.post('/crear', async (req, res) => {
    const perro = new PerroModel({
        nombre: req.body.nombre,
        raza: req.body.raza,
        edad_años: req.body.edad_años,
        genero: req.body.genero,
        color: req.body.color,
        tamaño: req.body.tamaño,
        peso_kg: req.body.peso_kg,
        vacunas: req.body.vacunas,
        nombre_propietario: req.body.nombre_propietario
    }) 
    try {
        const nuevoPerro = await perro.save();
        res.status(201).json(nuevoPerro);
    } catch (error) {
        res.status(400).json({mensaje : error.message})
    }
});
//endpoint 3 Editar
rutas.put('/editar/:id', async(req, res) => {
    try {
        const perroEditado = await PerroModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!perroEditado)
            return res.status(404).json({ mensaje : 'Perro no encontrado'});
        return res.status(201).json(perroEditado);
    } catch (error) {
        res.status(400).json({mensaje : error.message})
    }
})
//endpoint 4 Eliminar
rutas.delete('/eliminar/:id', async (req, res) => {
    try{
        const perroEliminado = await PerroModel.findByIdAndDelete(req.params.id);
        if(!perroEliminado)
            return res.status(404).json({ mensaje : 'Perro no encontrado'});
        return res.json({mensaje : 'Perro eliminado'});
    } catch (error) {
        res.status(500).json({ mensaje : error.message})
    }
})
module.exports = rutas;