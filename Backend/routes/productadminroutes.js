const express = require('express');
const authmiddileware = require('../middilewares/authmiddileware')
const adminmiddilware = require('../middilewares/adminmiddileware');
const { getproduct } = require('../Controllers/Productcontroller');
const {getallproduct} = require('../Controllers/productadmincontroller')

const router = express.Router();

router.get('/', authmiddileware, adminmiddilware, getallproduct);

module.exports = router;
