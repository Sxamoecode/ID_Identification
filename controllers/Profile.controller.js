const User = require('../model/Profile.model');
const schema = require('../utils/Validator');
const {encrypt, decrypt} = require('../utils/crypto');
const {QRencrypt} = require('../utils/qrcode');

//Getting the root of our app
function getApp (req, res) {
    res.send('Users Profiles');
};
// Post profiles
async function postProfiles(req, res) {
    try {
        //Validate body of profile with Joi validator
        const ValidateProfile = await schema.validateAsync(req.body);
        //Create User profile on database
        const newProfile = await User.create(ValidateProfile);
        console.log(newProfile)
        if (!newProfile) {
            res.status(404).json({
                Error: 'Profile not created'
            })
        } else {
            res.status(201).json({
                Msg: "Profile created"
            })
        }
        //Convert the validated profile to object
        const{__v, _id, ...profileData} = newProfile.toObject();
        //Convert my profile to string
        const profileString = JSON.stringify(profileData);
        //Parse in the stringified data to the crypto encryption
        const encryptedData = await encrypt(profileString);
        console.log(encryptedData)
        const decryptedData = await decrypt(encryptedData)
        console.log(decryptedData)
        //Convert encrypted data to QRCode
        const encryptedQRFile = await QRencrypt(decryptedData);
        if (!encryptedQRFile) {
            res.status(500).json({
                Error: err
            });
        }

        res.status(201).json({
            msg: 'Profile created successfully'
        })
    } catch (error) {
        res.status(500).send(
            console.error(error)
        )
    }

};

// Delete Profile by passing index of profile on the database
const deleteProfile = async (req, res) => {
    try {
        // ID paramater
        const id = req.params.id
        // find ID on database
        const checkProfile = await User.findOne({id})
        console.log(checkProfile);
        // Delete ID on db
        checkProfile.delete()
        console.log("Profile deleted");
        res.status(201).json({
            status: 'Success',
            Msg: 'Deletion Successful'
        })
    } catch (err) {
        console.log("Profile not Found")
        return res.status(404).json({
            status: error,
            msg: "Profile with id doesn't exist"
        });
    };
}


async function getProfiles(req, res) {
    const findProfiles = await User.find({});
    res.status(200).json({data: findProfiles})
}

// Search Profile on database
const searchProfile = async (req, res) => {
    const {key, value} = req.query;
    // Search profile by firstName on db
    const searchResult = await User.findOne({firstName: value}).select("-__v").select("-_id").exec();
    if (searchResult) {
        console.log("Profile found")
        res.status(201).json({
            "status": 'Successful',
            Msg: "Profile found",
            data: searchResult
        });
    } else {
        res.status(404).json({
            status: 'Error',
            Msg: "Profile not on database"
        })
    }
}

// Profile Verification on db
async function verifyProfile (req, res) {
    try {
        const {data} = req.body
        if (!data) {
            res.status(400).json({
                Msg: 'Encrypted data required for Verification'
            })
        }
        // Decrypt data by parsing in body of requested data
        const decryptedData = await decrypt(data);
        console.log(decryptedData);
        res.status(200).json({
            status: "Successful",
            Msg: 'Data Verified!',
            data: decryptedData
        })
    } catch (err) {
        res.status(400).json({
            Error: 'Profile not found'
        })
    }
}

module.exports = {
    getApp,
    postProfiles,
    getProfiles,
    deleteProfile,
    verifyProfile,
    searchProfile
}