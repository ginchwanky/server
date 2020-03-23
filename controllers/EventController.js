const { Event, User, UserEvent } = require('../models')

class EventController {
    static createEvent(req, res, next) {
        // console.log(req.body);
        const currentUserId = req.decoded.id
        Event.create({
            name: req.body.name,
            statusEvent: 'pending',
            description: req.body.desc,
            date: req.body.date,
            numOfRent: req.body.numOfRent,
            UserId: currentUserId,
            location: req.body.location
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static updateEvent(req, res, next) {
        Event.update({
            name: req.body.name,
            statusEvent: req.body.statusEvent,
            description: req.body.desc,
            date: req.body.date,
            numOfRent: req.body.numOfRent,
            location: req.body.location
        }, {
            where: {
                id: req.params.id
            }, returning: true
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static findAllEvent(req, res, next) {
        Event.findAll({
            include: [User]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        let detail
        Event.findOne({
            include: [User],
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                detail = data
                return User.findOne({
                    where:{
                        id: data.UserId
                    }
                })
            })
            .then( newdata =>{
                let detailEvent = {
                    creator: newdata,
                    event: detail
                }
                res.status(200).json(detailEvent)
            })
            .catch(next)
    }
    static deleteEvent(req, res, next) {
        Event.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

}

module.exports = EventController