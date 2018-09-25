'use strict'
const mongoose = require("mongoose")
const app = require("./server")
const config = require("./config")

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')
    app.listen(config.port, () => {
        console.log(`APP corriendo en http://localhost:${config.port}`)
    })
})