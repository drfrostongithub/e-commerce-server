const router = require(`express`).Router()
const ProductController = require(`../controllers/productCont`)
const authentication = require(`../middlewares/authentication`)
const authorization = require(`../middlewares/authorization`)

router.get(`/`, ProductController.readProduct)

router.use(authentication)
router.post(`/`,authorization, ProductController.createProduct)
router.get(`/:id`,authorization, ProductController.readProductById)
router.put(`/:id`,authorization, ProductController.updateProduct)
router.delete(`/:id`,authorization, ProductController.deleteProducts)



module.exports = router