const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gamezvillamilhenry@gmail.com',
        pass: 'xmruinrrcroafuku',
    }
});
module.exports = transporter;