const express = require('express');
const router = express.Router();
const { likesubscribe } = require('../Controllers/subscribecontroller');

router.post('/', likesubscribe);

module.exports = router;
