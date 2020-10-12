const router = require(`express`).Router()
const UserController = require(`../controllers/userCont`)

router.post(`/login`, UserController.login)
router.post(`/googleSignIn`, UserController.googleSignIn)
router.post(`/register`, UserController.register)


module.exports = router