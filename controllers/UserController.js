const { User } = require('../models')
const { checkPassword } = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')

class UserController {
    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    if (checkPassword(password, user.password)) {
                        let payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                        let access_token = jwt.sign(payload, process.env.SECRET)
                        res.status(200).json({
                            message: 'Login Success!',
                            name: user.name,
                            access_token
                        })
                    } else {
                        next({
                            status: 400,
                            name: 'Login Failed',
                            message: 'invalid email/password'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        name: 'Login Failed',
                        message: 'user does not exists'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static register(req, res, next) {
        let { name, email, password, age, gender, bio } = req.body
        let newUser = { name, email, password, age, gender, bio }
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    next({
                        status: 400,
                        name: 'Register Failed',
                        message: 'user already exists'
                    })
                } else {
                    User.create(newUser)
                        .then(newUser => {
                            let payload = {
                                id: newUser.id,
                                name: newUser.name,
                                email: newUser.email,
                                age: newUser.age,
                                gender: newUser.gender,
                                bio: newUser.bio
                            }
                            let access_token = jwt.sign(payload, process.env.SECRET)
                            res.status(201).json({
                                message: 'Register Success',
                                name: newUser.name,
                                access_token
                            })
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController