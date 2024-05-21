const mongoose = require('mongoose');
//definir el esquema
const perroSchema = new mongoose.Schema({
    nombre: String,
    raza: String,
    edad_años: Number,
    genero: String,
    color: String,
    tamaño: String,
    peso_kg: Number,
    vacunas: Boolean,
    nombre_propietario: String

});

const perroModel = mongoose.model('Perro', perroSchema, 'perros');
module.exports = perroModel;