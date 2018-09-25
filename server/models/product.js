'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    description: String,
    picture: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
    price: Number
})

module.exports = mongoose.model('Product', ProductSchema)