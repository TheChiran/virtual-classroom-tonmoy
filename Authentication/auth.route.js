const express = require('express');
const router = express.Router();
const {register,login} = require('./auth.controller');
const {isAdminHeaderExists} = require('../Middleware/admin-header-check');

//route for authentication
router.post('/sign-up',isAdminHeaderExists,register);

module.exports = router;