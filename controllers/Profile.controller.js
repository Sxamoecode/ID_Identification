const model = require('../model/Profile.model');
const Joi = require('joi');
const User = require('../model/Profile.model');
const schema = require('../Validator');

//Getting the root of our app
function getApp (req, res) {
    res.send('Users Profiles');
};
// Post profiles
async function postProfiles(req, res) {
    const ValidateProfile = await schema.validateAsync(req.body);
    await User.create(ValidateProfile);
    return res.status(201).json({
        msg: 'Profile created successfully'
    })






/*
    //return error if both firstName & lastName are not specified
    if (!req.body.firstName) {
        return res.status(400).json ({
            error: 'Missing firstname'
        });
    } else if (!req.body.lastName) {
        return res.status(400).json ({
            error: 'Missing lastname'
        });
    };

    // Setting our profile Schema
    const today = new Date().toLocaleDateString();
    const newProfile = {
        id: model.length,
        firstname: req.body.firstName,
        lastName: req.body.lastName,
        dateCreated: today
    };

    // Using Joi validation library to validate our inputs and set requirements
*/    
}

async function getProfiles(req, res) {
    const findProfiles = await User.find({});
    res.status(200).json({data: findProfiles})
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
    getApp,
    postProfiles,
    getProfiles,
    getProfile
}