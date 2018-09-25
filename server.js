'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const apiRoutes = require("./server/routes/api")
const appRoutes = require("./server/routes/app")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
app.use('/api', apiRoutes)
app.use('/', appRoutes)

module.exports = app
