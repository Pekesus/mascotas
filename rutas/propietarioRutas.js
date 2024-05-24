const express = require('express');
const rutas = express.Router();
const PropietarioModel = require('../models/Propietario');

//endpoint 1 traer todos los propietarios
rutas.get('/todosLosPropietarios', async (req, res) => {
    try  {
        const propietario = await PropietarioModel.find();
        res.json(propietario);
    } catch (error) {
        res.status(500).json({mensaje: error.message});
    }
});

//endpoint 2 Crear propietario
rutas.post('/crearPropietario', async (req, res) => {
    const propietario = new PropietarioModel({
        nombre_prop: req.body.nombre_prop,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono
    }) 
    try {
        const nuevoPropietario = await propietario.save();
        res.status(201).json(nuevoPropietario);
    } catch (error) {
        res.status(400).json({mensaje : error.message})
    }
});
//endpoint 3 Editar propietario
rutas.put('/editarPropietario/:id', async(req, res) => {
    try {
        const propietarioEditado = await PropietarioModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!propietarioEditado)
            return res.status(404).json({ mensaje : 'Propietario no encontrado'});
        return res.status(201).json(propietarioEditado);
    } catch (error) {
        res.status(400).json({mensaje : error.message})
    }
})
//endpoint 4 Eliminar propietario
rutas.delete('/eliminarPropietario/:id', async (req, res) => {
    try{
        const propietarioEliminado = await PropietarioModel.findByIdAndDelete(req.params.id);
        if(!propietarioEliminado)
            return res.status(404).json({ mensaje : 'Propietario no encontrado'});
        return res.json({mensaje : 'Propietario eliminado'});
    } catch (error) {
        res.status(500).json({ mensaje : error.message})
    }
})

module.exports = rutas;