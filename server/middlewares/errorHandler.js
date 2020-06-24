function errorHandler(err, req, res, next) {

    let errorCode, statusCode, errorMessage

    // console.log(err)

    switch (err.name) {
        case "SequelizeValidationError":
            statusCode = 400
            errorCode = err.name
            let arrErr = []
            for (let i = 0; i < err.errors.length; i++) {
                arrErr.push(err.errors[i].message)
            }
            errorMessage = arrErr
            break
        case "AUTH_FAILED":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Process Authentication Failed!"
            break
        case "EMAIL_PASS_NOT MATCH":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Email and Password not match!!"
            break
        case "EMAIL_ALREADY_REGISTERED":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Your email already register, please login or use other email!"
            break
        case "NO_EMAIL_FOUND":
            statusCode = 404
            errorCode = err.name
            errorMessage = "Your email not found, please register!"
            break
        case "AUTH_FAILED":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Process Authentication Failed!"
            break
        case "EMAIL_OR_PASS_EMPTY":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Email or Password must not empty!"
            break
        case "UNAUTHORIZED":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Unauthorized to edit or delete!"
            break
        case "NOT_AVAILABLE":
            statusCode = 400
            errorCode = err.name
            errorMessage = "Not found!"
            break
        default:
            statusCode = 500
            errorCode = "INTERNAL_SERVER_ERROR"
            errorMessage = "Internal Server Error!"
            break
    }

    res.status(statusCode).json({ error: errorCode, message: errorMessage })

}

module.exports = errorHandler