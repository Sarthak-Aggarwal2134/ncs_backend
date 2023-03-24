const express = require('express');
const router = express.Router();
const controller = require('../controllers/createUser');

router.post('/createUser', controller.createUser);

module.exports = router;
