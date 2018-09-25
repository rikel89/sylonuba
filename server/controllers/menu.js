'use strict'

const Menu = require('../models/menu')

function getMenu(req, res) {
    let menuId = req.params.menuId
    Menu.findById(menuId, (err, menu) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!menu) return res.status(404).send({ message: 'El menu no existe' })

        res.status(200).send({ menu })
    })
}

function getMenus(req, res) {
    Menu.find({}).sort({ order: 1 }).exec((err, menu) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!menu) return res.status(404).send({ message: 'No existen menus' })

        res.status(200).send({ menu })
    })
}

function saveMenu(req, res) {
    let menu = new Menu()
    menu.displayName = req.body.displayName
    menu.url = req.body.url
    menu.levelRol = req.body.levelRol
    menu.order = req.body.order
    menu.save((err, menuStored) => {
        if (err) return res.status(500).send({ message: `Error guardando en la base de datos: ${err}` })
        res.status(200).send({ menuStored })
    })


}

function updateMenu(req, res) {
    let menuId = req.params.menuId
    let update = req.body
    Menu.findById(menuId, (err, menu) => {
        if (!menu) return res.status(404).send({ message: 'El menu no existe' })
        menu.displayName = req.body.displayName
        menu.url = update.url
        menu.levelRol = update.levelRol
        menu.order = update.order

        menu.save((err, menuUpdated) => {
            if (err) return res.status(500).send({ message: `Error al actualizar el menu: ${err}` })

            return res.status(200).send({ menu: menuUpdated })
        })

    })
}

function deleteMenu(req, res) {
    let menuId = req.params.menuId
    Menu.findById(menuId, (err, menu) => {
        if (err) return res.status(500).send({ message: `Error al borrar el menu: ${err}` })
        if (!menu) return res.status(404).send({ message: 'El menu no existe' })

        menu.remove(err => {
            return res.status(200).send({ message: 'El menu ha sido borrado' })
        })
    })
}

function addItemMenu(req, res) {
    let menuId = req.params.menuId
    Menu.findById(menuId, (err, menu) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!menu) return res.status(404).send({ message: 'El menu no existe' })
        let subMenu = new Menu()
        subMenu.displayName = req.body.displayName
        subMenu.url = req.body.url
        subMenu.levelRol = req.body.levelRol
        subMenu.order = req.body.order
        menu.subMenu.push(subMenu)

        menu.save((err, menuStored) => {
            if (err) return res.status(500).send({ message: `Error guardando en la base de datos: ${err}` })
            res.status(200).send({ menuStored })
        })

    })


}

module.exports = {
    getMenu,
    getMenus,
    saveMenu,
    updateMenu,
    deleteMenu
}