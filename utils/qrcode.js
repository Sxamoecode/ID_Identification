const QRcode = require('qrcode')

const QRencrypt = async (data) => {
    // Convert data to qrCode file
    const encryptedData = await QRcode.toFile('utils/Profileqr.png', data, {
        color: {dark:'#00F', light:'#000'}
    }, function(err) {
        if (err) throw err
        console.log('QRCode: done')
    });
    return encryptedData;
}
//Profileqr.png is updated whenever a new profile is created
console.log('Quick response');

module.exports = {
    QRencrypt
}