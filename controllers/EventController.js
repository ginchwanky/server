const { Event, User, UserEvent } = require('../models')

class EventController {
    static createEvent(req, res, next) {
        console.log(req.body);
        const currentUserId = 1
        Event.create({
            name: req.body.name,
            statusEvent: 'pending',
            description: req.body.desc,
            date: req.body.date,
            numOfRent: req.body.numOfRent,
            UserId: currentUserId
        })
        .then( data =>{
            res.status(201).json(data)
        })
        .catch(next)
        
    }
    static updateEvent(req, res, next) {
        Event.update({
            name: req.body.name,
            statusEvent: 'pending',
            description: req.body.desc,
            date: req.body.date,
            numOfRent: req.body.numOfRent,
        },{ where:{
            id: req.params.id
        }, returning: true
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findAllEvent(req, res, next) {
        Event.findAll()
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req, res, next) {
        Event.findOne({
            include: [User],
            where: {
              id: req.params.id
            }
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    static deleteEvent(req, res, next) {
        Event.destroy({
            where:{
                id: req.params.id
            }
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getEvent( req, res, next){
        UserEvent.findAll({
            include: [User, Event],
            where:{
                EventId: req.params.id
            }
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next) 
    }
}

module.exports = EventController