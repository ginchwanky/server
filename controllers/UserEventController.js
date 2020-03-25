const { Event, User, UserEvent } = require("../models");

const { Expo } = require('expo-server-sdk')
const expo = new Expo();
let savedPushTokens = [];
const handlePushTokens = ({ bodyNotif, pushToken }) => {
  savedPushTokens.push(pushToken)
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: "SocialRent",
      body: bodyNotif
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};


class EventController {
  static createUserEvent(req, res, next) {
    const currentUserId = req.decoded.id;

    UserEvent.findAll({
      include: [User, Event],
      where: {
        UserId: currentUserId,
        date: req.body.date
      }
    })
      .then(data => {
        console.log(data.length);
        if (data.length > 0) {
          throw new Error("you have reservation at the same date");
        } else {
          handlePushTokens(req.body)
          return UserEvent.create({
            UserId: currentUserId,
            EventId: req.body.EventId,
            statusApplicant: false,
            statusPayment: false,
            payment: req.body.payment,
            date: req.body.date
          });
        }
      })
      .then(newData => {
        res.status(201).json(newData);
      })
      .catch(next);
  }

  static getUserHistory(req, res, next) {
    UserEvent.findAll({
      include: [User, Event],
      where: {
        UserId: req.params.UserId
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static updateApplicants(req, res, next) {
    let numOfRent;
    let jumlahApplicants;

    Event.findOne({
      where: {
        id: req.params.EventId
      }
    })
      .then(eventData => {
        numOfRent = eventData.numOfRent;

        return UserEvent.findAll({
          include: [Event],
          where: {
            EventId: req.params.EventId,
            statusApplicant: true
          }
        });
      })
      .then(data => {
        jumlahApplicants = data.length;
        if (jumlahApplicants === 0 || jumlahApplicants < numOfRent) {
          console.log("masuk if");

          return UserEvent.update(
            {
              statusApplicant: req.body.statusApplicant
            },
            {
              where: {
                EventId: req.params.EventId,
                UserId: req.body.UserId
              },
              returning: true
            }
          );
        } else {
          throw new Error("you already have enough people");
        }
      })
      .then(updated => {
        jumlahApplicants += 1;
        if (jumlahApplicants === numOfRent) {
          // console.log('mask then 2');
          Event.update(
            {
              statusEvent: "onGoing"
            },
            {
              where: {
                id: req.params.EventId
              },
              returning: true
            }
          );
        }
        res.status(200).json(updated);
      })
      .catch(next);
  }

  static updateEvent(req, res, next) {
    let numOfRent;
    let paylength;

    Event.findOne({
      where: {
        id: req.params.EventId
      }
    })
      .then(eventData => {
        numOfRent = eventData.numOfRent;

        return UserEvent.findAll({
          include: [Event],
          where: {
            EventId: req.params.EventId,
            statusPayment: true
          }
        });
      })
      .then(data => {
        paylength = data.length;

        return UserEvent.update(
          {
            statusPayment: req.body.statusPayment,
            payment: req.body.payment
          },
          {
            where: {
              EventId: req.params.EventId,
              UserId: req.body.UserId
            },
            returning: true
          }
        );
      })
      .then(newData => {
        paylength += 1;
        if (numOfRent) {
          if (numOfRent === paylength) {
            Event.update(
              {
                statusEvent: "complete"
              },
              {
                where: {
                  id: req.params.EventId
                },
                returning: true
              }
            );
          }
        }

        res.status(200).json(newData);
      })
      .catch(next);
  }

  static deleteEvent(req, res, next) {
    UserEvent.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static getEvent(req, res, next) {
    // console.log(req.params.EventId);

    UserEvent.findAll({
      include: [User, Event],
      where: {
        EventId: req.params.EventId
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
}

module.exports = EventController;
