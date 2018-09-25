'use strict'

const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs")
const User = require("../models/user")
const Role = require("../models/roles")
const Company = require("../models/company")
const service = require("../services")
/*
Función encargada de realizar la lógica de obtener un usuario 
mediante un id de usuario proporcionado en la petición.
*/
function getUser(req, res) {
    let userId = req.params.userId
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
        if (!user) return res.status(404).send({ message: 'El usuario no existe' })

        return res.status(200).send({ user })
    })
}
/*
Función encargada de realizar la lógica de listar todos los usuarios relacionados 
con sus empresas y roles dados de altas en la base de datos.
*/
function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticón ${err}` })
        if (!users) return res.status(404).send({ message: 'No existen usuarios' })

        Role.populate(users, { path: 'role' }, function(err, user) {
            if (err) return res.status(500).send({ message: `Error al realizar la peticón ${err}` })

            Company.populate(users, { path: 'company' }, function(err, user) {
                if (err) return res.status(500).send({ message: `Error al realizar la peticón ${err}` })

                return res.status(200).send({ users })
            })
        })
    })
}
/*
Función encargada de realizar la lógica de guardar un usuario en la 
base de datos a partir de los datos proporcinados en la petición.
*/
function saveUser(req, res) {
    const user = new User()
    user.name = req.body.name
    user.displayName = req.body.displayName
    user.email = req.body.email
    user.phone = req.body.phone
    user.password = req.body.password
    user.company = req.body.company
    user.role = req.body.role

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

        return res.status(200).send({ message: 'Usuario creado correctamente' })
    })
}
/*
Función encargada de realizar la lógica de actualizar un usuario en la
base de datos a partir de los datos proporcinados en la petición.
*/
function updateUser(req, res) {
    let userId = req.params.userId
    let update = req.body
    User.findById(userId, (err, user) => {
        if (!user) return res.status(404).send({ message: 'El usuario no existe' })
        user.name = update.name
        user.displayName = update.displayName
        user.email = update.email
        user.phone = update.phone
        user.password = update.password
        user.company = update.company
        user.role = update.role

        user.save((err, userUpdated) => {
            if (err) return res.status(500).send({ message: `Error al actualizar el usuario: ${err}` })

            return res.status(200).send({ user: userUpdated })
        })
    })
}
/*
Función encargada de realizar la lógica de borrar un usuario en la 
base de datos a partir del id proporcinado en la petición.
*/
function deleteUser(req, res) {
    let userId = req.params.userId
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` })
        if(!user) return res.status(404).send({ message: 'El usuario no existe' })
        
        user.remove(err => {
            return res.status(200).send({ message: 'El usuario ha sido borrado' })
        })
    })
}
/*
Función encargada de realizar la lógica de autenticación de usuarios 
contra la base de datos. Si el usuario existe y la password es correcta, 
generará un token con el nivel de role que tiene ese usuario. Dicho nivel 
de role se utilizará en futuras peticiones y el middleware, determinará a 
que rutas de la aplicación tiene acceso el usuario autenticado.
*/
function signIn(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'Usuario o contraseña incorrecto' })

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) return res.status(500).send({ message: `Error al autentificar el usuario ${err}` })
            if (!isMatch) return res.status(401).send({ message: 'Usuario o contraseña incorrecto' })

            Role.populate(user, { path: 'role' }, function(err, user) {
                if (err) return res.status(500).send({ message: err })
                req.user = user
                return res.status(200).send({ token: service.createToken(user) })
            })
        });
    })
}
/*
Exportación de los métodos para hacerlos accesibles desde otras 
partes de la aplicación.
*/
module.exports = {
    getUser,
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
    signIn
}