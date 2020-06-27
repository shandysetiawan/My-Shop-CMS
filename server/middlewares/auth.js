const jwt = require('jsonwebtoken')
const { User, Product } = require('../models')

function authentication(req, res, next) {

    const access_token = req.headers.access_token
    // console.log(">>>>>>>>>>>>>>", access_token)
    if (!access_token) {
        next({ name: "AUTH_FAILED1" })
    } else {

        try {
            let decoded = jwt.verify(access_token, process.env.KEYJWT)

            User.findByPk(decoded.id)
                .then((data) => {

                    if (data) {
                        req.userData = decoded
                        next()
                    } else {
                        next({ name: "AUTH_FAILED" })
                    }
                })

        } catch (err) {
            next(err)
        }
    }
}

function authorization(req, res, next) {

    let idProduct = req.params.id
    console.log(idProduct)

    Product.findByPk(idProduct)
        .then((data) => {

            if (!data) {
                throw ({ name: "NOT_AVAILABLE" })
            } else if (data.UserId !== req.userData.id) {
                throw ({ name: "UNAUTHORIZED" })
            } else {
                next()
            }
        })
        .catch((err) => {
            next(err)
        })

}

module.exports = { authentication, authorization }