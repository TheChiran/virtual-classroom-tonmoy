const Post = require('./post.model');
const ClassRoom = require('./../Classroom/classroom.model');
const {postValidation} = require("./post.validation");
const moment = require('moment');
const {RunTaskScheduler} = require("./../Utility/post.notifier");
const {months} = require('./../Utility/get.months');
const {SendMail} = require('./../Utility/mailer');

const create = async(req,res,next)=>{

    //destruct body objects
    const {type,deadline,time,name} = req.body;
    
    //check if classroom exists
    const isClassRoomExists = await ClassRoom.findOne({_id: req.params.classroom});
    if(!isClassRoomExists) return res.status(404).send({message: 'Classroom does not exists'});
    const deadlineDate = new Date(deadline);
    const formatedTime = moment(`${time}`, "h:mm:ss A").format("HH:mm:ss").split(":");

    const post = new Post();
    post.type = type;
    post.deadline.date = deadline;
    post.deadline.time = time;
    post.classroom = req.params.classroom;
    post.name = name;

    try{
        const generatedPost = await post.save();
        // method to run scheduler
        RunTaskScheduler(Number(formatedTime[1]),Number(formatedTime[0]) === 0 ? '23' : Number(formatedTime[0]),deadlineDate.getDate(),months[deadlineDate.getMonth()],deadlineDate.getDay(),notifyStudents,generatedPost._id,req.params.classroom,deadline,time);
        return res.status(201).send({message: 'New post generated successfully'});
    }
    catch(error){
        next(error);
    }
}

const get = async(req,res,next)=>{
    const {_id} = req.params;
    
    try{
        const classRoom = await ClassRoom.findOne({_id,isActive: true}).populate("students");
        if(!classRoom) return res.status(400).send({message: 'Post not found'});
        return res.status(200).send(classRoom);
    }
    catch(error){
        next(error);
    }
}

const notifyStudents = async(postId,classRoom,deadline_date,deadline_time)=>{
    // method to send notification to all students before 1 hours
    let address,subject = 'Exam/Assignment notify',message,username;
    const classroom = await ClassRoom.findOne({_id: classRoom}).populate("students").select("students");
    const post = await Post.findOne({_id: postId});
    classroom.students.map((student)=>{
        address = student.email;
        username = student.name;
        message = `Dear Student,\nPlease be informed that you have an ${post.type} on ${deadline_date},${deadline_time}. Please be on time`;
        SendMail(address,subject,message,username);
    })
}

module.exports = {
    create,
    get
}