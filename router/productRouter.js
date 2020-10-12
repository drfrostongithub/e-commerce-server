const router = require(`express`).Router()
const ProductController = require(`../controllers/productCont`)
const authentication = require(`../middlewares/authentication`)
const authorization = require(`../middlewares/authorization`)

router.use(authentication)
router.get(`/`, ProductController.readProduct)

router.use(authorization)
router.post(`/`, ProductController.createProduct)
router.put(`/:id`, ProductController.updateProduct)
router.delete(`/:id`, ProductController.deleteProducts)



module.exports = router