const { createProduct } = require('../controller/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const permitTo = require('../middleware/permitTo')


const router = require('express').Router()

router.route("/product").post(isAuthenticated, permitTo ("admin"), createProduct)

module.exports = router