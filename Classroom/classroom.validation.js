const Joi = require('@hapi/joi');

//method to validate classroom input
const classroomValidation = data =>{
    const schema = {
        name: Joi.string()
                .min(6)
                .required(),
        subject: Joi.string()
                .min(6)
                .required()
    };
    return Joi.validate(data,schema);
};




module.exports = {
    classroomValidation
}