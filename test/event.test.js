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
describe('Events Routes', () => {
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
      queryInterface.bulkDelete('Events', null, {})
          .then(response => {
              done()
          })
          .catch(err => {
              next(err)
          })
  })

    // create event success
    describe("create event Test", () => {
      test("it should return new event object and status 201", done => {
        request(app)
          .post("/events")
          .set('access_token', access_token)
          .send({
            name: 'kondangan kuy',
            desc: 'temenin dungs',
            date: '2020-07-28',
            numOfRent: 2,
          })
          .end((err, response) => {
            expect(err).toBe(null);
            let decoded = jwt.verify(access_token, process.env.SECRET)
            id_event = response.body.id
            expect(response.body).toHaveProperty("name", "kondangan kuy");
            expect(response.body).toHaveProperty("description", "temenin dungs");
            expect(response.body).toHaveProperty("numOfRent", 2);
            expect(response.status).toBe(201);
            done();
          });
      });
    });

    describe("create event failed", () => {
      test("it should return array of errors and status 500", done => {
        request(app)
          .post("/events")
          .set('access_token', access_token)
          .send({
            name: '',
            desc: '',
            date: '',
            numOfRent: 2,
          })
          .end((err, response) => {
            expect(err).toBe(null);
            expect(response.body).toHaveProperty(
              "errors",
              expect.arrayContaining(['name can not be empty',
              'description can not be empty',
              "Date can't be empty, please fill the due_date"])
            );
            expect(response.status).toBe(500);
            done();
          });
      });
    });

    describe("create event failed", () => {
      test("it should return array of errors and status 500", done => {
        request(app)
          .post("/events")
          .set('access_token', access_token)
          .send({
            name: 'kondangan kuy',
            desc: 'temenin dungs',
            date: '2018-06-07',
            numOfRent: 0,
          })
          .end((err, response) => {
            expect(err).toBe(null);
            console.log(response.body);
            
            expect(response.body).toHaveProperty(
              "errors",
              expect.arrayContaining(["minimum person is 1"])
            );
            expect(response.status).toBe(500);
            done();
          });
      });
    });

    // update event success
    describe("create event Test", () => {
      test("it should return new event object and status 201", done => {
        request(app)
          .put(`/events/${id_event}`)
          .set('access_token', access_token)
          .send({
            name: 'gajadi kondangan',
            statusEvent: 'complete'
          })
          .end((err, response) => {
            expect(err).toBe(null);
            expect(response.body[1][0]).toHaveProperty("name", "gajadi kondangan");
            expect(response.body[1][0]).toHaveProperty("statusEvent", "complete");
            expect(response.status).toBe(200);
            done();
          });
      });
    });

    // update event failed
    describe("update event failed", () => {
      test("it should return error and status 500", done => {
        request(app)
          .put(`/events/${id_event}`)
          .send({
            name: 'kondangan kuy',
            desc: 'temenin dungs',
            date: '2020-07-28',
            numOfRent: 1,
          })
          .end((err, response) => {
            expect(err).toBe(null);
            expect(response.body).toHaveProperty(
              "errors",
              expect.arrayContaining(["jwt must be provided"])
            );
            expect(response.status).toBe(500);
            done();
          });
      });
    });

    //get event success
    describe('Successful get all events', () => {
        test(`should return array of events`, (done) => {
            request(app)
                .get('/events')
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toEqual(expect.any(Array))
                    expect(response.status).toBe(200);
                    done()
                })
        })
    })

      //get eventhistory
      describe('Successful get user event history', () => {
        test(`should return array of events`, (done) => {
            request(app)
                .get(`events/history/${id_u}`)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toEqual(expect.any(Array))
                    expect(response.status).toBe(200);
                    done()
                })
        })
    })

      //get one event success
      describe('Successful get all events', () => {
        test(`should return array of events`, (done) => {
            request(app)
                .get(`/events/${id_event}`)
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body.event).toHaveProperty("name", "gajadi kondangan");
                    expect(response.status).toBe(200);
                    done()
                })
        })
    })

    describe('Successful delete an event', () => {
      test(`should return array of events`, (done) => {
          request(app)
              .delete(`/events/${id_event}`)
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