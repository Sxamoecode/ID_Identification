const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

const ProfileDb = mongoose.model('ProfileDb', profileSchema);

module.exports = ProfileDb;