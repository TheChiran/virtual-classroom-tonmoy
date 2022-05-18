const ClassRoom = require('./classroom.model');
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
    if(!classRoom) return res.status(204).send({message: 'Invalid classroom code'});
    const {schoolId,password,email,name} = req.body;
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
        const classRoom = await ClassRoom.findOne({_id}).populate("students");
        return res.status(200).send(classRoom);
    }
    catch(error){
        next(error);
    }
}


module.exports = {
    create,
    join,
    get
}