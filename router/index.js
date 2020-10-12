const router = require(`express`).Router()
const user = require(`./userRouter`)
const product = require(`./productRouter`)

const Controller = require (`../controllers/controller`)

router.get(`/`, Controller.home)
router.use(`/products`, product)
router.use(`/users`, user)



module.exports = router