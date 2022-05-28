module.exports.isTeacher = (req,res,next)=>{
    //extract token from header
    if(req.user.role !== "teacher" || req.user.role !== "admin") return res.status(400).send({message: 'This feature is forbidden.'});
}

module.exports.isStudent = (req,res,next)=>{
    //extract token from header
    if(req.user.role !== "student") return res.status(400).send({message: 'Only students are allowed to join using this code.'});
}

module.exports.isAdmin = (req,res,next)=>{
    //extract token from header
    if(req.user.role !== "admin") return res.status(400).send({message: 'Forbidden route.'});
}

