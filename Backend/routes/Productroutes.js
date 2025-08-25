const express = require("express")
const authmiddileware = require('../middilewares/authmiddileware')
const {createproduct,updateproduct,deleteproduct,getproducts,getproduct,getsimilarproduct,getbestproduct,latestuploadedproduct} = require('../Controllers/Productcontroller')
const admin = require('../middilewares/adminmiddileware')

const router = express.Router()

router.post('/',authmiddileware,admin,createproduct)

router.put('/:id',authmiddileware,admin,updateproduct)

router.delete('/:id',authmiddileware,admin,deleteproduct)

router.get("/",getproducts)


router.get("/best-seller",getbestproduct)

router.get('/new-arrivals',latestuploadedproduct)

router.get("/similar/:id",getsimilarproduct)

router.get("/:id",getproduct)


module.exports = router
