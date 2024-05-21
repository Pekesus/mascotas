//importación de librerias
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
// ruta
const perroRutas = require('./rutas/perroRutas');

//configuraciones de enviroment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
//manejo de JSON
app.use(express.json());
//conexion con mongodb
mongoose.connect(MONGO_URI).then(
    () => {
        console.log('Conexion exitosa');
        app.listen(PORT, () => {console.log("Servidor express corriendo en el puerto "+PORT)})
    }
).catch (error => console.log('error de conexion', error));

// utilizar las rutas de perros
app.use('/perro', perroRutas);