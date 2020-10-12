const { User } = require(`../models/index`)
const bcryptjs = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const { generateToken } = require('../helpers/jwt');
const SECRET_PASSWORD = process.env.SECRET_PASSWORD


class UserController {
    
    static async login(req, res, next) {
        
        const { email, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            
            if (user === null) {
                throw {
                    name: `Wrong email/password`
                }
            }
            const validPassword = bcryptjs.compareSync(password, user.password) //compare body with hash bcryptjs
            
            if (validPassword) {
                const access_token = jwt.sign({
                    email: user.email,
                    role: user.role
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    access_token
                })
            }else if(password === user.password){
                const access_token = jwt.sign({
                    email: user.email,
                    role: user.role
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    access_token
                })
            } 
            else {
                throw {
                    name: `Wrong email/password`
                }
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        const { email, password } = req.body
        try {
            const user = await User.create(
                {
                    email,
                    password
                }
            )
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        }
        catch (err) {
            next(err)
        }
    }


    static googleSignIn(req, res, next) {
        const id_token = req.headers.id_token
        let email
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email

                return User.findOne({
                    where: {
                        email
                    }
                })

            })
            .then(user => {
                console.log(user)
                if (!user) {
                    return User.create({
                        email,
                        password: SECRET_PASSWORD
                    })
                }
                else {
                    return user
                }
            })
            .then(user => {
                const payload = { id: user.id, email: user.email }
                const jwtToken = generateToken(payload)
                return res.status(200).json({
                    token: jwtToken
                })
            })
            .catch(err => [
                next(err)
            ])
    }

}

module.exports = UserController