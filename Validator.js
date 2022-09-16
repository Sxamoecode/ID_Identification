const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required()
});

module.exports = schema;