//const model = require('../model/Profile.model');
//const Joi = require('joi');
const User = require('../model/Profile.model');
const schema = require('../Validator');
const csurf = require('csurf');

//Getting the root of our app
function getApp (req, res) {
    res.send('Users Profiles');
};
// Post profiles
async function postProfiles(req, res) {
    try {
        const ValidateProfile = await schema.validateAsync(req.body);
        await User.create(ValidateProfile);
        console.log(ValidateProfile);
        res.status(201).json({
            msg: 'Profile created successfully'
        })
    } catch (err) {
        res.status(404).json({
            error: "Profile not found"
        });
    }
}

async function getProfiles(req, res) {
    const findProfiles = await User.find({});
    res.status(200).json({data: findProfiles})
}

async function getProfile (req, res) {
    try {
        const findID = await User.find({firstName: 0})
        res.status(200).json({data: findID})
    } catch (err) {
        res.status(400).json({
            Error: 'Profile not found'
        })
    }



/*    const profileID = Number(req.params.ProfileID);
    const profile = model[profileID];
    if (profile) {
        res.status(200).json(profile);
    } else {
        res.status(404).json({
            error: "Profile not found"
        });
    };*/
}

module.exports = {
    getApp,
    postProfiles,
    getProfiles,
    getProfile
}