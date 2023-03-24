const express = require('express');
const loginApi = require('./login');
const createUserApi = require('./createUser');

const router = express.Router();

router.use(loginApi);
router.use(createUserApi);

module.exports = router;