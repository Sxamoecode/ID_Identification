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













/*const today = new Date().toLocaleDateString();

const profile-array = [
    {
    id: 0,
    firstName: 'John',
    lastName: 'Wick',
    dateCreated: today
    },
    {
        id: 1,
        firstName: 'Marie',
        lastName: 'Curie',
        dateCreated: today
    }
]

module.exports = profilearray*/