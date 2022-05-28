const {register,login} = require('../Authentication/auth.controller');

//method to generate new user
module.exports.createUser = async(req,res)=>{
    console.log('create user called');
    await register(req,res);
};

module.exports.login = async(req,res,next)=>{
    await login(req,res,next);
}