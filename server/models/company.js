const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CompanySchema = Schema({
    businessname: { type: String, index: { unique: true } },
    description: String,
    address: String,
    telephoneNumber: String,
    cif: String,
    signupDate: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Company', CompanySchema)