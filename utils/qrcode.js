const QRcode = require('qrcode')

const stJSON = JSON.stringify(data);
const QRencrypt = QRcode.toFile("Profile_qrcode.png", stJSON, function(err,code) {
    if (err) return console.log("Couldn't create qr file");
    console.log(code);
});

module.exports = {
    QRencrypt
}