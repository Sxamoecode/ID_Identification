const QRcode = require('qrcode')

const QRencrypt = async (data) => {
    const encryptedData = await QRcode.toFile(data);
    return encryptedData;
}

module.exports = {
    QRencrypt
}