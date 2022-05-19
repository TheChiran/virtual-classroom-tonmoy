const express = require('express');
const router = express.Router();
const { create,get } = require('./post.controller');
const {verifyUser} = require('./../Middleware/verify.token');

//route for authentication
router.post('/create/:classroom',verifyUser,create);
router.get('/:_id',verifyUser,get);

module.exports = router;