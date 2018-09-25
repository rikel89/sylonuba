const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RolesSchema = Schema({
    name: { type: String, require: true, unique: true },
    levelRol: { type: Number, require: true},
    description: String
})

module.exports = mongoose.model('Roles', RolesSchema)