const QRcode = require('qrcode')

const QRencrypt = async (data) => {
    // Convert data to qrCode file
    const encryptedData = await QRcode.toFile('utils/Profileqr.png', data, {
        color: {dark:'#00F', light:'#000'}
    }, function(err) {
        if (err) throw err
        console.log('done')
    });
    return encryptedData;
}

console.log('Quick response');

module.exports = {
    QRencrypt
}