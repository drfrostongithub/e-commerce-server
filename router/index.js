const router = require(`express`).Router()
const user = require(`./userRouter`)
const product = require(`./productRouter`)
const cart = require(`./cartRouter`)

const Controller = require (`../controllers/controller`)

router.get(`/`, Controller.home)
router.use(`/products`, product)
router.use(`/users`, user)
router.use(`/carts`, cart)



module.exports = router