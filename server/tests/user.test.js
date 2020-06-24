const request = require('supertest')
const app = require('../app')


describe('POST /login', function () {
    it('responds 200 and send access_token', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admin@email.com', password: "admin123" })
            .then(response => {
                const { body, status } = response

                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
                expect(body).toHaveProperty('emailUser')
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

                done()
            })
    });
    it('responds 400 email not found', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'admi@email.com', password: "admin12" })
            .then(response => {
                const { body, status } = response

                expect(status).toBe(500)

                done()
            })
    });
});