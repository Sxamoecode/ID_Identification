const User = require('../model/Profile.model');
const schema = require('../Validator');
const {encrypt, decrypt} = require('../utils/crypto');
const {QRencrypt} = require('../utils/qrcode');

//Getting the root of our app
function getApp (req, res) {
    res.send('Users Profiles');
};
// Post profiles
async function postProfiles(req, res) {
    try {
        const ValidateProfile = await schema.validateAsync(req.body);
        const newProfile = await User.create(ValidateProfile);
        console.log(newProfile)
        const{__v, _id, ...profileData} = newProfile.toObject();
        const profileString = JSON.stringify(profileData);
        const encryptedData = await encrypt(profileString);
        const encryptedQRFile = await QRencrypt(profileString);
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

const deleteProfile = async (req, res) => {
    try {
        const id = req.params.id
        const checkProfile = await User.findOne({id})
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

const searchProfile = async (req, res) => {
    const {key, value} = req.query;
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

async function verifyProfile (req, res) {
    try {
        const data = req.body
        if (!data) {
            res.status(400).json({
                Msg: 'Data required for Verification'
            })
        }
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