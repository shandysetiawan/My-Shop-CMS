const routes = require('express').Router()
const userController = require('../controllers/userController')

routes.post('/login', userController.loginUser)


module.exports = routes