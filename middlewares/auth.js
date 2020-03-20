const { User } = require('../models')
const { Event } = require('../models')
const jwt = require('jsonwebtoken')

authentication = (req, res, next) => {
    let decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    User.findOne({ where: { id: decoded.id } })
        .then(user => {
            if (user) {
                req.decoded = decoded
                next()
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

authorization = (req, res, next) => {
    Event.findOne({ where: { id: req.params.id } })
    .then(event => {
        if (!event) {
            next({
                status: 404,
                name: 'Not Found',
                message: 'event does not exists'
            })
        } else {
            if (event.UserId == req.decoded.id) {
                next()
            } else {
                next({
                    status: 403,
                    name: 'UNAUTHORIZED',
                    message: 'you are not authorized'
                })
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { authentication, authorization }