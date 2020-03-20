const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
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
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll(done => {
        queryInterface.bulkDelete('Users', null, {})
            .then(response => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    //register success
    describe('Successful Registration', () => {
        test(`should return json of message, name, and access token with status 201`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "newUser",
                    email: "newUser@mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: "cheerful"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Register Success')
                    expect(response.body).toHaveProperty('name', 'newUser')
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                    expect(response.status).toBe(201)
                    done()
                })
        })
    })

    //register failed: duplicated email
    describe('Error Registration : Duplicated Email', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy@mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Register Failed')
                    expect(response.body).toHaveProperty('errors', ["user already exists"])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: minimum password length is 4
    describe('Error Registration : Minimum Password is Less Than 4', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2@mail.com",
                    password: "dum",
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['minimum password length is 4'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //invalid email format
    describe('Error Registration : Invalid Email Format', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['invalid email format'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: password can not be empty
    describe('Error Registration : Empty Password', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2@mail.com",
                    password: "",
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', expect.any(Array))
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: password can not be null
    describe('Error Registration : Null Password', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2@mail.com",
                    password: null,
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    console.log('=======', response.body)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['password can not be null'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: name can not be empty
    describe('Error Registration : Empty Name', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "",
                    email: "dummy2@mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['name can not be empty'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: name can not be null
    describe('Error Registration : Null Name', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: null,
                    email: "dummy2@mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['name can not be null'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: age can not be null
    describe('Error Registration : Null Age', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2@mail.com",
                    password: "dummy",
                    age: null,
                    gender: "male",
                    bio: "talkative"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['age can not be null'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: bio can not be empty
    describe('Error Registration : Empty Bio', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2@mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: ""
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['bio can not be empty'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //register failed: bio can not be null
    describe('Error Registration : Null Age', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
                .post('/users/register')
                .send({
                    name: "dummy",
                    email: "dummy2@mail.com",
                    password: "dummy",
                    age: 22,
                    gender: "male",
                    bio: null
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Bad Request')
                    expect(response.body).toHaveProperty('errors', ['bio can not be null'])
                    expect(response.body.status).toBe(400)
                    done()
                })
        })
    })
    //login success
    describe('Successful Login', () => {
        test(`returning json of message and token with status 201`, (done) => {
            request(app)
                .post('/users/login')
                .send({
                    email: "dummy@mail.com",
                    password: "dummy"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Login Success!')
                    expect(response.body).toHaveProperty('name', 'dummy')
                    expect(response.body).toHaveProperty('access_token', expect.any(String))
                    expect(response.status).toBe(200)
                    done()
                })
        })
    })
    //login failed: invalid email/password
    describe('Login failed, invalid email/password', () => {
        test(`returning json of message and token with status 400`, (done) => {
            request(app)
                .post('/users/login')
                .send({
                    email: "dummy@mail.com",
                    password: "dummyy"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Login Failed')
                    expect(response.body).toHaveProperty('errors', ['invalid email/password'])
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })
    //login failed: invalid email/password
    describe('Login failed, invalid email/password', () => {
        test(`returning json of message and token with status 400`, (done) => {
            request(app)
                .post('/users/login')
                .send({
                    email: "dummmy@mail.com",
                    password: "dummy"
                })
                .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('message', 'Login Failed')
                    expect(response.body).toHaveProperty('errors', ['user does not exists'])
                    expect(response.status).toBe(400)
                    done()
                })
        })
    })
})