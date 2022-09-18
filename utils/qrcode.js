const QRcode = require('qrcode')

const QRencrypt = async (data) => {
    const encryptedData = await QRcode.toFile('/utils/ProfilQRCode.png',data);
    return encryptedData;
}
console.log('Quick response');

module.exports = {
    QRencrypt
}