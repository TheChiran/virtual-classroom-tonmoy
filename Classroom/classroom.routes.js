const express = require('express');
const router = express.Router();
const { create, join,get,getUpcomingPost } = require('./classroom.controller');
const {verifyUser} = require('./../Middleware/verify.token');

//route for authentication
router.post('/create',verifyUser,create);
router.post('/join',join);
router.get('/:_id',verifyUser,get);
router.get('/:id/upcoming/post',getUpcomingPost)

module.exports = router;