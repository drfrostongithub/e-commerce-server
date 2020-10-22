const router = require(`express`).Router()
const CartController = require(`../controllers/cartCont`)
const authentication = require(`../middlewares/authentication`)
const custAuth = require(`../middlewares/authorizationCust.js`)

router.use(authentication)
router.get(`/`,custAuth, CartController.getReadCart)
router.get(`/history`,custAuth, CartController.getHistory)
router.patch(`/:id/pay`,custAuth, CartController.payCart)
router.post(`/:id`,custAuth, CartController.postCreateCart)
router.patch(`/:id/amount`,custAuth, CartController.patchUpdateCart)
router.delete(`/:id`,custAuth, CartController.deleteCart)




module.exports = router