const {register} = require('../Authentication/auth.controller');

//method to generate new user
module.exports.createUser = async(req,res)=>{
    if(req.user.role !== 'admin') return res.status(403).send({message: 'Unauthorized user'});
    await register(req,res);
};