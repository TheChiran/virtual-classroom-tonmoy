const {register,login} = require('../Authentication/auth.controller');

//method to generate new user
module.exports.createUser = async(req,res)=>{
    if(req.user.role !== 'admin') return res.status(403).send({message: 'Unauthorized user'});
    await register(req,res);
};

module.exports.login = async(req,res,next)=>{
    await login(req,res,next);
}