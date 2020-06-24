const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const errorHandler = require('../middlewares/errorHandler')

routes.use('/', userRoutes)

routes.use('/products', productRoutes)

routes.use(errorHandler)

module.exports = routes