const express = require('express');
const request = require('supertest');
const perroRutas = require('../../rutas/perroRutas');
const PerroModel =require('../../models/Perro');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use('/perro', perroRutas);

describe('Pruebas Unitarias para Perros', () => {
    //antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://localhost:27017/mmascotas'{
            useNewUrlParser : true,
        });
        await PerroModel.deleteMany({});
    });  
    //al finalizar las pruebas     
    afterAll(() => {
        return mongoose.connection.close();
    });

    
});