const bcrypt = require('bcrypt');
const saltRounds = 10;

class Helper {

    static hashPassword(inputPassword) {

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(inputPassword, salt);

        return hash
    }

    static checkPassword(inputPassword, passwordDB) {

        return bcrypt.compareSync(inputPassword, passwordDB)

    }


}

module.exports = Helper