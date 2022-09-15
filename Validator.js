const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required()
});

module.exports = schema;











/*const Validation = schema.validate(req.body);
// Simplify errors to users
if (Validation.error) {
    res.json({
        ErrorMessage: Validation.error.details[0].message
    });
    console.log(Validation.error);
    //return Validation.error;
} else {
    console.log(Validation);
    model.push(newProfile);
    res.json(newProfile);
};*/