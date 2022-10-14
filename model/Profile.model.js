const mongoose = require('mongoose');

const proSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
}, {
    timestamps: {
        createdAt: "dateCreated",
        updatedAt: false
    }
})

const User = mongoose.model("Profile", proSchema);

module.exports = User;