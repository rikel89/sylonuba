'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const MenuSchema =  new Schema({
    displayName: { type: String, require: true, unique: true },
    url: { type: String, require: true },
    levelRol: { Number },
    order: Number,
})

module.exports = mongoose.model('Menu', MenuSchema)