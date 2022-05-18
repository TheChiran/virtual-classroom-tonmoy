const User = require('./../User/User.model');
const {hashPassword,comparePassword} = require('./../Utility/hash.password');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation,generalUserRegisterValidation} = require('../User/user.validate.data');
const {SendMail} = require('../Utility/mailer');
const axios = require('axios');

module.exports.register = async(req,res)=>{
    if(req.header('admin-secret') !== process.env.ADMIN_HEADER_SECRET) return res.status(404).send({message: 'invalid route'});

    //destruct body objects
    const {username,email,password,role} = req.body;
    
    //validate user input
    const {error} = role === "teacher" ? generalUserRegisterValidation(req.body) : registerValidation(req.body);
    if(error) return res.status(400).send(error);

    //check if user exists or not
    const emailExists = await User.findOne({email});
    if(emailExists) return res.status(400).send({message: 'Email address already in use'});
    let final_password = password,message;

    // generate random password if user role is teacher
    if(role === 'teacher'){
        const response = await axios.get('https://passwordinator.herokuapp.com/?num=true&char=true&caps=true&len=14');
        if(response.status !== 200) return res.status(500).send({message: 'Error occurred while doing the operation'});
        final_password = response.data.data;
    }
    message = `This is notify that registration ${email} has been successfully done. Please use your password: ${final_password} to login to the system.
    Please do not share this password with anyone, sharing this password might cause you cyber attack. Thank you`;

    //create new user
    const hashedPassword = await hashPassword(final_password);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;
    try{
        await SendMail(email,'Password forwarding',message, username);
        await user.save();
        res.send({user_id: user._id});
    }
    catch(err){
        res.status(500).send(`Unable to complete the process`);
    }
};

module.exports.login = async(req,res)=>{
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
