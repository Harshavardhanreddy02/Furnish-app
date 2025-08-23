// routes/checkoutRoutes.js
const express = require("express")
const router = express.Router()
const authmiddleware = require('../middilewares/authmiddileware')
const { createcheckout, updatecheckout, paymentcheckout } = require('../Controllers/checkoutcontroller')

router.post("/", authmiddleware, createcheckout)
router.put('/:id/pay', authmiddleware, updatecheckout)
router.post('/:id/finalize', authmiddleware, paymentcheckout)

module.exports = router
