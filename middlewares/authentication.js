const jwt = require('jsonwebtoken')
const { User } = require('../models')

//error wajib handle di errorhandle
function authentication(req, res, next) {
    const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    console.log(decoded)

    if (decoded) {
        User.findByPk(decoded.id)
            .then(user => {
                if (user) {
                    req.decodedUser = decoded
                    next()
                }
                else {
                    throw {
                        name: `Unauthorized`
                    }
                }
            })
            .catch(err => {
                next({
                    name: `Unauthorized`
                })
            })
    }
    else {
        next({
            name: `Unauthorized`
        })
    }
}


module.exports = authentication