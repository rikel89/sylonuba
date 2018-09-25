'use strict'

const express = require("express")

const rolesCtrl = require("../controllers/roles")
const companyCtrl = require("../controllers/company")
const userCtrl = require("../controllers/users")
const menuCtrl = require("../controllers/menu")
const productCtrl = require("../controllers/product")
const auth = require("../middleweares/auth")
const api = express.Router()
/*
Endpoints encargados de gestionar los roles.
Esta rutas solo son accesible por usuarios administradores.
*/
api.get('/role', auth, rolesCtrl.getRoles)
api.get('/role/:roleId', auth, rolesCtrl.getRole)
api.post('/role', auth, rolesCtrl.saveRole)
api.put('/role/:roleId', auth, rolesCtrl.updateRoles)
api.delete('/role/:roleId', auth, rolesCtrl.deleteRole)
/*
Endpoints encargados de gestionar las empresas.
Esta rutas solo son accesible por usuarios administradores.
*/
api.get('/company', auth, companyCtrl.getCompanys)
api.get('/company/:companyId', auth, companyCtrl.getCompany)
api.post('/company', auth, companyCtrl.saveCompany)
api.put('/company/:companyId', auth, companyCtrl.updatecompany)
api.delete('/company/:companyId', auth, companyCtrl.deleteCompany)
/*
Endpoints encargados de gestionar los usuarios.
Esta rutas solo son accesible por usuarios administradores.
La ruta /user/sigin no esta protegida por el middleweare, puesto 
que primero hay que realizar una autenticación para saber a que 
rutas tiene acceso el usuario
*/
api.get('/user',  userCtrl.getUsers)
api.get('/user/:userId',  userCtrl.getUser)
api.post('/user', userCtrl.saveUser)
api.put('/user/:userId',  userCtrl.updateUser)
api.delete('/user/:userId',  userCtrl.deleteUser)
api.post('/user/sigin', userCtrl.signIn)
/*

*/
api.get('/menu', menuCtrl.getMenus)
api.get('/menu/:menuId', menuCtrl.getMenu)
api.post('/menu',  menuCtrl.saveMenu)
api.put('/menu/:menuId',  menuCtrl.updateMenu)
api.delete('/menu/:menuId',  menuCtrl.deleteMenu)
/*
Endpoints encargados de gestionar los productos.
Las rutas que hacen referencia a CUD (crear, actualizar, y eliminar),
sólo son accesibles por usuarios administradores
*/
api.get('/product/', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product',  productCtrl.saveProduct)
api.put('/product/:productId',  productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

/*
Exportación del módulo para hacer las rutas accesibles desde otras 
partes de la aplicación.
*/
module.exports = api
