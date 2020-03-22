const { Event, User, UserEvent } = require('../models')

class EventController {

    static createUserEvent(req, res, next) {
      const currentUserId = req.decoded.id
      let tanggal = new Date(req.body.date)
        
      UserEvent.findAll({
        include: [User, Event],
        where:{
            UserId: currentUserId,
            date: tanggal,
        }
        })
        .then( data =>{
            console.log(data.length);
            if (data.length > 0) {
                throw new Error('you have reservation at the same date')
            }else{
                return UserEvent.create({
                    UserId: currentUserId,
                    EventId: req.body.EventId,
                    statusApplicant: false,
                    statusPayment: false,
                    payment: req.body.payment,
                    date: tanggal,
                })
            }

        })
        .then( newData =>{
            res.status(201).json(newData)
        })
        .catch(next)  
    }

    static updateApplicants (req, res, next){

        UserEvent.findAll({
            include: [Event],
            where:{
                EventId: req.params.EventId,
                statusApplicant: true
            }
        })
        .then( data =>{
            console.log('{}{}{  ini data', data.length);
            if(data.length === 0 || data.length < data[0].Event.numOfRent){
              
                return UserEvent.update({
                    statusApplicant: req.body.statusApplicant,
                  },{ where:{
                      EventId: req.params.EventId,
                      UserId: req.body.UserId
                  }, returning: true
                  })
            }else{
                console.log('mask else');
                throw new Error("you already have enough people")
            }
            
        })
        .then( updated =>{
            res.status(200).json(updated)
        })
        .catch(next) 
        

    }

    
    static updateEvent(req, res, next) {
      
      UserEvent.update({
          statusPayment: req.body.statusPayment,
          payment: req.body.payment
        },{ where:{
            EventId: req.params.EventId,
            UserId: req.body.UserId
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
        // console.log(req.params.EventId);
        
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