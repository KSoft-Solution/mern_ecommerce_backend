const nodemailer = require("nodemailer");

const sendMail = async (recipient, message) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.SENDER_EMAIL_ADDRESS, // email
      pass: process.env.SENDER_EMAIL_PASSWORD, //password
    },
    host: 'smtp.gmail.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: process.env.EMAIL_PORT,
    secure: false,
    // logger: true,
    debug: true,
    ignoreTLS: true,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    requireTLS: true,
  });

  const data = {
    from: `SriKrishna Bakery <${process.env.SENDER_EMAIL_ADDRESS}>`,
    to: recipient,
    subject: `${message.subject}`,
    text: `${message.text}`,
    html: `${message.html}`,
  };
  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log("Your config is correct");
  });

  await transporter
    .sendMail(data)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};

module.exports = sendMail;
