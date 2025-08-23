const express = require('express');
const authmiddileware =  require('../middilewares/authmiddileware')
const adminmiddileware = require('../middilewares/adminmiddileware')
const {getallorders,updateorderstatus,deleteorder} = require('../Controllers/adminordercontroller')

const router = express.Router();
router.get('/',authmiddileware,adminmiddileware,getallorders)

router.put('/:id',authmiddileware,adminmiddileware,updateorderstatus)

router.delete('/:id',authmiddileware,adminmiddileware,deleteorder)


module.exports = router;