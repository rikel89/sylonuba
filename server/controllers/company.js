'use stric'

const Company = require("../models/company")
/*
Función encargada de realizar la lógica de obtener una empresa 
mediante un id de emresa proporcionado en la petición.
*/
function getCompany(req, res) {
    let companyId = req.params.companyId
    Company.findById(companyId, (err, company) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!company) return res.status(404).send({ message: 'La empresa no existe' })

        res.status(200).send({ company })
    })
}
/*
Función encargada de realizar la lógica de listar todas empresa 
dadas de altas en la base de datos.
*/
function getCompanys(req, res) {
    Company.find({}, (err, companys) => {
        if (err) return res.status(500).send({ message: `Error al realizar la prtición ${err}` })
        if (!companys) return res.status(404).send({ message: 'No existen empresas' })

        res.status(200).send({ companys })
    })
}
/*
Función encargada de realizar la lógica de guardar una empresa en
la base de datos a partir de los datos proporcinados en la petición.
*/
function saveCompany(req, res) {
    let company = new Company()
    company.businessname = req.body.businessname
    company.description = req.body.description
    company.address = req.body.address
    company.telephoneNumber = req.body.telephoneNumber
    company.cif = req.body.cif

    company.save((err, companyStored) => {
        if (err) return res.status(500).send({ message: `Error gurardando en la base de datos ${err}` })

        res.status(200).send({ companyStored })
    })
}
/*
Función encargada de realizar la lógica de actualizar una empresa en
la base de datos a partir de los datos proporcinados en la petición.
*/
function updatecompany(req, res) {
    let companyId = req.params.companyId
    let update = req.body
    Company.findByIdAndUpdate(companyId, update, (err, companyUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar la empresa ${err}` })

        res.status(200).send({ company: companyUpdated })
    })
}
/*
Función encargada de realizar la lógica de borrar una empresa en
la base de datos a partir del id proporcinado en la petición.
*/
function deleteCompany(req, res) {
    let companyId = req.params.companyId
    Company.findById(companyId, (err, company) => {
        if (err) return res.status(500).send({ message: `Error al borrar la empresa` })

        company.remove(err => {
            res.status(200).send({ message: `La empresa ha sido borrada` })
        })
    })
}
/*
Exportación del los métodos para hacerlos accesibles desde otras 
partes de la aplicación.
*/
module.exports = {
    getCompany,
    getCompanys,
    saveCompany,
    updatecompany,
    deleteCompany
}