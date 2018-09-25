'use strict';

const Category = require('../models/category');

function getCategory(req, res) {
    let categorieId = req.params.categorieId
    Category.findById(categorieId, (err, category) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!category) return res.status(404).send({ message: 'La categoría no existe' })

        res.status(200).send({ category });
    });
}

function getCategories(req, res) {
    Category.find({}, (err, categories) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
        if (!categories) return res.status(404).send({ message: 'No existen categorias' })

        res.status(200).send({ categories })
    })
}

function saveCategory(req, res) {
    let category = new Category
    category.displayName = req.body.displayName
    category.menu = category.menu

    category.save((err, categoryStored) => {
        if (err) return res.status(500).send({ message: `Error guardando en la base de datos ${err}` })

        res.status(200).send({ categoryStored })
    })
}


function updateCategory(req, res) {
    let categoryId = req.params.categoriId
    let update = req.body
    Category.findByIdAndUpdate(categoryId, update, (err, categoryUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar la categoría: ${err}` })

        res.status(200).send({ role: categoryUpdated })
    })
}


function deleteCategory(req, res) {
    let categoryId = req.params.categoriId
    Category.findById(categoryId, (err, categorie) => {
        if (err) return res.status(500).send({ message: `Error al borra la categoría ${err}` })
        if (!categorie) return res.status(404).send({ message: 'La categoría no existe' })

        categorie.remove(err => {
            res.status(200).send({ message: 'La categoría ha sido borrada' })
        })
    })
}

module.exports = {
    getCategory,
    getCategories,
    saveCategory,
    updateCategory,
    deleteCategory
}
