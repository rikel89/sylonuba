'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const SubCategortySchema = new Schema({
    displayName: { type: String, require: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    filterUrl: String
})

module.exports = mongoose.model('SubCategory', SubCategortySchema)