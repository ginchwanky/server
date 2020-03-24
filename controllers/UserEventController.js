const { Event, User, UserEvent } = require('../models')

class EventController {

    static createUserEvent(req, res, next) {
      const currentUserId = req.decoded.id

      UserEvent.findAll({
        include: [User, Event],
        where:{
            UserId: currentUserId,
            date: req.body.date,
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
                    date: req.body.date,
                })
            }

        })
        .then( newData =>{
            res.status(201).json(newData)
        })
        .catch(next)  
    }

    static getUserHistory (req, res, next){
        UserEvent.findAll({
            include: [User, Event],
            where:{
                UserId: req.params.UserId
            }
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next) 
    }

    static updateApplicants (req, res, next){
        let numOfRent
        let jumlahApplicants
        UserEvent.findAll({
            include: [Event],
            where:{
                EventId: req.params.EventId,
                statusApplicant: true
            }
        })
        .then( data =>{
            if (data[0]) {
                numOfRent = data[0].Event.numOfRent
            }
            
            console.log('{}{}{  ini data', data.length);
            jumlahApplicants = data.length
            if(data.length === 0 || data.length < numOfRent){
              console.log('masuk if');
              
                return UserEvent.update({
                    statusApplicant: req.body.statusApplicant,
                  },{ where:{
                      EventId: req.params.EventId,
                      UserId: req.body.UserId
                  }, returning: true
                  })
            }else{
                throw new Error("you already have enough people")
            }
            
        })
        .then( updated =>{
            
            jumlahApplicants+= 1
            if(numOfRent){
                if (jumlahApplicants === numOfRent) {
                    // console.log('mask then 2');
                    Event.update({
                        statusEvent: 'onGoing',
                    }, {
                        where: {
                            id: req.params.EventId
                        }, returning: true
                    })
                }
            }
            res.status(200).json(updated)
        })
        .catch(next) 
        

    }

    
    static updateEvent(req, res, next) {
      
    
        let numOfRent
        let paylength
        
        UserEvent.findAll({
            include: [Event],
            where:{
                EventId: req.params.EventId,
                statusPayment: true
            }
        })
        .then( data =>{
            if (data[0]) {
                numOfRent = data[0].Event.numOfRent
            }
            paylength = data.length

            return UserEvent.update({
                statusPayment: req.body.statusPayment,
                payment: req.body.payment
            },{ where:{
                EventId: req.params.EventId,
                UserId: req.body.UserId
            }, returning: true
            })
        })
        .then( newData =>{
            paylength += 1
            if(numOfRent){
                if(numOfRent === paylength){
                    Event.update({
                        statusEvent: 'complete',
                    }, {
                        where: {
                            id: req.params.EventId
                        }, returning: true
                    })
                }
            }

            res.status(200).json(newData)
        } )
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