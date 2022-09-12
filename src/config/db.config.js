const {connect} = require('mongoose');

const startDb = async () => {
    try {
        await connect('mongodb+srv://Top_Universedb:123321@cluster0.xesoxqo.mongodb.net/test')
        console.log("Connected to Mongoose successfully!");
    } catch (e) {
        console.log(e);
    }
}
module.exports = startDb;