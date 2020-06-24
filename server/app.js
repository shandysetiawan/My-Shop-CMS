// if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
//     require('dotenv').config()
// }
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
// const errorHandler = require('./middlewares/errorHandler')

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

// routes.use(errorHandler)
// app.listen(port, () => console.log(`listening at port ${port}`))

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

module.exports = app