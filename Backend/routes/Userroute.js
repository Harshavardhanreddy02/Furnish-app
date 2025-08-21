const express = require('express')
const router = express.Router()
const {register,login,profile} = require('../Controllers/authcontroller')
const authmiddileware = require('../middilewares/authmiddileware')


router.post("/register",register)
router.post("/login",login)
router.get("/profile",authmiddileware,profile)

module.exports = router