'use strict'

const express = require("express")
const path = require("path")
const auth = require("../middleweares/auth")
const appRoutes = express.Router()

appRoutes.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '../../src/app/home', 'index.html'));
})

appRoutes.get('/admin', (req,res) =>{
    res.sendFile(path.join(__dirname, '../../src/app/admin', 'singup.html'));
})



/*
Exportación del módulo para hacer las rutas accesibles desde otras 
partes de la aplicación.
*/
module.exports = appRoutes