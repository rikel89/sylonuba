'use strict'

const jwt = require("jwt-simple")
const moment = require("moment")
const config = require("../../config")
/*
 */
function createToken(user) {
    const payload = {
        sub: user._id,
        levelRol: user.role.levelRol,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}
/*
 */
function decodeToke(token) {
    const decode = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if (payload.exp <= moment.unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }

            resolve(payload)
        }
        catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decode
}

module.exports = {
    createToken,
    decodeToke
}