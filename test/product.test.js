const app = require('../app');
const request = require('supertest')
const { User, Product } = require(`../models/index`)
const jwt = require(`jsonwebtoken`)
const fs = require(`fs`)
const dataUser = JSON.parse(fs.readFileSync(`./dataUser.json`, `utf-8`))
const dataProduct = JSON.parse(fs.readFileSync(`./dataProduct.json`, `utf-8`))


let tokenAdmin
let tokenCustomer
let prodId

describe('====Product====', () => {
    beforeAll((done) => {
        console.log(dataProduct)
        User.bulkCreate(
            dataUser
        )
            .then((data) => {
                return User.findOne({ where: { email: "admin@mail.com" } })
            })
            .then((data) => {
                tokenAdmin = jwt.sign({
                    id: data.id,
                    email: data.email,
                    role: data.role
                }, process.env.JWT_SECRET)
                return User.findOne({ where: { email: "wehsing@hotmail.com" } })
            })
            .then((data) => {
                tokenCustomer = jwt.sign({
                    id: data.id,
                    email: data.email,
                    role: data.role
                }, process.env.JWT_SECRET)
                return Product.bulkCreate(dataProduct, {})
            })
            .then((data) => {
                return Product.findOne({ where: { name: "Brandish" } })
            })
            .then((data) => {
                console.log(data)
                prodId = data.id
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    afterAll((done)=>{
        User.destroy({
            where: {}, truncate:true, cascade:true
        })
        .then((data) =>{
            Product.destroy({
                where: {}, truncate:true, cascade:true
            })
            done()
        })
        .catch((err)=> {
            done(err)
        })
    })

    describe('===Create===', () => {
        describe('====Create Product====', () => {
            test('Success (201)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Lamborghini",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: 15000,
                        stock: 1
                    })
                    .expect(201)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body.product.name).toBe('Lamborghini');
                            expect(res.body.product.img_url).toBeTruthy();
                            done();
                        }
                    })
            })
        })

        describe('====Create Product No access token====', () => {
            test('Fail (401)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, "")
                    .send({
                        name: "Lamborghini",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: 15000,
                        stock: 1
                    })
                    .expect(401)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Access token not admin====', () => {
            test('Fail (401)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, tokenCustomer)
                    .send({
                        name: "Lamborghini",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: 15000,
                        stock: 1
                    })
                    .expect(401)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Field didn fill====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Lamborghini",
                        img_url: "",
                        description: "",
                        price: 15000,
                        stock: 1
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Stock is minus====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Lamborghini",
                        img_url: "",
                        description: "",
                        price: 15000,
                        stock: -1
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Price is minus====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Lamborghini",
                        img_url: "",
                        description: "",
                        price: -15000,
                        stock: 1
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Field Type not correct====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .post(`/products`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Lamborghini",
                        img_url: "",
                        description: "",
                        price: "Hello",
                        stock: "hai"
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })


    })
    describe('===Update===', () => {
        describe('====Update Product====', () => {
            test('Success (200)', (done) => {
                request(app)
                    .put(`/products/${prodId}`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Bajaj",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: 15000,
                        stock: 2
                    })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toBeTruthy();
                            done();
                        }
                    })
            })
        })

        describe('====Access not admin====', () => {
            test('Fail (401)', (done) => {
                request(app)
                    .put(`/products/${prodId}`)
                    .set(`access_token`, tokenCustomer)
                    .send({
                        name: "Bajaj",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: 15000,
                        stock: 2
                    })
                    .expect(401)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Stock is minus====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .put(`/products/${prodId}`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Bajaj",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: 15000,
                        stock: -2
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Price is minus====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .put(`/products/${prodId}`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Bajaj",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: -15000,
                        stock: 2
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })

        describe('====Data Types are wrong====', () => {
            test('Fail (400)', (done) => {
                request(app)
                    .put(`/products/${prodId}`)
                    .set(`access_token`, tokenAdmin)
                    .send({
                        name: "Bajaj",
                        img_url: "mbil.jpg",
                        description: "Car",
                        price: "free",
                        stock: "unlimited"
                    })
                    .expect(400)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.body).toHaveProperty('msg');
                            done();
                        }
                    })
            })
        })
    })

    describe('===DELETE===', () => {
        describe('===Delete Success===', () => {
            test('Delete Success(200)', (done) => {
                request(app)
                    .delete(`/products/${prodId}`)
                    .set(`access_token`, tokenAdmin)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(200)
                            done()
                        }
                    })
            })
        })

        describe('===Access token not admin===', () => {
            test('Delete Success(401)', (done) => {
                request(app)
                    .delete(`/products/${prodId}`)
                    .set(`access_token`, tokenCustomer)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(401)
                            done()
                        }
                    })
            })
        })


        describe('===No access token===', () => {
            test('Delete Success(401)', (done) => {
                request(app)
                    .delete(`/products/${prodId}`)
                    .set(`access_token`, "")
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(401)
                            done()
                        }
                    })
            })
        })
    })
})

