const mailgun = require('mailgun-js');

const sendMail = async (email, subject, message, cb) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  const data = {
    from: '<' + process.env.EMAIL_ADDRESS + '>',
    to: `${email}`,
    subject: subject,
    html: message,
  };
  await mg.messages().send(data, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
