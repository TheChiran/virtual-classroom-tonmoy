const Post = require('./post.model');
const ClassRoom = require('./../Classroom/classroom.model');
const {postValidation} = require("./post.validation");
const moment = require('moment');
const {RunTaskScheduler} = require("./../Utility/post.notifier");
const {months} = require('./../Utility/get.months');
const {SendMail} = require('./../Utility/mailer');
const multer = require('multer');
const {deleteUploadDirectory} = require('./../Utility/delete.directory');
//cloudinary integration
const cloudinary = require('cloudinary').v2;

const create = async(req,res,next)=>{

    //destruct body objects
    const {type,deadline,time,name} = req.body;
    
    const {error} = postValidation(req.body);
    if(error) return res.status(400).send(error);
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
        RunTaskScheduler(Number(formatedTime[1]),Number(formatedTime[0]) === 0 ? '23' : Number(formatedTime[0] - 1),deadlineDate.getDate(),months[deadlineDate.getMonth()],deadlineDate.getDay(),notifyStudents,generatedPost._id,req.params.classroom,deadline,time);
        return res.status(201).send({message: 'New post generated successfully'});
    }
    catch(error){
        next(error);
    }
}

const getList = async(req,res,next)=>{
    const postList = await Post.find({classroom: req.params.classroom});

    return res.status(200).send({post_list: postList});
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

const submitMarks = async(req,res,next)=>{
    const {student_list} = req.body;
    let mark_list = [];
    const post = await Post.findOne({_id: req.params.id});
    mark_list = [...post.marks,...student_list];
    post.marks = mark_list;

    try{
        await post.save();
        return res.status(201).send({message: 'Updated marks for this post'});
    }catch(error){
        next(error);
    }
}

const getMarks = async(req,res,next)=>{
    const post = await Post.findOne({_id: req.params.id})
                .select({"marks": 1})
                .populate({path: "marks",populate:'student'});

    return res.status(200).send({mark_list: post.marks});
}

const getMark = async(req,res,next)=>{
    const post = await Post.findOne({_id: req.params.id})
                .select({"marks": 1})
                .populate({path: "marks",populate:'student'});
    const studentResult = post.marks.filter((mark)=> mark.student?._id.toString() === req.params.student)
    
    return res.status(200).send({mark_list: studentResult});
}

const submitAnswer = async(req,res,next)=>{
    const post = await Post.findOne({_id: req.params.id});
    const date = new Date();

    // it must be checked if deadline is exceeded or not 
    if(new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`) > new Date(post.deadline.date)) return res.status(403).send({message: "Sorry, you can't submit answers anymore. You already exceeded the deadline.", deadline: post.deadline})
    
    const upload = multer({
        dest: 'uploads'
    }).array("answers");
    upload(req, res, async (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        
        let imageUrlLink = [];
        
        for(let index=0;index<req.files.length;index++){
            const response = await cloudinary.uploader.upload(req.files[index].path);
            if(!response) {
                return res.status(500).send({message: 'Something unexpected happened'});
                break;
            }
            imageUrlLink.push(response.url);
        }
        post.answers.push({student: req.user._id,answer: imageUrlLink});
        try{
            await post.save();
            await deleteUploadDirectory();
            return res.status(201).send({message: 'Answer submitted successfully'});
        }
        catch(error){
            next(error);
        }
    })
}

const getAnswerList = async(req,res,next)=>{
    // must check if user is teacher or not
    const post = await Post.findOne({_id: req.params.id})
                .select({"answers": 1})
                .populate({path: "answers",populate:{path: 'student',model: 'User'}});

    return res.status(200).send({answer_list: post.answers});
}

module.exports = {
    create,
    getList,
    get,
    submitAnswer,
    getAnswerList,
    submitMarks,
    getMarks,
    getMark
}