const express = require('express');
const router = express.Router();

const {verifyUser} = require('./../Middleware/verify.token');

const userController = require('./user.controller');

//route for user setting
router.post('/create',verifyUser,userController.createUser);
router.post('/login',verifyUser,userController.createUser);


module.exports = router;