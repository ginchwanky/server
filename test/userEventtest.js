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
        desc: 'temenin dungs',
        date: '2020-07-28',
        numOfRent: 2,
        UserId: id_user
      })
      .then( result =>{
        console.log(result, '0870870870');
        id_event = result
        done()

      })
      .catch(err => {
          console.log(err);
      })
  })
    afterAll(done => {
      console.log(access_token, ' acc token');
      console.log(id_user, 'ini id user');
      
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
          EventId: 2,
          payment: 300000,
          date: '2020-07-17'
        })
        .end((err, response) => {
          expect(err).toBe(null);
          console.log(response.body, "[][][][][][][][][ ini body");
          console.log(id_event, '()()897697969()(');
          
          expect(response.status).toBe(201);
          done();
        });
    });
  });

})