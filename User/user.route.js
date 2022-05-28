const express = require('express');
const router = express.Router();

const {verifyUser} = require('./../Middleware/verify.token');
const {isAdmin} = require('./../Middleware/verify.role');

const userController = require('./user.controller');

//route for user 
router.post('/create',verifyUser,isAdmin,userController.createUser);
router.post('/login',userController.login);

module.exports = router;