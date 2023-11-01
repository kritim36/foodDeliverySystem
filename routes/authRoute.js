const { registerUser, loginUser, forgetPassword } = require("../controller/auth/authController")

const router = require("express").Router()

//routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgetPassword").post(forgetPassword)

module.exports = router