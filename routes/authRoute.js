const { registerUser, loginUser } = require("../controller/auth/authController")

const router = require("express").Router()

//routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

module.exports = router