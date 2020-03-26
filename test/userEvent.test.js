const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize, Event } = require('../models')
const { queryInterface } = sequelize
const { checkPassword } = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')
const Op = sequelize.Sequelize.Op
let access_token
let access_token2
let id_event
let id_user
let id_UserEvent
describe.only('UserEvent Routes', () => {
    beforeAll(done => {
        User.create({
            name: "dummy",
            email: "dummy@mail.com",
            password: "dummy",
            age: 22,
            gender: "male",
            bio: "talkative",
            pushToken: 'ExponentPushToken[wJRUhrM2B84ZfEdcZtWtH_]',
            bodyNotif: `There's new event for you`
        })
            .then(result => {
              // console.log(result.name);
              let { name, email, password, age, gender, bio, id } = result
              let newUser = { name, email, password, age, gender, bio, id }
              let payload = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                gender: newUser.gender,
                bio: newUser.bio
            }
              id_user = newUser.id
              access_token = jwt.sign(payload, process.env.SECRET)
                // done()

              return User.create({
                name: "second",
                email: "second@mail.com",
                password: "second",
                age: 22,
                gender: "male",
                bio: "talkative"
            })
            })
            .then( secondUser =>{
              let { name, email, password, age, gender, bio, id } = secondUser
              let newUser = { name, email, password, age, gender, bio, id }
              let payload = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                gender: newUser.gender,
                bio: newUser.bio
            }
              // id_user = newUser.id
              access_token2 = jwt.sign(payload, process.env.SECRET)
                done()
            })
            .catch(err => {
                console.log(err);
            })
    })
    beforeAll(done => {
      Event.create({
        name: 'kondangan kuy',
        description: 'temenin dungs',
        date: '2020-07-28',
        numOfRent: 1,
        UserId: id_user
      })
      .then( result =>{
        id_event = result.id
        done()

      })
      .catch(err => {
          console.log(err);
      })
  })
    afterAll(done => {
        queryInterface.bulkDelete('Users', null, {})
            .then(response => {
                done()
            })
            .catch(err => {
                next(err)
            })
    })
    afterAll(done => {
      queryInterface.bulkDelete('UserEvents', null, {})
          .then(response => {
              done()
          })
          .catch(err => {
              next(err)
          })
  })

   // create UserEvent success
   describe("create UserEvent success", () => {
    test("it should return new event object and status 201", done => {
      request(app)
        .post("/userEvent")
        .set('access_token', access_token)
        .send({
          EventId: id_event,
          payment: 300000,
          date: '2020-07-17'
        })
        .end((err, response) => {
          expect(err).toBe(null);
          id_UserEvent = response.body.id
          expect(response.body).toHaveProperty("payment", 300000);
          expect(response.status).toBe(201);
          done();
        });
    });
  });

  // create failed
  describe("create UserEvent success", () => {
    test("it should return new event object and status 201", done => {
      request(app)
        .post("/userEvent")
        .set('access_token', access_token)
        .send({
          EventId: id_event,
          payment: 0,
          date: '2018-07-17',
          pushToken: 'ExponentPushToken[wJRUhrM2B84ZfEdcZtWtH_]',
          bodyNotif: `There's new event for you`
        })
        .end((err, response) => {
          expect(err).toBe(null);
          expect(response.body).toHaveProperty(
            "errors",
            expect.arrayContaining(['choose future date', 'minimum payment is 1'])
          );
          expect(response.status).toBe(500);
          done();
        });
    });
  });

  // failed, same date
  describe("create userEvent failed", () => {
    test("it should return error and status 500", done => {
      request(app)
        .post("/userEvent")
        .set('access_token', access_token)
        .send({
          EventId: id_event,
          payment: 300000,
          date: '2020-07-17'
        })
        .end((err, response) => {
          expect(err).toBe(null);
          expect(response.body).toHaveProperty("errors", ["you have reservation at the same date"]);
          expect(response.status).toBe(500);
          done();
        });
    });
  });

   // update status payyment
   describe("update UserEvent success", () => {
    test("it should object of array and status 200", done => {
      request(app)
        .put(`/userEvent/payments/${id_event}`)
        .set('access_token', access_token)
        .send({
          statusPayment: true,
          payment: 20000,
          UserId: id_user
        })
        .end((err, response) => {
          expect(err).toBe(null);
          expect(response.body[1][0]).toHaveProperty("statusPayment", true);
          expect(response.body[1][0]).toHaveProperty("payment", 20000);
          expect(response.status).toBe(200);
          done();
        });
    });
  });

     // update status applicants
     describe("update UserEvent statusApplicant succes", () => {
      test("it should object of array and status 200", done => {
        request(app)
          .put(`/userEvent/applicants/${id_event}`)
          .set('access_token', access_token)
          .send({
            statusApplicant: true,
            UserId: id_user
          })
          .end((err, response) => {
            expect(err).toBe(null);
            expect(response.body[1][0]).toHaveProperty("statusApplicant", true);
            expect(response.status).toBe(200);
            done();
          });
      });
    });

     // ReCreate UserEvent success to hit the next test error
      describe("create UserEvent success", () => {
        test("it should return new event object and status 201", done => {
          request(app)
            .post("/userEvent")
            .set('access_token', access_token2)
            .send({
              EventId: id_event,
              payment: 300000,
              date: '2020-07-17'
            })
            .end((err, response) => {
              expect(err).toBe(null);
              id_UserEvent = response.body.id
              expect(response.body).toHaveProperty("payment", 300000);
              expect(response.status).toBe(201);
              done();
            });
        });
      });

     // update status applicants error
     describe("update UserEvent statusApplicant failes", () => {
      test("it should return event has enough people and status 200", done => {
        request(app)
          .put(`/userEvent/applicants/${id_event}`)
          .set('access_token', access_token)
          .send({
            statusApplicant: true,
            UserId: id_user
          })
          .end((err, response) => {
            expect(err).toBe(null);
            expect(response.body).toHaveProperty("errors", ["you already have enough people"]);
            expect(response.status).toBe(500);
            done();
          });
      });
    });

    //get UserEvent history
    describe('Successful get user event history', () => {
      test(`should return array of events`, (done) => {
          request(app)
              .get(`/userEvent/history/${id_user}`)
              .end((err, response) => {
                  expect(err).toBe(null)
                  console.log(response.body, '{}{}{}{}{)*(*)(*()9070');
                  expect(response.body).toEqual(expect.any(Array))
                  expect(response.status).toBe(200);
                  done()
              })
      })
  })

  // get an event success
  describe('Successfully get an event', () => {
    test(`should return array of events`, (done) => {
        request(app)
            .get(`/userEvent/${id_event}`)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body[0]).toHaveProperty("EventId", id_event);
                expect(response.status).toBe(200);
                done()
            })
    })
  })

  // delete userEvent
  describe('Successful delete an event', () => {
    test(`should return array of events`, (done) => {
        request(app)
            .delete(`/userEvent/${id_UserEvent}`)
            .set('access_token', access_token)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toEqual(1)
                expect(response.status).toBe(200);
                done()
            })
    })
})



})