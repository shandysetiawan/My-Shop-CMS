const { Product } = require('../models')

class ProductController {
    static fetchProducts(req, res, next) {

        Product.findAll()
            .then((data) => {

                res.status(200).json(data)

            })
            .catch((err) => {
                next(err)
            })

    }

    static addProduct(req, res, next) {

        let newProduct = { name: req.body.name, image_url: req.body.image_url, price: req.body.price, stock: req.body.stock, UserId: req.userData.id }

        // console.log(newProduct)
        Product.create(newProduct)
            .then((data) => {

                res.status(201).json(data)

            }).catch((err) => {
                next(err)
            })

    }

    static searchProduct(req, res, next) {

        let productId = req.params.id


        Product.findOne({ where: { id: productId } })
            .then((data) => {

                res.status(200).json(data)

            })
            .catch((err) => {
                next(err)
            })


    }
    static updateProduct(req, res, next) {


        let updateProduct = { name: req.body.name, image_url: req.body.image_url, price: req.body.price, stock: req.body.stock }

        let productId = req.params.id


        Product.update(updateProduct, { where: { id: productId } })
            .then((data) => {

                res.status(200).json({ data })

            })
            .catch((err) => {

                next(err)
            })

    }

    static removeProduct(req, res, next) {

        let productId = req.params.id


        Product.destroy({ where: { id: productId } })
            .then((data) => {

                res.status(200).json({ message: "Success to delete product!" })

            })
            .catch((err) => {
                next(err)
            })

    }
}

module.exports = ProductController