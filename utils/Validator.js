const Joi = require('joi');

// Using joi validation library to validate Users input
const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required()
});

module.exports = schema;