const express = require('express');
const authmiddileware = require('../middilewares/authmiddileware');
const adminmiddleware = require('../middilewares/adminmiddileware');
const { getallusers, createusers, updateuser, deleteuser } = require('../Controllers/admincontroller');

const router = express.Router();

router.get('/', authmiddileware, adminmiddleware, getallusers);
router.post('/', authmiddileware, adminmiddleware, createusers);
router.put('/:id', authmiddileware, adminmiddleware, updateuser);
router.delete('/:id', authmiddileware, adminmiddleware, deleteuser);

module.exports = router;

