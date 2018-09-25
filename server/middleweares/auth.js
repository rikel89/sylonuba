'use stric'

const services = require("../services")
const config = require("../../config")

function isAdmin(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'No tienes autorización' })
    }

    const token = req.headers.authorization.split(" ")[1]
    services.decodeToke(token)
        .then(response => {
            if (response.levelRol != config.LEVEL_ADMIN) return res.status(403).send({ message: 'No tienes autorización' })
            
            req.user = response.sub
            next()
        })
        .catch(response => {
            return res.status(response.status)
        })
}

module.exports = isAdmin
