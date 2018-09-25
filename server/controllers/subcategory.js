'use stric'

const Subcategory = require('../models/subcategory')

function getSubCategory(req, res) {
    let subCategorieId = req.params.subCategorieId
    Subcategory.findById(subCategorieId, (err, subcategory) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!subcategory) return res.status(404).send({ message: 'La subcategoría no existe' })

        res.status(200).send({ subcategory })
    })
}

function getSubCategories(req, res) {
    Subcategory.find({}, (err, subcategories) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
        if (!subcategories) return res.status(404).send({ message: 'No existen subcategorias' })

        res.status(200).send({ subcategories })
    })
}

function saveSubCategory(req, res) {
    let subcategoty = new Subcategory
    subcategoty.displayName = req.body.displayName
    subcategoty.category = req.body.category
    subcategoty.filterUrl = req.body.filterUrl

    subcategoty.save((err, subCategoryStored) => {
        if (err) return res.status(500).send({ message: `Error guardando en la base de datos ${err}` })

        res.status(200).send({ subCategoryStored })
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
    getSubCategory,
    getSubCategories,
    saveSubCategory,
    updateCategory,
    deleteCategory
}