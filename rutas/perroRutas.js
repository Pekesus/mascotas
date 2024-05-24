const express = require('express');
const rutas = express.Router();
const PerroModel = require('../models/Perro');
const UsuarioModel = require('../models/Usuario');
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
        nombre_propietario: req.body.nombre_propietario,
        usuario: req.body.usuario._id
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
//endpoint 5 Buscar perros por nombre del propietario
rutas.get('/buscarPorPropietario/:nombrePropietario', async (req, res) => {
    try {
        const perros = await PerroModel.find({ nombre_propietario: req.params.nombrePropietario });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
//endpoint 6 Buscar perros por raza
rutas.get('/buscarPorRaza/:raza', async (req, res) => {
    try {
        const perros = await PerroModel.find({ raza: req.params.raza });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
//endpoint 7 Buscar perros por edad mínima
rutas.get('/buscarPorEdadMinima/:edadMinima', async (req, res) => {
    try {
        const perros = await PerroModel.find({ edad_años: { $gte: req.params.edadMinima } });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
//endpoint 8 Buscar perros por raza y edad mínima
rutas.get('/buscarPorRazaYEdadMinima/:raza/:edadMinima', async (req, res) => {
    try {
        const perros = await PerroModel.find({ raza: req.params.raza, edad_años: { $gte: req.params.edadMinima } });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
//endpoint 9 Buscar perros por raza, tamaño y color
rutas.get('/buscarPorMultiplesCriterios/:raza/:tamaño/:color', async (req, res) => {
    try {
        const perros = await PerroModel.find({ raza: req.params.raza, tamaño: req.params.tamaño, color: req.params.color });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

//endpoint Buscar perros por rango de peso y tamaño
rutas.get('/buscarPorRangoPesoYTamano/:pesoMinimo/:pesoMaximo/:tamaño', async (req, res) => {
    try {
        const perros = await PerroModel.find({ peso_kg: { $gte: req.params.pesoMinimo, $lte: req.params.pesoMaximo }, tamaño: req.params.tamaño });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

//endpoint Buscar perros por edad y color
rutas.get('/buscarPorEdadYColor/:edad/:color', async (req, res) => {
    try {
        const perros = await PerroModel.find({ edad_años: { $gte: req.params.edad }, color: req.params.color });
        res.json(perros);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

//REPORTEES
rutas.get('/usuarioPerruno/:usuarioId', async (req, res) => {
    const {usuarioId} = req.params;
    try {
        const usuario = await UsuarioModel.findById(usuarioId);
        if(!usuario)
            return res.status(402).json({mensaje: 'Usuario no encontrado'});
        const perro = await PerroModel.find({usuario: usuarioId}).populate('usuario');
        res.json(perro);
    } catch (error) {
        res.status(500).json({ mensaje : error.message})
    }
})

//REPORTE 2 
rutas.get('/razaPorUsuario', async (req, res) => {
    try {
        const usuarios = await UsuarioModel.find();
        const reporte = await Promise.all(
            usuarios.map(async (usuario) => {
                const perros = await PerroModel.find({ usuario: usuario._id });
                const totalrazas = perros.reduce((sum, perro) => sum + perro.raza.length, 0);
                return {
                    usuario: {
                        _id: usuario._id,
                        nombreusuario: usuario.nombreusuario
                    },
                    totalrazas,
                    perros: perros.map(p => ({
                        _id: p._id,
                        nombre: p.nombre,
                        raza: p.raza
                    }))
                };
            })
        );
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = rutas;