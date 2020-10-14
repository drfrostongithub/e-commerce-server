const app = require('../app');
const request = require('supertest')
const { User } = require(`../models/index`)
const fs = require ('fs')
const dataUser =  JSON.parse(fs.readFileSync(`./dataUser.json`, `utf-8`))


describe('====Login====', () => {
    beforeAll((done) => {
        User.bulkCreate(
            dataUser
        )
        .then((data)=>{
            return User.findOne({ where: {email: 'admin@mail.com'}})
        })
        .then((data)=>{
            done()
        })
        .catch ((err)=>{
            done(err)
        })
    })
    afterAll((done)=>{
        User.destroy({
            where: {}, truncate:true, cascade:true
        })
        .then((data) =>{
            done()
        })
        .catch((err)=> {
            done(err)
        })
    })
    describe('===OK(200)===', () => {
        test('Login Oke', (done) => {
            request(app)
                .post(`/users/login`)
                .send({
                    email: "admin@mail.com",
                    password: "1234"
                })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    } else {
                        expect(res.body).toHaveProperty("access_token")
                        done()
                    }
                })
        })
    })
    describe('===EmailValidPassWrong===', () => {
        test('Login 400', (done) => {
        request(app)
            .post(`/users/login`)
            .send({
                email: "admin@mail.com",
                password: "123456"
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toHaveProperty("msg")
                    done()
                }
            })
        })
    })

    describe('===EmailNotInDatabase===', () => {
        test('Login 400', (done) => {
        request(app)
            .post(`/users/login`)
            .send({
                email: "json@mail.com",
                password: "123456"
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toHaveProperty("msg")
                    done()
                }
            })
        })
    })

    describe('===NotInsertEmailandPass===', () => {
        test('Login 400', (done) => {
        request(app)
            .post(`/users/login`)
            .send({
                email: "",
                password: ""
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toHaveProperty("msg")
                    done()
                }
            })
        })
    })
})