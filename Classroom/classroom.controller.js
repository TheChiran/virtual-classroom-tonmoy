const ClassRoom = require('./classroom.model');
const Post = require('./../Post/post.model');
const User = require('./../User/User.model');
const {classroomValidation} = require("./classroom.validation");
const {generateUser} = require('../Authentication/auth.controller');
const axios = require('axios');

const create = async(req,res,next)=>{
    //destruct body objects
    const {name,subject} = req.body;
    
    //validate user input
    const {error} = classroomValidation(req.body);
    if(error) return res.status(400).send(error);

    // generate unique code
    const {data: classCode} = await axios.get('https://passwordinator.herokuapp.com/?num=true&caps=true&len=6');
    
    const classroom = new ClassRoom();
    classroom.created_by = req.user._id;
    classroom.code = classCode.data;
    classroom.subject = subject;
    classroom.name = name;
    classroom.teacher = req.user._id;
    classroom.isActive = true;

    try{
        const response = await classroom.save();
        if(response) return res.status(201).send({message: 'New classroom created successfully', classroom_code: classCode.data});
    }
    catch(error){
        next(error);
    }
}

const join = async(req,res,next)=>{
    const {code} = req.body;
    
    // first check if classroom code is valid or not
    const classRoom = await ClassRoom.findOne({code});

    
    if(!classRoom || classRoom.isActive === false) return res.status(400).send({message: 'Invalid classroom code or this classroom is closed'});

    const {schoolId,password,email,name} = req.body;
    console.log('body',req.body)
    const student = await User.findOne({school_id: Number(schoolId),email});
    console.log('student',student);
    classRoom.students.map((data)=>{
        console.log('data',data);
    })
    const studentExists = classRoom.students.filter((data)=> data.toString() === student._id.toString());
    console.log('student exists',studentExists)
    if(studentExists) return res.status(400).send({message: 'Your already in the classroom'});

    const user = await generateUser({name,schoolId,final_password: password,email,role: "student"});
    if(!user._id) return res.status(500).send({message: 'Something went wrong, please try again'});
    
    // student id is must to push into classroom
    classRoom.students.push(user._id);

    try{
        await classRoom.save();
        res.status(200).send({message: 'Student added to classroom'});
    }catch(error){
        next(error);
    }

}

const get = async(req,res,next)=>{
    const {_id} = req.params;
    
    try{
        const classRoom = await ClassRoom.findOne({_id,isActive: true}).populate("students");
        if(!classRoom) return res.status(400).send({message: 'Classroom not found'});
        return res.status(200).send(classRoom);
    }
    catch(error){
        next(error);
    }
}

const getUpcomingPost = async(req,res,next)=>{
    const date = new Date();
    // check if user is in the classroom or not
    const upcomingPost = await Post.find({classroom: req.params.id, "deadline.date": {"$gt": new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)}});

    return res.status(200).send({upcoming_post_list: upcomingPost});
}

const end = async(req,res,next)=>{
    const classroom = await ClassRoom.findOne({_id: req.params.id});
    classroom.isActive = false;

    try{
        await classroom.save();
        return res.status(200).send({message: 'Classroom ended successfully'});
    }catch(error){
        next(error);
    }
}

const submitResult = async(req,res,next)=>{
    const {student_list} = req.body;
    let result_list = [];
    const classroom = await ClassRoom.findOne({_id: req.params.id});
    result_list = [...classroom.results,...student_list];
    classroom.results = result_list;

    try{
        await classroom.save();
        return res.status(201).send({message: 'Updated grades for this classroom'});
    }catch(error){
        next(error);
    }
}

const getResultList = async(req,res,next)=>{
    const classroom = await ClassRoom.findOne({_id: req.params.id})
                .select({"results": 1})
                .populate({path: "results",populate:'student'});

    return res.status(200).send({result_list: classroom.results});
}

const getResult = async(req,res,next)=>{
    const classroom = await ClassRoom.findOne({_id: req.params.id})
    .select({"results": 1})
    .populate({path: "results",populate:'student'});
    const studentResult = classroom.results.filter((result)=> result.student?._id.toString() === req.params.student)

    return res.status(200).send({result: studentResult});
}

module.exports = {
    create,
    join,
    get,
    getUpcomingPost,
    end,
    submitResult,
    getResultList,
    getResult
}