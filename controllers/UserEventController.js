const { Event, User, UserEvent } = require('../models')

class EventController {

    static createUserEvent(req, res, next) {
      // const currentUserId = req.currentUserId
        const currentUserId = 1
        console.log(req.body);
        
        UserEvent.create({
            UserId: currentUserId,
            EventId: req.body.EventId,
            statusApplicant: false,
            statusPayment: false,
            payment: req.body.payment,
        })
        .then( data =>{
            res.status(201).json(data)
        })
        .catch(next)    
    }

    static updateEvent(req, res, next) {
      // const currentUserId = req.currentUserId
      const currentUserId = 1
      
      UserEvent.update({
          statusApplicant: req.body.statusApplicant,
          statusPayment: req.body.statusPayment,
          payment: req.body.payment
        },{ where:{
            EventId: req.params.EventId,
            UserId: currentUserId
        }, returning: true
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }
  
    static deleteEvent(req, res, next) {
      UserEvent.destroy({
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
                EventId: req.params.EventId
            }
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next) 
    }
}

module.exports = EventController