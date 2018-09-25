'use strict'

const Product = require('../models/product')
/*
Función encargada de realizar la lógica de obtener un producto 
mediante un id de producto proporcionado en la petición.
*/
function getProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!product) return res.status(404).send({ message: 'El producto no existe' })

        res.status(200).send({ product })
    })
}
/*
Función encargada de realizar la lógica de listar todos los productos 
dados de altas en la base de datos.
*/
function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!products) return res.status(404).send({ message: 'No existen productos' })

        res.status(200).send({ products })
    })
}
/*
Función encargada de realizar la lógica de guardar un producto en
la base de datos a partir de los datos proporcinados en la petición.
*/
function saveProduct(req, res) {
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    product.save((err, productStored) => {
        if (err) return res.status(500).send({ message: `Error guardando en la base de datos: ${err}` })

        res.status(200).send({ productStored })
    })
}
/*
Función encargada de realizar la lógica de actualizar un producto en
la base de datos a partir de los datos proporcinados en la petición.
*/
function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el producto ${err}` })

        res.status(200).send({ product: productUpdated })
    })
}
/*
Función encargada de realizar la lógica de borrar un producto en
la base de datos a partir del id proporcinado en la petición.
*/
function deleteProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al borrar el producto ${err}` })

        product.remove(err => {
            res.status(200).send({ message: 'El producto ha sido borrado' })
        })
    })
}
/*
Exportación del los métodos para hacerlos accesibles desde otras 
partes de la aplicación.
*/
module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}