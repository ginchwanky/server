const { Event, User, UserEvent } = require('../models')

class EventController {

    static createUserEvent(req, res, next) {
      const currentUserId = req.decoded.id
        // const currentUserId = 1
        console.log(req.body, '0787070', currentUserId);
        // butuh tanggal
        UserEvent.findOrCreate({
            where:{
                UserId: currentUserId,
                EventId: req.body.EventId,
                statusApplicant: false,
                statusPayment: false,
                payment: req.body.payment,
                date: req.body.date
            }
        })
        .then( data =>{
            // console.log(data, 'ini hasil data');
            if(data[0].id){
                res.status(201).json(data)

            }else{
                next({
                    name: 'you have reservation at the same date',
                    status: 500
                })
            }
            
        })
        .catch(next)    
    }

    static updateEvent(req, res, next) {
      // const currentUserId = req.decoded.id
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