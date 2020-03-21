const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize, Event } = require('../models')
const { queryInterface } = sequelize
const { checkPassword } = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')
const Op = sequelize.Sequelize.Op
let access_token
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
            bio: "talkative"
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
        numOfRent: 2,
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
        .post("/UserEvent")
        .set('access_token', access_token)
        .send({
          EventId: id_event,
          payment: 300000,
          date: '2020-07-17'
        })
        .end((err, response) => {
          expect(err).toBe(null);
          id_UserEvent = response.body[0].id
          expect(response.body[0]).toHaveProperty("payment", 300000);
          expect(response.status).toBe(201);
          done();
        });
    });
  });

  // create failed
  describe("create UserEvent success", () => {
    test("it should return new event object and status 201", done => {
      request(app)
        .post("/UserEvent")
        .set('access_token', access_token)
        .send({
          EventId: id_event,
          payment: 0,
          date: '2018-07-17'
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
  describe("create UserEvent failed", () => {
    test("it should return error and status 500", done => {
      request(app)
        .post("/UserEvent")
        .set('access_token', access_token)
        .send({
          EventId: id_event,
          payment: 300000,
          date: '2020-07-17'
        })
        .end((err, response) => {
          expect(err).toBe(null);
          expect(response.body).toHaveProperty("message", 'you have reservation at the same date');
          expect(response.status).toBe(500);
          done();
        });
    });
  });

   // update status
   describe("create UserEvent failed", () => {
    test("it should return error and status 500", done => {
      request(app)
        .put(`/UserEvent/${id_event}`)
        .set('access_token', access_token)
        .send({
          statusApplicant: true,
          statusPayment: true,
          payment: 20000,
          UserId: id_user
        })
        .end((err, response) => {
          expect(err).toBe(null);
          expect(response.body[1][0]).toHaveProperty("statusApplicant", true);
          expect(response.body[1][0]).toHaveProperty("statusPayment", true);
          expect(response.status).toBe(200);
          done();
        });
    });
  });

  // get an event success
  describe('Successfully get an event', () => {
    test(`should return array of events`, (done) => {
        request(app)
            .get(`/UserEvent/${id_event}`)
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
            .delete(`/UserEvent/${id_UserEvent}`)
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