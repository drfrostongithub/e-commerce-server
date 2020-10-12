const jwt = require(`jsonwebtoken`)
const SECRET = process.env.JWT_SECRET

module.exports = {
    generateToken: payload => jwt.sign(payload, SECRET),
    verifyToken: token => jwt.verify(token, SECRET)
}