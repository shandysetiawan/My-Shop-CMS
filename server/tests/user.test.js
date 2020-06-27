const request = require('supertest')
const Helper = require('../helpers/helper')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize
const app = require('../app')
let newUser = {}


// tambahin beforeall untuk create user

beforeAll(() => {
    const userCreate = { email: 'admin@email.com', password: Helper.hashPassword("admin123"), role: "admin" }
    return User.create(userCreate)
        .then(data => {
            // console.log(dataUser)
            // console.log(tokens)
            newUser = { email: data.email, password: data.password }

        })
        .catch((err) => {
            console.log(err)
        })
})


afterAll(() => {
    queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch((err) => done(err))
});



describe('POST /login', function () {
    it('responds 200 and send access_token', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admin@email.com', password: "admin123" })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('emailUser', 'admin@email.com')
                expect(body).toHaveProperty('access_token')
                done()
            })
    });
    it('responds 400 password failed', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admin@email.com', password: "admin12" })
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Email and Password not match!!")
                done()
            })
    });
    it('responds 400 password empty', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admin@email.com', password: "" })
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Email or Password must not empty!")

                done()
            })
    });
    it('responds 404 email not found', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admi@email.com', password: "admin123" })
            .then(response => {
                const { body, status } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty('message', "Your email not found, please register!")

                done()
            })
    });
});