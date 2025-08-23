// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const authmiddileware = require('../middilewares/authmiddileware');
const { getorders, getsingleorder } = require('../Controllers/ordercontroller');

router.get("/my-orders", authmiddileware, getorders);
router.get("/:id", authmiddileware, getsingleorder);

module.exports = router;
