const express = require('express');
const router = express.Router();
const { create, join,get,getUpcomingPost,end,submitResult,getResultList,getResult } = require('./classroom.controller');
const {verifyUser} = require('./../Middleware/verify.token');
const {isTeacher} = require('./../Middleware/verify.role');

//route for classroom
router.post('/create',verifyUser,isTeacher,create);
router.post('/join',join);
router.get('/:_id',verifyUser,get);
router.get('/:id/upcoming/post',getUpcomingPost)
router.put('/:id/end',verifyUser,isTeacher,end)
router.post('/:id/submit/result',verifyUser,isTeacher,submitResult)
router.get('/:id/get/result-list',verifyUser,getResultList)
router.get('/:id/get/result/:student',verifyUser,getResult)

module.exports = router;