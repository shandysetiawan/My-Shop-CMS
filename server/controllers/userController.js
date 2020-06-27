const { User } = require('../models')
const Helper = require('../helpers/helper')
const jwt = require('jsonwebtoken');

class UserController {
    static loginUser(req, res, next) {

        let userLogin = { email: req.body.email, password: req.body.password }

        if (!userLogin.email || !userLogin.password) {
            throw ({ name: "EMAIL_OR_PASS_EMPTY" })
        }


        User.findOne({ where: { email: userLogin.email } })
            .then((data) => {
                // console.log(data)
                if (data) {

                    if (Helper.checkPassword(userLogin.password, data.password)) {

                        let dataUser = { id: data.id, email: data.email }

                        let access_token = jwt.sign(dataUser, process.env.KEYJWT);

                        res.status(200).json({ access_token: access_token, emailUser: dataUser.email })
                    } else {
                        throw ({ name: "EMAIL_PASS_NOT MATCH" })
                    }
                } else {
                    // console.log('kesini ga')
                    throw ({ name: "NO_EMAIL_FOUND" })
                }
            })
            .catch((err) => {
                next(err)
            })

    }
}

module.exports = UserController