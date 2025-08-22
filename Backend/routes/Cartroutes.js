const express = require('express')
const router = express.Router()
const { additemtocart,updatecart,deletecart,getcartitems,mergecart } = require('../Controllers/Cartcontroller')
const authmidilleware = require("../middilewares/authmiddileware")

router.post("/", additemtocart)

router.put("/",updatecart)

router.delete("/",deletecart)

router.get("/",getcartitems)

router.post("/merge",authmidilleware,mergecart)

module.exports = router



