const User = require('./../User/User.model');
const {hashPassword,comparePassword} = require('./../Utility/hash.password');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation,generalUserRegisterValidation} = require('../User/user.validate.data');
const {SendMail} = require('../Utility/mailer');
const axios = require('axios');

const register = async(req,res)=>{
    //destruct body objects
    const {username,email,role,password} = req.body;
    
    //validate user input
    const {error} = role === "teacher" ? generalUserRegisterValidation(req.body) : registerValidation(req.body);
    if(error) return res.status(400).send(error);

    //check if user exists or not
    const emailExists = await User.findOne({email});
    if(emailExists) return res.status(400).send({message: 'Email address already in use'});
    let final_password = role === "admin" ? password : undefined,message;

    // generate random password if user role is teacher
    
    if(role === "teacher"){
        const response = await axios.get('https://passwordinator.herokuapp.com/?num=true&char=true&caps=true&len=14');
        if(response.status !== 200) return res.status(500).send({message: 'Error occurred while doing the operation'});
        final_password = response.data.data;
    }
    message = `This is notify that registration ${email} has been successfully done. Please use your password: ${final_password} to login to the system.
    Please do not share this password with anyone, sharing this password might cause you cyber attack. Thank you`;

    const data = {
        username,
        email,
        final_password: final_password,
        role,
        message
    }
    const response = await generateUser(data);
    if(response) return res.status(201).send({message: 'New user created successfully'});
    
};

const generateUser = async(data)=>{
    const user = new User();
    if(data.role.toString() === "student"){
        const isUserExists = await User.findOne({school_id: data.schoolId});
        if(isUserExists) return res.status(400).send({message: 'User already registered'});
        user.name = data.name;
        user.school_id = data.schoolId;
    }else{
        user.username = data.username;
    }
    user.email = data.email;
    user.password = await hashPassword(data.final_password);
    user.role = data.role;
    try{
        data.role === "teacher" && await SendMail(data.email,'Password forwarding',data.message, data.username);
        const userData = await user.save();
        return userData;
    }
    catch(err){
        console.log('error',err);
        return err;
    }
}

const login = async(req,res,next)=>{
    //validate user input
    const {error} = loginValidation(req.body);
    // if(error) console.log(error);
    if(error) return res.status(400).send(error);

    //destruct user inputs
    const {password,email} = req.body;
    
    //check if user exists
    const user = await User.findOne({email});
    if(!user) return res.status(400).send(`Invalid Credentials`);

    //check if password match
    const passwordMatched = await comparePassword(password,user.password);
    if(!passwordMatched) return res.status(400).send(`Invalid Credentials`);

    //generate token
    const token = jwt.sign({_id: user._id, role: user.role},process.env.TOKEN_SECRECT);

    res.send({accessToken:token});
};

module.exports = {
    generateUser,
    login,
    register
}

