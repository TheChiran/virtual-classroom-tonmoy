module.exports.isAdminHeaderExists = (req,res,next)=>{
    //extract token from header
    if(req.header('admin-secret') !== process.env.ADMIN_HEADER_SECRET) return res.status(400).send({message: 'Forbidden route.'});
    next();
}