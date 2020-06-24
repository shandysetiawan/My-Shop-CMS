const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize
const userLogin = { email: 'admin@email.com', password: "admin123" }
const jwt = require('jsonwebtoken');
let tokens = ""
let currentLogin = ""

beforeAll(() => {
    return User.findOne({ where: { email: userLogin.email } })
        .then(data => {
            currentLogin = { id: data.id, email: data.email }
            // console.log(dataUser)
            tokens = jwt.sign(currentLogin, process.env.KEYJWT);
            // console.log(tokens)

        })
        .catch((err) => {
            console.log(err)
        })
})


afterAll(() => {
    // queryInterface
    //     .bulkDelete('Products', {})
    //     .then(() => done())
    //     .catch((err) => done(err))
});

describe('POST /products', function () {
    it('responds 200 and receive array of object', function (done) {
        request(app)
            .post('/products')
            .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: 5 })
            .set('access_token', tokens)
            .then(response => {
                const { body, status, error } = response

                expect(status).toBe(201)
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('image_url', expect.any(String))
                expect(body).toHaveProperty('price', expect.any(Number))
                expect(body).toHaveProperty('stock', expect.any(Number))
                done()
            })
    });
    it('responds 400 and receive message Stock must not minus', function (done) {
        request(app)
            .post('/products')
            .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: -4 })
            .set('access_token', tokens)
            .then(response => {
                const { error, status, body } = response

                expect(status).toBe(400)
                expect(error).toHaveProperty('message')
                done()
            });
    });
    it('responds 400 and receive message Price must not minus', function (done) {
        request(app)
            .post('/products')
            .send({ name: 'boneka', image_url: "jncjkbcja", price: -1000, stock: 0 })
            .set('access_token', tokens)
            .then(response => {
                const { error, status, body } = response

                expect(status).toBe(400)
                expect(error).toHaveProperty('message')
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
                const { body, status } = response

                expect(status).toBe(200)
                expect(body).toContain('name')

                done()
            })
    });

});

// describe('PUT /products/:id', function () {
//     it('responds 200 and receive array of object', function (done) {
//         request(app)
//             .put('/products')
//             .set('access_token', token)
//             .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: 5 })
//             .then(response => {
//                 const { body, status, error } = response

//                 expect(status).toBe(201)
//                 expect(body).toHaveProperty('name', expect.any(String))
//                 expect(body).toHaveProperty('image_url', expect.any(String))
//                 expect(body).toHaveProperty('price', expect.any(Number))
//                 expect(body).toHaveProperty('stock', expect.any(Number))
//                 done()
//             })
//     });
//     it('responds 400 and receive message Stock must not minus', function (done) {
//         request(app)
//             .post('/products')
//             .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: -4 })
//             .then(response => {
//                 const { error, status, body } = response

//                 expect(status).toBe(400)
//                 expect(error).toHaveProperty('message')
//                 done()
//             });
//     });
//     it('responds 400 and receive message Price must not minus', function (done) {
//         request(app)
//             .post('/products')
//             .send({ name: 'boneka', image_url: "jncjkbcja", price: -1000, stock: 0 })
//             .then(response => {
//                 const { error, status, body } = response

//                 expect(status).toBe(400)
//                 expect(error).toHaveProperty('message')
//                 done()
//             });
//     });

// });

// describe('DELETE /products/:id', function () {
//     it('responds 200 and receive array of object', function (done) {
//         request(app)
//             .delete('/products')
//             .send()
//             .then(response => {
//                 const { body, status, error } = response

//                 expect(status).toBe(201)
//                 expect(body).toHaveProperty('name', expect.any(String))
//                 expect(body).toHaveProperty('image_url', expect.any(String))
//                 expect(body).toHaveProperty('price', expect.any(Number))
//                 expect(body).toHaveProperty('stock', expect.any(Number))
//                 done()
//             })
//     });
//     it('responds 400 and receive message Stock must not minus', function (done) {
//         request(app)
//             .post('/products')
//             .send({ name: 'boneka', image_url: "jncjkbcja", price: 1000, stock: -4 })
//             .then(response => {
//                 const { error, status, body } = response

//                 expect(status).toBe(400)
//                 expect(error).toHaveProperty('message')
//                 done()
//             });
//     });

// });

