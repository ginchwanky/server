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
                            email: user.email,
                            age: user.age,
                            gender: user.gender,
                            bio: user.bio,
                            profilePicture: user.profilePicture
                        }
                        let access_token = jwt.sign(payload, process.env.SECRET)
                        res.status(200).json({
                            message: 'Login Success!',
                            name: user.name,
                            email: user.email,
                            age: user.age,
                            gender: user.gender,
                            bio: user.bio,
                            profilePicture: user.profilePicture,
                            access_token,
                            id: user.id
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
            .catch(next)
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
                    return User.create(newUser)
                        .then(newUser => {
                            let payload = {
                                id: newUser.id,
                                name: newUser.name,
                                email: newUser.email,
                                age: newUser.age,
                                gender: newUser.gender,
                                bio: newUser.bio,
                                profilePicture: newUser.profilePicture
                            }
                            let access_token = jwt.sign(payload, process.env.SECRET)
                            res.status(201).json({
                                message: 'Register Success',
                                name: user.name,
                                email: user.email,
                                age: user.age,
                                gender: user.gender,
                                bio: user.bio,
                                profilePicture: user.profilePicture,
                                access_token,
                                id: user.id
                            })
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            })
            .catch(next)
    }
}

module.exports = UserController