const routes = require('express').Router()
const productController = require('../controllers/productController')
const { authentication, authorization } = require('../middlewares/auth')

routes.use(authentication)

routes.get('/', productController.fetchProducts)

routes.post('/', productController.addProduct)

routes.get('/:id', productController.searchProduct)

routes.put('/:id', productController.updateProduct)

routes.delete('/:id', productController.removeProduct)

module.exports = routes