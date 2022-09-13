const model = require('../model/Profile.model');
const Joi = require('joi');
//const {registerValidation} = require('../Validator');

function postProfiles(req, res) {
    if (!req.body.firstName) {
        return res.status(400).json ({
            error: 'Missing firstname'
        });
    } else if (!req.body.lastName) {
        return res.status(400).json ({
            error: 'Missing lastname'
        });
    };

    const today = new Date().toLocaleDateString();
    const newProfile = {
        id: model.length,
        firstname: req.body.firstName,
        lastName: req.body.lastName,
        dateCreated: today
    };

    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required()
    });
    const Validation = schema.validate(req.body);
    if (Validation.error) {
        res.json({
            ErrorMessage: Validation.error.details[0].message
        });
        console.log(Validation.error);
        return Validation.error;
    } else {
        console.log(Validation);
        model.push(newProfile);
        res.json(newProfile);
    }
}

function getProfiles(req, res) {
    res.send(model);
}

function getProfile (req, res) {
    const profileID = Number(req.params.ProfileID);
    const profile = model[profileID];
    if (profile) {
        res.status(200).json(profile);
    } else {
        res.status(404).json({
            error: "Profile not found"
        });
    };
}
module.exports = {
    postProfiles,
    getProfiles,
    getProfile
}