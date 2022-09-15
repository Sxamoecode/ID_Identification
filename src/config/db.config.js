const {connect} = require('mongoose');


connect.Promise = global.Promise;
const startDb = async () => {
    try {
        await connect('mongodb+srv://Top_Universedb:123321@cluster0.xesoxqo.mongodb.net/test')
        console.log("Connected to Mongoose successfully!");
    } catch (e) {
        console.log(e);
    }
}
/*const nameSchema = new connect.Schema({
    firstName: String,
    lastName: String
});

const User = new connect.model("User", nameSchema);

exports.nameSchema = nameSchema
exports.User = User*/
module.exports = startDb;