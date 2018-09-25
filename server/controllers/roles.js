'use stric'

const Role = require("../models/roles")
/*
Función encargada de realizar la lógica de obtener un role 
mediante un id de role proporcionado en la petición.
*/
function getRole(req, res) {
    let roleId = req.params.roleId
    Role.findById(roleId, (err, role) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!role) return res.status(404).send({ message: 'El producto no existe' })

        res.status(200).send({ role })
    })
}
/*
Función encargada de realizar la lógica de listar todos los roles
dados de altas en la base de datos.
*/
function getRoles(req, res) {
    Role.find({}, (err, roles) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
        if (!roles) return res.status(404).send({ message: 'No existen roles' })

        res.status(200).send({ roles })
    })
}
/*
Función encargada de realizar la lógica de guardar un role en la 
base de datos a partir de los datos proporcinados en la petición.
*/
function saveRole(req, res) {
    let role = new Role
    role.name = req.body.name
    role.levelRol = req.body.levelRol
    role.description = req.body.description

    role.save((err, roleStored) => {
        if (err) return res.status(500).send({ message: `Error guardando en la base de datos ${err}` })

        res.status(200).send({ roleStored })
    })
}
/*
Función encargada de realizar la lógica de actualizar un role en la
base de datos a partir de los datos proporcinados en la petición.
*/
function updateRoles(req, res) {
    let roleId = req.params.roleId
    let update = req.body
    Role.findByIdAndUpdate(roleId, update, (err, roleUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el role: ${err}` })

        res.status(200).send({ role: roleUpdated })
    })
}
/*
Función encargada de realizar la lógica de borrar un role en la 
base de datos a partir del id proporcinado en la petición.
*/
function deleteRole(req, res) {
    let roleId = req.params.roleId
    Role.findById(roleId, (err, role) => {
        if (err) return res.status(500).send({ message: `Error al borra el role ${err}` })
        if (!role) return res.status(404).send({ message: 'El role no existe' })

        role.remove(err => {
            res.status(200).send({ message: 'El role ha sido borrado' })
        })
    })
}
/*
Exportación de los métodos para hacerlos accesibles desde otras 
partes de la aplicación.
*/
module.exports = {
    getRole,
    getRoles,
    saveRole,
    updateRoles,
    deleteRole
}