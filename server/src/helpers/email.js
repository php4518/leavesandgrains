const nodemailer = require('nodemailer');
const config = require('../config');

/**
 * Email service transporter.
 */
const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.emailServiceUser,
    pass: config.emailServicePass,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log('Invalid Credentials for email service.');
    console.log('Error: ', error);
    process.exit(1);
  }
});

/**
 * sendEmail - Sends email to user using email service
 * @param data - Email data required to send the email.
 * @returns {Promise}
 */
function sendEmail(data) {
  const {to, subject = 'Hey There', text = 'Have a good day'} = data;
  const mailOptions = {
    from: `"Leaves and Grains" <${config.emailServiceSender}>`, // sender address
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log('Error sending email: ' ,err);
    }
  });
}

module.exports = {
  sendEmail,
};
