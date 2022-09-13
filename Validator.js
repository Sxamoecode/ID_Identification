const Joi = require('joi');

const registerValidation = data => {
    
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;