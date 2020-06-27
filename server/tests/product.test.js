const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken');
const Helper = require('../helpers/helper')
let userCreate = { email: 'admin@email.com', password: Helper.hashPassword("admin123"), role: "admin" }
let tokens = ""
let currentLogin = ""
let currentProductId = 0

//findone diganti jadinya create, trs bikin jwt nya, satu user saja
beforeAll(() => {

    return User.create(userCreate)
        .then(data => {
            // console.log(dataUser)
            // console.log(tokens)
            currentLogin = { id: data.id, email: data.email }
            // console.log(dataUser)
            tokens = jwt.sign(currentLogin, process.env.KEYJWT);

        })
        .catch((err) => {
            console.log(err)
        })
})


afterAll(() => {
    queryInterface
        .bulkDelete('Products', {})
        .then(() => done())
        .catch((err) => done(err))
});

describe('get /products', function () {
    it('responds 400 if failed to send token for authentication', function (done) {
        request(app)
            .get('/products')
            .then(response => {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Process Authentication Failed!")
                done()
            })
    });
});

describe('POST /products', function () {
    it('responds 201 and receive array of object', function (done) {
        request(app)
            .post('/products')
            .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: 5 })
            .set('access_token', tokens)
            .then(response => {
                const { body, status, error } = response

                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'boneka')
                expect(body).toHaveProperty('image_url', "jncjkbcja")
                expect(body).toHaveProperty('price', 1000)
                expect(body).toHaveProperty('stock', 5)
                currentProductId = body.id
                done()
            })
    });
    it('responds 400 and receive message Stock must not minus', function (done) {
        request(app)
            .post('/products')
            .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: -4 })
            .set('access_token', tokens)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toEqual({ error: "SequelizeValidationError", message: expect.arrayContaining(["Stock must not minus"]) })
                // expect(body).toHaveProperty('message').toContain("Stock must not minus")
                done()
            });
    });
    it('responds 400 and receive message Price must not minus', function (done) {
        request(app)
            .post('/products')
            .send({ name: 'boneka', image_url: "jncjkbcja", price: -1000, stock: 0 })
            .set('access_token', tokens)
            .then(response => {
                const { body, status, } = response

                expect(status).toBe(400)
                expect(body).toEqual({ error: "SequelizeValidationError", message: expect.arrayContaining(["Price must not minus"]) })
                // expect(body).toHaveProperty('message', "Price must not minus")
                done()
            });
    });
    it('responds 400 in put and receive name must not empty', function (done) {
        request(app)
            .post(`/products`)
            .send({ name: "", image_url: "jncjkbcja", price: 4000, stock: 0 })
            .set('access_token', tokens)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toEqual({ error: "SequelizeValidationError", message: expect.arrayContaining(['Name must not empty!']) })
                done()
            });
    });

});

describe('GET /products', function () {
    it('responds 200 and receive array of object', function (done) {
        request(app)
            .get('/products')
            .set('access_token', tokens)
            .then(response => {
                // console.log(response)
                const { body, status } = response

                expect(status).toBe(200)
                expect(body).toEqual(expect.any(Array))

                done()
            })
    });
});

describe('GET /products/:id', function () {
    it('responds 200 and receive array of object', function (done) {
        request(app)
            .get(`/products/${currentProductId}`)
            .set('access_token', tokens)
            .then(response => {
                // console.log(response)
                const { body, status } = response

                expect(status).toBe(200)
                expect(body).toHaveProperty('name', 'boneka')
                expect(body).toHaveProperty('image_url', "jncjkbcja")
                expect(body).toHaveProperty('price', 1000)
                expect(body).toHaveProperty('stock', 5)

                done()
            })
    });
});

describe('PUT /products/:id', function () {
    it('responds 200 in put and receive an object', function (done) {
        request(app)
            .put(`/products/${currentProductId}`)
            .set('access_token', tokens)
            .send({ name: 'boneko', image_url: "jncjkbcja", price: 3000, stock: 5 })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', 'boneko')
                expect(body).toHaveProperty('image_url', "jncjkbcja")
                expect(body).toHaveProperty('price', 3000)
                expect(body).toHaveProperty('stock', 5)
                done()
            })
    });
    it('responds 400 in put and receive message Stock must not minus', function (done) {
        request(app)
            .put(`/products/${currentProductId}`)
            .send({ name: 'boneka', image_url: "jncjkbcja", price: 4000, stock: -4 })
            .set('access_token', tokens)
            .then(response => {
                const { status, body } = response
                // console.log(error)
                expect(status).toBe(400)
                expect(body).toEqual({ error: "SequelizeValidationError", message: expect.arrayContaining(["Stock must not minus"]) })
                done()
            });
    });
    it('responds 400 in put and receive name must not empty', function (done) {
        request(app)
            .put(`/products/${currentProductId}`)
            .send({ name: 'boneka', image_url: "jncjkbcja", price: -4000, stock: 0 })
            .set('access_token', tokens)
            .then(response => {
                const { error, status, body } = response

                expect(status).toBe(400)
                expect(body).toEqual({ error: "SequelizeValidationError", message: expect.arrayContaining(["Price must not minus"]) })
                done()
            });
    });
});

describe('DELETE /products/:id', function () {
    it('responds 200 and receive message successfuly delete', function (done) {
        request(app)
            .delete(`/products/${currentProductId}`)
            .set('access_token', tokens)
            .then(response => {
                const { body, status, error } = response

                expect(status).toBe(200)
                expect(body).toHaveProperty('message', "Success to delete product!")

                done()
            })
    });
    it('responds 400,failed to acquired params', function (done) {
        request(app)
            .delete(`/products/:${currentProductId}`)
            .then(response => {
                const { body, status, error } = response

                expect(status).toBe(400)
                expect(error).toHaveProperty('message')

                done()
            })
    });

});

