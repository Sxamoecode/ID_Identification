const QRcode = require('qrcode')
const model = require('./model/Profile.model');
//model();
let stJSON = JSON.stringify(model);
QRcode.toFile("Profile_qrcode.png", stJSON, function(err,code) {
    if (err) return console.log("Couldn't create qr file");
    console.log(code);
});