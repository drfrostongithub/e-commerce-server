const { User } = require(`../models`)

function authorization(req, res, next) {
    User.findOne({
        where: {
            role: "admin"
        }
    })
        .then(user => {
            if (user === null) {
                throw { name: `Unauthorized` }
            } else {
                if (user.role === req.decodedUser.role) {
                    next()
                }
                else {
                    throw { name: `Unauthorized` }
                }
            }
        })
        .catch(err => {
            next(err)
        })

}

module.exports = authorization