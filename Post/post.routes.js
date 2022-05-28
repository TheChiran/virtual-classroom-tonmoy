const express = require('express');
const router = express.Router();
const { create,get,submitAnswer,getAnswerList,submitMarks,getMarks,getMark,getList } = require('./post.controller');
const {verifyUser} = require('./../Middleware/verify.token');
const {isTeacher} = require('./../Middleware/verify.role');

//route for post -> assignment/exam
router.post('/create/:classroom',verifyUser,isTeacher,create);
router.get('/get-list/:classroom',verifyUser,getList);
router.get('/:_id',verifyUser,get);
router.post('/:id/submit/answer',verifyUser,submitAnswer)
router.get('/:id/get/answer-list',verifyUser,isTeacher,getAnswerList)
router.post('/:id/submit/mark',verifyUser,isTeacher,submitMarks)
router.get('/:id/get/mark-list',verifyUser,getMarks)
router.get('/:id/get/mark/:student',verifyUser,getMark)

module.exports = router;