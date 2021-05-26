const http = require('http');
const config = require('../config');

function sendSms(phone, message) {
  if (config.mongooseDebug) {
    console.log(phone);
    console.log(message);
    // disable SMS in development ENV
    return;
  }
  const phoneNumber = `+91${phone}`;
  const user = config.smsUserName;
  const password = config.smsPassword;
  const senderId = config.smsSenderId;

  const url = `http://m.onlinebusinessbazaar.in/sendsms.jsp?user=${user}&password=${password}&senderid=${senderId}&mobiles=${phoneNumber}&sms=${message}&responsein=JSON`;

  console.log('sending sms');
  http.get(url, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log('SMS XML RESPONSE = ', data);
    });

  }).on("error", (err) => {
    console.log("SMS Error: " + err.message);
  });

}

module.exports = {
  sendSms
};
