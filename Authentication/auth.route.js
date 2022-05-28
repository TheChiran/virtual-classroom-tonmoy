const express = require('express');
const router = express.Router();
const {register,login} = require('./auth.controller');

//route for authentication
router.post('/sign-up',register);

module.exports = router;