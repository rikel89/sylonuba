'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CategortySchema = new Schema({
    displayName: { type: String, require: true, unique: true },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
})

module.exports = mongoose.model('Category', CategortySchema)