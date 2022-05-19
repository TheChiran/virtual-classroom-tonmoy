const Joi = require('@hapi/joi');

//method to validate post input
const postValidation = data =>{
    const schema = {
        type: Joi.string()
                .min(6)
                .required(),
        deadline: Joi.date()
                .required()
    };
    return Joi.validate(data,schema);
};


module.exports = {
    postValidation
}