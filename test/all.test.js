const app = require('../app');
const request = require('supertest')
const { Product } = require(`../models/index`);
const { User } = require('../models/index');
const jwt = require(`jsonwebtoken`)

let tokenAdmin
let tokenCustomer
let prodId

let dataProduct = [
  {
    name: "Middle east Sword",
    img_url: "contoh.jpg",
    price: 5000,
    stock: 2
  },
  {
    name: "Buckler",
    img_url: "contoh.jpg",
    price: 2000,
    stock: 1
  },
  {
    name: "Brandish",
    img_url: "contoh.jpg",
    price: 4000,
    stock: 2
  },
  {
    name: "Eastern Sword",
    img_url: "contoh.jpg",
    price: 3000,
    stock: 2
  }
]

describe('===All test cases===', () => {
  beforeAll((done) => {
    User.bulkCreate([{
      email: "putra@mail.com",
      password: "123",
      role: "customer"
    },
    {
      email: "admin@mail.com",
      password: "1234",
      role: "admin"
    }], {})
      .then((data) => {
        return User.findOne({ where: { email: "putra@mail.com" } })
      })
      .then((data) => {
        tokenCustomer = jwt.sign({
          id: data.id,
          email: data.email,
          role: data.role
        }, process.env.JWT_SECRET)
        return User.findOne({ where: { email: "admin@mail.com" } })
      })
      .then((data) => {
        tokenAdmin = jwt.sign({
          id: data.id,
          email: data.email,
          role: data.role
        }, process.env.JWT_SECRET)
        return Product.bulkCreate(dataProduct, {})
      })
      .then((data) => {
        return Product.findOne({ where: { name: "Buckler" } })
      })
      .then((data) => {
        prodId = data.id
        done()
      })
      .catch((err) => {
        done(err)
      })

  })

  afterAll((done) => {
    Product.destroy({
      where: {}, truncate: true
    })
      .then((result) => {
        return User.destroy({
          where: {}, truncate: true
        })
      })
      .then((result) => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  describe('====Success test cases====', () => {
    test('CREATE Product', (done) => {
      request(app)
        .post(`/products`)
        .set(`access_token`, tokenAdmin)
        .send({
          name: "Western Sword",
          img_url: "contoh.jpg",
          price: 5000,
          stock: 2
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.body.product.name).toBe('Western Sword');
            expect(res.body.product.img_url).toBe('contoh.jpg');
            expect(res.body.product.price).toBe(5000);
            expect(res.body.product.stock).toBe(2);
            done();
          }
        })
    })

    test('READ Product', (done) => {
      request(app)
        .get(`/products`)
        .set(`access_token`, tokenAdmin)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(200)
            expect(res.body).toBeDefined()
            done()
          }
        })
    })

    test('UPDATE Product', (done) => {
      request(app)
        .put(`/products/${prodId}`)
        .set(`access_token`, tokenAdmin)
        .send({
          name: "Broken Sword",
          img_url: "example.jpg",
          price: 5000,
          stock: 2
        })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(200)
            expect(res.body).toBeDefined()
            done();
          }
        })
    })

    test('DELETE Product', (done) => {
      request(app)
        .delete(`/products/${prodId}`)
        .set(`access_token`, tokenAdmin)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(200)
            done();
          }
        })
    })

    test('POST Login(200)', (done) => {
      request(app)
        .post(`/users/login`)
        .send({
          email: "admin@mail.com",
          password: "1234"
        })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("access_token")
            done();
          }
        })
    })
  })

  describe('====Failed test cases====', () => {
    describe('--== Login Fail ==--', () => {
      test('Email valid, pass wrong', (done) => {
        request(app)
          .post(`/users/login`)
          .send({
            email: "admin@mail.com",
            password: "1234567"
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty("msg")
              done();
            }
          })
      })

      test('Email is not in db', (done) => {
        request(app)
          .post(`/users/login`)
          .send({
            email: "gorgc@mail.com",
            password: "1234567"
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty("msg")
              done();
            }
          })
      })

      test('Empty email and password', (done) => {
        request(app)
          .post(`/users/login`)
          .send({
            email: "",
            password: ""
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty("msg")
              done();
            }
          })
      })
    })

    describe('--== Create Product ==--', () => {
      test('No access token', (done) => {
        request(app)
          .post(`/products`)
          .set(`access_token`, "")
          .send({
            name: "Western Sword",
            img_url: "contoh.jpg",
            price: 5000,
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

      test('access token not admin', (done) => {
        request(app)
          .post(`/products`)
          .set(`access_token`, tokenCustomer)
          .send({
            name: "Western Sword",
            img_url: "contoh.jpg",
            price: 5000,
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

      test('Field arent filled', (done) => {
        request(app)
          .post(`/products`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "",
            img_url: "",
            price: 5000,
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

      test('Stock is minus', (done) => {
        request(app)
          .post(`/products`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "Dota2 Figure",
            img_url: "example.jpg",
            price: 5000,
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

      test('Price is minus', (done) => {
        request(app)
          .post(`/products`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "Dota2 Figure",
            img_url: "example.jpg",
            price: -5000,
            stock: 3
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

      test('Field type not correct', (done) => {
        request(app)
          .post(`/products`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "Dota2 Figure",
            img_url: "example.jpg",
            price: "Denominated",
            stock: "Free For All"
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

    describe('--== Update Product ==--', () => {
      test('No access token', (done) => {
        request(app)
          .put(`/products`)
          .set(`access_token`, "")
          .send({
            name: "Western Sword",
            img_url: "contoh.jpg",
            price: 5000,
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

      test('access token not admin', (done) => {
        request(app)
          .put(`/products`)
          .set(`access_token`, tokenCustomer)
          .send({
            name: "Western Sword",
            img_url: "contoh.jpg",
            price: 5000,
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

      test('Stock is minus', (done) => {
        request(app)
          .put(`/products/${prodId}`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "Dota2 Figure",
            img_url: "example.jpg",
            price: 5000,
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

      test('Price is minus', (done) => {
        request(app)
          .put(`/products/${prodId}`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "Dota2 Figure",
            img_url: "example.jpg",
            price: -5000,
            stock: 3
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

      test('Field type not correct', (done) => {
        request(app)
          .put(`/products/${prodId}`)
          .set(`access_token`, tokenAdmin)
          .send({
            name: "Dota2 Figure",
            img_url: "example.jpg",
            price: "Denominated",
            stock: "Free For All"
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

    describe('--== DELETE Product ==--', () => {
      test('No access token', (done) => {
        request(app)
          .delete(`/products/${prodId}`)
          .set(`access_token`, "")
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(401)
              done();
            }
          })
      })

      test('Access token not admin', (done) => {
        request(app)
          .delete(`/products/${prodId}`)
          .set(`access_token`, tokenCustomer)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(401)
              done();
            }
          })
      })

    })

  })

})
