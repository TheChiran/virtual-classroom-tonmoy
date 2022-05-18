const express = require('express');
const router = express.Router();
const { create, join,get } = require('./classroom.controller');
const {verifyUser} = require('./../Middleware/verify.token');

//route for authentication
router.post('/create',verifyUser,create);
router.post('/join',join);
router.get('/:_id',verifyUser,get);

module.exports = router;