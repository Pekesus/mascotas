const mongoose = require('mongoose');

const propietarioSchema = new mongoose.Schema({
    nombre_prop: String,
    apellido: String,
    direccion: String,
    edad: Number,
    telefono: Number
    
});

const propietarioModel = mongoose.model('Propietario', propietarioSchema, 'propietarios');
module.exports = propietarioModel;